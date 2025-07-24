"use client"

import styles from "./page.module.css"

import {IoIosArrowDown} from "react-icons/io";
import {useEffect, useState} from "react";
import SweetAlert from "sweetalert2";
import {toast} from "react-toastify";
import SimpleSwiper from "@/components/SimpleSwiper/SimpleSwiper";


export default () => {
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState(null)

    const [windowWidth, setWindowWidth] = useState(0);

    const [questions, setQuestions] = useState([]);
    const [messages, setMessages] = useState([{
        name: "سینا", message: "دوره بسیار خوبی بود دمت گرم", course: "دوره Next",
    }, {
        name: "الکس", message: "دوره بهترین تو ایران", course: "دوره Rect",
    }, {
        name: "تایلر", message: "دوره خوبی بود ولی گرون", course: "دوره Next",
    },]);
    const [isShowCommentFilter, setIsShowCommentFilter] = useState(false)
    const [isShowCommentSort, setIsShowCommentSort] = useState(false)
    const [isShowQuestionFilter, setIsShowQuestionFilter] = useState(false)
    const [isShowQuestionSort, setIsShowQuestionSort] = useState(false)

    const getQuestions = async () => {
        const res = await fetch(`/api/questions`)
        const json = await res.json()

        if (res.status === 200) {
            setQuestions(json.filter(questin => {
                return questin.episodeId.creator === user._id
            }))
        }
    }

    const getComments = async () => {
        const res = await fetch(`/api/comments`)
        const json = await res.json()

        if (res.status === 200) {
            setComments(json.filter(item => {
                if (item?.courseId) {
                    return item.courseId.creator === user._id
                } else {
                    return item.articleId.creator === user._id
                }
            }))
        }
    }

    const getUser = async () => {
        const res = await fetch(`/api/authentication/getme`)
        const json = await res.json()

        if (res.status === 200) {
            setUser(json)
        }
    }

    useEffect(() => {
        console.log("comments => ", comments)
    }, [comments]);

    useEffect(() => {
        if (user) {
            getComments().then()
            getQuestions().then()
        }
    }, [user]);

    useEffect(() => {
        console.log("question => ", questions)
    }, [questions]);

    useEffect(() => {
        getUser().then()

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
        const close = () => {
            setIsShowQuestionFilter(false)
            setIsShowQuestionSort(false)
            setIsShowCommentFilter(false)
            setIsShowCommentSort(false)
        }

        window.addEventListener("click", close)

        return () => {
            window.removeEventListener("click", close)
        }
    }, []);

    const changeStatus = (event, set) => {
        event.stopPropagation()
        set(prev => !prev)
    }

    const showAnswerAlert = (creator, commentId, name, isComment) => {
        let res = null
        let json = null
        if (isComment) {
            SweetAlert.fire({
                title: `در پاسخ به ${name} :`,
                showCloseButton: true,
                input: "textarea",
                confirmButtonText: "پاسخ",
                showLoaderOnConfirm: true,
                preConfirm: async value => {
                    res = await fetch(`/api/comments`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({commentId, message: value, creator})
                    })
                    json = await res.json()
                }
            }).then(result => {
                if (result.isConfirmed) {
                    if (res.status === 200) {
                        toast.success("کامنت پاسخ داده شد")
                    } else {
                        toast.error(json)
                    }
                }
            })
        } else {
            SweetAlert.fire({
                title: "پاسخ سوال",
                showCloseButton: true,
                input: "textarea",
                confirmButtonText: "پاسخ",
                showLoaderOnConfirm: true,
                preConfirm: async value => {
                    res = await fetch(`/api/questions`, {
                        method: "PUT",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({creator, questionId: commentId, answer: value})
                    })
                    json = await res.json()
                }
            }).then(result => {
                if (result.isConfirmed) {
                    if (res.status === 200) {
                        getQuestions().then()
                        toast.success("سوال پاسخ داده شد")
                    } else {
                        toast.success(json)
                    }
                }
            }).catch(err => {
                toast.error("مشکلی در ارتباط با سرور پیش آمد")
            })
        }
    }

    const showAgreeAlert = commentId => {
        let res = null
        let json = null

        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از تایید این کامنت اطمینان دارید ؟",
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonText: "تایید",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                res = await fetch(`/api/comments/agree`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({commentId})
                })
                json = await res.json()
            }
        }).then(result => {
            if (result.isConfirmed) {
                if (res.status === 200) {
                    toast.success(json)
                    getComments().then()
                } else {
                    toast.error(json)
                }
            }
        })
    }

    const showIgnoreAlert = () => {
        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از رد کردن این کامنت اطمینان دارید ؟",
            showCloseButton: true,
            showCancelButton: true,
            cancelButtonText: "خیر",
            confirmButtonText: "رد کردن",
            confirmButtonColor: "#c32525",
            showLoaderOnConfirm: true,
            preConfirm: result => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (result) {
                            resolve()
                        } else {
                            reject()
                        }
                    }, 1000)
                })
            }
        }).then(result => {
            toast.success("کامنت رد شد")
        })
    }

    const showMessage = (message, isQuestion) => {
        SweetAlert.fire({
            title: `${isQuestion ? "سوال" : "کامنت"} کاربر`,
            text: message,
            showCloseButton: true,
            confirmButtonText: "مشاهده شد",
            showLoaderOnConfirm: true,
            preConfirm: result => {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        if (result) {
                            resolve()
                        } else {
                            reject()
                        }
                    }, 150)
                })
            }
        }).then(result => {
        })
    }

    const getCommentsWrapper = (title, items, isQuestion, [sortHover, setSortHover], [filterHover, setFilterHover]) => {
        return (
            <div className={styles['comments-wrapper']}>
                <div className={styles['title-wrapper']}>
                    <h2 className={styles['title']}>{title}</h2>
                    <div className={styles['filter']}>
                        <p
                            onClick={event => changeStatus(event, setFilterHover)}
                            className={styles['current-filter']}>
                            همه
                            <IoIosArrowDown className={styles['arrow-icon']}/>
                        </p>
                        <div
                            style={filterHover ? {zIndex: "10", opacity: "1", top: "100%"} : {
                                zIndex: "-1", opacity: "0", top: "0"
                            }}
                            className={styles['filter-items']}>
                            <p className={styles['filter-item']}>مشاهده نشده</p>
                            <p className={styles['filter-item']}>مشاهده شده</p>
                        </div>
                    </div>
                    <div className={styles['filter']}>
                        <p
                            onClick={event => changeStatus(event, setSortHover)}
                            className={styles['current-filter']}>
                            جدیدترین
                            <IoIosArrowDown className={styles['arrow-icon']}/>
                        </p>
                        <div
                            style={sortHover ? {zIndex: "10", opacity: "1", top: "100%"} : {
                                zIndex: "-1", opacity: "0", top: "0"
                            }}
                            className={styles['filter-items']}>
                            <p className={styles['filter-item']}>قدیمی ترین</p>
                        </div>
                    </div>
                </div>
                <div className={styles['comments']}>
                    {!isQuestion ? items.map((item, i) => (
                        <div key={i} className={styles['comment']}>
                            {
                                item.isAgree ?  <div className={styles['response-alert']}>کامنت تایید شد</div> : null
                            }
                            <div className={`${windowWidth < 450 ? "flex-space" : "row"}`}>
                                <div className={`${windowWidth < 450 ? "" : "col-3"}`}>
                                    <p className={styles['comment-content']}>{item.creator.username}</p>
                                </div>
                                <div className={`${windowWidth < 450 ? "" : "col-2"}`}>
                                    <p
                                        onClick={() => showMessage(item.message)}
                                        className={`${styles['comment-content']} ${styles['message']}`}>پیام</p>
                                </div>
                                {
                                    windowWidth < 450 ? null : <div className={`${windowWidth < 450 ? "" : "col-3"}`}>
                                        <p className={`${styles['comment-content']} ${styles['title-content']}`}>{item?.courseId?.title || item?.articleId?.title}</p>
                                    </div>
                                }
                                <div
                                    style={{width: windowWidth < 450 ? "8rem" : ""}}
                                    className={`${windowWidth < 450 ? "" : "col-4"}`}>
                                    <div
                                        style={{boxShadow: "0 0 1rem rgba(0,0,0,0.2)"}}
                                        className={styles['buttons']}>
                                        <SimpleSwiper
                                            numberItems={windowWidth < 400 ? 1 : 2}
                                            items={
                                                [
                                                    <button
                                                        onClick={() => showAnswerAlert(item.creator._id, item._id, item.creator.username, true)}
                                                        className={styles['button']}>پاسخ
                                                    </button>,
                                                    <button onClick={() => showAgreeAlert(item._id)}
                                                            className={styles['button']}>تایید
                                                    </button>,
                                                    <button onClick={() => showIgnoreAlert()}
                                                            className={styles['button']}>رد
                                                    </button>
                                                ]
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : null}
                    {isQuestion ? items.map((item, i) => (
                        <div style={!!item.answer ? {opacity: "0.5"} : {}} key={i} className={styles['comment']}>
                            {
                                !!item.answer ?  <div className={styles['response-alert']}>سوال پاسخ داده شد</div> : null
                            }
                            <div className={`${windowWidth < 650 ? `${styles['comment-wrapper']}` : "row"}`}>
                                <div className={`${windowWidth < 650 ? "" : "col-3"}`}>
                                    <p className={styles['comment-content']}>{item.creator.username}</p>
                                </div>
                                <div style={windowWidth > 650 ? {display: "flex", justifyContent: "center"} : {}}
                                     className={`${windowWidth < 650 ? "" : "col-3"}`}>
                                    <p
                                        onClick={() => showMessage(item.message, true)}
                                        className={`${styles['comment-content']} ${styles['message']}`}>سوال</p>
                                </div>
                                <div style={windowWidth > 650 ? {display: "flex", justifyContent: "center"} : {}}
                                     className={`${windowWidth < 650 ? "" : "col-3"}`}>
                                    <p style={{maxWidth: "16rem"}}
                                       className={`${styles['comment-content']} ${styles['title-content']} ${styles['course-content']}`}>{item.episodeId.title}</p>
                                </div>
                                <div className={`${windowWidth < 650 ? "" : "col-3"}`}>
                                    <div className={styles['buttons']}>
                                        <button onClick={() => showAnswerAlert(user?._id, item._id, item.creator.username, false)}
                                                className={styles['button']}>پاسخ
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : null}
                </div>
            </div>)
    }

    return (
        <div className={styles['wrapper']}>
            {getCommentsWrapper("نظرات", comments, false, [isShowCommentSort, setIsShowCommentSort], [isShowCommentFilter, setIsShowCommentFilter])}
            {getCommentsWrapper("سوالات", questions, true, [isShowQuestionSort, setIsShowQuestionSort], [isShowQuestionFilter, setIsShowQuestionFilter])}
        </div>
    )
}