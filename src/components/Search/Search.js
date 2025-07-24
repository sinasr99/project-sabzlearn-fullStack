"use client"

//=-=-=-=-=-=-=-=-=-=- Styles =-=-=-=-=-=-=-=-=-=-
import styles from "./Search.module.css"

//=-=-=-=-=-=-=-=-=-=- Components =-=-=-=-=-=-=-=-=-=-
import { FaSearch } from "react-icons/fa";

export default () => {
    return (
        <div className={styles['search-wrapper']}>
            <input type="text" placeholder="جستجو در بین دوره ها..." className={styles['input']}/>
            <button className={styles['button-wrapper']}>
                <FaSearch className={styles['button']}/>
            </button>
        </div>
    )
}