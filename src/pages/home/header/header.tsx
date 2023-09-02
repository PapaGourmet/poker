import { useNavigate } from "react-router-dom"

const HeaderScreen: React.FC = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate('/login')
    }

    return (
        <main className="w-full">
            <div className="flex flex-grow w-full h-32 bg-green-700">
                <div className="w-1/6 h-full flex items-center justify-center">
                    <img
                        src="/LOGO.png"
                        alt="Imagem"
                        width="110"
                        height="90"
                    />
                </div>
                <div className="w-4/6 h-full flex items-center justify-center">
                    <h1 className="text-[2rem] text-white">Game's Hub</h1>
                </div>
                <div className="w-1/6 h-full flex flex-col items-center justify-center">
                    <p className="text-2xl text-blue-300 hover:text-blue-50" onClick={handleLogout}>logout</p>
                    <p className="text-blue-900 hover:text-blue-50">{localStorage.getItem('email') || ""}</p>
                </div>

            </div>
        </main>
    )
}

export default HeaderScreen