import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export interface SessionState {
    signedIn: boolean
    token: string | null
    userInfo: object | null
}

const initialState: SessionState = {
    signedIn: false,
    token: null,
    userInfo: null,
}

const sessionSlice = createSlice({
    name: `${SLICE_BASE_NAME}/session`,
    initialState,
    reducers: {
        signInSuccess(state, action: PayloadAction<string>) {
            state.signedIn = true
            state.token = action.payload
        },

        setuserInfo(state, action: PayloadAction<object>) {
            state.userInfo = action.payload
        },

        signOutSuccess(state) {
            state.signedIn = false
            state.token = null
        },
    },
})

export const { signInSuccess, signOutSuccess, setuserInfo } =
    sessionSlice.actions
export default sessionSlice.reducer
