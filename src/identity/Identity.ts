export interface Identity {
    readonly name: string;
    readonly isAuthenticated: boolean;
    readonly authenticationType: string|null;
    readonly roles: string[];
    readonly properties: {[name: string]: any};
}
