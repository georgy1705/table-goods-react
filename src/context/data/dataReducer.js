import { FILTER_GOODS, GET_GOODS, SET_LOADING } from "../types"

const handlers = {
    [GET_GOODS]: (state, {payload}) => ({...state, goods: payload, loading: false}),
    [FILTER_GOODS]: (state, {payload}) => ({...state, products: payload}),
    [SET_LOADING]: (state) => ({...state, loading: true}),
    DEFAULT: state => state
}

export const dataReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}