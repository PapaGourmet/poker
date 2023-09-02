import { TableService } from "./ioc/itableservice"
import { TableFirestoreService } from "./ioc/tablefirestoreservice"
import { uid } from 'uid'
import { ITable } from "../../../interfaces/interfaces"
import TableComponent from "./components/tablecomponent"
import RegsiterZodSchema from "./zods/zodtableschema"
import { useEffect } from "react"


const _service = new TableFirestoreService()
const service = new TableService(_service)

const TableScreen: React.FC = () => {

    const { register, handleSubmit, reset, errors } = RegsiterZodSchema()

    const handleCreateTable = async (data: any) => {
        const { name } = data
        const code = uid(10)
        const _table: ITable = {
            name,
            code,
            lord: localStorage.getItem('lord') || "",
            players: [],
            status: ''
        }

        try {
            await service.addTable(_table)
            reset()

        } catch (e) {
            throw e
        }

    }


    return (
        <div className="flex flex-row w-full h-[75vh] gap-2">

            <form className="flex flex-col items-center w-1/5 bg-green-500 h-full" onSubmit={handleSubmit(handleCreateTable)}>
                <label htmlFor="codigo" className="mt-4 text-white font-bold">nome da mesa</label>

                <input
                    className="w-40 border h-8 p-4 outline-none rounded-lg text-center"
                    id="codigo"
                    {...register('name')}
                >
                </input>

                <div>
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>


                <button
                    className="w-40 mt-8 border bg-white p-4 rounded-lg hover:bg-blue-300 text-red-800 text-lg text-center"
                    type="submit"
                >
                    criar mesa
                </button>
            </form>

            <div className="w-4/5 bg-green-500 h-full">
                <div className="w-full">
                    <TableComponent />
                </div>
            </div>
        </div>
    )
}

export default TableScreen