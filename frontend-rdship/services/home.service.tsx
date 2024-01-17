import { URL_LIST } from "@/config/urlList";
import { ApiService } from "./api.service";

export class HomeService {

    private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
   }

   async getProductDetails(data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.HOME.PRODUCT_DETAILS.URL}`;
    return await this.apiService.post(url, data);
  }

  async getItemInfo(id: string) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.HOME.ITEM_INFO.URL}/${id}`;
    return await this.apiService.get(url);
  }

  async addCartItem(id: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.CART_ITEMS.ADD_ITEM_TO_CART.URL}/${id}`;
    return await this.apiService.post(url, data);
  }

  async addFavoriteItem(id: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.FAVORITE_ITEMS.ADD_FAVORITE_ITEM.URL}/${id}`;
    return await this.apiService.post(url, data);
  }

  async getCartItems(id: string) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.CART_ITEMS.GET_CART_ITEMS.URL}/${id}`;
    return await this.apiService.get(url);
  }

  async getFavoriteItems(id: string) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.FAVORITE_ITEMS.GET_FAVORITE_ITEMS.URL}/${id}`;
    return await this.apiService.get(url);
  }

  async deleteCartItem(userId: string, itemId: string) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.CART_ITEMS.DELETE_CART_ITEM.URL}/${userId}/${itemId}`;
    return await this.apiService.delete(url);
  }

  async deleteFavoriteItem(userId: string, itemId: string) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.FAVORITE_ITEMS.DELETE_FAVORITE_ITEM.URL}/${userId}/${itemId}`;
    return await this.apiService.delete(url);
  }

  async updateCartQty(userId: string, itemId: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.CART_ITEMS.UPDATE_CART_QTY.URL}/${userId}/${itemId}`;
    return await this.apiService.patch(url, data);
  }

  async changeProductSpecification(itemId: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.HOME.CHANGE_SPECIFICATION.URL}/${itemId}`;
    return await this.apiService.post(url, data);
  }

  async addRecentlyViewItems(useId: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.RECENTLY_VIEW.ADD_RECENTLY_VIEW_ITEM.URL}/${useId}`;
    return await this.apiService.post(url, data);
  }

  async getHomeDetails(useId: string) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.HOME.HOME_DETAILS.URL}/${useId}`;
    return await this.apiService.get(url);
  }

  async submitProductReview(userId: string, itemId: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.REVIEW.SUBMIT_PRODUCT_REVIEW.URL}/${userId}/${itemId}`;
    return await this.apiService.post(url, data);
  }

  async submitQuestion(userId: string, itemId: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.QUESTION_ANSWER.SUBMIT_QUESTION.URL}/${userId}/${itemId}`;
    return await this.apiService.post(url, data);
  }

  async ratingVote(userId: string, itemId: string, ratingId: string, vote: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.REVIEW.VOTE.URL}/${userId}/${itemId}/${ratingId}/${vote}`;
    return await this.apiService.patch(url, data);
  }

  async questionVote(userId: string, itemId: string, questionId: string, vote: string, data: any) {
    let url: string = `${process.env.BASE_URL}${URL_LIST.API.QUESTION_ANSWER.VOTE.URL}/${userId}/${itemId}/${questionId}/${vote}`;
    return await this.apiService.patch(url, data);
  }

}