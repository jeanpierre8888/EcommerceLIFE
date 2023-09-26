export const LOGIN = {
    SET_STATUS_LOGIN:"SET_STATUS_LOGIN"
}


export const InitialLoginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN.SET_STATUS_LOGIN:
            return {
                ...state,
                loginState: action.payload,
            };
        default:
            return state;
    }
};
