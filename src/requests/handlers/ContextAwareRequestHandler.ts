import { Request } from '../Request';
import { ExecutionContext } from '../../ExecutionContext';

export interface ContextAwareRequestHandler<T extends Request<TResult>, TResult = void> {
    handle(request: T, context: ExecutionContext): Promise<TResult>;
}
