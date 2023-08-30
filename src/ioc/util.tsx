import { INaipes, IUser, IUtilService } from "./iutil";
import axios, { AxiosRequestConfig } from "axios"


export class UtilApplicationService implements IUtilService {
    async getShuffleCards(): Promise<any> {
        const config: AxiosRequestConfig = {
            url: `https://api.random.org/json-rpc/4/invoke `,
            method: 'post',
            data: {
                "jsonrpc": "2.0",
                "method": "generateIntegers",
                "params": {
                    "apiKey": "c1bf0457-5cf3-430c-9a10-b033d909d415",
                    "n": 52,
                    "min": 1,
                    "max": 52,
                    "replacement": false
                },
                "id": 3076
            }
        }

        try {
            const response = await axios(config)
            return response

        } catch (e) {
            throw e
        }
    }

    getNaipes(): INaipes[] {
        return [
            { "id": 1, "card": "Ás de paus" },
            { "id": 2, "card": "Dois de paus" },
            { "id": 3, "card": "Três de paus" },
            { "id": 4, "card": "Quatro de paus" },
            { "id": 5, "card": "Cinco de paus" },
            { "id": 6, "card": "Seis de paus" },
            { "id": 7, "card": "Sete de paus" },
            { "id": 8, "card": "Oito de paus" },
            { "id": 9, "card": "Nove de paus" },
            { "id": 10, "card": "Dez de paus" },
            { "id": 11, "card": "Valete de paus" },
            { "id": 12, "card": "Dama de paus" },
            { "id": 13, "card": "Rei de paus" },
            { "id": 14, "card": "Ás de Copas" },
            { "id": 15, "card": "Dois de Copas" },
            { "id": 16, "card": "Três de Copas" },
            { "id": 17, "card": "Quatro de Copas" },
            { "id": 18, "card": "Cinco de Copas" },
            { "id": 19, "card": "Seis de Copas" },
            { "id": 20, "card": "Sete de Copas" },
            { "id": 21, "card": "Oito de Copas" },
            { "id": 22, "card": "Nove de Copas" },
            { "id": 23, "card": "Dez de Copas" },
            { "id": 24, "card": "Valete de Copas" },
            { "id": 25, "card": "Dama de Copas" },
            { "id": 26, "card": "Rei de Copas" },
            { "id": 27, "card": "Ás de ouros" },
            { "id": 28, "card": "Dois de ouros" },
            { "id": 29, "card": "Três de ouros" },
            { "id": 30, "card": "Quatro de ouros" },
            { "id": 31, "card": "Cinco de ouros" },
            { "id": 32, "card": "Seis de ouros" },
            { "id": 33, "card": "Sete de ouros" },
            { "id": 34, "card": "Oito de ouros" },
            { "id": 35, "card": "Nove de ouros" },
            { "id": 36, "card": "Dez de ouros" },
            { "id": 37, "card": "Valete de ouros" },
            { "id": 38, "card": "Dama de ouros" },
            { "id": 39, "card": "Rei de ouros" },
            { "id": 40, "card": "Ás de Espadas" },
            { "id": 41, "card": "Dois de Espadas" },
            { "id": 42, "card": "Três de Espadas" },
            { "id": 43, "card": "Quatro de Espadas" },
            { "id": 44, "card": "Cinco de Espadas" },
            { "id": 45, "card": "Seis de Espadas" },
            { "id": 46, "card": "Sete de Espadas" },
            { "id": 47, "card": "Oito de Espadas" },
            { "id": 48, "card": "Nove de Espadas" },
            { "id": 49, "card": "Dez de Espadas" },
            { "id": 50, "card": "Valete de Espadas" },
            { "id": 51, "card": "Dama de Espadas" },
            { "id": 52, "card": "Rei de Espadas" }
        ]
    }

    changeUserrOrders(users: IUser[]): IUser[] {

        let orders = [
            'SM',
            'BB',
            'UTG',
            'HJ',
            'CO',
            'BT'
        ]

        let lastUser = users.pop()
        users.unshift(lastUser!)

        if (users.length < 6) {
            const diffLen = 6 - users.length
            console.log('diff', diffLen)
            orders.splice(2, diffLen)
            console.log(orders)
        }

        //@ts-ignore
        users.forEach((a, b, c) => {

            console.log(b)
            if (b <= 1) {
                a['order'] = orders[b]
                console.log(orders[b])
            } else if ((c.length - 1) - b < 3) {
                const diff = (c.length - 1) - b
                a['order'] = orders[orders.length - 1 - diff]
                console.log(orders[orders.length - 1 - diff])
            } else if (b === 2) {
                a['order'] = orders[2]
                console.log(orders[2])
            } else {
                a['order'] = `UTG+${b - 2}`
                console.log(`UTG+${b - 2}`)
            }
        })

        return users
    }
}