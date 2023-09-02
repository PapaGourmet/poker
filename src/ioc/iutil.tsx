import { IPlayer } from "../interfaces/interfaces"

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
    changeUserOrders(players: IPlayer[]): IPlayer[]
    getNaipes(): INaipes[]
    getShuffleCards(): Promise<any>
}

export class UtilService {
    constructor(private service: IUtilService) { }

    changeUserOrders(players: IPlayer[]): IPlayer[] {
        return this.service.changeUserOrders(players)
    }

    getNaipes(): INaipes[] {
        return this.service.getNaipes()
    }

    async getShuffleCards(): Promise<any> {
        return this.service.getShuffleCards()
    }


}