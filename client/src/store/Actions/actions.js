import * as Constants from "../Constants/constants";
export const setAllOrders = (data) => {
    return {
        type: Constants.SET_ALL_ORDERS,
        payload: data
    }
}

export const setCurrPage = (data) => {
    return {
        type: Constants.SET_CURR_PAGE,
        payload: data
    }
}