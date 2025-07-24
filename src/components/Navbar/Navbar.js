"use client"

//=-=-=-=-=-=-=-=-=-=- Styles =-=-=-=-=-=-=-=-=-=-
import styles from "./Navbar.module.css"
import Link from "next/link"

//=-=-=-=-=-=-=-=-=-=- Components =-=-=-=-=-=-=-=-=-=-
import {IoBag, IoSearch, IoSunny} from "react-icons/io5";
import {FaMoon, FaHome, FaPowerOff} from "react-icons/fa";
import {MdAccountCircle} from "react-icons/md";
import {useEffect, useState} from "react";
import {BiSolidMessage} from "react-icons/bi";
import {GoFileDirectoryFill} from "react-icons/go";
import BasketItem from "@/components/BasketItem/BasketItem";
import {IoIosArrowBack} from "react-icons/io";
import {usePathname, useRouter} from "next/navigation";
import {GiHamburgerMenu} from "react-icons/gi";
import {toast} from "react-toastify";


export default ({user, hasSearch}) => {
    const router = useRouter()
    console.log("user => ", user)
    const [windowWidth, setWindowWidth] = useState(0);

    const [showMenu, setShowMenu] = useState(false)

    const path = usePathname()

    const [isShowMenu, setIsShowMenu] = useState(false);
    const [hoverItem, setHoverItem] = useState(0);
    const [menuItems, setMenuItems] = useState([]);

    const [isShowAccount, setIsShowAccount] = useState(false)
    const [isShowBasket, setIsShowBasket] = useState(false)
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.style.background = "#111827"
            html.style.color = "#fff"
            document.querySelectorAll(".course-box").forEach(item => {
                item.style.background = "#242A38"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".SectionHeader-module__T5s65a__link").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleBox-module__ynd9IG__article-box").forEach(item => {
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".Description-module__ErDtSG__description-caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Description-module__ErDtSG__effect").forEach(item => {
                item.style.background = "#111827"
            })

            document.querySelectorAll(".BreadCrumb-module__Bya64G__before").forEach(item => {
                item.style.background = "#111827"
            })

            document.querySelectorAll(".BreadCrumb-module__Bya64G__after").forEach(item => {
                item.style.background = "#111827"
            })

            document.querySelectorAll(".course-caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".counts").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".teacher").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".off").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".OurServiceBox-module__G-geFq__caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleBox-module__ynd9IG__contents").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleBox-module__ynd9IG__caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".SectionHeader-module__T5s65a__title").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".SwiperWithButtons-module__H7kvZq__swiper-button").forEach(item => {
                item.classList.add("dark-button")
            })

            document.querySelectorAll(".Footer-module__Grjkva__footer-wrapper").forEach(item => {
                item.style.background = "#242A38"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Footer-module__Grjkva__contact-item").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Footer-module__Grjkva__body-item__caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Footer-module__Grjkva__body-item__caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Footer-module__Grjkva__bottom-content").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Footer-module__Grjkva__body-item__link").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Courses-module__uvHiBG__nav-wrapper").forEach(item => {
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".Navbar-module___rHu7W__category-item").forEach(item => {
                item.style.background = "#242A38"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".category-course").forEach(item => {
                item.style.backgroundColor = "#242A38"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Courses-module__uvHiBG__caption-header").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Articles-module__28W37a__caption-header").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-info-item").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__md-caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Articles-module__28W37a__nav-wrapper").forEach(item => {
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".CourseFilter-module__FyJqZW__filter-item").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".BreadCrumb-module__Bya64G__bread-crumb").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".nav-wrapper").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-recommend").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-recommend-title").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-item-date").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-recommend-item").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#333C4C"
            })

            document.querySelectorAll(".CourseFilter-module__FyJqZW__category-filter-header").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".CourseSort-module__8f4VUG__filter-wrapper").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".CommentsWrapper-module__PmT_GW__comments-wrapper").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#333C4C"
            })

            document.querySelectorAll(".CommentsWrapper-module__PmT_GW__comment-item").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".CommentsWrapper-module__PmT_GW__comment-item-reply").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#333C4C"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__course-feature-item").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__feature-index").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#333C4C"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__last-caption-wrapper").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__teacher-wrapper").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__article-wrapper").forEach(item => {
                item.style.color = "#fff"
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__cover").forEach(item => {
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__small-caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__small-title").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__md-caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__md-title").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__about-caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".SeasonCourse-module__WIXiFq__season-wrapper").forEach(item => {
                item.style.background = "#242A38"
            })

            document.querySelectorAll(".SeasonCourse-module__WIXiFq__season-header").forEach(item => {
                item.style.background = "#333C4C"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".SeasonCourse-module__WIXiFq__episode").forEach(item => {
                item.style.background = "#333C4C"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".RelatedCourses-module__XC5NrW__course").forEach(item => {
                item.style.background = "#333C4C"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__about-title").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__button-question").forEach(item => {
                item.style.background = "#656971"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__right-header").forEach(item => {
                item.style.background = "#333C4C"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__title-wrapper-left").forEach(item => {
                item.style.background = "#333C4C"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__teacher-wrapper").forEach(item => {
                item.style.background = "#333C4C"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__your-improve-wrapper").forEach(item => {
                item.style.background = "#333C4C"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__course-info-wrapper").forEach(item => {
                item.style.background = "#111827"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__course-info-item").forEach(item => {
                item.style.background = "#333C4C"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__captions-wrapper").forEach(item => {
                item.style.background = "#333C4C"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".QuestionWrapper-module__0PRn_W__file-input-wrapper").forEach(item => {
                item.style.background = "#656971"
                item.style.color = "#fff"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__md-caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".QuestionWrapper-module__0PRn_W__message-empty").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".QuestionWrapper-module__0PRn_W__create-caption").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".QuestionWrapper-module__0PRn_W__create-name").forEach(item => {
                item.style.color = "#fff"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__feature-caption").forEach(item => {
                item.style.color = "#fff"
            })
        } else {
            html.style.background = "#fff"
            html.style.color = "#000"

            document.querySelectorAll(".course-box").forEach(item => {
                item.style.background = "#fff"
                item.style.color = "#000"
            })


            document.querySelectorAll(".BreadCrumb-module__Bya64G__before").forEach(item => {
                item.style.background = "#F3F4F6"
            })

            document.querySelectorAll(".BreadCrumb-module__Bya64G__after").forEach(item => {
                item.style.background = "#F3F4F6"
            })

            document.querySelectorAll(".SectionHeader-module__T5s65a__link").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".ArticleBox-module__ynd9IG__article-box").forEach(item => {
                item.style.background = "#fff"
            })

            document.querySelectorAll(".Description-module__ErDtSG__description-caption").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".Description-module__ErDtSG__effect").forEach(item => {
                item.style.background = "#fff"
            })

            document.querySelectorAll(".course-caption, .counts, .teacher, .off").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".OurServiceBox-module__G-geFq__caption").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".ArticleBox-module__ynd9IG__contents, .ArticleBox-module__ynd9IG__caption").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".SectionHeader-module__T5s65a__title").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".SwiperWithButtons-module__H7kvZq__swiper-button").forEach(item => {
                item.classList.remove("dark-button")
            })

            document.querySelectorAll(".Footer-module__Grjkva__footer-wrapper").forEach(item => {
                item.style.background = "#f0f0f0"
                item.style.color = "#000"
            })

            document.querySelectorAll(".Footer-module__Grjkva__contact-item, .Footer-module__Grjkva__body-item__caption, .Footer-module__Grjkva__bottom-content, .Footer-module__Grjkva__body-item__link").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".Courses-module__uvHiBG__nav-wrapper").forEach(item => {
                item.style.background = "#fff"
            })

            document.querySelectorAll(".Navbar-module___rHu7W__category-item, .category-course").forEach(item => {
                item.style.backgroundColor = "#fff"
                item.style.color = "#000"
            })

            document.querySelectorAll(".Courses-module__uvHiBG__caption-header, .Articles-module__28W37a__caption-header").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-info-item, .ArticlePage-module__IyaVRq__md-caption").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".Articles-module__28W37a__nav-wrapper").forEach(item => {
                item.style.background = "#fff"
            })

            document.querySelectorAll(".CourseFilter-module__FyJqZW__filter-item").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".BreadCrumb-module__Bya64G__bread-crumb").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".nav-wrapper").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-recommend").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-recommend-title, .ArticlePage-module__IyaVRq__article-item-date").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".ArticlePage-module__IyaVRq__article-recommend-item").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#f7f7f7"
            })

            document.querySelectorAll(".CourseFilter-module__FyJqZW__category-filter-header, .CourseSort-module__8f4VUG__filter-wrapper").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".CommentsWrapper-module__PmT_GW__comments-wrapper").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#f7f7f7"
            })

            document.querySelectorAll(".CommentsWrapper-module__PmT_GW__comment-item").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".CommentsWrapper-module__PmT_GW__comment-item-reply").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#f0f0f0"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__course-feature-item").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__feature-index").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#f7f7f7"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__last-caption-wrapper, .CoursePage-module__MXTwhW__teacher-wrapper").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__article-wrapper").forEach(item => {
                item.style.color = "#000"
                item.style.background = "#fff"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__cover").forEach(item => {
                item.style.background = "#fff"
            })

            document.querySelectorAll(".CoursePage-module__MXTwhW__caption").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".ArticleCourse-module__oO2T_q__small-caption, .ArticleCourse-module__oO2T_q__small-title, .ArticleCourse-module__oO2T_q__md-caption, .ArticleCourse-module__oO2T_q__md-title, .ArticleCourse-module__oO2T_q__about-caption, .ArticleCourse-module__oO2T_q__about-title, .ArticleCourse-module__oO2T_q__caption").forEach(item => {
                item.style.color = "#000"
            })

            document.querySelectorAll(".SeasonCourse-module__WIXiFq__season-wrapper").forEach(item => {
                item.style.background = "#fff"
            })

            document.querySelectorAll(".SeasonCourse-module__WIXiFq__season-header, .SeasonCourse-module__WIXiFq__episode").forEach(item => {
                item.style.background = "#f0f0f0"
                item.style.color = "#000"
            })

            document.querySelectorAll(".RelatedCourses-module__XC5NrW__course").forEach(item => {
                item.style.background = "#f0f0f0"
                item.style.color = "#000"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__button-question").forEach(item => {
                item.style.background = "#ccc"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__right-header, .Episdoe-module__WyePAG__title-wrapper-left, .Episdoe-module__WyePAG__teacher-wrapper, .Episdoe-module__WyePAG__your-improve-wrapper, .Episdoe-module__WyePAG__course-info-wrapper").forEach(item => {
                item.style.background = "#fff"
                item.style.color = "#000"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__course-info-item, .Episdoe-module__WyePAG__captions-wrapper").forEach(item => {
                item.style.background = "#f0f0f0"
                item.style.color = "#000"
            })

            document.querySelectorAll(".QuestionWrapper-module__0PRn_W__file-input-wrapper").forEach(item => {
                item.style.background = "#ccc"
                item.style.color = "#000"
            })

            document.querySelectorAll(".Episdoe-module__WyePAG__md-caption, .QuestionWrapper-module__0PRn_W__message-empty, .QuestionWrapper-module__0PRn_W__create-caption, .QuestionWrapper-module__0PRn_W__create-name, .CoursePage-module__MXTwhW__feature-caption").forEach(item => {
                item.style.color = "#000"
            })
        }

    }, [isDark]);

    const changeMenuItems = async() => {
        const res = await fetch(`/api/courses`)
        const courses = await res.json()

        const categoryResponse = await fetch(`/api/categories`)
        const categories = await categoryResponse.json()

            // [
            // {id: 1, title: "فرانت اند", courses: ['آموزش HTML', "آموزش Flexbox", "آموزش Java Script",
        // "آموزش CSS"]},
            //     {id: 2, title: "بک اند", courses: ['آموزش my sql', "آموزش mongo db"]},
            //     {id: 3, title: "نود جی اس", courses: ['آموزش Node JS', "آموزش Nest JS"]},
            //     {id: 4, title: "وردپرس", courses: ['متخصص وردپرس']}
            // ]

        if (res.status === 200) {
            setMenuItems(
                categories.map(category => {
                    return {
                        id: category._id,
                        title: category.title,
                        courses: courses
                            .filter(course => course.category._id === category._id)
                            .map(course => ({
                                id: course._id,
                                title: course.title
                            }))
                    }
                })
            )
        }
    }

    useEffect(() => {
        changeMenuItems().then()

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize(); // مقدار اولیه

        window.addEventListener("resize", handleResize);

        window.addEventListener("click", () => setShowMenu(false))

        let theme = localStorage.getItem("theme")
        if (theme) {
            if (theme === "dark") {
                setIsDark(true)
            }
        } else {
            localStorage.setItem("theme", "light")
        }

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    const changeTheme = () => {
        const theme = localStorage.getItem("theme")
        if (theme === "dark") {
            setIsDark(false)
            localStorage.setItem("theme", "light")
        } else {
            localStorage.setItem("theme", "dark")
            setIsDark(true)
        }
    }

    const getLink = role => {
        switch (role) {
            case "User": {
                return "/user-panel"
            }
            case "Teacher": {
                return "/teacher-panel"
            }
            case "Admin": {
                return "/admin-panel"
            }
        }
    }

    const logOut = async () => {
        try {
            await fetch(`/api/authentication/signout`)
            router.push("/")
            toast.info("شما از حساب کاربری خود خارج شدید")
        }catch (error) {
            toast.error("مشکلی پیش آمده")
        }
    }

    return (
        <div
            style={(isShowAccount || isShowBasket) ? {zIndex: "1000"} : {zIndex: "1"}}
            className={styles['navbar']}>
            {
                isShowMenu ? <div className={styles['hover-menu-back']}></div> : null
            }
            {
                user ? (isShowAccount || isShowBasket) ?
                    <div onClick={() => {
                        setIsShowAccount(false)
                        setIsShowBasket(false)
                    }} className={styles['back-filter']}></div> : null : null
            }
            <div className={styles['nav-wrapper']}>
                <div className={styles['right']}>
                    <GiHamburgerMenu
                        onClick={e => {
                            e.stopPropagation()
                            setShowMenu(true)
                        }}
                        className={`${styles['button-menu']} ${styles['button-menu-search']}`}/>
                    <Link href="/">
                        <img className={`${styles['logo']} ${styles['right-logo']}`} src="/images/logo.png"
                             alt="Logo Sabzlearn"/>
                    </Link>
                    <div
                        style={(isShowAccount || isShowBasket) ? {zIndex: "1"} : {zIndex: "200"}}
                        onMouseEnter={() => setIsShowMenu(true)}
                        onMouseLeave={() => {
                            setIsShowMenu(false)
                            setHoverItem(0)
                        }}
                        className={`${styles['hover-menu-wrapper']} ${styles['hover-menu-wrapper--hide']}`}>
                        <Link
                            href="#" className={styles['nav-link']}>دوره های آموزشی</Link>
                        {
                            menuItems.filter(item => item.id === hoverItem).map(item => (
                                <div
                                    id="category-sub-wrapper"
                                    onMouseEnter={() => {
                                        setHoverItem(item.id)
                                    }} key={item.id}
                                    style={{height: `${32.385 * menuItems.length}px`}} className="category-courses">
                                    {
                                        item.courses.map((course, index) => (
                                            <Link key={index} href={`/courses/${item.id}/${course.id}`} className="category-course">{course.title}</Link>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        <div
                            style={isShowMenu ? {display: "block", zIndex: "200"} : {display: "none"}}
                            onMouseLeave={() => setHoverItem(0)}
                            className={styles['hover-menu-items']}>
                            {
                                menuItems.map(item => (
                                    <div
                                        onMouseEnter={() => setHoverItem(item.id)}
                                        key={item.id} className={styles['category-item']}>
                                        <Link href="#" className={styles['category-content']}>
                                            {item.title}
                                            <IoIosArrowBack className={styles['category-icon']}/>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <Link
                        style={windowWidth <= 1070 ? {display: "none"} : path === "/teachers" ? {color: "#1EB35B"} : null}
                        href="/courses"
                        className={styles['nav-link']}>همه ی دوره ها</Link>
                    <Link
                        style={windowWidth <= 1070 ? {display: "none"} : path === "/articles" ? {color: "#1EB35B"} : {}}
                        href="/articles"
                        className={styles['nav-link']}>مقالات</Link>
                </div>
                <div className={styles['center']}>
                    <Link href="/">
                        <img className={styles['logo']} src="/images/logo.png" alt="Logo Sabzlearn"/>
                    </Link>
                </div>
                <div className={styles['left']}>
                    {
                        hasSearch ?
                            <div
                                style={{display: windowWidth <= 940 ? "none" : "block"}}
                                className={styles['search-wrapper']}>
                                <input className={styles['search-input']} type="text"
                                       placeholder="چیو میخوای یاد بگیری"/>
                                <IoSearch className={styles['search-icon']}/>
                            </div> : null
                    }
                    {
                        isDark ? <IoSunny onClick={changeTheme} className={styles['icon']}/> :
                            <FaMoon onClick={changeTheme} className={styles['icon']}/>
                    }
                    {
                        user ? <div style={isShowAccount ? {zIndex: "200"} : {}}
                                    className={`${styles['dropdown-wrapper']}`}>
                                <MdAccountCircle style={isShowAccount ? {zIndex: "999"} : {}}
                                                 onClick={() => setIsShowAccount(prev => !prev)}
                                                 className={styles['icon']}/>
                                <div style={isShowAccount ? {display: "block"} : {display: "none"}}
                                     className={`${styles['drop-items']} ${styles['drop-account']}`}>
                                    <div className={styles['header']}>
                                        <img src={user.profile} alt="Profile Image"
                                             className={styles['profile']}/>
                                        <div className={styles['header-left']}>
                                            <h5 className={styles['name']}>{user.username}</h5>
                                            <span className={styles['inventory']}>موجودی : 0 تومان</span>
                                        </div>
                                    </div>
                                    <div className={styles['body']}>
                                        <Link href={getLink(user.role)} className={styles['body-item']}>
                                            <FaHome className={styles['account-icon']}/>
                                            پیشخوان
                                        </Link>
                                        <Link href={`${getLink(user.role)}/courses`} className={styles['body-item']}>
                                            <MdAccountCircle className={styles['account-icon']}/>
                                            دوره های من
                                        </Link>
                                        <Link href={`${getLink(user.role)}/tickets`} className={styles['body-item']}>
                                            <BiSolidMessage className={styles['account-icon']}/>
                                            تیکت های من
                                        </Link>
                                        <Link href={`${getLink(user.role)}`} className={styles['body-item']}>
                                            <GoFileDirectoryFill className={styles['account-icon']}/>
                                            جزئیات حساب
                                        </Link>
                                    </div>
                                    <p
                                        onClick={logOut}
                                        className={`${styles['body-item']} ${styles['last-body']}`}>
                                        <FaPowerOff className={`${styles['account-icon']} `}/>
                                        خروج
                                    </p>
                                </div>
                            </div>
                            : <Link className={styles['link-auth']} href="/authentication">ورود / ثبت نام</Link>
                    }
                    <div style={isShowBasket ? {zIndex: "200"} : {}} className={styles['dropdown-wrapper']}>
                        <div className={styles['has-item']}></div>
                        <IoBag onClick={() => setIsShowBasket(prev => !prev)} className={styles['icon']}/>
                        <div style={isShowBasket ? {display: "block", width: "35rem"} : {
                            display: "none",
                            width: "35rem"
                        }}
                             className={styles['drop-items']}>
                            <div className={styles['basket-header']}>
                                <p className={styles['basket-title']}>سبد خرید من</p>
                                <p className={styles['basket-value']}>2 دوره</p>
                            </div>
                            <div className={styles['basket-body']}>
                                <BasketItem
                                    price={4_000_000}
                                    title="متخصص Next JS"
                                    offer={20} متخصص Next JS
                                    image="/images/course-1.webp"
                                />
                                <BasketItem
                                    price={4_000_000}
                                    title="متخصص Next JS"
                                    offer={20} متخصص Next JS
                                    image="/images/course-1.webp"
                                />
                                <BasketItem
                                    price={4_000_000}
                                    title="متخصص Next JS"
                                    offer={20} متخصص Next JS
                                    image="/images/course-1.webp"
                                />
                                <BasketItem
                                    price={4_000_000}
                                    title="متخصص Next JS"
                                    offer={20}
                                    image="/images/course-1.webp"
                                />
                            </div>
                            <div className={styles['price-wrapper']}>
                                <p className={styles['price-title']}>مبلغ قابل پرداخت : </p>
                                <p className={styles['price-value']}>5,000,000 تومان</p>
                            </div>
                            <Link href="#" className={styles['buy-link']}>مشاهده سبد خرید</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['nav-wrapper']}>
                {
                    hasSearch ?
                        <div
                            style={{
                                display: windowWidth >= 940 ? "none" : "block",
                                marginBottom: "1rem",
                                width: "100%"
                            }}
                            className={styles['search-wrapper']}>
                            <input className={styles['search-input']} type="text" placeholder="چیو میخوای یاد بگیری"/>
                            <IoSearch className={styles['search-icon']}/>
                        </div> : null
                }
            </div>
            <div
                onClick={e => e.stopPropagation()}
                style={{right: showMenu ? "0" : "-50%"}}
                className={styles['menu']}>
                <h3 className={styles['menu-title']}>دسته بندی دوره ها</h3>
                <Link className={styles['menu-link']} href="#">فرانت اند</Link>
                <Link className={styles['menu-link']} href="#">بک اند</Link>
                <Link className={styles['menu-link']} href="#">نود جی اس</Link>
                <Link className={styles['menu-link']} href="#">وردپرس</Link>
                <Link className={styles['menu-link']} href="#">همه دوره ها</Link>
                <Link className={styles['menu-link']} href="#">مقالات</Link>
            </div>
        </div>
    )
}