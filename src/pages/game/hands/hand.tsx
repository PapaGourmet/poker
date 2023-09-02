import { Slider } from 'primereact/slider'
import { MutableRefObject, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where, } from "firebase/firestore"
import dbDatabaseFirestore from '../../../database-config'
import { IPlayer } from '../../../interfaces/interfaces'


interface HandScreenProps {
    cards: number[],
    code: string,
    player: MutableRefObject<IPlayer | undefined>
}

const HandScreen: React.FC<HandScreenProps> = ({ cards, code, player }) => {

    const [value, setValue] = useState<any>(20)


    const handleMovie = (e: any) => {
        setValue(e.value)
        console.log(e.value)
    }

    const q = query(
        collection(dbDatabaseFirestore, "tables"),
        where("code", "==", code)
    )

    const [data, loading, error] = useCollection(q,
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    if (data) {
        const response: any = data.docs.map(doc => doc.data())[0]
        const listPlayers = response.players
        const activePlayer: IPlayer = listPlayers.filter((x: IPlayer) => x.email === player.current?.email)[0]
        const { active } = activePlayer

        return (

            <main className={`h-full ${active ? 'bg-slate-800' : 'bg-black'}`}>
                <div className="grid grid-cols-1 grid-rows-2 gap-4">
                    <div className='flex flex-col'>

                        <div className='text-center mb-4 mt-4 text-2xl'>
                            <p>APOSTA</p>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="card flex justify-content-center">
                                <Slider value={value} onChange={(e) => handleMovie(e)} className="w-[30rem]" step={10} max={40000} />
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <input
                                value={value}
                                className='h-10 rounded-lg w-64 text-red-700 text-center text-3xl mt-4'
                                type={'number'}
                                min={0}
                                max={5000}
                                onChange={() => { }
                                }
                            ></input>
                        </div>
                    </div>


                    {active && <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-center justify-center">
                            <button
                                className='border h-20 w-40 rounded-lg text-2xl hover:bg-blue-100 hover:text-blue-600'
                                onClick={() => console.log(cards)}
                            >passar</button>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                className='border h-20 w-40 rounded-lg text-2xl hover:bg-blue-100 hover:text-blue-600'
                            >apostar</button>
                        </div>

                        <div className="flex items-center justify-center">
                            <button
                                className='border h-20 w-40 rounded-lg text-2xl hover:bg-blue-100 hover:text-blue-600'
                            >desistir</button>
                        </div>
                    </div>}
                </div>


            </main>
        )

    }


    return (
        <></>
    )
}

export default HandScreen