import axios, { AxiosRequestConfig } from "axios"
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import dbDatabaseFirestore from "../database-config"
import { IPlayer, ITable } from "../interfaces/interfaces"


import { ITableService } from "./itableservice"

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class TableFirestoreService implements ITableService {
    private db = dbDatabaseFirestore
    private url = 'https://pocker-club-default-rtdb.firebaseio.com'

    async updateTimeTurnProgress(code: string, progress: number): Promise<void> {
        const tableRef = doc(this.db, 'tables', code)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    progress
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }

    }

    async updateF1(code: string, f1: string): Promise<void> {
        const tableRef = doc(this.db, 'tables', code)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    f1
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }

    }

    async updateF2(code: string, f2: string): Promise<void> {
        const tableRef = doc(this.db, 'tables', code)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    f2
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }
    }

    async updateF3(code: string, f3: string): Promise<void> {
        const tableRef = doc(this.db, 'tables', code)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    f3
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }
    }

    async updateTurn(code: string, turn: string): Promise<void> {
        const tableRef = doc(this.db, 'tables', code)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    turn
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }
    }

    async updateRiver(code: string, river: string): Promise<void> {
        const tableRef = doc(this.db, 'tables', code)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    river
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }
    }

    async updateTableDeck(tableCode: string, deck: number[]): Promise<void> {
        const tableRef = doc(this.db, 'tables', tableCode)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    deck
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }
    }

    async updateFlopInit(code: string): Promise<void> {
        try {

            const tableRef = doc(this.db, 'tables', code)

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    f1: '0',
                    f2: '0',
                    f3: '0',
                    turn: '0',
                    river: '0',
                    status: '',
                    progressMarker: getRandomInt(11, 99),
                    progress: 0
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }
    }

    async updateAllPlayersTable(tableCode: string, listPlayers: IPlayer[], position?: string): Promise<void> {
        const tableRef = doc(this.db, 'tables', tableCode)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                let pos: string

                if (listPlayers.length === 2) {
                    pos = 'SB'
                } else if (listPlayers.length === 3) {
                    pos = 'D'
                } else {
                    pos = 'UTG'
                }


                await updateDoc(tableRef, {
                    position: position || pos,
                    players: listPlayers
                })

            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }
    }

    async updatePlayerTable(tableCode: string, playerEmail: string, player: IPlayer): Promise<any> {
        const tableRef = doc(this.db, 'tables', tableCode)

        try {

            const tableSnapshot = await getDoc(tableRef)

            if (tableSnapshot.exists()) {

                const tableData = tableSnapshot.data()
                const playerIndex = tableData.players.findIndex((player: any) => player.email === playerEmail)

                if (playerIndex !== -1) {

                    tableData.players[playerIndex] = {
                        ...tableData.players[playerIndex],
                        ...player
                    }

                    await updateDoc(tableRef, {
                        players: tableData.players
                    })


                    return tableData
                } else {
                    this.addPlayer({ ...player }, tableCode)
                }
            } else {
                console.error('Tabela não encontrada com o código especificado.')
            }
        } catch (error) {
            throw error
        }
    }

    async getPlayer(email: string): Promise<any> {

        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${this.url}/players.json?orderBy="email"&equalTo="${email}"`
        }

        return axios(config)
    }

    async addPlayer(player: IPlayer, code: string): Promise<void> {
        try {

            const ordemRef = doc(this.db, "tables", code)

            console.log(player, code)

            await updateDoc(ordemRef, {
                players: arrayUnion({ ...player })
            })

        } catch (err) {
            throw err
        }
    }

    async getTable(code: string, lord?: string): Promise<ITable> {
        try {
            const refCliente = collection(this.db, "tables")
            let queryTables: any

            if (lord) {
                queryTables = query(refCliente, where('lord', '==', lord), where('code', '==', code))
            } else {
                queryTables = query(refCliente, where('code', '==', code))
            }

            const querySnapshot = await getDocs(queryTables)

            let resultados: any = null

            querySnapshot.forEach((doc) => {
                const data = doc.data()
                resultados = data
            })

            return resultados

        } catch (err) {

            throw err
        }
    }

    async addTable(table: ITable): Promise<void> {
        try {
            const refCacamba = collection(this.db, "tables")
            const docRef = doc(refCacamba, table.code)
            await setDoc(docRef, table)
        } catch (err) {

            throw new Error('Problemas ao atualizar salvar caçamba')
        }
    }

}