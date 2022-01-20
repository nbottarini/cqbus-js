import { Identity } from './Identity';

export class AnonymousIdentity implements Identity {
    readonly name = 'Anonymous';
    readonly authenticationType = null;
    readonly isAuthenticated = false;
    readonly properties = {};
    readonly roles = [];
}
