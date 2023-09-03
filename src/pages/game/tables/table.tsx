import { UtilService } from "../../../ioc/iutil"
import { UtilApplicationService } from "../../../ioc/util"
import { TableService } from "../../../ioc/itableservice"
import { ITable, IPlayer } from '../../../interfaces/interfaces'
import { TableFirestoreService } from "../../../ioc/tablefirestoreservice"
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where, } from "firebase/firestore"
import dbDatabaseFirestore from '../../../database-config'
import { useState } from "react"
const _service = new TableFirestoreService()
const _utilService = new UtilApplicationService()
const utilService = new UtilService(_utilService)
const service = new TableService(_service)

interface ITableProps {
    lord: string,
    code: string,
    setSuffleds: React.Dispatch<React.SetStateAction<number[]>>,
}

const TableScreen: React.FC<ITableProps> = ({ lord, code, setSuffleds }) => {
    const [email] = useState(localStorage.getItem('email') || '')

    const q = query(
        collection(dbDatabaseFirestore, "tables"),
        where("code", "==", code)
    )

    const [data] = useCollection(q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    const handleCurrentPlayer = async (table: ITable) => {

        const position = table.position

        const IndexSB = table.players.findIndex((x: IPlayer) => x.position === 'SB')
        table.players[IndexSB].stack = table.players[IndexSB].stack - 10
        table.players[IndexSB].bet = 10

        if (position === 'SB') {
            table.players[IndexSB].active = true
        } else {
            const IndexCurrentPlayer = table.players.findIndex((x: IPlayer) => x.position === position)
            table.players[IndexCurrentPlayer].active = true
        }


        table.players.forEach((x: IPlayer) => {
            if (x.position !== position) {
                x.active = false
            }
        })

        const IndexBB = table.players.findIndex((x: IPlayer) => x.position === 'BB')
        table.players[IndexBB].stack = table.players[IndexSB].stack - 20
        table.players[IndexBB].bet = 20

        await service.updateAllPlayersTable(table.code, table.players, position)

    }

    const dealCards = async () => {
        await service.updateFlopInit(code)
        const response = await utilService.getShuffleCards()
        const { data: { result } } = response
        const { random } = result

        setSuffleds(random.data)

        const tables = await service.getTable(lord, code)
        const { players } = tables

        for (let player of players) {
            player.card1 = '0'
            player.card2 = '0'
            player.active = false
            console.log(player)
        }

        await service.updateAllPlayersTable(code, players)

        const playersChangeOrders = utilService.changeUserOrders(players)

        await service.updateTableDeck(code, random.data)

        const len = playersChangeOrders.length

        let position;

        if (len === 2) {
            position = 'SB'
        } else if (len === 3) {
            position = 'D'
        } else {
            position = 'UTG'
        }


        for (const [i, player] of players.entries()) {
            player.card1 = random.data[i]
        }

        for (const [i, player] of players.entries()) {
            player.card2 = random.data[i + len]
        }

        await service.updateAllPlayersTable(code, players, position)

        handleCurrentPlayer(tables)

    }

    const runFlop = async () => {

        const responseDeck = await service.getTable(code)
        const { deck } = responseDeck

        setTimeout(async () => {
            await service.updateF1(code, String(deck[16]))
        }, 500)

        setTimeout(async () => {
            await service.updateF2(code, String(deck[17]))
        }, 1000)

        setTimeout(async () => {
            await service.updateF3(code, String(deck[18]))
        }, 1500)

    }

    const runTurn = async () => {

        const responseDeck = await service.getTable(code)
        const { deck } = responseDeck

        setTimeout(async () => {
            await service.updateTurn(code, String(deck[21]))
        }, 500)

    }

    const runRiver = async () => {

        const responseDeck = await service.getTable(code)
        const { deck } = responseDeck

        setTimeout(async () => {
            await service.updateRiver(code, String(deck[24]))
        }, 500)

    }

    if (data) {
        const response: any = data.docs.map(doc => doc.data())[0]
        const { f1, f2, f3, turn, river } = response
        const listPlayers = response.players
        const activePlayer: IPlayer = listPlayers.filter((x: IPlayer) => x.email === email)[0]

        if (activePlayer) {

            return (<main>


                <div className="flex flex-col">
                    <div className="flex flex-grow items-center justify-center">
                        <button
                            className="text-center border w-28 p-4 mb-6 rounded-lg hover:bg-green-300"
                            onClick={() => dealCards()}
                        >GO</button>

                        <button
                            className="text-center border w-28 p-4 mb-6 rounded-lg hover:bg-green-300"
                            onClick={() => runFlop()}
                        >FLOP</button>

                        <button
                            className="text-center border w-28 p-4 mb-6 rounded-lg hover:bg-green-300"
                            onClick={() => runTurn()}
                        >TURN</button>

                        <button
                            className="text-center border w-28 p-4 mb-6 rounded-lg hover:bg-green-300"
                            onClick={() => runRiver()}
                        >RIVER</button>
                    </div>

                    <div className="flex  space-x-1">
                        <img
                            src={`${f1}.png`}
                            alt="Imagem"
                            width="100"
                            height="200"
                        />
                        <img
                            src={`${f2}.png`}
                            alt="Imagem"
                            width="100"
                            height="200"
                        />
                        <img
                            src={`${f3}.png`}
                            alt="Imagem"
                            width="100"
                            height="200"
                        />
                        <img
                            src={`${turn}.png`}
                            alt="Imagem"
                            width="100"
                            height="200"
                        />
                        <img
                            src={`${river}.png`}
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
    }


    return (<></>)

}

export default TableScreen