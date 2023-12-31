
interface ICardGamer {
    name: string,
    card1?: string,
    card2?: string,
    stack?: number,
    bet?: number,
    position?: string,
    avatar?: string,
    active: boolean
}

const CardGamer: React.FC<ICardGamer> = ({ name, card1, card2, bet, position, stack, avatar, active }) => {

    return (
        <main className=" flex items-center justify-center relative">

            <div className="z-30 flex flex-col">
                <div className="grid grid-cols-12 w-full">
                    <div className="col-span-3 flex items-center justify-center">
                        <div className="h-16 w-16">
                            <img
                                src={avatar}
                                alt="Imagem"
                                width="75"
                                height="150"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-black">
                    <div className="mt-2 w-full h-6 bg-blue-900 text-center rounded-lg text-white font-bold">
                        <p>{`${name} (${position}) (${stack})`}</p>
                    </div>

                    <div className="mt-2 border-4 rounded-lg text-center  text-white">
                        {`APOSTA ${bet}`}
                    </div>


                </div>


            </div>


            <div className="absolute top-[-1rem] left-20 w[4rem] z-0">
                {active && <div className="flex">

                    <img
                        src={card1 ? card1 + '.png' : '0.png'}
                        alt="Imagem"
                        width="75"
                        height="150"
                    />
                    <img
                        src={card2 ? card2 + '.png' : '0.png'}
                        alt="Imagem"
                        width="75"
                        height="150"
                    />
                </div>}

                {!active && <div className="flex">

                    <img
                        src={'versus.png'}
                        alt="Imagem"
                        width="75"
                        height="150"
                    />
                    <img
                        src={'versus.png'}
                        alt="Imagem"
                        width="75"
                        height="150"
                    />
                </div>}
            </div>
        </main >
    );
}

export default CardGamer