import { Request } from './requests/Request';
import { ExecutionContext } from './ExecutionContext';

export interface Middleware {
    exec<T extends Request<R>, R>(request: T, next: (T) => Promise<R>, context: ExecutionContext): Promise<R>
}
