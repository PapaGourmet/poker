import { Slider } from 'primereact/slider'
import { useState } from 'react'


const HandScreen: React.FC = () => {

    const [value, setValue] = useState<any>(20)


    const handleMovie = (e: any) => {
        setValue(e.value)
        console.log(e.value)
    }

    return (
        <main>

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
                        ></input>
                    </div>
                </div>


                {/* Segunda linha */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center justify-center">
                        <button
                            className='border h-20 w-40 rounded-lg text-2xl hover:bg-blue-100 hover:text-blue-600'
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
                </div>
            </div>


        </main>
    )
}

export default HandScreen