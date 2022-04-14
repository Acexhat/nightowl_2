import * as type from "../Constants/constants";
import gloablStates from "../states/states";

const mainReducer = (state = gloablStates, action) => {
    switch (action.type) {
        case type.SET_ALL_ORDERS:
            return { ...state, allOrders: [...state.allOrders, ...action.payload] }

        case type.SET_CURR_PAGE:
            return { ...state, curr_page: action.payload }

        case type.UPDATE_SHIPMENTS:
            return { ...state, allShipments: action.payload }

        case type.UPDATE_LOCATIONS:
            return { ...state, allLatLangs: action.payload }

        case type.SET_ORDERS_BY_SHIPMENTS:
            return { ...state, ordersByShipments: action.payload }
        default:
            return state;
    }
}

export default mainReducer
