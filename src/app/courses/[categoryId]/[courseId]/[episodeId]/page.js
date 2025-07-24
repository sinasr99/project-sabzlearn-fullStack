import styles from "./Episdoe.module.css"
import Navbar from "@/components/Navbar/Navbar";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";
import {TbArticleFilled} from "react-icons/tb";
import SeasonWrapper from "@/components/SeasonWrapper/SeasonWrapper";
import {FaInfoCircle, FaClock, FaVideo} from "react-icons/fa";

import Link from "next/link";
import {FaMessage} from "react-icons/fa6";
import QuestionWrapper from "@/components/QuestionWrapper/QuestionWrapper";
import Footer from "@/components/Footer/Footer";
import {checkUserNavbar} from "@/functions";
import coursesModel from "@/models/courses";

export default async ({params}) => {
    let user = await checkUserNavbar()

    const {courseId, categoryId, episodeId} = await params

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
                        number: epData.number,
                        id: epData._id.toString(), // 👈 تبدیل به string
                        title: epData.title,
                        video: epData.video
                    }
                })

            return {
                id: seasonData._id.toString(),
                duration: "20 ms",
                isOpen: false,
                title: seasonData.title,
                episodes,
            }
        })


    let currentEpisode = null

    cleanedParts.forEach(season => {
        season.episodes.some(e => {
            if (e.id === episodeId) {
                currentEpisode = e
            }
        })
    })

    let episodesNumber = 0
        cleanedParts.forEach(season => {
        episodesNumber += season.episodes.length
    })

    return (
        <>
            <div className="nav-wrapper">
                <Navbar user={user} hasSearch={true}/>
            </div>
            <div className="container">
                <Breadcrumb path={
                    [
                        {text: "خانه", href: ""},
                        {text: "دوره ها", href: "courses"},
                        {text: course.category.title, href: categoryId},
                        {text: course.title, href: courseId},
                        {text: currentEpisode.title, href: episodeId}
                    ]
                }/>

                <div className={styles['video-wrapper']}>
                    <VideoPlayer src={currentEpisode.video}/>
                </div>

                <div className="flex-space-align0">
                    <div className={styles['right']}>
                        <div className={styles['right-header']}>
                            <div className={styles['episode-top']}>
                                <h3 className={styles['episode-title']}>{course.title}</h3>
                                <div className={styles['episode-caption-wrapper']}>
                                    <span className={styles['episode-number']}>{currentEpisode.number}</span>
                                    <p className={styles['episode-caption']}>{currentEpisode.title}</p>
                                </div>
                            </div>
                            <div className={styles['episode-bottom']}>
                                <a href="#section-question" className={styles['button-question']}>سوال دارم ؟</a>
                                {
                                    course.canDownload ?  <a download href={currentEpisode.video} className={styles['button-download']}>دانلود ویدئو</a>
                                        : null
                                }
                            </div>
                        </div>

                        <div className={styles['captions-wrapper']}>
                            <h2 className={styles['title-wrapper']}>
                                <FaMessage className={styles['message-icon']}/>
                                پرسش و پاسخ
                            </h2>
                            <h4 className={styles['md-title']}>چگونه سوال خود را مطرح کنم تا به بهترین پاسخ ممکن
                                برسم؟</h4>
                            <p className={styles['md-caption']}>
                                برای اینکه مهارت حل مسئله و دیباگ کردن‌تون رو بالا ببرید، قبل از اینکه سوالی بپرسید، با
                                دقت و تمرکز سعی کنید مشکل رو خودتون حل کنید. اگه به جواب نرسیدید، می‌تونید از گوگل کمک
                                بگیرید. اگه با خطایی مواجه شدید یا نیاز به نمونه‌ای داشتید، با استفاده از کلمات کلیدی
                                مختلف توی گوگل سرچ کنید و از سایت‌هایی مثل Stack Overflow کمک بگیرید. (جواب 99٪ سوالات
                                با این روش زیر 5 دقیقه پیدا میشه)
                                از پرسیدن سوالات کلی مثل «من مثل شما انجام دادم ولی کار نکرد» یا «کد من مشکل داره و اجرا
                                نمیشه» که جزئیات ندارن، خودداری کنید. وقتی سوال می‌پرسید، لطفاً اون رو با مستندات و به
                                صورت شفاف و واضح بیان کنید تا قابل تحلیل و بررسی باشه. سعی کنید سوالاتتون مفهومی و دقیق
                                باشه تا مکالمه‌ای که دارید خلاصه و مفید باشه. همچنین قبل از اینکه سوال ارسال کنید، یه
                                بار خودتون اون رو بخونید و مطمئن بشید که سوالتون خوانا و واضحه.
                            </p>

                            <h4 className={styles['md-title']}>چه انتظاراتی از پشتیبانان باید داشته باشم؟</h4>
                            <p className={`${styles['md-caption']} ${styles['border-bottom']}`}>
                                از مدرسین و پشتیبانان انتظارات منطقی و مرتبط با خدمات دریافتی خود داشته باشید. حل مشکلات
                                خارج از مباحث و پروژه های دوره در حیطه وظایف پشتیبانان/مدرسین نیست. اگر نیاز به مشاوره
                                دارید میتوانید از طریق تیکت ها به واحد مشاوره پیام دهید
                            </p>

                            <h4 className={styles['md-title']}>راهنمای سیستم پاسخگویی هوش مصنوعی 🤖</h4>
                            <p className={styles['md-caption']}>
                                این سیستم از هوش مصنوعی برای پاسخ‌دهی سریع و مرتبط به سؤالات شما استفاده می‌کند. زمانی
                                که سؤالی ارسال می‌کنید، هوش مصنوعی بر اساس موضوع دوره‌ای که در آن هستید و عنوان جلسه‌
                                فعلی به سوالات شما پاسخ میدهد.
                                هوش مصنوعی فقط به سؤالات مرتبط با محتوای همین جلسه پاسخ می‌دهد. اگر سؤال شما مستقیماً به
                                این جلسه یا دوره مربوط نباشد، پاسخ داده نمی‌شود.
                            </p>

                            <h4 className={styles['md-title']}>اگر بخواهم مدرس یا پشتیبان پاسخ دهد، چه کنم؟</h4>
                            <p className={`${styles['md-caption']} ${styles['border-bottom']}`}>
                                اگر نیاز به بررسی فایل، کد یا توضیح بیشتر از مدرس دارید، می‌توانید از هوش مصنوعی درخواست
                                کنید که سؤال شما را به پشتیبان ارجاع دهد.
                            </p>

                            <div className={styles['section-question']} id="section-question">
                                <QuestionWrapper episodeId={episodeId.toString()}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles['left']}>
                        <div className={styles['title-wrapper-left']}>
                            <h3 className={styles['episodes-title']}>
                                <TbArticleFilled className={styles['episode-title-icon']}/>
                                سرفصل های دوره
                            </h3>
                            <div className={styles['seasons-wrapper']}>
                                <SeasonWrapper
                                    categoryId={categoryId.toString()}
                                    courseId={courseId.toString()}
                                    seasons={cleanedParts}/>
                            </div>
                        </div>
                        <div className={styles['course-info-wrapper']}>
                            <div className={styles['course-info-item']}>
                                <FaInfoCircle className={styles['course-info-icon']}/>
                                <h4 className={styles['course-info-title']}>وضعیت دوره</h4>
                                <p className={styles['course-info-value']}>{course.isComplete ? "تکمیل شده" : "در حال برگزاری"}</p>
                            </div>
                            <div className={styles['course-info-item']}>
                                <FaClock className={styles['course-info-icon']}/>
                                <h4 className={styles['course-info-title']}>زمان دوره</h4>
                                <p className={styles['course-info-value']}>{course.duration + "ساعات"}</p>
                            </div>
                            <div className={styles['course-info-item']}>
                                <FaVideo className={styles['course-info-icon']}/>
                                <h4 className={styles['course-info-title']}>جلسات دوره</h4>
                                <p className={styles['course-info-value']}>{episodesNumber}</p>
                            </div>
                        </div>
                        <div className={styles['your-improve-wrapper']}>
                            <p className={styles['improve-caption']}>
                                وقتی 70 درصد یک ویدیو را بصورت آنلاین تماشا میکنید، میزان پیشرفت شما بصورت خودکار
                                بروزرسانی میشود.
                            </p>
                            <p className={styles['complete-course']}>
                                <span>درصد پیشرفت شما</span>
                                <span>65%</span>
                            </p>
                            <div className={styles['complete-wrapper']}>
                                <div className={styles['complete-value']} style={{width: "65%"}}></div>
                            </div>
                        </div>
                        <div className={styles['teacher-wrapper']}>
                            <img src="/images/teacher.png" alt="Teacher Profile" className={styles['teacher-profile']}/>
                            <h3 className={styles['teacher-name']}>محمدامین سعیدی راد | مدرس دوره</h3>
                            <Link className={styles['teacher-link']} href="#">مشاهده پروفایل من</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </>
    )
}