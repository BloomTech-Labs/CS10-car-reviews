import { CHANGE_LOGIN_STATUS } from "../actions/actionTypes";

// * TODO: We may need to account for users that have logged in previously but re-navigated to the website... 
// ...Perhaps we could have an action creator that fires off when the user first visits the site to check whether or not they're already logged in with a valid JWT
const initialState = {
    clientStatus: {
        isLoggedIn: false,
    }
}

const rootReducer = (state = initialState, action) => {
    switch (action.type){
        case CHANGE_LOGIN_STATUS:
            const newLoginState = Object.assign({}, state);
            newLoginState.clientStatus.isLoggedIn = !state.clientStatus.isLoggedIn;
            return newLoginState;
        default:
            return state;
    }
}

export default rootReducer;