import React, { useContext, useEffect } from "react";
import './Drawer.css'
import { NavLink } from "react-router-dom";
import { DataContext } from "../../context/data/dataContext";


export const Drawer = () => {
    const {goods, getGoods} = useContext(DataContext)

    useEffect(() => {
        getGoods()
    }, [])

    const renderLinks = () => {
        return goods.map((good, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={`/${good.urlalias}`}
                        style={{color: '#fff', textDecoration: 'none'}}
                    >
                        {good.rname}
                    </NavLink>
                </li>
            )
        })
    }

        return (
            <>
                <nav className="Drawer">
                    <ul>
                        {renderLinks()}
                    </ul>
                </nav>
            </>
            
        )
}
