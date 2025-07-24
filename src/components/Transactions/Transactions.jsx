"use client"

import styles from "./Transactions.module.css"
import {useState} from "react";
import SortWrapper from "@/components/SortWrapper/SortWrapper";

export default () => {
    const [items, setItems] = useState([
        {text: "جدیدترین", selected: true},
        {text: "قدیمی ترین", selected: false},
    ])
    
    return (
        <div className={styles['wrapper']}>
            <SortWrapper
                items={items} setItems={setItems} title="تراکنش ها"
            />
            <div className={`${styles['transactions-wrapper']}`}>
                <div className={`row ${styles['transaction-header']}`}>
                    <p className={`col-2 ${styles['transaction-header-content']}`}>شناسه</p>
                    <p className={`col-4 ${styles['transaction-header-content']}`}>شرح تراکنش</p>
                    <p className={`col-2 ${styles['transaction-header-content']}`}>تاریخ</p>
                    <p className={`col-2 ${styles['transaction-header-content']}`}>مبلغ</p>
                    <p className={`col-2 ${styles['transaction-header-content']}`}>وضعیت</p>
                </div>
                <div className={`row ${styles['transaction-item']}`}>
                    <div className={styles['transaction-item-title-wrapper']}>
                        <p className={styles['transaction-item-title']}>شماره</p>
                        <p className={styles['transaction-item-title']}>دوره</p>
                        <p className={styles['transaction-item-title']}>تاریخ</p>
                        <p className={styles['transaction-item-title']}>مبلغ</p>
                        <p className={styles['transaction-item-title']}>وضعیت</p>
                    </div>
                   <div className={`${styles['row']} m-b-2 ${styles['transaction-item-content-wrapper']}`}>
                       <p className={`col-2 ${styles['transaction-item-content']}`}>156</p>
                       <p className={`col-4 ${styles['transaction-item-content']}`}>آموزش Next.js</p>
                       <p className={`col-2 ${styles['transaction-item-content']}`}>27/04/1404</p>
                       <p className={`col-2 ${styles['transaction-item-content']}`}>{(3640000).toLocaleString()} تومان</p>
                       <p className={`col-2 ${styles['transaction-item-content']}`}>پرداخت شده</p>
                   </div>
                </div>
                <div className={`${styles['row']} ${styles['transaction-item']}`}>
                    <div className={styles['transaction-item-title-wrapper']}>
                        <p className={styles['transaction-item-title']}>شماره</p>
                        <p className={styles['transaction-item-title']}>دوره</p>
                        <p className={styles['transaction-item-title']}>تاریخ</p>
                        <p className={styles['transaction-item-title']}>مبلغ</p>
                        <p className={styles['transaction-item-title']}>وضعیت</p>
                    </div>
                    <div className={`row m-b-2 ${styles['transaction-item-content-wrapper']}`}>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>156</p>
                        <p className={`col-4 ${styles['transaction-item-content']}`}>آموزش Next.js</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>27/04/1404</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>{(3640000).toLocaleString()} تومان</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>پرداخت شده</p>
                    </div>
                </div>
                <div className={`${styles['row']} ${styles['transaction-item']}`}>
                    <div className={styles['transaction-item-title-wrapper']}>
                        <p className={styles['transaction-item-title']}>شماره</p>
                        <p className={styles['transaction-item-title']}>دوره</p>
                        <p className={styles['transaction-item-title']}>تاریخ</p>
                        <p className={styles['transaction-item-title']}>مبلغ</p>
                        <p className={styles['transaction-item-title']}>وضعیت</p>
                    </div>
                    <div className={`row m-b-2 ${styles['transaction-item-content-wrapper']}`}>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>156</p>
                        <p className={`col-4 ${styles['transaction-item-content']}`}>آموزش Next.js</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>27/04/1404</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>{(3640000).toLocaleString()} تومان</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>پرداخت شده</p>
                    </div>
                </div>
                <div className={`${styles['row']} ${styles['transaction-item']}`}>
                    <div className={styles['transaction-item-title-wrapper']}>
                        <p className={styles['transaction-item-title']}>شماره</p>
                        <p className={styles['transaction-item-title']}>دوره</p>
                        <p className={styles['transaction-item-title']}>تاریخ</p>
                        <p className={styles['transaction-item-title']}>مبلغ</p>
                        <p className={styles['transaction-item-title']}>وضعیت</p>
                    </div>
                    <div className={`row m-b-2 ${styles['transaction-item-content-wrapper']}`}>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>156</p>
                        <p className={`col-4 ${styles['transaction-item-content']}`}>آموزش Next.js</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>27/04/1404</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>{(3640000).toLocaleString()} تومان</p>
                        <p className={`col-2 ${styles['transaction-item-content']}`}>پرداخت شده</p>
                    </div>
                </div>
            </div>
        </div>
    )
}