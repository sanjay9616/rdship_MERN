import { createSlice } from "@reduxjs/toolkit";

export interface State {
    _id: string,
    email: string,
    mobileNo: number,
    password: string,
    name: string,
    gender: string,
    isVerified: boolean,
    address: Array<any>,
    recentlyViewItems: Array<any>,
    cartItems: Array<any>,
    orderList: Array<any>,
    wishList: Array<any>,
    couponList: Array<any>,
    notificationList: Array<any>
}

const initialState: State = {
    _id: '',
    email: '',
    mobileNo: 0,
    password: '',
    name: '',
    gender: '',
    isVerified: false,
    address: [],
    recentlyViewItems: [],
    cartItems: [],
    orderList: [],
    wishList: [],
    couponList: [],
    notificationList: []
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state: any, action: any) => Object.assign(state, {...action.payload}),
    },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;