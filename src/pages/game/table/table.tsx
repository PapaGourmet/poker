import { MutableRefObject, useEffect, useState } from "react"
import { IPlayer } from "../../../interfaces/interfaces"
import { UtilService } from "../../../ioc/iutil"
import { UtilApplicationService } from "../../../ioc/util"
import { TableService } from "../../home/tables/ioc/itableservice"
import { TableFirestoreService } from "../../home/tables/ioc/tablefirestoreservice"
const _service = new TableFirestoreService()
const _utilService = new UtilApplicationService()
const utilService = new UtilService(_utilService)
const service = new TableService(_service)

interface ITableProps {
    status: string,
    lord: string,
    code: string,
    setSuffleds: React.Dispatch<React.SetStateAction<number[]>>,

}

interface IBordo {
    f1?: string,
    f2?: string,
    f3?: string,
    turn?: string,
    river?: string
}

const TableScreen: React.FC<ITableProps> = ({ status, lord, code, setSuffleds }) => {

    const [bordo, setBordo] = useState<IBordo>({})

    useEffect(() => {

    }, [status])

    const runFlop = async () => {

        const response = await utilService.getShuffleCards()
        const { data: { result } } = response
        const { random } = result
        setSuffleds(random.data)

        const tables = await service.getTable(lord, code)
        const { players } = tables
        const playersChangeOrders = utilService.changeUserOrders(players)
        await service.updateAllPlayersTable(code || "", playersChangeOrders)

        const aux = []

        for (const [i, player] of players.entries()) {
            const obj = { ...player, card1: random.data[i], card2: random.data[i + 2] }
            aux.push(obj)
        }

        await service.updateAllPlayersTable(code, aux)
        setBordo({ ...bordo, f1: random.data[16], f2: random.data[17], f3: random.data[18] })

    }


    return (<main>


        <div className="flex flex-col">
            <div className="flex items-center justify-center">
                <button
                    className="text-center border w-40 p-4 mb-6 rounded-lg hover:bg-green-300"
                    onClick={() => runFlop()}
                >INICIAR JOGO</button>
            </div>

            <div className="flex  space-x-1">
                <img
                    src={`${bordo.f1 ? bordo.f1 + '.png' : '0.png'}`}
                    alt="Imagem"
                    width="100"
                    height="200"
                />
                <img
                    src={`${bordo.f2 ? bordo.f2 + '.png' : '0.png'}`}
                    alt="Imagem"
                    width="100"
                    height="200"
                />
                <img
                    src={`${bordo.f3 ? bordo.f3 + '.png' : '0.png'}`}
                    alt="Imagem"
                    width="100"
                    height="200"
                />
                <img
                    src="/0.png"
                    alt="Imagem"
                    width="100"
                    height="200"
                />
                <img
                    src="/0.png"
                    alt="Imagem"
                    width="100"
                    height="200"
                />

            </div>

        </div>

        <div className='border border-10 p-2 mt-5 w-full rounded-lg text-center text-white font-bold text-2xl'>
            <h1>POTE</h1>
        </div>

        <div className='border border-10 p-2 mt-1 w-full rounded-lg text-center text-white font-bold text-2xl'>
            <h1>100</h1>
        </div>
    </main>)
}

export default TableScreen