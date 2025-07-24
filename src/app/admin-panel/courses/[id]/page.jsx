import EditCourseWrapper from "@/components/EditCourseWrapper/EditCourseWrapper";

import styles from "./page.module.css"

export default async ({params}) => {
    const {id} = await params;
    return (
        <div className={styles['wrapper']}>
            <EditCourseWrapper id={id}/>
        </div>
    )
}