import { useContext, useEffect } from "react"
import { DataContext } from "../../context/data/dataContext"

export const Goods = () => {
    const {goods, getGoods, loading} = useContext(DataContext)

    useEffect(() => {
        getGoods()
    }, [])

    console.log(goods);

    const CustomComponent = item => {
        if (item) {
            return {__html: item}
        } else {
            return {__html: "*Нет названия*"}
        }
      }

    return (
        <>
            {   loading ? <h3 className="text-center mt-3">Loading...</h3> :
                goods.map(good => (
                    <table className="table table-bordered" key={+good.rid}>
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
                                    <td><input type="number" onChange={e => good.gprice = +good.gprice * e.target.value}/></td>
                                    <td>Сумма: {good.gprice}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))
            }
        </>
    )
}