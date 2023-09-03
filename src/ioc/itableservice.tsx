import { IPlayer, ITable } from "../interfaces/interfaces"

export interface ITableService {
    addTable(table: ITable): Promise<void>

    addPlayer(player: IPlayer, code: string): Promise<void>

    getPlayer(email: string): Promise<any>

    updatePlayerTable(tableCode: string, playerEmail: string, player: IPlayer): Promise<any>

    updateAllPlayersTable(tableCode: string, listPlayers: IPlayer[], position?: string): Promise<void>

    updateTableDeck(tableCode: string, deck: number[]): Promise<void>

    updateF1(code: string, f1: string): Promise<void>

    updateF2(code: string, f2: string): Promise<void>

    updateF3(code: string, f3: string): Promise<void>

    updateFlopInit(code: string): Promise<void>

    updateTurn(code: string, turn: string): Promise<void>

    updateRiver(code: string, river: string): Promise<void>

    getTable(code: string, lord?: string): Promise<ITable>

    updateTimeTurnProgress(code: string, progress: number): Promise<void>


}

export class TableService {
    constructor(private service: ITableService) { }

    async addTable(table: ITable): Promise<void> {
        this.service.addTable(table)
    }

    async getTable(code: string, lord?: string): Promise<ITable> {

        if (lord) {
            return this.service.getTable(lord, code)
        } else {
            return this.service.getTable(code)
        }

    }

    async addPlayer(player: IPlayer, code: string): Promise<void> {
        this.service.addPlayer(player, code)
    }

    async getPlayer(email: string): Promise<any> {
        return this.service.getPlayer(email)
    }

    async updatePlayerTable(tableCode: string, playerEmail: string, player: IPlayer): Promise<any> {
        return this.service.updatePlayerTable(tableCode, playerEmail, player)
    }

    async updateAllPlayersTable(tableCode: string, listPlayers: IPlayer[], position?: string): Promise<void> {
        this.service.updateAllPlayersTable(tableCode, listPlayers, position)
    }

    async updateTableDeck(tableCode: string, deck: number[]): Promise<void> {
        this.service.updateTableDeck(tableCode, deck)
    }


    async updateTurn(code: string, turn: string): Promise<void> {
        this.service.updateTurn(code, turn)
    }

    async updateRiver(code: string, river: string): Promise<void> {
        this.service.updateRiver(code, river)
    }

    async updateF1(code: string, f1: string): Promise<void> {
        return this.service.updateF1(code, f1)
    }

    async updateF2(code: string, f2: string): Promise<void> {
        return this.service.updateF2(code, f2)
    }

    async updateF3(code: string, f3: string): Promise<void> {
        return this.service.updateF3(code, f3)
    }

    async updateFlopInit(code: string): Promise<void> {
        this.service.updateFlopInit(code)
    }

    async updateTimeTurnProgress(code: string, progress: number): Promise<void> {
        this.service.updateTimeTurnProgress(code, progress)
    }

}