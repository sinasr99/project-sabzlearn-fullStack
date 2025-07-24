"use client"

import styles from "./page.module.css"

import Link from "next/link"
import SimpleSwiper from "@/components/SimpleSwiper/SimpleSwiper";
import {useEffect, useRef, useState} from "react";
import AdvancedEditor from "@/components/AdvancedEditor/AdvancedEditor";
import CustomComboBox from "@/components/CustomComboBox/CustomComboBox";
import {toast} from "react-toastify";
import SweetAlert from "sweetalert2";
import {CircularProgress} from "@mui/material";

export default () => {
    const [publishLoading, setPublishLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    const [currentId, setCurrentId] = useState(0)

    const inputPosterRef = useRef(null)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [poster, setPoster] = useState(null)

    const [articles, setArticles] = useState([])

    const [windowWidth, setWindowWidth] = useState(0);

    const openProfileInput = () => {
        if (inputPosterRef.current) {
            inputPosterRef.current.click()
        }
    }

    const changeFileInput = async event => {
        const file = event.target.files[0];
        if (!file) return;

        // فقط فرمت‌های مجاز، مثلا jpg و png و jpeg
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("فرمت فایل باید jpeg, png, webp, jpg باشد")
            return true
        }

        setPoster(file)
    }

    const getArticles = async () => {
        const res = await fetch(`/api/articles`)
        const json = await res.json()

        if (res.status === 200) {
            const userRes = await fetch(`/api/authentication/getme`)
            const userData = await userRes.json()

            if (userRes.status === 200) {
                setArticles(json)
            }
        }
    }

    const addArticle = async () => {
        if (!poster || !body || !title) {
            toast.error("فیلد ها اجباری است")
            return false
        }

        setIsLoading(true)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("body", body)
        formData.append("poster", poster)

        const res = await fetch(`/api/articles`, {
            method: "POST",
            body: formData
        })
        const json = await res.json()

        setIsLoading(false)

        if (res.status === 200) {
            getArticles().then()
            toast.success("مقاله ایجاد شد")
            return true
        }
        toast.error(json)
    }

    useEffect(() => {
        getArticles().then()

        // for response :
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // مقدار اولیه هم بخوای بگیری:
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const removeArticle = async articleId => {
        let res = null
        let json = null

        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از حذف کاربر اطمینان دارید ؟",
            icon: "info",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
            confirmButtonColor: "#c32525",
            cancelButtonColor: "#1EB35B",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                res = await fetch(`/api/articles`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({articleId})
                })
                json = await res.json()
            }
        }).then(result => {
            if (result.isConfirmed) {
                if (res.status === 200) {
                    setArticles(prev => {
                        return prev.filter(article => article._id !== articleId)
                    })
                    toast.success("مقاله حذف شد")
                    return true
                }
                toast.error(json)
            }
        })
    }

    const setCurrentArticle = async (articleId, posterInput) => {
        const article = articles.find(article => article._id === articleId)

        setCurrentId(articleId)
        setTitle(article.title)
        setBody(article.body)
        setPoster(posterInput)
    }

    const updateArticle = async () => {
        if (currentId) {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("body", body)
            formData.append("poster", poster)
            formData.append("articleId", currentId)

            setUpdateLoading(true)
            const res = await fetch(`/api/articles`, {
                method: "PUT",
                body: formData
            })
            const json = await res.json()

            setUpdateLoading(false)

            if (res.status === 200) {
                toast.success("مقاله تغییر کرد")
                return true
            }
            toast.error(json)
        } else {
            toast.error("مقاله ای نانتخاب نشده")
        }
    }

    const publishArticle = async articleId => {
        setPublishLoading(true)

        const res = await fetch(`/api/articles/publish/${articleId}`)
        const json = await res.json()

        setPublishLoading(false)

        if (res.status === 200) {
            toast.success(json)
            setArticles(prev => {
                return prev.map(article => {
                    if (article._id === articleId) {
                        article.isReady = true
                        return article
                    }
                    return article
                })
            })
            return true
        }

        toast.error(json)
    }

    return (
        <div className={styles['wrapper']}>
            <div className={styles['create-wrapper']}>
                <div className={`row`}>
                    <div className={`col-6 flex-all-center`}>
                        <input value={title} onChange={e => setTitle(e.target.value)} className={styles['input']}
                               type="text" placeholder="موضوع مقاله وارد کنید..."/>
                    </div>
                    <div className={`col-6 flex-all-center`}>
                        <input ref={inputPosterRef} onChange={e => changeFileInput(e)} className={styles['input-file']}
                               type="file"/>
                        <button onClick={openProfileInput} className={styles['show-file']}>عکس پوستر</button>
                    </div>
                    <div className={`col-12`}>
                        <div className={styles['editor-wrapper']}>
                            <AdvancedEditor value={body} setValue={setBody}/>
                        </div>
                    </div>
                    <div className={`col-12 ${styles['button-wrapper']}`}>
                        {
                            updateLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                                : <button onClick={updateArticle} className={styles['button']}>ویرایش</button>
                        }
                        {
                            isLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                                : <button onClick={addArticle} className={styles['button']}>ایجاد</button>
                        }


                    </div>
                </div>
            </div>

            <div className={styles['articles-wrapper']}>
                <div className={styles['header']}>
                    <h3 className={styles['title']}>لیست مقالات</h3>
                    <CustomComboBox
                        items={
                            ["بیتشرین کامنت", "بیشترین بازدید"]
                        }
                        current="بیشترین لایک"
                    />
                </div>
                <div className={styles['articles']}>
                    <div className={styles['article-header']}>
                        <div className={windowWidth < 600 ? styles['grid'] : "row"}>
                            <div className={windowWidth < 600 ? "" : "col-4"}>
                                <p className={styles['header-content']}>موضوع مقاله</p>
                            </div>
                            {
                                windowWidth < 600 ? null : <>
                                    <div className={windowWidth < 600 ? "" : "col-2"}>
                                        <p className={styles['header-content']}>آمار بازدید</p>
                                    </div>
                                    <div className={windowWidth < 600 ? "" : "col-2"}>
                                        <p className={styles['header-content']}>آمار کامنت</p>
                                    </div>
                                </>
                            }
                            <div className={windowWidth < 600 ? "" : "col-2"}>
                                <p className={styles['header-content']}>لینک مقاله</p>
                            </div>
                        </div>
                    </div>
                    {
                        articles.map(article => (
                            <div key={article._id} className={styles['article']}>
                                {
                                    article.isReady ?
                                        <div className={styles['article-ready-alert']}>مقاله منتشر شد</div> : null
                                }
                                <div className={windowWidth < 600 ? styles['grid-body'] : "row"}>
                                    <div className={windowWidth < 600 ? "" : "col-4"}>
                                        <p className={styles['article-content']}>{article.title}</p>
                                    </div>
                                    {
                                        windowWidth < 600 ? null : <>
                                            <div className={windowWidth < 600 ? "" : "col-2"}>
                                                <p className={styles['article-content']}>215</p>
                                            </div>
                                            <div className={windowWidth < 600 ? "" : "col-2"}>
                                                <p className={styles['article-content']}>155</p>
                                            </div>
                                        </>
                                    }
                                    <div className={windowWidth < 600 ? "" : "col-2"}>
                                        <Link href="#" className={styles['article-content']}>رفتن به مقاله</Link>
                                    </div>
                                    <div
                                        className={`${windowWidth < 600 ? "" : "col-2"} ${styles['flex-align-center']}`}>
                                        <div className={styles['buttons']}>
                                            <SimpleSwiper
                                                numberItems={1}
                                                items={[
                                                    <button onClick={() => removeArticle(article._id)}
                                                            className={`${styles['button']} ${styles['red']}`}>حذف</button>,
                                                    <button
                                                        onClick={() => setCurrentArticle(article._id, article.poster)}
                                                        className={styles['button']}>ویرایش مقاله</button>,
                                                    (
                                                        publishLoading ?
                                                            <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                                                            : <button onClick={() => publishArticle(article._id)}
                                                                      className={styles['button']}>انتشار مقاله</button>
                                                    )
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}