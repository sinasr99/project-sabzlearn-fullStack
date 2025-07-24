"use client"

import styles from "./page.module.css"
import {useEffect, useState} from "react";
import CustomComboBox from "@/components/CustomComboBox/CustomComboBox";
import SweetAlert from "sweetalert2";
import {toast} from "react-toastify";
import Link from "next/link";
import SimpleSwiper from "@/components/SimpleSwiper/SimpleSwiper";

export default () => {
    const [comments, setComments] = useState([])
    const [questions, setQuestions] = useState([])

    const [windowWidth, setWindowWidth] = useState(0);

    const getQuestions = async () => {
        const res = await fetch(`/api/questions`)
        const json = await res.json()

        if (res.status === 200) {
            setQuestions(json)
        }
    }

    useEffect(() => {
        getComments().then()
        getQuestions().then()

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        // مقدار اولیه هم بخوای بگیری:
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const getComments = async () => {
        const res = await fetch(`/api/comments`)
        const json = await res.json()

        if (res.status === 200) {
            setComments(json)
        }
    }

    const [filterCategories, setFilterCategories] = useState(
        [
            "فرانت اند", "نود جی اس", "وردپرس", "مهارت های نرم"
        ]
    );
    const [filterCourses, setFilterCourses] = useState(
        [
            "دوره ی Next", "React دوره", "دوره Node JS"
        ]
    )

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

    const showAnswerAlert = (creator, commentId, isComment) => {
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
                        toast.success(json)
                    }
                }
            }).catch(err => {
                toast.error("مشکلی در ارتباط با سرور پیش آمد")
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

    const removeComment = async id => {
        const res = await fetch(`/api/comments`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({commentId: id})
        })
        const json = await res.json(

        )
        if (res.status === 200) {
            toast.success(json)
            getComments().then()
        } else {
            toast.error(json)
        }
    }

    function CommentItem({agree, creator, id, name, message, course}) {
        return (
            <>
                <div className={styles['comment']}>
                    {
                        agree ? <div className={styles['agree']}>تایید شد</div> : null
                    }
                    <div className={`${windowWidth < 500 ? styles['grid-comment'] : "row"}`}>
                        <div className={`${windowWidth < 500 ? "" : "col-3"}`}>
                            <p className={styles['comment-content']}>{name}</p>
                        </div>
                        <div className={`${windowWidth < 500 ? "" : "col-2"}`}>
                            <p
                                onClick={() => showMessage(message)}
                                className={`${styles['comment-content']} ${styles['message']}`}>پیام</p>
                        </div>
                        {
                            windowWidth < 500 ? null : <div className={`${windowWidth < 500 ? "" : "col-3"}`}>
                                <p style={{
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    maxWidth: "12rem",
                                    fontSize: "1.4rem",
                                    overflow: "hidden",
                                }} className={styles['comment-content']}>{course}</p>
                            </div>
                        }
                        <div className={`${windowWidth < 500 ? "" : "col-4"}`}>
                            <div style={{height: "3rem", boxShadow: "0 0 1rem rgba(0, 0, 0, 0.1)"}}
                                 className={styles['buttons']}>
                                <SimpleSwiper
                                    numberItems={2}
                                    items={
                                        [
                                            <button style={{background: "green"}}
                                                    onClick={() => showAnswerAlert(creator, id, true)}
                                                    className={styles['button']}>پاسخ
                                            </button>,
                                            <button style={{background: "green"}} onClick={() => showAgreeAlert(id)}
                                                    className={styles['button']}>تایید
                                            </button>,
                                            <button onClick={() => removeComment(id)}
                                                    className={styles['button']}>حذف</button>
                                        ]
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const removeQuestion = async questionId => {
        const res = await fetch(`/api/questions`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({questionId})
        })
        const json = await res.json()

        if (res.status === 200) {
            toast.success(json)
            getQuestions().then()
        } else {
            toast.error(json)
        }
    }

    function QuestionItem({hasReplay, questionId, userId, name, course, message}) {
        return (
            <>
                <div className={styles['comment']}>
                    {
                        hasReplay ? <div style={{width: "7rem"}} className={styles['agree']}>پاسخ داده شد</div> : null
                    }
                    <div className={`${windowWidth < 500 ? styles['grid-question'] : "row"}`}>
                        <div className={`${windowWidth < 500 ? "" : "col-3"}`}>
                            <p className={styles['comment-content']}>{name}</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "center"}}
                             className={`${windowWidth < 500 ? "" : "col-2"}`}>
                            <p
                                onClick={() => showMessage(message, true)}
                                className={`${styles['comment-content']} ${styles['message']}`}>سوال</p>
                        </div>
                        {
                            windowWidth < 500 ? null :
                                <div style={{fontSize: "1.2rem", display: "flex", justifyContent: "center"}}
                                     className={`${windowWidth < 500 ? "" : "col-2"}`}>
                                    <p className={`${styles['comment-content']} ${styles['comment-course']}`}>{course}</p>
                                </div>
                        }
                        <div style={{display: "flex", justifyContent: "center"}}
                             className={`${windowWidth < 500 ? "" : "col-3"}`}>
                            <Link href="#" className={styles['comment-content']}>لینک سوال</Link>
                        </div>
                        <div className={`${windowWidth < 500 ? "wrapper-swiper" : "col-2"}`}>
                            <div style={{height: "3rem", boxShadow: "0 0 1rem rgba(0, 0, 0, 0.1)"}}
                                 className={styles['buttons']}>
                                <SimpleSwiper
                                    numberItems={windowWidth < 600 ? 1 : 2}
                                    items={
                                        [
                                            <button onClick={() => showAnswerAlert(userId, questionId, false)}
                                                    className={styles['button']}>پاسخ
                                            </button>,
                                            <button onClick={() => removeQuestion(questionId)}
                                                    className={styles['button']}>حذف</button>
                                        ]
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const getCommentTitle = comment => {
        console.log("comment => ", comment)
        if (comment?.articleId) {
            return comment?.articleId?.title
        } else {
            return comment?.courseId?.title
        }
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <h3 className={styles['title']}>لیست کامنت ها</h3>
            </div>

            <div className={styles['comments']}>
                {
                    comments.map((comment, i) => {
                        console.log("comment => ", comment)
                        return (
                            <CommentItem
                                key={i}
                                agree={comment.isAgree}
                                creator={comment.creator._id}
                                id={comment._id}
                                course={getCommentTitle(comment)}
                                name={comment.creator.username}
                                message={comment.message}
                            />
                        )
                    })
                }
            </div>

            <div className={styles['header']}>
                <h3 className={styles['title']}>لیست سوالات ها</h3>
                <div className={styles['filter-wrapper']}>
                    <p className={styles['filter-title']}>فیلتر دسته بندی دوره:</p>
                    <CustomComboBox items={filterCategories} current={filterCategories[0]}/>
                </div>
                <div className={styles['filter-wrapper']}>
                    <p className={styles['filter-title']}>فیلتر دوره:</p>
                    <CustomComboBox items={filterCourses} current={filterCourses[0]}/>
                </div>
            </div>

            <div className={styles['comments']}>
                {
                    questions.map((question, i) => (
                        <QuestionItem
                            hasReplay={!!question.answer}
                            key={i}
                            questionId={question._id}
                            userId={question.creator._id}
                            course={question.episodeId.title}
                            name={question.creator.username}
                            message={question.message}
                        />
                    ))
                }
            </div>
        </div>
    )
}