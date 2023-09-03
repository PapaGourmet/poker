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
    getOrders(player: IPlayer[]): string[]
}

export class UtilService {
    constructor(private service: IUtilService) { }

    changeUserOrders(players: IPlayer[]): IPlayer[] {
        return this.service.changeUserOrders(players)
    }

    getNaipes(): INaipes[] {
        return this.service.getNaipes()
    }

    getOrders(player: IPlayer[]): string[] {
        return this.service.getOrders(player)
    }

    async getShuffleCards(): Promise<any> {
        return this.service.getShuffleCards()
    }


}