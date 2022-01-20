import { Request } from '../Request';
import { Identity } from '../../identity/Identity';

export interface RequestHandler<T extends Request<TResult>, TResult = void> {
    handle(request: T, identity: Identity): Promise<TResult>;
}
