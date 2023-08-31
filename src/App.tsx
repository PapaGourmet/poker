import { useEffect, useState } from 'react'
import HandScreen from './hands/hand'
import './index.css'
import { IUser, UtilService } from './ioc/iutil'
import { UtilApplicationService } from './ioc/util'
import CardGamer from './pages/players/cardgamer'
import TableScreen from './pages//table/table'
const _service = new UtilApplicationService()
const service = new UtilService(_service)
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

const groupUsers: IUser[] = [
  {
    name: 'Jogador 1',
    stack: 100,
  },
  {
    name: 'Jogador 2',
    stack: 200,
  },
  {
    name: 'Jogador 3',
    stack: 200,
  },
  {
    name: 'Jogador 4',
    stack: 100,
  },
  {
    name: 'Jogador 5',
    stack: 200,
  },
  {
    name: 'Jogador 6',
    stack: 200,
  },

  {
    name: 'Jogador 7',
    stack: 200,
  },
  {
    name: 'Jogador 8',
    stack: 200,
  },

]

function App() {

  const [users, setUsers] = useState<IUser[]>(groupUsers)


  useEffect(() => {

    const response = service.changeUserrOrders(users)
    setUsers(response)

  }, [users])

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
                {users[0] && <td className="border px-4 py-2">
                  <div className='flex items-center justify-center'>
                    <CardGamer name={users[0].name} stack={users[0].stack} position={users[0].order} />
                  </div>
                </td>}


                {users[1] && <td className="border px-4 py-2">
                  <div className='flex items-center justify-center'>
                    <CardGamer name={users[1].name} stack={users[1].stack} position={users[1].order} />
                  </div>
                </td>}
              </tr>

              <tr>
                {users[2] && <td className="border px-4 py-2">
                  <div className='flex items-center justify-center'>
                    <CardGamer name={users[2].name} stack={users[2].stack} position={users[2].order} />
                  </div>
                </td>}

                {users[3] && <td className="border px-4 py-2">
                  <div className='flex items-center justify-center'>
                    <CardGamer name={users[3].name} stack={users[3].stack} position={users[3].order} />
                  </div>
                </td>}
              </tr>

              <tr>
                {users[4] && <td className="border px-4 py-2">
                  <div className='flex items-center justify-center'>
                    <CardGamer name={users[4].name} stack={users[4].stack} position={users[4].order} />
                  </div>
                </td>}

                {users[5] && <td className="border px-4 py-2">
                  <div className='flex items-center justify-center'>
                    <CardGamer name={users[5].name} stack={users[5].stack} position={users[5].order} />
                  </div>
                </td>}
              </tr>

              <tr>
                {users[6] && <td className="border px-4 py-2">
                  <div className='flex items-center justify-center'>
                    <CardGamer name={users[6].name} stack={users[6].stack} position={users[6].order} />
                  </div>
                </td>}
                {users[7] && <td className="border px-4 py-2">
                  <div className='flex items-center justify-center'>
                    <CardGamer name={users[7].name} stack={users[7].stack} position={users[7].order} />
                  </div>
                </td>}
              </tr>

            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <div className="flex flex-col items-center justify-center bg-green-900 h-2/3">
            <TableScreen />
          </div>
          <div className="h-1/3 text-white">
            <HandScreen />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App


