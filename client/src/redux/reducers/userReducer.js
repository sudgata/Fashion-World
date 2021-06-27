import { userActionTypes } from '../types/userTypes';

const INITIAL_STATE = {
    currentUser: null,
    isUserLoaded: false
}

const userReducer =(state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case userActionTypes.SET_CURRENT_USER:
            return {...state, currentUser: payload};
        case userActionTypes.USER_LOADED:
            return {...state, isUserLoaded: payload};
        default:
            return state;
    }
}

export default userReducer;