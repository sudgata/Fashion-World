import { userActionTypes } from "../types/userTypes";

export const setCurrentUser = (user) =>({
    type: userActionTypes.SET_CURRENT_USER,
    payload: user
})

export const setUserLoaded = (isLoaded) =>({
    type: userActionTypes.USER_LOADED,
    payload: isLoaded
})