import axios from "axios"
import { useReducer } from "react"
import { FILTER_GOODS, GET_GOODS, SET_LOADING } from "../types"
import { DataContext } from "./dataContext"
import { dataReducer } from "./dataReducer"

export const DataState = ({children}) => {
    const initialState = {
        goods: [],
        products: [],
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

    const filterGoods = (goods) => {
        const products = goods.map(item => item.goods.filter(product => {
            return product.sum !== undefined && +product.sum.value !== 0
        }))[0];
        let res = [];
        if (products !== undefined) {
            products.forEach(item => {res.push({id: item.gid, value: item.sum.value, full: item.sum.full})});
        }

        dispatch({
            type: FILTER_GOODS,
            payload: res
        })
    }

    const sendData = async (data) => {
        if (data !== []) {
            return await axios.post('https://datainlife.ru/junior_task/add_basket.php', data)
        }
    }

    const setLoading = () => dispatch({type: SET_LOADING})

    const {goods, loading, products} = state

    return (
        <DataContext.Provider value={{goods, loading, getGoods, products, filterGoods, sendData}}>
            {children}
        </DataContext.Provider>
        
    )
}