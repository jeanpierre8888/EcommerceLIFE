export const CUSTOMER = {
    GET_STATE_ENROLLMENT: "GET_STATE_ENROLLMENT"
}


export const CustomerReducer = (state, action) => {
    switch (action.type) {
        case CUSTOMER.GET_STATE_ENROLLMENT:
            return {
                ...state,
                stateEnrollmet: action.payload,
            };
        default:
            return state;
    }
};
