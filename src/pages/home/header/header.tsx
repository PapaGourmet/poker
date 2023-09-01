const HeaderScreen: React.FC = () => {
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

            </div>
        </main>
    )
}

export default HeaderScreen