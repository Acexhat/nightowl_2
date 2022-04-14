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

export const updateShipments = (data) => {
    return {
        type: Constants.UPDATE_SHIPMENTS,
        payload: data
    }
}

export const updateLocations = (data) => {
    return {
        type: Constants.UPDATE_LOCATIONS,
        payload: data
    }
}

export const setOrdersByShipments = (data) => {
    return {
        type: Constants.SET_ORDERS_BY_SHIPMENTS,
        payload: data
    }
}