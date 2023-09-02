import { IPlayer, ITable } from "../../../../interfaces/interfaces"

export interface ITableService {
    addTable(table: ITable): Promise<void>

    getTable(lord: string, code: string): Promise<ITable>

    addPlayer(player: IPlayer, code: string): Promise<void>

    getPlayer(email: string): Promise<any>

    updatePlayerTable(tableCode: string, playerEmail: string, player: IPlayer): Promise<any>

    updateAllPlayersTable(tableCode: string, listPlayers: IPlayer[]): Promise<void>
}

export class TableService {
    constructor(private service: ITableService) { }

    async addTable(table: ITable): Promise<void> {
        this.service.addTable(table)
    }

    async getTable(lord: string, code: string): Promise<ITable> {
        return this.service.getTable(lord, code)
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

    async updateAllPlayersTable(tableCode: string, listPlayers: IPlayer[]): Promise<void> {
        this.service.updateAllPlayersTable(tableCode, listPlayers)
    }
}