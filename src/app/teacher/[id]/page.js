import styles from "./Teacher.module.css"
import Navbar from "@/components/Navbar/Navbar";
import CourseSort from "@/components/CourseSort/CourseSort";
import TeacherBox from "@/components/TeacherBox/TeacherBox";
import CourseItem from "@/components/CourseItem/CourseItem";
import Footer from "@/components/Footer/Footer";

export default ({params}) => {
    return (
        <>
            <div className={styles['nav-wrapper']}>
                <Navbar hasSearch={true}/>
            </div>
            <div className="container m-t-20">
                <div className="flex">
                    <aside className={styles['side-bar']}>
                        <TeacherBox
                        caption="اولین کدم رو 14 سالگی زدم، حدود 9 سال پیش که با زبان ویژوال بیسیک بود و بعد حدودا 2 سال تو فیلد برنامه نویسی موبایل با زبان جاوا کار کردم و در نهایت با عشقی به اسم جاوا اسکریپت آشنا شدم و حدودا یه 7 سالی هست جاوا اسکریپت کد می‌زنم و به صورت Mern Stack فعالیت می‌کنم."
                        name="رامین سعیدی راد"
                        profile="/images/teacher.png"
                        skills={["HTML", "CSS", "Java Script", "Bootstrap", "React", "Next JS", "Redux"]}
                        socialLinks={
                            [
                                {href: "#", icon: "instagram"},
                                {href: "#", icon: "telegram"}
                            ]
                        }
                        />
                    </aside>
                    <div className={styles['left']}>
                        <CourseSort
                            sortItems={
                                [
                                    {selected: true, text: "همه دوره ها"},
                                    {selected: false, text: "ارزان ترین"},
                                    {selected: false, text: "گرانترین ترین"},
                                    {selected: false, text: "پر مخاطب ها"},
                                ]
                            }
                        />
                        <div className={`${styles['teachers-wrapper']} m-t-20`}>
                            <CourseItem
                                price={750_000}
                                title="آموزش پروژه محور NestJS از صفر!"
                                caption="NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر"
                                students={502}
                                img="/images/course-1.webp"
                                offer={20}
                                scores={4.5}
                                teacher="معین باغشیخی"
                            />
                            <CourseItem
                                price={750_000}
                                title="آموزش پروژه محور NestJS از صفر!"
                                caption="NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر"
                                students={502}
                                img="/images/course-1.webp"
                                offer={20}
                                scores={4.5}
                                teacher="معین باغشیخی"
                            />
                            <CourseItem
                                price={750_000}
                                title="آموزش پروژه محور NestJS از صفر!"
                                caption="NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر"
                                students={502}
                                img="/images/course-1.webp"
                                offer={20}
                                scores={4.5}
                                teacher="معین باغشیخی"
                            />
                            <CourseItem
                                price={750_000}
                                title="آموزش پروژه محور NestJS از صفر!"
                                caption="NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر"
                                students={502}
                                img="/images/course-1.webp"
                                offer={20}
                                scores={4.5}
                                teacher="معین باغشیخی"
                            />
                            <CourseItem
                                price={750_000}
                                title="آموزش پروژه محور NestJS از صفر!"
                                caption="NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر"
                                students={502}
                                img="/images/course-1.webp"
                                offer={20}
                                scores={4.5}
                                teacher="معین باغشیخی"
                            />
                            <CourseItem
                                price={750_000}
                                title="آموزش پروژه محور NestJS از صفر!"
                                caption="NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر"
                                students={502}
                                img="/images/course-1.webp"
                                offer={20}
                                scores={4.5}
                                teacher="معین باغشیخی"
                            />
                            <CourseItem
                                price={750_000}
                                title="آموزش پروژه محور NestJS از صفر!"
                                caption="NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر"
                                students={502}
                                img="/images/course-1.webp"
                                offer={20}
                                scores={4.5}
                                teacher="معین باغشیخی"
                            />
                            <CourseItem
                                price={750_000}
                                title="آموزش پروژه محور NestJS از صفر!"
                                caption="NestJS یه فریم‌ورک توسعه سمت سرور وب با TypeScript برای ساخت برنامه‌های مبتنی بر"
                                students={502}
                                img="/images/course-1.webp"
                                offer={20}
                                scores={4.5}
                                teacher="معین باغشیخی"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}