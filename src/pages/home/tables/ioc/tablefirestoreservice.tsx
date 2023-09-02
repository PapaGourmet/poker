import axios, { AxiosRequestConfig } from "axios";
import { arrayUnion, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import dbDatabaseFirestore from "../../../../database-config"

import { IPlayer, ITable } from "../../../../interfaces/interfaces";
import { ITableService } from "./itableservice";

export class TableFirestoreService implements ITableService {
    private db = dbDatabaseFirestore
    private url = 'https://pocker-club-default-rtdb.firebaseio.com'

    async updateAllPlayersTable(tableCode: string, listPlayers: IPlayer[]): Promise<void> {
        const tableRef = doc(this.db, 'tables', tableCode);

        try {

            const tableSnapshot = await getDoc(tableRef);

            if (tableSnapshot.exists()) {

                await updateDoc(tableRef, {
                    players: listPlayers
                });

            } else {
                console.error('Tabela não encontrada com o código especificado.');
            }
        } catch (error) {
            throw error
        }
    }

    async updatePlayerTable(tableCode: string, playerEmail: string, player: IPlayer): Promise<any> {
        const tableRef = doc(this.db, 'tables', tableCode);

        try {
            // Recupere o documento da coleção Firestore
            const tableSnapshot = await getDoc(tableRef);

            if (tableSnapshot.exists()) {
                // Obtenha os dados do documento
                const tableData = tableSnapshot.data();

                // Encontre o índice do jogador no array com base no email
                const playerIndex = tableData.players.findIndex((player: any) => player.email === playerEmail);

                if (playerIndex !== -1) {

                    // Atualize os atributos do jogador específico
                    tableData.players[playerIndex] = {
                        ...tableData.players[playerIndex], // Mantenha os dados existentes
                        ...player // Atualize com os novos dados
                    };

                    // Atualize o documento no Firestore com o array modificado
                    await updateDoc(tableRef, {
                        players: tableData.players
                    });


                    return tableData
                } else {
                    this.addPlayer(player, tableCode)
                }
            } else {
                console.error('Tabela não encontrada com o código especificado.');
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

    async getTable(lord: string, code: string): Promise<ITable> {
        try {
            const refCliente = collection(this.db, "tables")
            const queryTables = query(refCliente, where('lord', '==', lord), where('code', '==', code))
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