"use client"

import styles from "./question.module.css"
import SortWrapper from "@/components/SortWrapper/SortWrapper";
import {useState} from "react";
import {FaBook} from "react-icons/fa";
import {MdOutlineDateRange} from "react-icons/md";
import Link from "next/link";

export default () => {
    const [items, setItems] = useState([
        {text: "آخرین پرسش", selected: true},
        {text: "در انتظار پاسخ", selected: false},
        {text: "پاسخ داده شده", selected: false}
    ]);

    return (
        <div className={styles['wrapper']}>
            <SortWrapper setItems={setItems} items={items} title="پرسش ها"/>

            <div className={styles['questions-wrapper']}>
                <div className={styles['question-item']}>
                    <Link href="#" className={styles['question']}>توی فلان بخش به باگ خوردم!!!! کمک !!!!</Link>
                    <div className={styles['question-infos']}>
                    <span className={styles['question-info']}>
                        <FaBook className={styles['question-info-icon']}/>
                        آموزش Next JS
                    </span>
                        <span className={styles['question-info']}>
                        <MdOutlineDateRange className={styles['question-inf-icon']}/>
                        تاریخ
                    </span>
                        <span className={styles['question-info-status']}>
                        بسته شده
                    </span>
                    </div>
                </div>
                <div className={styles['question-item']}>
                    <Link href="#" className={styles['question']}>توی فلان بخش به باگ خوردم!!!! کمک !!!!</Link>
                    <div className={styles['question-infos']}>
                    <span className={styles['question-info']}>
                        <FaBook className={styles['question-info-icon']}/>
                        آموزش Next JS
                    </span>
                        <span className={styles['question-info']}>
                        <MdOutlineDateRange className={styles['question-inf-icon']}/>
                        تاریخ
                    </span>
                        <span className={styles['question-info-status']}>
                        بسته شده
                    </span>
                    </div>
                </div>
                <div className={styles['question-item']}>
                    <Link href="#" className={styles['question']}>توی فلان بخش به باگ خوردم!!!! کمک !!!!</Link>
                    <div className={styles['question-infos']}>
                    <span className={styles['question-info']}>
                        <FaBook className={styles['question-info-icon']}/>
                        آموزش Next JS
                    </span>
                        <span className={styles['question-info']}>
                        <MdOutlineDateRange className={styles['question-inf-icon']}/>
                        تاریخ
                    </span>
                        <span className={styles['question-info-status']}>
                        بسته شده
                    </span>
                    </div>
                </div>
            </div>
        </div>
    )
}