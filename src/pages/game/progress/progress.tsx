import { useEffect } from "react"
import { IPlayer } from "../../../interfaces/interfaces"
import { TableService } from "../../../ioc/itableservice"
import { TableFirestoreService } from "../../../ioc/tablefirestoreservice"
import { timer } from 'rxjs'
const _service = new TableFirestoreService()
const service = new TableService(_service)

interface ProgressComponentProps {
    active: boolean,
    code: string,
    time: number,
    players: IPlayer[]
    progressMarker: number
}

const ProgressComponent: React.FC<ProgressComponentProps> = ({ active, code, time, progressMarker }) => {

    // const [counter, setCounter] = useState(0)

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

        console.log(progressMarker)

        if (active) {

            s1.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 1)
            })

            s2.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 2)
            })

            s3.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 3)
            })

            s4.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 4)
            })

            s5.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 5)
            })

            s6.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 6)
            })

            s7.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 7)
            })

            s8.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 8)
            })

            s9.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 9)
            })

            s10.subscribe(async () => {
                await service.updateTimeTurnProgress(code, 10)
            })

        }


        return () => {

        }


    }, [progressMarker])

    return (
        <main>
            {active && <div className={`${time > 9 ? 0 : time <= 5 ? 'bg-blue-600 h-2' : time > 5 && time <= 8 ? 'bg-yellow-600' : 'bg-red-600'} h-2 `} style={{ width: `${time > 10 ? 0 : time * 1.5}rem` }}>

            </div>}
        </main>
    )
}

export default ProgressComponent