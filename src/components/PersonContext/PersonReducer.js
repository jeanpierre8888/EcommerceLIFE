export const PERSONAL_INFO = {
    GET_PERSONAL_INFORMATION: "GET_PERSONAL_INFORMATION",
    UPDATE_PERSONAL_INFO:"UPDATE_PERSONAL_INFO",
    GET_SPECIELITIES: "GET_SPECIELITIES",
    GET_LEGAL_DOCUMENT: "GET_LEGAL_DOCUMENT"
}


export const PersonReducer = (state, action) => {
    switch (action.type) {
        case PERSONAL_INFO.GET_PERSONAL_INFORMATION:
            return {
                ...state,
                personalInfo: action.payload,
            };
        default:
            return state;
    }
};
