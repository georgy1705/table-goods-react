import React, { useContext, useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import { DataContext } from "../../context/data/dataContext"
import "./Goods.css"

export const Goods = () => {
    const {goods, getGoods, loading} = useContext(DataContext)

    const params = useParams().id;

    const [value, setValue] = useState([])
    console.log(value);

    let items = [...goods]

    if (params) {
        items = goods.filter(good => good.urlalias === params)
    }

    useEffect(() => {
        getGoods()
    }, [])
    
    const CustomComponent = item => {
        if (item) {
            return {__html: item}
        } else {
            return {__html: "*Нет названия*"}
        }
      }

    const renderGoods = () => items.map(good => (
        <table style={{textAlign: "center"}} className="table table-bordered" key={+good.rid}>
            <thead align="center">
                <tr>
                <th colSpan="5">{good.rname}</th>
                </tr>
            </thead>
            <tbody>
                {good.goods.map(good => (
                    <tr key={+good.gid}>
                        <th scope="row">{good.gid}</th>
                        <td>
                            <div dangerouslySetInnerHTML={CustomComponent(good.catalog_description_value)}></div>
                        </td>
                        <td>{good.gprice}</td>
                        <td>
                            <input 
                                type="number" 
                                min="0"  
                                placeholder="Введите количество"
                                onChange={e => {
                                    setValue({value: e.target.value})
                                    let nextValue = Object.assign({}, value, {value: e.target.value})
                                    good['sum'] = nextValue
                                }}
                            />
                        </td>
                        <td>Сумма: {good.sum ? good.sum.value * good.gprice : 0}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    ))

    return (
        <div className="Goods">
            {   loading ? <h3 className="text-center mt-3">Loading...</h3> :
                renderGoods()
            }
        </div>
    )
}