
import Modal from "react-modal"
import { TableService } from "../ioc/itableservice"
import { TableFirestoreService } from "../ioc/tablefirestoreservice"
import CodeZodSchema from "../zods/zodcodechema"
const _service = new TableFirestoreService()
const service = new TableService(_service)


interface ModalEnterRoomProps {
    HandleOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
    lord: string,
    setStatusCode: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    setConfirmCode: React.Dispatch<React.SetStateAction<string | null>>
}

const ModalEnterRoom: React.FC<ModalEnterRoomProps> = (
    {
        HandleOpenModal,
        isOpen,
        lord,
        setStatusCode,
        setConfirmCode
    }
) => {


    const { register, handleSubmit, reset, errors } = CodeZodSchema()


    const handleConfirm = async (data: any) => {
        const { confirmCode } = data

        try {

            const response = await service.getTable(lord, confirmCode)

            if (response) {
                setStatusCode(true)
                setConfirmCode(confirmCode)
                reset()
                HandleOpenModal(false)
                return
            } else {
                setStatusCode(false)
                reset()
                HandleOpenModal(false)
                return
            }


        } catch (e) {
            throw e
        }
    }

    const handleCancel = () => {
        HandleOpenModal(false)
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                ariaHideApp={false}
                className="flex w-full h-screen items-center justify-center bg-slate-500"
            >
                <form
                    className="flex flex-col"
                    onSubmit={handleSubmit(handleConfirm)}
                >
                    <p className="text-center text-white">Informe o código da mesa</p>

                    <input
                        className="w-full border h-8 p-4 outline-none text-center"
                        id="codigo"
                        {...register('confirmCode')}
                    >
                    </input>

                    <div>
                        {errors.confirmCode && <span className="text-red-100 text-center">{errors.confirmCode.message}</span>}
                    </div>


                    <div className="grid grid-cols-12 mt-6">
                        <div className="col-span-5">
                            <button
                                type="submit"
                                className="border-2 border-green-600 text-green-300 p-2 rounded-lg"
                                style={{
                                    width: "6rem"
                                }}
                            >entrar</button>
                        </div>
                        <div className="col-span-2"></div>
                        <div className="col-span-5">
                            <button
                                type="button"
                                className="border-2 border-red-600 text-red-600 p-2 rounded-xl"
                                style={{
                                    width: "6rem"
                                }}
                                onClick={handleCancel}
                            >cancelar</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>

    )
}

export default ModalEnterRoom