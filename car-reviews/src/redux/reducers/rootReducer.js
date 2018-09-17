import { CHANGE_LOGIN_STATUS } from "../actions/actionTypes";

const initialState = {
    clientStatus: {
        isLoggedIn: false,
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case CHANGE_LOGIN_STATUS:
            return Object.assign({}, state, { isLoggedIn: !state.isLoggedIn });
        default:
            return state;
    }
}

export default rootReducer;