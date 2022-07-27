import { Identity } from './identity/Identity'
import { AnonymousIdentity } from './identity/AnonymousIdentity'

export class ExecutionContext {
    private _identity: Identity = new AnonymousIdentity()
    private data: { [key:string]: any } = {}

    get identity(): Identity {
        return this._identity
    }

    set identity(value: Identity) {
        this._identity = value
    }

    withIdentity(identity: Identity) {
        this._identity = identity
        return this
    }

    with(key: string, value) {
        this.set(key, value)
        return this
    }

    set(key: string, value) {
        this.data[key] = value
    }

    get(key: string): any {
        return this.data[key]
    }

    static empty() {
        return new ExecutionContext()
    }
}
