import { URL_LIST } from "@/config/urlList";
import { ApiService } from "./api.service";

export class UserService {

    private apiService: ApiService;

    constructor() {
        this.apiService = new ApiService();
    }

    async login(body: any) {
        let url: string = `${process.env.BASE_URL}${URL_LIST.API.ACCOUNT.LOGIN.URL}`;
        return await this.apiService.post(url, body);
    }

}
