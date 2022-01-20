import { Request } from './Request';

export abstract class Command<TResult = void> extends Request<TResult> {
}
