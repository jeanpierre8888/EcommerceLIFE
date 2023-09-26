import { LOGIN, WIDTHNAVBAR } from "../../GlobalConfig/types";;

export const LoginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case WIDTHNAVBAR:
      return {
        ...state,
        widthNavBars: action.payload,
      };

    default:
      return state;
  }
};
