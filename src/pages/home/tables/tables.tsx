const TableScreen: React.FC = () => {
    return (
        <div className="flex flex-row w-full h-[75vh] gap-2">
            <div className="flex flex-col items-center w-1/5 bg-green-500 h-full">
                <button
                    className="w-40 mt-8 border bg-white p-4 rounded-lg hover:bg-blue-300 text-red-800 text-lg text-center"
                >
                    criar mesa
                </button>

                <label htmlFor="codigo" className="mt-4 text-white font-bold">código da mesa</label>

                <input
                    className="w-40 border h-8 p-4"
                    id="codigo"
                >

                </input>
            </div>

            <div className="w-4/5 bg-green-500 h-full">
                <div className="w-full">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border">ID</th>
                                <th className="py-2 px-4 border">Código</th>
                                <th className="py-2 px-4 border">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-white">
                                <td className="py-2 px-4 border">1</td>
                                <td className="py-2 px-4 border">ABC123</td>
                                <td className="py-2 px-4 border">Editar</td>
                            </tr>
                            <tr className="bg-gray-100">
                                <td className="py-2 px-4 border">2</td>
                                <td className="py-2 px-4 border">DEF456</td>
                                <td className="py-2 px-4 border">Excluir</td>
                            </tr>
                            {/* Adicione mais linhas conforme necessário */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TableScreen