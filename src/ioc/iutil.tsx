export interface IUser {
    name: string,
    stack: number,
    order?: string
}

export interface INaipes {
    id: number,
    card: string
}

export interface IUtilService {
    changeUserrOrders(users: IUser[]): IUser[]
    getNaipes(): INaipes[]
    getShuffleCards(): Promise<any>
}

export class UtilService {
    constructor(private service: IUtilService) { }

    changeUserrOrders(users: IUser[]): IUser[] {
        return this.service.changeUserrOrders(users)
    }

    getNaipes(): INaipes[] {
        return this.service.getNaipes()
    }

    async getShuffleCards(): Promise<any> {
        return this.service.getShuffleCards()
    }


}