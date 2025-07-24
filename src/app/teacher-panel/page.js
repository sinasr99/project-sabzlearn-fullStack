import styles from "./TeacherPage.module.css"

import Link from "next/link"
import ChartWrapper from "@/components/ChartWrapper/ChartWrapper";
import connectToMongo from "@/database/connectToMongo";
import courses from "@/models/courses";
import {checkUserNavbar} from "@/functions";

export default async () => {
    connectToMongo().then()

    let user = await checkUserNavbar()

    let resultCourses = await courses.find({creator: user._id})
    resultCourses = JSON.parse(JSON.stringify(resultCourses))
    return (
        <div className={styles['wrapper']}>
            <div className={`${styles['new-teachers']}`}>
                <h3 className={styles['new-course-title']}>لیست دوره های بروز شده ی اخیر</h3>
                <div className="row">
                    {
                        resultCourses.map(course => (
                            <div key={course._id}
                                 className={`col-zero-12 col-md-6 m-b-2 flex-all-center ${styles['course-container']}`}>
                                <div className={styles['course']}>
                                    <img className={styles['course-img']} src={course.introductionPoster} alt="Course Image"/>
                                    <Link href={`/courses/${course._id}`}
                                          className={styles['course-link']}>{course.title}</Link>
                                    <p className={styles['date']}>
                                        آخرین تغییر : 27 خرداد 1404
                                    </p>
                                    <div className={styles['complete-wrapper']}>
                                        <p className={styles['complete-title']}>درصد تکمیل دوره 45%</p>
                                        <div className={styles['complete-container']}>
                                            <div style={{width: "45%"}} className={styles['complete-slider']}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <ChartWrapper courses={resultCourses}/>
        </div>
    )
}