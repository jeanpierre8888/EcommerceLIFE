export const SALES = {
    GET_SALE: "GET_SALE",
    GET_LINES: "GET_LINES",
    GET_NUM_PRODUCTS: "GET_NUM_PRODUCTS",
    GET_LINES_PRODS:"GET_LINES_PRODS"
    
}


export const SalesReducer = (state, action) => {
    switch (action.type) {
        case SALES.GET_SALE:
            return {
                ...state,
                shopCar: action.payload,
            };
        case SALES.GET_LINES:
            return {
                ...state,
                linesShopCar: action.payload,
            };
        case SALES.GET_NUM_PRODUCTS:
            return {
                ...state,
                numProducts: action.payload,
            };
        case SALES.GET_LINES_PRODS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
