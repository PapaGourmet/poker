export interface objectId {
    [key: string]: any
}

export interface IPlayer {
    name: string,
    picture: string,
    email: string,
    locale: string,
    stack: number,
    sub: string,
    position?: string,
    action?: string,
    bet?: number,
    card1?: string,
    card2?: string,
    active?: boolean
}

export interface ITable {
    name: string,
    code: string,
    lord: string,
    players: IPlayer[],
    status: string // flop, turn, river
}