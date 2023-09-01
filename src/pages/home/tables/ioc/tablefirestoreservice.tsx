import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import dbDatabaseFirestore from "../../../../database-config"



import { ITable } from "../../../../interfaces/interfaces";
import { ITableService } from "./itableservice";

export class TableFirestoreService implements ITableService {
    private db = dbDatabaseFirestore

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