"use client"

import {FiShoppingCart} from "react-icons/fi";
import {FaSearch} from "react-icons/fa";
import {CiDark} from "react-icons/ci";
import {IoMdNotificationsOutline} from "react-icons/io";

import styles from "./InputUserPanel.module.css"

export default ({isForTeacher}) => {

    return (
        <div className={styles['body-header']}>
            <div className={styles['body-header-right']}>
                <div className={styles['search-wrapper']}>
                    <input className={styles['search-input']} type="text"
                           placeholder="دوره های من،تیکت ها،مالی..."/>
                    <FaSearch className={styles['search-icon']}/>
                </div>
            </div>
            <div className={styles['body-header-left']}>
                <div className={styles['body-header-icons-wrapper']}>
                    <CiDark className={styles['body-header-icon']}/>
                    {
                        !isForTeacher ? <>
                            <IoMdNotificationsOutline className={styles['body-header-icon']}/>
                            <FiShoppingCart className={styles['body-header-icon']}/>
                        </> : null
                    }
                </div>
                <p className={styles['date']}>یکشنبه 8 تیر</p>
            </div>
        </div>
    )
}