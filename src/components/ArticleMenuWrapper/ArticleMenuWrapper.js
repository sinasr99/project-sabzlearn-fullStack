"use client"

import styles from "./ArticleMenuWrapper.module.css"

import {IoMdArrowDropdownCircle} from "react-icons/io";
import {MdMenu} from "react-icons/md";
import {useState} from "react";
import Link from "next/link"

export default ({items}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div
            style={{ maxHeight: isMenuOpen ? "500px" : "4.5rem" }}
            className={styles['menu-wrapper']}>
            <div className={styles['menu-wrapper-header']}>
                <h5 className={styles['menu-header-title']}>
                    <MdMenu className={styles['menu-header-icon']}/>
                    سرفصل های دوره
                </h5>
                <IoMdArrowDropdownCircle
                    style={!isMenuOpen ? {rotate: "360deg"} : {rotate: "180deg"}}
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className={styles['menu-arrow-icon']}/>
            </div>
            <div className={styles['menu-body']}>
                {
                    items.map((item, index) => (
                        <Link key={index} href={item.href} className={styles['link-section']}>{item.text}</Link>
                    ))
                }
            </div>
        </div>
    )
}