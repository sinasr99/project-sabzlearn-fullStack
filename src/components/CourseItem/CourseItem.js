//=-=-=-=-=-=-=-=-=-=- Styles =-=-=-=-=-=-=-=-=-=-
import styles from "./CourseItem.module.css"
//=-=-=-=-=-=-=-=-=-=- Components =-=-=-=-=-=-=-=-=-=-
import Image from "next/image";
import {FaStar} from "react-icons/fa"
import {IoPersonOutline} from "react-icons/io5"
import {BsPeopleFill} from "react-icons/bs";
import Link from "next/link";

export default ({courseId, category, img, title, caption, teacher, scores, price, offer, students, notCol}) => {
    return (
        <div className={`${!notCol ? "flex-all-center m-b-2 col-xl-3 col-lg-4 col-md-6 col-zero-12" : ""}`}>
            <div className={`course-box ${styles['course']}`}>
                <Image priority={true} className={styles['course-img']} src={img} alt="Course Image" width={1000}
                       height={1000}/>
                <Link href={`/courses/${category}/${courseId}`} className={styles['title']}>{title}</Link>
                <p className={`${styles['caption']} course-caption`}>{caption}</p>
                <div className={styles['contents']}>
                    <div className={styles['info-wrapper']}>
                        <div className={`${styles['info-right']} teacher`}>
                            <IoPersonOutline className={styles['person-icon']}/>
                            <p className={`${styles['teacher']}`}>{teacher}</p>
                        </div>
                        <div className={styles['info-left']}>
                            <FaStar className={styles['score-icon']}/>
                            <p className={styles['scores']}>{scores}</p>
                        </div>
                    </div>

                    <div className={`${styles['counts']} counts`}>
                        <div className={styles['counts-right']}>
                            <BsPeopleFill className={styles['students-icon']}/>
                            <span className={styles['student-content']}>{students}</span>
                        </div>
                        <div className={styles['counts-left']}>
                            <p className={styles['offer']}>% {offer}</p>
                            <div className={styles['price-contents']}>
                                <p className={`off ${styles['price-off']}`}>{price}</p>
                                <p className={styles['price']}>{(price - (price / 100 * offer)).toLocaleString()} تومان</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}