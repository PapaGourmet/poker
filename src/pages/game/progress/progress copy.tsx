import { useEffect, useState } from "react"
import { IPlayer } from "../../../interfaces/interfaces"
import { TableService } from "../../../ioc/itableservice"
import { UtilService } from "../../../ioc/iutil"
import { TableFirestoreService } from "../../../ioc/tablefirestoreservice"
import { UtilApplicationService } from "../../../ioc/util"
import { timer } from 'rxjs'
const _service = new TableFirestoreService()
const service = new TableService(_service)
const _utilService = new UtilApplicationService()
const utilService = new UtilService(_utilService)

interface ProgressComponentProps {
    active: boolean,
    code: string,
    time: number,
    players: IPlayer[]
}

const ProgressComponent: React.FC<ProgressComponentProps> = ({ active, code, time, players }) => {

    const [counter, setCounter] = useState(0)

    useEffect(() => {

        const s1 = timer(1000)
        const s2 = timer(2000)
        const s3 = timer(3000)
        const s4 = timer(4000)
        const s5 = timer(5000)
        const s6 = timer(6000)
        const s7 = timer(7000)
        const s8 = timer(8000)
        const s9 = timer(9000)
        const s10 = timer(10000)

        if (active) {
            setCounter(0)

            // s1.subscribe(async () => {
            //     await service.updateTimeTurnProgress(code, 1)
            // })

            let control = 0

            const interval = setInterval(() => {
                setCounter((pre) => pre + 1)

                if (counter > 3) {
                    clearInterval(interval)
                }
            }, 1000)

        }


        return () => {

        }


    }, [time])

    return (
        <main>
            {active && <div className={`${counter > 10 ? 0 : counter <= 5 ? 'bg-blue-600 h-2' : counter > 5 && time <= 8 ? 'bg-yellow-600' : 'bg-red-600'} h-2 `} style={{ width: `${counter > 10 ? 0 : counter * 1.5}rem` }}>

            </div>}
        </main>
    )
}

export default ProgressComponent