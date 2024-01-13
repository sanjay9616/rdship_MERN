import { createSlice } from "@reduxjs/toolkit";

export interface State {
    isAuthenticated: boolean,
}

const initialState: State = {
    isAuthenticated: false,
};

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setIsAuthenticated: (state: any, action: any) => void(state.isAuthenticated = action.payload)
    },
});

export const { setIsAuthenticated } = authenticationSlice.actions;

export default authenticationSlice.reducer;