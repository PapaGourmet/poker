import { ITable } from "../../../../interfaces/interfaces"
import { IUser } from "../../../../ioc/iutil"

export interface ITableService {
    addTable(table: ITable): Promise<void>

    getTable(lord: string, code: string): Promise<ITable>
}

export class TableService {
    constructor(private service: ITableService) { }

    async addTable(table: ITable): Promise<void> {
        this.service.addTable(table)
    }

    async getTable(lord: string, code: string): Promise<ITable> {
        return this.service.getTable(lord, code)
    }
}