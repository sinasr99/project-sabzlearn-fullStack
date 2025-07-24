"use client"

import {FaHome} from "react-icons/fa";
import styles from "./BreadCrumb.module.css"
import Link from "next/link"

export default ({path}) => {

    const getPath = (newPath, i) => {
        let totalPath = ""
        path.forEach((item, index) => {
            if (index <= i) {
                totalPath += "/" + item.href
            }
        })
        return i === 0 ? "/" : totalPath.slice(1)
    }

    return (
        <div className={styles['bread-crumb']}>
            {
                path.map((item, i) => {
                    return (
                        <Link href={getPath(item.href, i)} key={i}
                              className={`${styles['bread-item']}`}>
                            <div className={styles['before']}></div>
                            <div className={styles['after']}></div>
                            {
                                i === 0 ? <FaHome className={styles['icon']}/> : item.text
                            }
                        </Link>
                    )
                })
            }
        </div>
    )
}