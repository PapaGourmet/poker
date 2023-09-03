import { useState } from 'react'
import HandScreen from './hands/hand'
import '../../index.css'
import CardGamer from './cards/cardgamer'
import TableScreen from './tables/table'


import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useLocation } from 'react-router-dom'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where, } from "firebase/firestore"
import dbDatabaseFirestore from '../../database-config'
import ProgressComponent from './progress/progress'


const GameScreen: React.FC = () => {

  const location = useLocation<any>()
  const searchParams = new URLSearchParams(location.search)
  const code = searchParams.get('code') || ""
  const lord = searchParams.get('lord')
  const email = searchParams.get('email')
  const [shuffleds, setSuffleds] = useState<number[]>([])


  const q = query(
    collection(dbDatabaseFirestore, "tables"),
    where("code", "==", code)
  )

  const [data] = useCollection(q,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  if (data) {
    const response: any = data.docs.map(doc => doc.data())[0]

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
                  {response.players[0] && <td className="border px-4 py-2">
                    <div className={`flex flex-col items-center justify-center  ${response.players[0].active ? 'border-2 p-6 border-red-700' : 'border-0'}`}>
                      <CardGamer
                        name={response.players[0].name}
                        stack={response.players[0].stack}
                        position={response.players[0].position}
                        avatar={response.players[0].picture}
                        bet={response.players[0].bet}
                        card1={response.players[0].card1}
                        card2={response.players[0].card2}
                        active={email === response.players[0].email}
                      />
                      <ProgressComponent active={response.players[0].active} code={code} time={response.progress} players={response.players} progressMarker={response.progressMarker} />
                    </div>
                  </td>}


                  {response.players[1] && <td className="border px-4 py-2">
                    <div className={`flex flex-col items-center justify-center  ${response.players[1].active ? 'border-2 p-6 border-red-700' : 'border-0'}`}>
                      <CardGamer name={response.players[1].name}
                        stack={response.players[1].stack}
                        position={response.players[1].position}
                        avatar={response.players[1].picture}
                        bet={response.players[1].bet}
                        card1={response.players[1].card1}
                        card2={response.players[1].card2}
                        active={email === response.players[1].email}
                      />
                      <ProgressComponent active={response.players[1].active} code={code} time={response.progress} players={response.players} progressMarker={response.progressMarker} />
                    </div>

                  </td>}
                </tr>

                <tr>
                  {response.players[2] && <td className="border px-4 py-2">
                    <div className={`flex items-center justify-center  ${response.players[2].active ? 'border-2 p-6 border-red-700' : 'border-0'}`}>
                      <CardGamer name={response.players[2].name}
                        stack={response.players[2].stack}
                        position={response.players[2].position}
                        avatar={response.players[2].picture}
                        bet={response.players[2].bet}
                        card1={response.players[2].card1}
                        card2={response.players[2].card2}
                        active={email === response.players[2].email}
                      />

                    </div>
                  </td>}

                  {response.players[3] && <td className="border px-4 py-2">
                    <div className={`flex items-center justify-center  ${response.players[3].active ? 'border-2 p-6 border-red-700' : 'border-0'}`}>
                      <CardGamer
                        name={response.players[3].name}
                        stack={response.players[3].stack}
                        position={response.players[3].position}
                        avatar={response.players[3].picture}
                        bet={response.players[3].bet}
                        card1={response.players[3].card1}
                        card2={response.players[3].card2}
                        active={email === response.players[3].email}
                      />
                    </div>
                  </td>}
                </tr>

                <tr>
                  {response.players[4] && <td className="border px-4 py-2">
                    <div className={`flex items-center justify-center  ${response.players[4].active ? 'border-2 p-6 border-red-700' : 'border-0'}`}>
                      <CardGamer
                        name={response.players[4].name}
                        stack={response.players[4].name.stack}
                        position={response.players[4].position}
                        avatar={response.players[4].picture}
                        bet={response.players[4].bet}
                        active={email === response.players[4].email}
                      />
                    </div>
                  </td>}

                  {response.players[5] && <td className="border px-4 py-2">
                    <div className={`flex items-center justify-center  ${response.players[5].active ? 'border-2 p-6 border-red-700' : 'border-0'}`}>
                      <CardGamer
                        name={response.players[5].name}
                        stack={response.players[5].stack}
                        position={response.players[5].position}
                        avatar={response.players[5].picture}
                        bet={response.players[5].bet}
                        active={email === response.players[5].email}
                      />
                    </div>
                  </td>}
                </tr>

                <tr>
                  {response.players[6] && <td className="border px-4 py-2">
                    <div className={`flex items-center justify-center  ${response.players[6].active ? 'border-2 p-6 border-red-700' : 'border-0'}`}>
                      <CardGamer
                        name={response.players[6].name}
                        stack={response.players[6].stack}
                        position={response.players[6].position}
                        avatar={response.players[6].picture}
                        bet={response.players[6].bet}
                        active={email === response.players[6].email}
                      />
                    </div>
                  </td>}
                  {response.players[7] && <td className="border px-4 py-2">
                    <div className={`flex items-center justify-center  ${response.players[7].active ? 'border-2 p-6 border-red-700' : 'border-0'}`}>
                      <CardGamer
                        name={response.players[7].name}
                        stack={response.players[7].stack}
                        position={response.players[7].position}
                        avatar={response.players[7].picture}
                        bet={response.players[7].bet}
                        active={email === response.players[7].email}
                      />
                    </div>
                  </td>}
                </tr>

              </tbody>
            </table>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col items-center justify-center bg-green-900 h-2/3">
              <TableScreen code={code || ""} lord={lord || ""} setSuffleds={setSuffleds} />
            </div>
            <div className="h-1/3 text-white">
              <HandScreen cards={shuffleds} code={code || ""} />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (<></>)

}

export default GameScreen


