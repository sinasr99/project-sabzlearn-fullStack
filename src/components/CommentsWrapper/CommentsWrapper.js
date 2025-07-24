"use client"

import styles from "./CommentsWrapper.module.css"

import {FaComments, FaGraduationCap} from "react-icons/fa6";
import {FaCommentAlt, FaReply, FaCheck} from "react-icons/fa";
import {GoPersonFill, GoAlertFill} from "react-icons/go";
import {useEffect, useRef, useState} from "react"
import {CircularProgress} from "@mui/material";
import {toast} from "react-toastify";
import {useParams} from "next/navigation";


export default ({comments: items, isForArticle}) => {
    const [user, setUser] = useState(null);
    const {courseId, id: articleId} = useParams()

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("")
    const [to, setTo] = useState(null)


    const [isShowMore, setIsShowMore] = useState(false);
    const commentCreatRef = useRef(null)
    const [replyTo, setReplyTo] = useState(null);
    const [comments, setComments] = useState(items);
    const [isCommentCreateOpen, setIsCommentCreateOpen] = useState(false)

    useEffect(() => {
        getUser().then()

    }, []);

    const getUser = async () => {
        const res = await fetch(`/api/authentication/getme`)
        const data = await res.json()

        if (res.status === 200) {
            setUser(data)
        }
    }

    const send = async () => {
        if (user) {
            setIsLoading(true)
            if (!to) {
                const res = await fetch("/api/comments", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({creator: user._id, message, itemId: articleId?.toString() || courseId?.toString(), isForArticle: !!articleId})
                })
                const json = await res.json()

                setIsLoading(false)

                if (res.status === 200) {
                    toast.success("کامنت شما ارسال شد")
                } else {
                    toast.error(json)
                }
            } else {
                const res = await fetch("/api/comments", {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({commentId: to, message, creator: user._id})
                })
                const json = await res.json()

                setIsLoading(false)

                if (res.status === 200) {
                    toast.success("پاسخ شما ارسال شد")
                } else {
                    toast.error(json)
                }
            }
        } else {
            toast.error("شما قبل ارسال نظر باید احراز هویت کنید")
        }
    }

    return (
        <div className={styles['comments-wrapper']}>
            <div className={styles['header']}>
                <div className={styles['right']}>
                    <FaComments className={styles['header-icon']}/>
                    نظرات
                </div>
                <button
                    onClick={() => setIsCommentCreateOpen(true)}
                    className={styles['button-message']}>
                    ارسال نظر جدید
                    <FaCommentAlt className={styles['message-icon']}/>
                </button>
            </div>

            <div
                ref={commentCreatRef}
                className={isCommentCreateOpen ? `${styles['comment-create-wrapper']}` : `${styles['comment-create-wrapper']} ${styles['close']}`}>
                {isCommentCreateOpen ? <>
                    <div className={styles['comment-create-header']}>
                        <button className={styles['profile-wrapper']}>
                            <GoPersonFill className={styles['profile']}/>
                        </button>
                        <div className={styles['name-wrapper']}>
                            <h5 className={styles['create-name']}>{user?.username}</h5>
                            {
                                replyTo ? <p style={{color: "#1EB35B", fontWeight: "600"}}
                                             className={styles['create-caption']}>در پاسخ به : {replyTo.name}</p>
                                    : <p className={styles['create-caption']}>ثبت نظر جدید</p>
                            }
                        </div>
                    </div>
                    {
                        !isForArticle ? <p className={styles['create-alert']}>
                            <GoAlertFill className={styles['alert-icon']}/>
                            لطفا پرسش مربوط به هر درس یا ویدئو دوره را در صفحه همان ویدئو مطرح کنید.
                        </p> : null
                    }
                    <textarea value={message} onChange={e => setMessage(e.target.value)}
                              className={styles['comment-input']}
                              placeholder="نظر خود را بنویسید..."></textarea>
                    <div className={styles['create-buttons']}>
                        <button
                            onClick={() => {
                                setIsCommentCreateOpen(false)
                                setReplyTo(null)
                                setTo(null)
                            }}
                            className={styles['cancel-button']}>لغو
                        </button>
                        {
                            isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/> :
                                <button onClick={send} className={styles['send-button']}>ارسال</button>
                        }
                    </div>
                </> : null}
            </div>

            {
                !isForArticle ? isCommentCreateOpen ? null : <p className={styles['alert-msg']}>
                    دانشجوی عزیز؛ سوالات مرتبط به پشتیبانی دوره در قسمت نظرات تایید نخواهد شد، لطفا در بخش مشاهده آنلاین
                    هر ویدیو سوالات خود را مطرح کنید.
                </p> : null
            }

            {
                comments.map((comment, i) => (
                    <div key={i} className={styles['comment-item']}>
                        <div className={styles['comment-item__header']}>
                            <div className={styles['comment-item-right']}>
                                <div className={styles['img-wrapper']}>
                                    <img className={styles['account-img']} src={comment.profile}
                                         alt="Account Image"/>
                                    {
                                        (comment.role === "مدیر" || comment.role === "مدرس") ?
                                            <FaCheck className={styles['account-icon']}/> :
                                            <FaGraduationCap className={styles['account-icon']}/>
                                    }
                                </div>
                                <div className={styles['account-content-wrapper']}>
                                    <div className={styles['account-name-wrapper']}>
                                        <span className={styles['name']}>{comment.name}</span>
                                        <span className={styles['role']}>| {comment.role}</span>
                                    </div>
                                    <p className={styles['date']}>{comment.createdDate}</p>
                                </div>
                            </div>
                            <div className={styles['comment-item-left']}>
                                <button onClick={() => {
                                    setTo(comment.id)
                                    setReplyTo({...comment})
                                    setIsCommentCreateOpen(true)
                                    setTimeout(() => {
                                        commentCreatRef.current?.scrollIntoView({behavior: "smooth", block: "center"});
                                    }, 100); // کمی تأخیر برای رندر شدن محتوا
                                }} className={styles['reply-btn-wrapper']}>
                                    <FaReply className={styles['reply-icon']}/>
                                </button>
                            </div>
                        </div>
                        <p className={styles['comment-body']}>{comment.message}</p>

                        {
                            comment.answers.map((commentAnswer, i) => {
                                return (
                                    <div key={i}
                                         className={`${styles['comment-item']} ${styles['comment-item-reply']}`}>
                                        <div style={{borderBottom: "0.1rem solid white"}}
                                             className={styles['comment-item__header']}>
                                            <div className={styles['comment-item-right']}>
                                                <div className={styles['img-wrapper']}>
                                                    <img className={styles['account-img']}
                                                         src={commentAnswer.profile}
                                                         alt="Account Image"/>
                                                    {
                                                        (commentAnswer.role === "مدیر" || comment.role === "مدرس") ?
                                                            <FaCheck className={styles['account-icon']}/> :
                                                            <FaGraduationCap className={styles['account-icon']}/>
                                                    }
                                                </div>
                                                <div className={styles['account-content-wrapper']}>
                                                    <div className={styles['account-name-wrapper']}>
                                                        <span className={styles['name']}>{commentAnswer.name}</span>
                                                        <span className={styles['role']}>| {commentAnswer.role}</span>
                                                    </div>
                                                    <p className={styles['date']}>{commentAnswer.createdDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={styles['comment-body-reply']}>{commentAnswer.message}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}