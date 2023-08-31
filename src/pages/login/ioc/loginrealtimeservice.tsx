import axios, { AxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
import { IUser, objectId } from "../../../interfaces/interfaces";
import { ILoginService } from "./iloginservice";

export class LoginRealTimeService implements ILoginService {

    async AddOrUpdateuser(user: IUser): Promise<void> {
        const data: objectId = {}
        const { sub, ...rest } = user
        data[user.sub] = rest

        const config: AxiosRequestConfig = {
            method: 'patch',
            url: 'https://pocker-club-default-rtdb.firebaseio.com/users.json',
            data
        }

        return axios(config)
    }
}