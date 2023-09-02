import { useRef, useState } from 'react'
import HandScreen from './hands/hand'
import '../../index.css'
import CardGamer from '../players/cardgamer'
import TableScreen from './table/table'


import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useLocation } from 'react-router-dom'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where, } from "firebase/firestore"
import dbDatabaseFirestore from '../../database-config'
import { IPlayer } from '../../interfaces/interfaces'


const GameScreen: React.FC = () => {

  const location = useLocation<any>()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code')
  const lord = searchParams.get('lord')
  const email = searchParams.get('email')
  const ref = useRef<any>()
  const player = useRef<IPlayer>()
  const [status, setStatus] = useState(searchParams.get('status') || "")
  const [shuffleds, setSuffleds] = useState<number[]>([])


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
    const response: any = data.docs.map(doc => doc.data())
    ref.current = response[0].players
    player.current = ref.current.filter((x: IPlayer) => x.email === email)[0]
    console.log(player.current)

    return (
      <main className='bg-black'>

        <div className="flex h-screen">
          <div className="w-1/2 h-full">
            <table className="table-auto h-screen w-full">
              <thead>
                <tr className='h-1/2'>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {response[0].players[0] && <td className="border px-4 py-2">
                    <div className='flex items-center justify-center'>
                      <CardGamer
                        name={response[0].players[0].name}
                        stack={response[0].players[0].stack}
                        position={response[0].players[0].position}
                        avatar={response[0].players[0].picture}
                        bet={response[0].players[0].bet}
                        card1={response[0].players[0].card1}
                        card2={response[0].players[0].card2}
                        email={response[0].players[0].email}
                      />

                    </div>
                  </td>}


                  {response[0].players[1] && <td className="border px-4 py-2">
                    <div className='flex items-center justify-center'>
                      <CardGamer name={response[0].players[1].name}
                        stack={response[0].players[1].stack}
                        position={response[0].players[1].position}
                        avatar={response[0].players[1].picture}
                        bet={response[0].players[1].bet}
                        card1={response[0].players[1].card1}
                        card2={response[0].players[1].card2}
                        email={response[0].players[1].email}
                      />

                    </div>
                  </td>}
                </tr>

                <tr>
                  {response[0].players[2] && <td className="border px-4 py-2">
                    <div className='flex items-center justify-center'>
                      <CardGamer name={response[0].players[2].name}
                        stack={response[0].players[2].stack}
                        position={response[0].players[2].position}
                        avatar={response[0].players[2].picture}
                        bet={response[0].players[2].bet}
                        card1={response[0].players[2].card1}
                        card2={response[0].players[2].card2}
                        email={response[0].players[2].email}
                      />

                    </div>
                  </td>}

                  {response[0].players[3] && <td className="border px-4 py-2">
                    <div className='flex items-center justify-center'>
                      <CardGamer
                        name={response[0].players[3].name}
                        stack={response[0].players[3].stack}
                        position={response[0].players[3].position}
                        avatar={response[0].players[3].picture}
                        bet={response[0].players[3].bet}
                        card1={response[0].players[3].card1}
                        card2={response[0].players[3].card2}
                        email={response[0].players[3].email}
                      />
                    </div>
                  </td>}
                </tr>

                <tr>
                  {response[0].players[4] && <td className="border px-4 py-2">
                    <div className='flex items-center justify-center'>
                      <CardGamer
                        name={response[0].players[4].name}
                        stack={response[0].players[4].name.stack}
                        position={response[0].players[4].position}
                        avatar={response[0].players[4].picture}
                        bet={response[0].players[4].bet}
                        email={response[0].players[4].email}
                      />
                    </div>
                  </td>}

                  {response[0].players[5] && <td className="border px-4 py-2">
                    <div className='flex items-center justify-center'>
                      <CardGamer
                        name={response[0].players[5].name}
                        stack={response[0].players[5].stack}
                        position={response[0].players[5].position}
                        avatar={response[0].players[5].picture}
                        bet={response[0].players[5].bet}
                        email={response[0].players[5].email}
                      />
                    </div>
                  </td>}
                </tr>

                <tr>
                  {response[0].players[6] && <td className="border px-4 py-2">
                    <div className='flex items-center justify-center'>
                      <CardGamer
                        name={response[0].players[6].name}
                        stack={response[0].players[6].stack}
                        position={response[0].players[6].position}
                        avatar={response[0].players[6].picture}
                        bet={response[0].players[6].bet}
                        email={response[0].players[6].email}
                      />
                    </div>
                  </td>}
                  {response[0].players[7] && <td className="border px-4 py-2">
                    <div className='flex items-center justify-center'>
                      <CardGamer
                        name={response[0].players[7].name}
                        stack={response[0].players[7].stack}
                        position={response[0].players[7].position}
                        avatar={response[0].players[7].picture}
                        bet={response[0].players[7].bet}
                        email={response[0].players[7].email}
                      />
                    </div>
                  </td>}
                </tr>

              </tbody>
            </table>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col items-center justify-center bg-green-900 h-2/3">
              <TableScreen status={status} code={code || ""} lord={lord || ""} setSuffleds={setSuffleds} />
            </div>
            <div className="h-1/3 text-white">
              <HandScreen cards={shuffleds} code={code || ""} player={player} />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (<></>)


}

export default GameScreen


