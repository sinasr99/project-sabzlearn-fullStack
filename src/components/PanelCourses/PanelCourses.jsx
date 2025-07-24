"use client"

import styles from "./PanelCourses.module.css"

import Link from "next/link";
import {useEffect, useState} from "react";
import {CircularProgress} from "@mui/material";

export default ({removeButton, items}) => {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // مقدار اولیه هم بخوای بگیری:
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);
    return (
        <div className={`row ${styles['teachers-wrapper']}`}>
            {
                items.map((item, i) => (
                    <div key={i} className={`col-zero-12 col-sm-6 col-md-4 m-b-2`}>
                        <div className={styles['course-box']}>
                            <img className={styles['course-img']} src={item.image} alt=""/>
                            <h4 className={styles['course-title']}>{item.title}</h4>
                            <div className={styles['course-buttons']}>
                                <Link href={item.href} className={styles['course-btn']}>ویرایش
                                    دوره</Link>
                                {
                                    item.isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/> : <button onClick={() => removeButton(item.id, i)} className={`${styles['course-btn']} ${styles[`danger`]}`}>حذف دوره</button>
                                }
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}