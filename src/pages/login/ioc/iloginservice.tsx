import { IPlayer } from "../../../interfaces/interfaces";

export interface ILoginService {
    AddOrUpdateuser(user: IPlayer): Promise<void>
}

export class LoginService {
    constructor(private service: ILoginService) { }

    async AddOrUpdateuser(user: IPlayer): Promise<void> {
        this.service.AddOrUpdateuser(user)
    }

}