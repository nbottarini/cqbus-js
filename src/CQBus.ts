import { RequestHandler } from './requests/handlers/RequestHandler';
import { Request } from './requests/Request';
import { ExecutionContext } from './ExecutionContext';
import { ContextAwareRequestHandler } from './requests/handlers/ContextAwareRequestHandler';
import { RequestHandlerNotRegisteredError } from './RequestHandlerNotRegisteredError';
import { Middleware } from './Middleware';

type RequestHandlerFactory<T extends Request<R>, R> = () => RequestHandler<T, R>;
type ContextAwareRequestHandlerFactory<T extends Request<R>, R> = () => ContextAwareRequestHandler<T, R>;

export class CQBus {
    private requestHandlers: Map<any, RequestHandlerFactory<any, any>> = new Map();
    private contextAwareRequestHandlers: Map<any, ContextAwareRequestHandlerFactory<any, any>> = new Map();
    private middlewares: Middleware[] = [];

    registerHandler<T extends Request<R>, R>(requestType: new (...args:any[]) => T, requestHandlerFactory: RequestHandlerFactory<T, R>) {
        this.requestHandlers.set(requestType, requestHandlerFactory);
    }

    registerContextAwareHandler<T extends Request<R>, R>(requestType: new (...args:any[]) => T, requestHandlerFactory: ContextAwareRequestHandlerFactory<T, R>) {
        this.contextAwareRequestHandlers.set(requestType, requestHandlerFactory);
    }

    async execute<T extends Request<any>>(request: T, context: ExecutionContext = ExecutionContext.empty()): Promise<RequestResult<T>> {
        let execFunc = (req) => this.executeHandler(req, context);
        execFunc = this.applyMiddlewares(execFunc, context);
        return execFunc(request);
    }

    private async executeHandler<T extends Request<any>>(request: T, context: ExecutionContext = ExecutionContext.empty()): Promise<RequestResult<T>> {
        let handlerFactory = this.requestHandlers.get(request.constructor);
        if (handlerFactory) return await handlerFactory().handle(request, context.identity);
        let contextAwareHandlerFactory = this.contextAwareRequestHandlers.get(request.constructor);
        if (contextAwareHandlerFactory) return await contextAwareHandlerFactory().handle(request, context);

        throw new RequestHandlerNotRegisteredError('Request handler not registered for request ' + request.constructor.name);
    }

    registerMiddleware(middleware: Middleware) {
        this.middlewares.push(middleware);
    }

    private applyMiddlewares<T extends Request<R>, R>(execFunc: (req: T) => Promise<R>, context: ExecutionContext): (T) => Promise<R> {
        let newExecFunc = execFunc;
        this.middlewares.forEach(m => {
            const previousFunc = newExecFunc;
            newExecFunc = (req) => m.exec(req, previousFunc, context);
        });
        return newExecFunc;
    }
}

export type RequestResult<T> = T extends Request<infer R> ? R : any;
