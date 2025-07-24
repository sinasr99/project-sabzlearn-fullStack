"use client"

import styles from "./Ticket.module.css"
import {FaPlus, FaCheck, FaSortAmountUp, FaArrowLeft, FaInfo} from "react-icons/fa";
import { BsFillFolderFill } from "react-icons/bs";
import { GrOrganization } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import {useEffect, useState} from "react";
import Link from "next/link"

export default () => {
    const tickets = [1, 2, 3, 4, 5];
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [items, setItems] = useState(
        [
            {text: "جدیدترین", selected: true},
            {text: "قدیمی ترین", selected: false},
            {text: "پاسخ داده شده", selected: false},
            {text: "در انتظار پاسخ", selected: false}
        ]
    );

    const changeShowMenu = event => {
        event.stopPropagation()
        setIsShowMenu(prev => !prev)
    }

    const selectItem = index => {
        setItems(prev => {
            return prev.map((item, i) => {
                if (index === i) {
                    item.selected = true
                    return item
                }
                item.selected = false
                return  item
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
            window.removeEventListener("click", changeShowMenu);
            window.removeEventListener("click", selectItem);
        }
    }, []);

    return (
        <div className={styles['wrapper']}>
            <h5 className={styles['header-title']}>
                لیست تیکت های من
                <div className={styles['header-right']}>
                    <div className={styles['sort-menu']}>
                        <div
                            onClick={changeShowMenu}
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
                                items.map((item, i) => (
                                    <p
                                        onClick={() => selectItem(i)}
                                        key={i} className={styles['sort-menu-item']}>
                                        {item.text}
                                        {item.selected ? <FaCheck className={styles['check-icon']}/> : null}
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                    <Link className={styles['create-ticket']} href="/user-panel/tickets/create">
                        ایجاد تیکت جدید
                        <FaPlus className={styles['plus-icon']}/>
                    </Link>
                </div>
            </h5>

            <div className={styles['tickets-wrapper']}>
                {
                    tickets.map((ticket, i) => (
                        <div key={i} className={styles['ticket-item']}>
                            <div className={styles['ticket-item-header']}>
                                <Link href="#" className={styles['ticket-title']}>ویدئو</Link>
                                <Link className={styles['see-ticket-wrapper']} href="#">
                                    مشاهده تیکت
                                    <FaArrowLeft className={styles['arrow-icon']}/>
                                </Link>
                            </div>
                            <div className={styles['ticket-body']}>
                                <p className={styles['ticket-body-item']}>
                                    <BsFillFolderFill className={styles['ticket-body-icon']}/>
                                    شماره تیکت : 956
                                </p>
                                <p className={styles['ticket-body-item']}>
                                    <GrOrganization className={styles['ticket-body-icon']}/>
                                    دپارتمان : پشتیانی
                                </p>
                                <p className={styles['ticket-body-item']}>
                                    <MdDateRange className={styles['ticket-body-icon']}/>
                                    تاریخ  : 27 خرداد 1404
                                </p>
                                <p className={styles['ticket-body-item']}>
                                    <FaInfo className={styles['ticket-body-icon']}/>
                                    وضعیت  : بسته شده
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}