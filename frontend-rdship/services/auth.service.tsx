import { URL_LIST } from "@/config/urlList";
import { ApiService } from "./api.service";

export class AuthService {

    private apiService: ApiService;

    constructor() {
        this.apiService = new ApiService();
    }

    async login(body: any) {
        let url: string = `${process.env.BASE_URL}${URL_LIST.API.ACCOUNT.LOGIN.URL}`;
        return await this.apiService.post(url, body);
    }

    async signUp(data: any) {
        let url: string = `${process.env.BASE_URL}${URL_LIST.API.ACCOUNT.SIGNUP.URL}`;
        return await this.apiService.post(url, data);
    }

    async forgetPassword(data: any) {
        let url: string = `${process.env.BASE_URL}${URL_LIST.API.ACCOUNT.FORGET_PASSWORD.URL}`;
        return await this.apiService.patch(url, data);
    }

    async verifyUser(data: any) {
        let url: string = `${process.env.BASE_URL}${URL_LIST.API.ACCOUNT.VERIFY_USER.URL}`;
        return await this.apiService.patch(url, data);
    }

    async updateProfile(id: string, data: any) {
        let url: string = `${process.env.BASE_URL}${URL_LIST.API.ACCOUNT.UPDATE_PROFILE.URL}/${id}`;
        return await this.apiService.post(url, data);
    }

    async getAuthData(id: any) {
        let url: string = `${process.env.BASE_URL}${URL_LIST.API.ACCOUNT.AUTH_DATA.URL}/${id}`;
        return await this.apiService.get(url);
    }

}
