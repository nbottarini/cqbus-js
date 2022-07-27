export abstract class Request<TResult> {
    __internal__ = (): TResult => { throw new Error('Internal should not be called') }
}
