import axios, { AxiosRequestConfig } from "axios";
import { IPlayer, objectId } from "../../../interfaces/interfaces";
import { ILoginService } from "./iloginservice";

export class LoginRealTimeService implements ILoginService {

    async AddOrUpdateuser(player: IPlayer): Promise<void> {
        const data: objectId = {}
        const { sub, ...rest } = player
        data[player.sub] = rest

        const config: AxiosRequestConfig = {
            method: 'patch',
            url: 'https://pocker-club-default-rtdb.firebaseio.com/players.json',
            data
        }

        return axios(config)
    }
}