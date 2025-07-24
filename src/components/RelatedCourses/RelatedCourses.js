import styles from "./RelatedCourses.module.css"

import { BsStars } from "react-icons/bs";
import { FaArrowCircleLeft } from "react-icons/fa";
import Link from "next/link";

export default ({items}) => {
    return (
        <div className={styles['teachers-wrapper']}>
            <div className={styles['header']}>
                <BsStars className={styles['header-icon']}/>
                دوره های مرتبط
            </div>
            {
                items.map((item, i) => (
                    <div key={i} className={styles['course']}>
                        <div className={styles['right']}>
                            <img className={styles['image']} src={item.image} alt="Course Image"/>
                            <Link href={item.href}>
                                <h3 className={styles['course-title']}>{item.title}</h3>
                            </Link>
                        </div>
                        <Link className={styles['link']} href={item.href}>
                            مشاهده
                            <FaArrowCircleLeft className={styles['arrow-icon']}/>
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}