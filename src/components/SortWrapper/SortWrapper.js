"use client"

import styles from "./SortWrapper.module.css"

import {useEffect, useState} from "react";
import {FaCheck, FaSortAmountUp} from "react-icons/fa";

export default ({items, setItems, title}) => {
    const [isShowMenu, setIsShowMenu] = useState(false);

    const changeMenuStatus = e => {
        e.stopPropagation()
        setIsShowMenu(prev => !prev)
    }

    const changeSelectStatus = i => {
        setItems(prev => {
            return prev.map((item, index) => {
                if (i === index) {
                    item.selected = true
                    return item
                }
                item.selected = false
                return item
            })
        })
    }

    useEffect(() => {
        const escapeHandler = e => {
            if (e.key === "Escape") {
                setIsShowMenu(false);
            }
        }

        const clickWindow = () => {
            setIsShowMenu(false)
        }

        window.addEventListener("keyup", escapeHandler)
        window.addEventListener("click", clickWindow)

        return () => {
            window.removeEventListener("keyup", escapeHandler);
            window.removeEventListener("click", clickWindow);
            window.removeEventListener("click", changeSelectStatus);
            window.removeEventListener("click", changeMenuStatus)
        }
    }, [])

    return (
        <>
            <h5 className={styles['header-title']}>
                {title}
                <div className={styles['sort-menu']}>
                    <div
                        onClick={changeMenuStatus}
                        className={styles['sort-menu-header']}>
                        <FaSortAmountUp className={styles['sort-icon']}/>
                    </div>
                    <div
                        style={isShowMenu ? {zIndex: "1", opacity: "1", top: "100%"} : {
                            zIndex: "-5",
                            opacity: "0",
                            top: "0"
                        }} className={styles['sort-menu-items']}>
                        {
                            items.map((item, index) => (
                                <p
                                    onClick={() => changeSelectStatus(index)}
                                    key={index} className={styles['sort-menu-item']}>
                                    {item.text}
                                    {item.selected ? <FaCheck className={styles['check-icon']}/> : null}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </h5>
        </>
    )
}