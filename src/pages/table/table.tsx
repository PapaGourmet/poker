import { useEffect, useRef, useState } from "react"
import { UtilService } from "../../ioc/iutil"
import { UtilApplicationService } from "../../ioc/util"


const _service = new UtilApplicationService()
const service = new UtilService(_service)

interface ITableProps {
    open?: string
}

interface IBordo {
    f1?: string,
    f2?: string,
    f3?: string,
    turn?: string,
    river?: string
}

const TableScreen: React.FC<ITableProps> = ({ open }) => {

    const [bordo, setBordo] = useState<IBordo>({})


    useEffect(() => {

        const run = async () => {

            const response = await service.getShuffleCards()
            const { data: { result } } = response
            const { random } = result

            let conter: number = 0

            const interval = setInterval(() => {

                if (conter === 0) {
                    setBordo({ ...bordo, f1: random.data[0] })
                } else if (conter === 1) {
                    setBordo({ ...bordo, f1: random.data[0], f2: random.data[1] })
                } else if (conter === 2) {
                    setBordo({ ...bordo, f1: random.data[0], f2: random.data[1], f3: random.data[2] })
                }


                conter++;

                if (conter === 3) {
                    clearInterval(interval)
                }

            }, 400)
        }
        run()

    }, [])

    return (<main>
        <div className="flex space-x-1">

            <img
                src={`${bordo.f1 ? bordo.f1 + '.png' : 'init.png'}`}
                alt="Imagem"
                width="100"
                height="200"
            />
            <img
                src={`${bordo.f2 ? bordo.f2 + '.png' : 'init.png'}`}
                alt="Imagem"
                width="100"
                height="200"
            />
            <img
                src={`${bordo.f3 ? bordo.f3 + '.png' : 'init.png'}`}
                alt="Imagem"
                width="100"
                height="200"
            />
            <img
                src="/init.png"
                alt="Imagem"
                width="100"
                height="200"
            />
            <img
                src="/init.png"
                alt="Imagem"
                width="100"
                height="200"
            />

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