import { userActionTypes } from "../types/userTypes";

export const setCurrentUser = (user) =>({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
})