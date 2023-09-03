import { Slider } from 'primereact/slider'
import { useRef, useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where, } from "firebase/firestore"
import dbDatabaseFirestore from '../../../database-config'
import { IPlayer } from '../../../interfaces/interfaces'


interface HandScreenProps {
    cards: number[],
    code: string
}

const HandScreen: React.FC<HandScreenProps> = ({ cards, code }) => {

    const [blinds, setBlinds] = useState<any>(20)
    const refInput = useRef<HTMLInputElement>()
    const [email] = useState(localStorage.getItem('email') || '')




    const handleMovie = (e: any) => {
        setBlinds(e.value)
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
        const activePlayer: IPlayer = listPlayers.filter((x: IPlayer) => x.email === email)[0]



        if (activePlayer) {

            const { active } = activePlayer

            return (

                <main className={`h-full ${active ? 'bg-slate-800' : 'bg-black'}`}>
                    <div className="grid grid-cols-1 grid-rows-2 gap-4">
                        {active && <div className='flex flex-col'>

                            <div className='text-center mb-4 mt-4 text-2xl'>
                                <p>APOSTA</p>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="card flex justify-content-center">
                                    <Slider value={blinds}
                                        className="w-[30rem]" step={10} max={activePlayer.stack}
                                        onChange={(e) => {
                                            refInput.current!.value = String(e.value)
                                            handleMovie(e)
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className='flex flex-grow w-full pad-x-2 mt-4 mx-8'>
                                    <input
                                        className='h-10 rounded-lg w-5/6 text-red-700 text-center text-3xl'
                                        step={10}
                                        type={'number'}
                                        min={0}
                                        max={activePlayer.stack}
                                        //@ts-ignore
                                        ref={refInput}
                                        onChange={(event) => {
                                            const { value } = event.target
                                            setBlinds(value)
                                        }
                                        }
                                    ></input>

                                    <div className="flex items-center justify-center w-1/6">
                                        <button
                                            className='border w-full h-10 rounded-lg text-1xl hover:bg-blue-100 hover:text-blue-600'
                                        >apostar</button>
                                    </div>


                                </div>

                            </div>
                        </div>}


                        {active && <div className="grid grid-cols-3 gap-4">

                            <div className="flex items-center justify-center">
                                <button
                                    className='border h-20 w-40 rounded-lg text-2xl hover:bg-blue-100 hover:text-blue-600'
                                >desistir</button>
                            </div>

                            <div className="flex items-center justify-center"></div>

                            <div className="flex items-center justify-center">
                                <button
                                    className='border h-20 w-40 rounded-lg text-2xl hover:bg-blue-100 hover:text-blue-600'
                                    onClick={() => console.log(cards)}
                                >passar</button>
                            </div>
                        </div>}
                    </div>


                </main>
            )
        }
    }
    return (
        <></>
    )
}

export default HandScreen