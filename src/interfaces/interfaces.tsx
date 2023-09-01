export interface objectId {
    [key: string]: any
}

export interface IUser {
    name: string,
    picture: string,
    email: string,
    locale: string,
    stack: number,
    sub: string,
    sectionId: string
}

export interface ITable {
    name: string,
    code: string,
    lord: string
}