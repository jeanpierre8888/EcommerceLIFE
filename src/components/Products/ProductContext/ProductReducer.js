export const PRODUCT = {
    GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
    GET_DEFAULT_IMG: "GET_DEFAULT_IMG",
    GET_CUSTOMER_ADDRESS:"GET_CUSTOMER_ADDRESS",
    GET_COUNTRIES: "GET_COUNTRIES",
    GET_STATES: "GET_STATES",
    GET_COUNTIES: "GET_COUNTIES",
    GET_CITIES: "GET_CITIES",
    GET_DISTRICTS: "GET_DISTRICTS",
    SET_PRODS_FILTER:"SET_PRODS_FILTER",
    SET_PRODS:"SET_PRODS"
}


export const ProductReducer = (state, action) => {
    switch (action.type) {
        case PRODUCT.GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case PRODUCT.GET_DEFAULT_IMG:
            return {
                ...state,
                defaultImg: action.payload,
            };
        case PRODUCT.GET_CUSTOMER_ADDRESS:
            return {
                ...state,
                custAddress: action.payload,
            };
        case PRODUCT.GET_COUNTRIES:
            return {
                ...state,
                country: action.payload,
            };
        case PRODUCT.GET_STATES:
            return {
                ...state,
                states: action.payload,
            };
        case PRODUCT.GET_COUNTIES:
            return {
                ...state,
                county: action.payload,
            };
        case PRODUCT.GET_CITIES:
            return {
                ...state,
                city: action.payload,
            };
        case PRODUCT.GET_DISTRICTS:
            return {
                ...state,
                district: action.payload,
            };
        case PRODUCT.SET_PRODS_FILTER:
            return {
                ...state,
                productsLocal: action.payload,
            };
        case PRODUCT.SET_PRODS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
