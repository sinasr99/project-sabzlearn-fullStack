"use client"

import {IoIosArrowDown} from "react-icons/io";
import {useEffect, useState} from "react";

import styles from "./CustomComboBox.module.css"

export default ({setFilter, items, current}) => {
    const [isShowSort, setIsShowSort] = useState(false)

    useEffect(() => {
        window.addEventListener("click", () => {
            setIsShowSort(false)
        })
    }, []);

    return (
        <>
            <div className={styles['sort-wrapper']}>
                <p
                    onClick={e => {
                        e.stopPropagation()
                        setIsShowSort(prev => !prev)
                    }}
                    className={styles['current-sort']}>
                    {current}
                    <IoIosArrowDown
                        style={{rotate: isShowSort ? "180deg" : "0deg"}}
                        className={styles['icon']}/>
                </p>
                <div
                    style={isShowSort ? {opacity: "1", zIndex: "20", top: "100%"} : {opacity: "0", zIndex: "-1", top: "0"}}
                    className={styles['sort-items']}>
                    {
                        items.map((item, i) => (
                            <p onClick={event => setFilter(event.target.innerText)} key={i} className={styles['sort-item']}>{item}</p>
                        ))
                    }
                </div>
            </div>
        </>
    )
}