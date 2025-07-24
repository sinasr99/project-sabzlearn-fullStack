"use client"

import styles from "./create.module.css"
import {FaArrowLeft, FaCheck} from "react-icons/fa";
import Link from "next/link"
import {BiSortAlt2} from "react-icons/bi";
import {FaFileUpload} from "react-icons/fa"
import {useEffect, useRef, useState} from "react";

export default () => {
    const [file, setFile] = useState(null);
    const fileInput = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isShowMenu, setIsShowMenu] = useState(false)
    const [departmentItems, setDepartmentItems] = useState([
        {text: "مالی و تراکنشات", selected: true},
        {text: "پشتیانی سایت", selected: false},
        {text: "مشاوره آموزشی", selected: false},
    ]);

    const changeFileInput = event => {
        if (event.target.files && event.target.files[0]) {
            const format = event.target.files[0].name.split('.').pop().toLowerCase()
            if (
                format === "png" ||
                format === "jpeg" ||
                format === "jpg" ||
                format === "rar" ||
                format === "zip") {
                setFile(event.target.files[0]);
                return true
            }
            alert("format is invalid")
        }
    }

    const changeMenuStatus = event => {
        event.stopPropagation()
        setIsShowMenu(true)
    }

    const changeSelected = (index) => {
        setCurrentIndex(index)
        setDepartmentItems(prev => {
            return prev.map((item, i) => {
                if (i === index) {
                    item.selected = true
                    return item
                }
                item.selected = false
                return item
            })
        })
    }

    const openFileInput = () => {
        fileInput.current.click()
    }

    useEffect(() => {
        const closeMenuKeyboard = event => {
            if (event.key === "Escape") {
                setIsShowMenu(false)
            }
        }

        const closeMenuClick = () => {
            setIsShowMenu(false)
        }

        window.addEventListener("keyup", closeMenuKeyboard)
        window.addEventListener("click", closeMenuClick)

        return () => {
            window.removeEventListener("click", changeSelected)
            window.removeEventListener("click", closeMenuClick)
            window.removeEventListener("keyup", closeMenuKeyboard)
            window.removeEventListener("click", changeMenuStatus)
            window.removeEventListener("click", openFileInput)
        }
    }, [])

    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <p className={styles['title']}>ثبت تیکت جدید</p>
                <Link className={styles['comeback']} href="/user-panel/tickets">
                    بازگشت
                    <FaArrowLeft className={styles['icon-back']}/>
                </Link>
            </div>

            <div className={`row`}>
                <div className={`col-6`}>
                    <div className={styles['input-wrapper']}>
                        <input className={styles['input']} type="text" placeholder="موضوع تیکت"/>
                    </div>
                </div>
                <div className={`col-6`}>
                    <div className={styles['input-wrapper-box']}>
                        <div className={`${styles['input-wrapper']}`}>
                            <input
                                value={departmentItems[currentIndex].text}
                                readOnly
                                onClick={changeMenuStatus}
                                className={`${styles['input']} ${styles['input-combo']}`} type="text"
                                placeholder="دپارتمان مورد نظر را انتخاب کنید"/>
                            <BiSortAlt2 className={styles['input-icon']}/>
                        </div>
                        <div style={isShowMenu ? {zIndex: "10", opacity: "1", top: "100%"} : {
                            zIndex: "-1",
                            opacity: "0",
                            top: "0"
                        }} className={styles['input-items']}>
                            {
                                departmentItems.map((item, i) => (
                                    <p
                                        onClick={() => changeSelected(i)}
                                        key={i} className={styles['input-item']}>
                                        {item.text}
                                        {
                                            item.selected ? <FaCheck className={styles['tik']}/> : null
                                        }
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`col-12`}>
                    <textarea className={`${styles['input-caption']} ${styles['input']}`}
                              placeholder="جزئیات کامل مشکل یا سوال خودتان را بنویسید"></textarea>
                </div>
                <div className={`col-12`}>
                    <div
                        onClick={openFileInput}
                        className={styles['input-file-wrapper']}>
                        <input
                            onChange={changeFileInput}
                            accept=".zip, .rar, image/png, image/jpeg, image/jpg, image/gif"
                            ref={fileInput} type="file" className={styles['input-file']}/>
                        <FaFileUpload className={styles['upload-icon']}/>
                        <p className={styles['input-file-caption']}>
                            فرمت های مجاز : jpg, jpeg, png, zip, rar
                        </p>
                    </div>
                </div>
                <div className={styles['button-wrapper']}>
                    <button className={styles['send']}>ارسال تیکت</button>
                </div>
            </div>
        </div>
    )
}