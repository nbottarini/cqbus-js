import { Request } from './Request'

export abstract class Command<TResult> extends Request<TResult> {
}
