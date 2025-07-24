import styles from "./CoursePage.module.css"
import Navbar from "@/components/Navbar/Navbar";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import {FaBookOpen, FaUsers, FaVideo, FaClock, FaInfoCircle, FaStar} from "react-icons/fa";
import {FaPeopleGroup} from "react-icons/fa6"
import {BsBagFill} from "react-icons/bs"
import {SlCalender} from "react-icons/sl"
import {IoPersonSharp} from "react-icons/io5"
import ArticleCourse from "@/components/ArticleCoure/ArticleCourse"
import SeasonCourse from "@/components/SeasonCourse/SeasonCourse"

import Link from "next/link"
import RelatedCourses from "@/components/RelatedCourses/RelatedCourses";
import CommentsWrapper from "@/components/CommentsWrapper/CommentsWrapper";
import Footer from "@/components/Footer/Footer";
import {checkUserNavbar} from "@/functions";
import coursesModel from "@/models/courses";
import PersianDate from "persian-date";
import commentsModel from "@/models/comments";
import persianDate from 'persian-date'

export default async ({params}) => {
    let user = await checkUserNavbar()
    const {courseId, categoryId} = await params

    const courses = await coursesModel.find()
        .populate({
            path: "parts",
            model: "Seasons",
            populate: {
                path: "episodes",
                model: "Episodes"
            }
        }).populate({
            path: "creator",
            model: "Users"
        }).populate({
            path: "category",
            model: "Categories"
        })

    const course = courses.filter(course => course._id.toString() === courseId.toString())[0]
    const lastUpdate = new PersianDate(new Date(course.updatedAt)).format('YYYY/MM/DD');

    const sortedCourse = {
        ...course,
        parts: course.parts
            .sort((a, b) => a.number - b.number) // مرتب‌سازی فصل‌ها
            .map(part => ({
                ...part,
                episodes: part.episodes.sort((a, b) => a.number - b.number) // مرتب‌سازی اپیزودهای داخل هر فصل
            }))
    }

    const cleanedParts = sortedCourse.parts
        .sort((a, b) => a.number - b.number)
        .map(season => {
            const seasonData = season._doc || season

            const episodes = (seasonData.episodes || [])
                .sort((a, b) => a.number - b.number)
                .map(ep => {
                    const epData = ep._doc || ep
                    return {
                        id: epData._id.toString(), // 👈 تبدیل به string
                        title: epData.title,
                        video: epData.video
                    }
                })

            return {
                duration: "20 ms",
                isOpen: false,
                title: seasonData.title,
                episodes,
            }
        })

    const relatedCourses = courses.filter(course => {
        if (course.category._id.toString() === categoryId.toString() && course._id.toString() !== courseId.toString()) {
            return true
        }
    })

    let comments = await commentsModel.find()
        .populate("creator") // برای خود کامنت
        .populate("courseId") // اختیاری
        .populate("articleId") // اختیاری
        .populate({
            path: "reply.creator", // populate کردن creator داخل reply
            model: "Users"
        })

    comments = comments.filter(comment => {
        if (comment?.isAgree && comment?.courseId?._id.toString() === courseId.toString()) {
            return comment
        }
    })

    const getRole = role => {
        switch (role) {
            case "Admin": {
                return "مدیر"
            }
            case "Teacher": {
                return "مدرس"
            }
            case "User": {
                return "کاربر"
            }
        }

    }

    const getPersianDate = englishDate => {
        const createdAt = new Date(englishDate)

        return new PersianDate(createdAt).format('YYYY/MM/DD')
    }

    return (
        <>
            <div className="nav-wrapper">
                <Navbar user={user}/>
            </div>
            <div className="container">
                <Breadcrumb path={
                    [
                        {text: "خانه", href: ""},
                        {text: "دوره ها", href: "courses"},
                        {text: course.category.title, href: categoryId},
                        {text: course.title, href: courseId},
                    ]
                }/>

                <div className="flex-space-align0 m-t-20">
                    <div className="flex-col">
                        <div className={styles['top']}>
                            <h1 className={styles['title']}>{course.title}</h1>
                            <p className={styles['caption']}>{course.shortCaption}</p>
                        </div>
                        <div className={styles['header-buttons']}>
                            <p className={styles['is-student']}>
                                <IoPersonSharp className={styles['icon']}/>
                                شما دانشجوی این دوره هستید
                            </p>
                            <Link href="#" className={styles['course-link']}>
                                <FaBookOpen className={styles['icon']}/>
                                مشاهده دوره
                            </Link>
                        </div>
                    </div>
                    <div className={styles['video-wrapper']}>
                        <VideoPlayer
                            src={course.introductionVideo}
                            poster={course.introductionPoster}
                        />
                    </div>
                </div>

                <div className={styles['feature-parent']}>
                    <div className={`right ${styles['right']}`}>
                        <div className="row">
                            <div className="flex-all-center m-b-2 col-zero-12 col-sm-4">
                                <div className={styles['course-feature-item']}>
                                    <FaUsers className={styles['feature-icon']}/>
                                    <div className={styles['feature-content']}>
                                        <h4 className={styles['feature-title']}>روش پشتیبانی</h4>
                                        <p className={styles['feature-caption']}>آنلاین</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-all-center m-b-2 col-zero-12  col-sm-4">
                                <div className={styles['course-feature-item']}>
                                    <FaVideo className={styles['feature-icon']}/>
                                    <div className={styles['feature-content']}>
                                        <h4 className={styles['feature-title']}>پیش نیاز</h4>
                                        <p className={styles['feature-caption']}>ReactJS</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-all-center m-b-2 col-zero-12  col-sm-4">
                                <div className={styles['course-feature-item']}>
                                    <BsBagFill className={styles['feature-icon']}/>
                                    <div className={styles['feature-content']}>
                                        <h4 className={styles['feature-title']}>نوع مشاهده</h4>
                                        <p className={styles['feature-caption']}>
                                            {course.canDownload ? "دانلودی آنلاین" : "آنلاین"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-all-center m-b-2 col-zero-12  col-sm-4">
                                <div className={styles['course-feature-item']}>
                                    <FaInfoCircle className={styles['feature-icon']}/>
                                    <div className={styles['feature-content']}>
                                        <h4 className={styles['feature-title']}>وضعیت دوره</h4>
                                        <p className={styles['feature-caption']}>
                                            {course.isComplete ? "تکمیل شده" : "در حال برگزاری"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-all-center m-b-2 col-zero-12 col-sm-4">
                                <div className={styles['course-feature-item']}>
                                    <FaClock className={styles['feature-icon']}/>
                                    <div className={styles['feature-content']}>
                                        <h4 className={styles['feature-title']}>مدت زمان دوره</h4>
                                        <p className={styles['feature-caption']}>{course.duration} ساعت</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-all-center m-b-2 col-zero-12  col-sm-4">
                                <div className={styles['course-feature-item']}>
                                    <SlCalender className={styles['feature-icon']}/>
                                    <div className={styles['feature-content']}>
                                        <h4 className={styles['feature-title']}>آخرین بروزرسانی</h4>
                                        <p className={styles['feature-caption']}>
                                            {lastUpdate.toString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles['last-caption-wrapper']} ${styles['last-caption-wrapper-2']}`}>
                            <div className={styles['features-wrapper']}>
                                <div className={styles['feature-index']}>
                                    <FaPeopleGroup className={styles['feature-index-icon']}/>
                                    <div className={styles['feature-index__content']}>
                                        <h4 className={styles['feature-index__title']}>1905</h4>
                                        <p className={styles['feature-index__caption']}>دانشجو</p>
                                    </div>
                                </div>
                                <div className={styles['feature-index']}>
                                    <FaStar className={styles['fill-yellow']}/>
                                    <div className={styles['feature-index__content']}>
                                        <h4 className={styles['feature-index__title']}>رضایت</h4>
                                        <p className={styles['feature-index__caption']}>5.0</p>
                                    </div>
                                </div>
                            </div>

                            <p className={styles['complete-course']}>
                                <span>درصد تکمیل دوره</span>
                                <span>80%</span>
                            </p>
                            <div className={styles['complete-wrapper']}>
                                <div className={styles['complete-value']} style={{width: "80%"}}></div>
                            </div>
                        </div>
                        <div className={`${styles['teacher-wrapper']} ${styles['teacher-wrapper-none']}`}>

                            <img src={course.creator.profile} alt="Teacher Profile"
                                 className={styles['teacher-profile']}/>
                            <h3 className={styles['teacher-name']}>{course.creator.username}</h3>
                            <Link className={styles['teacher-link']} href="#">مشاهده پروفایل من</Link>
                        </div>
                        <ArticleCourse/>
                        <SeasonCourse
                            courseId={courseId}
                            categoryId={categoryId}
                            seasons={cleanedParts}
                        />

                        <RelatedCourses
                            items={
                                relatedCourses.map(course => {
                                    return {
                                        title: course.title,
                                        href: `/courses/${course.category._id.toString()}/${course._id}`,
                                        image: course.introductionPoster
                                    }
                                })
                            }
                        />

                        <CommentsWrapper
                            person="Sina Saber"
                            bb="dvl,df"
                            comments={
                            comments.map(comment => {
                                return {
                                    itemId: comment.courseId._id.toString(),
                                    id: comment._id.toString(),
                                    name: comment.creator.username,
                                    createdDate: getPersianDate(comment.createdAt),
                                    profile: comment.creator.profile,
                                    role: getRole(comment.creator.role),
                                    message: comment.message,
                                    answers: comment.reply.map(answer => {
                                        return {
                                            name: answer.creator.username,
                                            message: answer.message,
                                            role: getRole(answer.creator.role),
                                            createdDate: getPersianDate(answer.createdAt),
                                            profile: answer.creator.profile
                                        }
                                    })
                                }
                            })
                        }
                        />
                    </div>
                    <div className={`left ${styles['left']}`}>

                        <div className={styles['last-caption-wrapper']}>
                            <div className={styles['features-wrapper']}>
                                <div className={styles['feature-index']}>
                                    <FaPeopleGroup className={styles['feature-index-icon']}/>
                                    <div className={styles['feature-index__content']}>
                                        <h4 className={styles['feature-index__title']}>1905</h4>
                                        <p className={styles['feature-index__caption']}>دانشجو</p>
                                    </div>
                                </div>
                                <div className={styles['feature-index']}>
                                    <FaStar className={styles['fill-yellow']}/>
                                    <div className={styles['feature-index__content']}>
                                        <h4 className={styles['feature-index__title']}>رضایت</h4>
                                        <p className={styles['feature-index__caption']}>5.0</p>
                                    </div>
                                </div>
                            </div>

                            <p className={styles['complete-course']}>
                                <span>درصد تکمیل دوره</span>
                                <span>80%</span>
                            </p>
                            <div className={styles['complete-wrapper']}>
                                <div className={styles['complete-value']} style={{width: "80%"}}></div>
                            </div>
                        </div>

                        <div className={styles['teacher-wrapper']}>
                            <img src={course.creator.profile} alt="Teacher Profile"
                                 className={styles['teacher-profile']}/>
                            <h3 className={styles['teacher-name']}>{course.creator.username} | مدرس دوره</h3>
                            <Link className={styles['teacher-link']} href="#">مشاهده پروفایل من</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}