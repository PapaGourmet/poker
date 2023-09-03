import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, } from "firebase/firestore"
import dbDatabaseFirestore from '../../../../database-config'
import Loading from '../../../../bundles/loading/loading'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useEffect, useState } from 'react'
import ModalEnterRoom from '../modals/modal-enter-room'
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { TableService } from '../../../../ioc/itableservice'
import { UtilApplicationService } from '../../../../ioc/util'
import { TableFirestoreService } from '../../../../ioc/tablefirestoreservice'
const _service = new TableFirestoreService()
const service = new TableService(_service)
const notify = (message: string) => toast(message,
    {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    }
)


const TableComponent: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [lord, setLord] = useState("")
    const [confirmCode, setConfirmCode] = useState<string | null>(null)
    const [statusCode, setStatusCode] = useState<boolean | undefined>(undefined)
    const navigate = useNavigate()


    useEffect(() => {

        const run = async () => {

            if (!statusCode && statusCode !== undefined) {
                notify(`Acesso negado`)
                setStatusCode(undefined)
            } else if (statusCode && statusCode !== undefined) {
                const EMAIL = localStorage.getItem('email') || ""


                service.getPlayer(EMAIL)
                    .then(async (response) => {
                        const { data } = response
                        const list = Object.keys(data)
                        const id = list[0]
                        const obj = data[id]

                        try {

                            service.getTable(confirmCode || "")
                                .then(async (response) => {
                                    const { players } = response

                                    for (let player of players) {
                                        player.card1 = '0'
                                        player.card2 = '0'
                                        player.active = false
                                        console.log(player)
                                    }

                                    await service.updateAllPlayersTable(confirmCode || "", players)
                                })

                                .catch(e => { throw e })

                            await service.updateFlopInit(confirmCode || "")
                            const table = await service.updatePlayerTable(confirmCode || "", EMAIL, obj)
                            const { status } = table

                            navigate(`/game?code=${confirmCode}&lord=${lord}&status=${status}&email=${EMAIL}`)
                        } catch (e) {
                            throw e
                        }

                    })
            }
        }

        run()

        return () => {
            setStatusCode(undefined)
        }

    }, [statusCode])


    const [data, loading, error] = useCollection(
        collection(dbDatabaseFirestore, "tables"),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    )

    if (loading) {
        <Loading />
    }

    if (error) {
        <h1>error</h1>
    }

    if (data) {
        const response = data.docs.map(doc => doc.data())

        return (
            <main>
                <ModalEnterRoom
                    HandleOpenModal={setIsOpen}
                    isOpen={isOpen}
                    lord={lord}
                    setStatusCode={setStatusCode}
                    setConfirmCode={setConfirmCode}
                />

                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border">Nome</th>
                            <th className="py-2 px-4 border">Código</th>
                            <th className="py-2 px-4 border">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((x: any) => (
                            <tr className="bg-white" key={x.name + 'c'}>
                                <td className="py-2 px-4 border" key={x.name}>{x.name}</td>
                                <td className="py-2 px-4 border">
                                    <div className='flex flex-row'>
                                        <input
                                            key={x.name + 'b'}
                                            className='outline-none'
                                            type={`${localStorage.getItem('lord') === x.lord ? "text" : "password"}`}
                                            value={x.code}
                                            onChange={() => { }}
                                        />
                                        {localStorage.getItem('lord') === x.lord && (
                                            <CopyToClipboard text={x.code.trim() || ""}>
                                                <p className="text-lime-500 hover:text-red-600 ml-10">copiar</p>
                                            </CopyToClipboard>
                                        )}
                                    </div>
                                </td>
                                <td className="py-2 px-4 border flex items-center justify-center">
                                    <p
                                        className='text-blue-400 hover:text-blue-100'
                                        onClick={() => {
                                            setIsOpen(true)
                                            setLord(x.lord)
                                        }}
                                    >
                                        entrar
                                    </p>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <ToastContainer />

            </main>

        )
    }

    return (<></>)
}


export default TableComponent