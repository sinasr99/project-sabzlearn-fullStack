import styles from "./MyCourses.module.css"
import Link from "next/link"
import { FaLongArrowAltLeft } from "react-icons/fa";

export default () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    return (
        <div className={styles['wrapper']}>
            <h2 className={styles['title']}>
                دوره های من
            </h2>
            <div className="row">
                {
                    items.map((item, i) => (
                        <div key={i} className="m-b-5 col-zero-12 col-md-6 col-lg-4 flex-all-center">
                            <div className={styles['history-course-item']}>
                                <Link href="#" className={styles['course-poster-wrapper']}>
                                    <img className={styles['course-poster']} src="/images/course-1.webp" alt=""/>
                                </Link>
                                <Link href="#" className={styles['course-history-title']}>آموزش پروژه محور CSS Grid +
                                    پروژه لندینگ
                                    رستوران
                                </Link>
                                <Link href="#" className={styles['course-history-teacher']}>
                                    محمد امین سعیدی راد
                                </Link>
                                <div className={styles['course-view-percent-wrapper']}>
                                    <span className={styles['percent-value']}>18%</span>
                                    <div className={styles['percent-wrapper']}>
                                        <div style={{width: "18%"}} className={styles['percent-navbar']}></div>
                                    </div>
                                </div>
                                <Link href="#" className={styles['course-link']}>
                                    ادامه یادگیری
                                    <FaLongArrowAltLeft className={styles['arrow-icon']}/>
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}