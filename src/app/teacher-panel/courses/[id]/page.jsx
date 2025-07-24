"use client"

import styles from "./page.module.css"
import EditCourseWrapper from "@/components/EditCourseWrapper/EditCourseWrapper";
import {useParams} from "next/navigation";


export default () => {
    const {id} = useParams();
    return (
        <div className={styles['wrapper']}>
            <EditCourseWrapper id={id}/>
        </div>
    )
}