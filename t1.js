import axios from "axios"

const config = {
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

const objs = [1, 2, 3, 4]

objs.length

axios(config)
    .then(response => {
        const { data: { result } } = response
        const { random } = result
        console.log(random.data)
        for (let i = 0; i < random.data.length; i += 2) {
            console.log(i, i + 1)
        }
    })