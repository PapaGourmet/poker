import { IUser } from "../../../interfaces/interfaces";

export interface ILoginService {
    AddOrUpdateuser(user: IUser): Promise<void>
}


export class LoginService {
    constructor(private service: ILoginService) { }

    async AddOrUpdateuser(user: IUser): Promise<void> {
        this.service.AddOrUpdateuser(user)
    }

}