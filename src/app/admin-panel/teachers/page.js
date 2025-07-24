"use client"

import styles from "./page.module.css"
import {IoIosArrowDown} from "react-icons/io";
import SimpleSwiper from "@/components/SimpleSwiper/SimpleSwiper";
import SweetAlert from "sweetalert2";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import ModalItems from "@/components/ModalItems/ModalItems";

import Link from "next/link"

export default () => {
    const [teachers, setTeachers] = useState([])

    const [windowWidth, setWindowWidth] = useState(0);

    const [isShowModalArticles, setShowModalArticles] = useState(false)
    const [isShowCoursesModal, setShowCoursesModal] = useState(false)
    const [isShowSort, setIsShowSort] = useState(false)

    const getTeachers = async () => {
        const res = await fetch(`/api/users`)
        const json = await res.json()

        if (res.status === 200) {
            setTeachers(json.filter(user => user.role === "Teacher"))
        }
    }

    useEffect(() => {
        getTeachers().then()


        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // مقدار اولیه هم بخوای بگیری:
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    useEffect(() => {
        setWindowWidth(window.innerWidth)

        const close = () => {
            setIsShowSort(false)
        }

        window.addEventListener("click", close);

        return () => {
            window.removeEventListener("click", close);
        }
    }, []);

    function downToUser(phone) {
        let res = null
        let json = null
        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از تنزل مدرس به کاربر عادی اطمینان دارید ؟",
            icon: "info",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
            confirmButtonColor: "#c32525",
            cancelButtonColor: "#1EB35B",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                res = await fetch(`/api/users/downgrade`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({phone}),
                })
            }
        }).then(result => {
            if (result.isConfirmed) {
                if (res.status === 200) {
                    toast.success("مدرس تنزل یافت به کاربر")
                    setTeachers(prev => prev.filter(user => user.phone !== phone))
                } else {
                    toast.success(json)
                }
            }
        })
    }

    function blockTeacher(phone) {
        let res = null
        let json = null

        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از بلاک مدرس اطمینان دارید ؟",
            icon: "info",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
            confirmButtonColor: "#c32525",
            cancelButtonColor: "#1EB35B",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                res = await fetch(`/api/users/block`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({phone})
                })
                json = await res.json()
            }
        }).then(result => {
            if (result.isConfirmed) {
                if (res.status === 200) {
                    toast.success(json)
                    setTeachers(prev => {
                        return prev.map(user => {
                            if (user.phone === phone) {
                                user.isBlock = true
                                return user
                            } else {
                                return user
                            }
                        })
                    })
                } else {
                    toast.error(json)
                }
            }
        })
    }

    function removeTeacher(phone) {
        let res = null
        let json = null
        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از حذف مدرس اطمینان دارید ؟",
            icon: "info",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
            confirmButtonColor: "#c32525",
            cancelButtonColor: "#1EB35B",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                res = await fetch(`/api/users/remove`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({phone})
                })
                json = await res.json()
            }
        }).then(result => {
            if (result.isConfirmed) {
                if (res.status === 200) {
                    toast.success("مدرس حذف شد")
                    setTeachers(prev => {
                        return prev.filter(user => user.phone !== phone)
                    })
                } else {
                    toast.error(json)
                }
            }
        })
    }

    return (
        <div
            className={styles['teachers']}>
            <div className={styles['header']}>
                <h3 className={styles['teacher-title']}>لیست مدرس ها</h3>
                <div className={styles['sort-wrapper']}>
                    <p
                        onClick={e => {
                            e.stopPropagation()
                            setIsShowSort(prev => !prev)
                        }}
                        className={styles['current-sort']}>
                        بیشترین درآمد
                        <IoIosArrowDown
                            style={{rotate: isShowSort ? "180deg" : "0deg"}}
                            className={styles['arrow-icon']}/>
                    </p>
                    <div
                        style={isShowSort ? {opacity: "1", zIndex: "20", top: "100%"} : {
                            opacity: "0",
                            zIndex: "-1",
                            top: "0"
                        }}
                        className={styles['sort-items']}>
                        <p className={styles['sort-item']}>بیشترین دوره</p>
                        <p className={styles['sort-item']}>بیشترین ساعت آموزش</p>
                        <p className={styles['sort-item']}>بیشترین مقاله</p>
                    </div>
                </div>
            </div>
            <div
                className={styles['teachers-wrapper']}>
                <div className={styles['teachers-wrapper-header']}>
                    <div className={`${windowWidth < 600 ? styles['grid'] : "row"}`}>
                        <div className={`col-2`}>
                            <p className={styles['header-content']}>پروفایل</p>
                        </div>
                        <div className={`col-3 ${styles['flex-all-center']}`}>
                            <p className={styles['header-content']}>نام</p>
                        </div>
                        <div className={`col-2 ${styles['none-md']} ${styles['flex-all-center']}`}>
                            <p style={{fontSize: "1.1rem"}} className={styles['header-content']}>تعداد دوره ها</p>
                        </div>
                        <div className={`col-2 ${styles['none-md']} ${styles['flex-all-center']}`}>
                            <p style={{fontSize: "1.1rem"}} className={styles['header-content']}>تعداد مقاله ها</p>
                        </div>
                    </div>
                </div>
                {
                    teachers.map(teacher => (
                        <div key={teacher._id} className={styles['teacher']}>
                            {
                                teacher.isBlock ? <div className={styles['block']}>مدرس بلاک است</div>
                                    : null
                            }
                            <div className={`${windowWidth < 600 ? styles['flex-space'] : "row"}`}>
                                <div className={`${windowWidth > 600 ? "col-2" : ""} ${styles['profile-wrapper']}`}>
                                    <img className={styles['profile']} src={teacher.profile} alt="Profile Image"/>
                                </div>
                                <div className={`${windowWidth > 600 ? "col-3" : ""} ${styles['flex-all-center']}`}>
                                    <p className={styles['teacher-content']}>{teacher.username}</p>
                                </div>
                                <div className={`${windowWidth > 600 ? "col-2" : ""} ${styles['flex-all-center']}`}>
                                    <p className={`${styles['teacher-content']} ${styles['none-md']}`}>10</p>
                                </div>
                                <div className={`${windowWidth > 600 ? "col-2" : ""} ${styles['flex-all-center']}`}>
                                    <p className={`${styles['teacher-content']} ${styles['none-md']}`}>4</p>
                                </div>
                                <div className={`${windowWidth > 600 ? "col-3" : ""} ${styles['flex-align']}`}>
                                    <div style={{width: "10rem"}} className={styles['teacher-buttons']}>
                                        <SimpleSwiper numberItems={1} items={
                                            [
                                                <button onClick={() => blockTeacher(teacher.phone)}
                                                        className={`${styles['teacher-button']} ${styles['red']}`}>بلاک
                                                    مدرس</button>,
                                                <button onClick={() => removeTeacher(teacher.phone)}
                                                        className={`${styles['teacher-button']} ${styles['red']}`}>حذف
                                                    مدرس</button>,
                                                <button onClick={() => downToUser(teacher.phone)}
                                                        className={`${styles['teacher-button']} ${styles['red']}`}>تنزل
                                                    به کاربر</button>,
                                                <button onClick={() => setShowCoursesModal(true)}
                                                        className={`${styles['teacher-button']} ${styles['yellow']}`}>لیست
                                                    دوره ها</button>,
                                                <button onClick={() => setShowModalArticles(true)}
                                                        className={`${styles['teacher-button']}`}>لیست مقاله ها</button>
                                            ]
                                        }/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                isShowCoursesModal ? <ModalItems set={setShowCoursesModal} title="لیست دوره های رامین سعیدی راد" items={
                    [
                        <div className={styles['course-box']}>
                            <img className={styles['course-img']} src="/images/course-1.webp" alt="Nest JS Course"/>
                            <h4 className={styles['course-title']}>آموزش پروژه محور Nest JS</h4>
                            <Link className={styles['course-link']} href="#">رفتن به دوره</Link>
                        </div>,
                        <div className={styles['course-box']}>
                            <img className={styles['course-img']} src="/images/course-1.webp" alt="Nest JS Course"/>
                            <h4 className={styles['course-title']}>آموزش پروژه محور Nest JS</h4>
                            <Link className={styles['course-link']} href="#">رفتن به دوره</Link>
                        </div>,
                        <div className={styles['course-box']}>
                            <img className={styles['course-img']} src="/images/course-1.webp" alt="Nest JS Course"/>
                            <h4 className={styles['course-title']}>آموزش پروژه محور Nest JS</h4>
                            <Link className={styles['course-link']} href="#">رفتن به دوره</Link>
                        </div>,
                        <div className={styles['course-box']}>
                            <img className={styles['course-img']} src="/images/course-1.webp" alt="Nest JS Course"/>
                            <h4 className={styles['course-title']}>آموزش پروژه محور Nest JS</h4>
                            <Link className={styles['course-link']} href="#">رفتن به دوره</Link>
                        </div>,
                        <div className={styles['course-box']}>
                            <img className={styles['course-img']} src="/images/course-1.webp" alt="Nest JS Course"/>
                            <h4 className={styles['course-title']}>آموزش پروژه محور Nest JS</h4>
                            <Link className={styles['course-link']} href="#">رفتن به دوره</Link>
                        </div>
                    ]
                }/> : null
            }
            {
                isShowModalArticles ? <ModalItems
                    set={setShowModalArticles}
                    items={
                        [
                            <div className={styles['course-box']}>
                                <img className={styles['course-img']} src="/images/article-programmer.webp"
                                     alt="Nest JS Course"/>
                                <h4 className={styles['course-title']}>اشتباه 90% تازه کارها در برنامه نویسی</h4>
                                <Link className={styles['course-link']} href="#">رفتن به مقاله</Link>
                            </div>,
                            <div className={styles['course-box']}>
                                <img className={styles['course-img']} src="/images/article-programmer.webp"
                                     alt="Nest JS Course"/>
                                <h4 className={styles['course-title']}>اشتباه 90% تازه کارها در برنامه نویسی</h4>
                                <Link className={styles['course-link']} href="#">رفتن به مقاله</Link>
                            </div>,
                            <div className={styles['course-box']}>
                                <img className={styles['course-img']} src="/images/article-programmer.webp"
                                     alt="Nest JS Course"/>
                                <h4 className={styles['course-title']}>اشتباه 90% تازه کارها در برنامه نویسی</h4>
                                <Link className={styles['course-link']} href="#">رفتن به مقاله</Link>
                            </div>,
                            <div className={styles['course-box']}>
                                <img className={styles['course-img']} src="/images/article-programmer.webp"
                                     alt="Nest JS Course"/>
                                <h4 className={styles['course-title']}>اشتباه 90% تازه کارها در برنامه نویسی</h4>
                                <Link className={styles['course-link']} href="#">رفتن به مقاله</Link>
                            </div>,
                            <div className={styles['course-box']}>
                                <img className={styles['course-img']} src="/images/article-programmer.webp"
                                     alt="Nest JS Course"/>
                                <h4 className={styles['course-title']}>اشتباه 90% تازه کارها در برنامه نویسی</h4>
                                <Link className={styles['course-link']} href="#">رفتن به مقاله</Link>
                            </div>,
                        ]
                    }
                    title={"لیست مقالات محمد امین سعیدی راد"}
                /> : null
            }
        </div>
    )
}