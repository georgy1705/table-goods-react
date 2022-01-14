import axios from "axios"
import { useReducer } from "react"
import { GET_GOODS, SET_LOADING } from "../types"
import { DataContext } from "./dataContext"
import { dataReducer } from "./dataReducer"

export const DataState = ({children}) => {
    const initialState = {
        goods: [],
        loading: false
    }

    const [state, dispatch] = useReducer(dataReducer, initialState)

    const getGoods = async () => {
        setLoading()

        const response = await axios.get('https://datainlife.ru/junior_task/get_products.php')

        dispatch({
            type: GET_GOODS,
            payload: response.data
        })
    }

    const setLoading = () => dispatch({type: SET_LOADING})

    const {goods, loading} = state

    return (
        <DataContext.Provider value={{goods, loading, getGoods}}>
            {children}
        </DataContext.Provider>
        
    )
}