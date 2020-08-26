

export interface User {
    login: string,

    firstName: string,

    lastName: string,

    email: string,

    authorities: string[]
}


export enum Authority {
    ROLE_USER,
    ROLE_ADMIN,
    ROLE_MANAGER
}