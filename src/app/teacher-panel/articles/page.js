"use client"

import styles from "./page.module.css"
import AdvancedEditor from "@/components/AdvancedEditor/AdvancedEditor";
import {useEffect, useRef, useState} from "react";
import SweetAlert from "sweetalert2";
import {toast} from "react-toastify";
import {CircularProgress} from "@mui/material";

export default () => {
    const [currentId, setCurrentId] = useState(null);
    const [user, setUser] = useState(null);
    const [articles, setArticles] = useState([])

    const [addLoading, setAddLoading] = useState(false)
    const [editLoading, setEditLoading] = useState(false)

    const [editorValue, setEditorValue] = useState("")
    const [title, setTitle] = useState("")
    const [poster, setPoster] = useState(null)
    const posterRef = useRef(null)

    useEffect(() => {
        getUser().then()
    }, []);

    useEffect(() => {
        if (user) {
            getArticles().then()
        }
    }, [user])

    const getUser = async () => {
        const userRes = await fetch(`/api/authentication/getme`)
        const userData = await userRes.json()
        if (userRes.status === 200) {
            setUser(userData)
        }
    }

    const getArticles = async () => {
        const res = await fetch(`/api/articles`)
        const json = await res.json()

        if (res.status === 200) {
            setArticles(json.filter(article => article.creator._id === user._id))
        }
    }

    const editArticle = async () => {
        if (currentId) {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("body", editorValue)
            formData.append("poster", poster)
            formData.append("articleId", currentId)

            setEditLoading(true)
            const res = await fetch(`/api/articles`, {
                method: "PUT",
                body: formData
            })
            const json = await res.json()

            setEditLoading(false)

            if (res.status === 200) {
                toast.success("مقاله تغییر کرد")
                getArticles().then()
                return true
            }
            toast.error(json)
        } else {
            toast.error("مقاله ای انتخاب نشده")
        }
    }

    const addArticle = async () => {
        if (!poster || !editorValue || !title) {
            toast.error("فیلد ها اجباری است")
            return false
        }

        setAddLoading(true)

        const formData = new FormData()
        formData.append("title", title)
        formData.append("body", editorValue)
        formData.append("poster", poster)

        const res = await fetch(`/api/articles`, {
            method: "POST",
            body: formData
        })
        const json = await res.json()

        setAddLoading(false)

        if (res.status === 200) {
            getArticles().then()
            toast.success("مقاله ایجاد شد")
            return true
        }
        toast.error(json)
    }

    const setCurrentArticle = async currentArticle => {
        setCurrentId(currentArticle._id)
        setTitle(currentArticle.title)
        setPoster(currentArticle.poster)
        setEditorValue(currentArticle.body)
    }

    const publishArticle = async articleId => {
        const res = await fetch(`/api/articles/publish/${articleId}`)
        const json = await res.json()

        if (res.status === 200) {
            toast.success("مقاله منتشر شد")
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

    const removeArticle = async articleId => {
        let res = null
        let json = null

        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از حذف مقله اطمینان دارید ؟",
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

    return (
        <div className={styles['wrapper']}>
            <div className={styles['create-wrapper']}>
                <div className={`row`}>
                    <div className={`col-6`}>
                        <input value={title} onChange={e => setTitle(e.target.value)} className={styles['input']}
                               type="text" placeholder="موضوع مقاله وارد کنید..."/>
                    </div>
                    <div className={`col-6`}>
                        <input
                            ref={posterRef}
                            onChange={e => {
                                const file = e.target.files[0];
                                if (file && file.type.startsWith("image/")) {
                                    setPoster(file);
                                } else {
                                    setPoster(null);
                                }
                            }}
                            type="file"
                            style={{display: "none"}}
                        />
                        <button onClick={() => posterRef.current.click()} className={styles['add-poster']}>افزودن
                            پوستر
                        </button>
                    </div>
                    <div className={`col-12`}>
                        <div className={styles['editor-wrapper']}>
                            <AdvancedEditor value={editorValue} setValue={setEditorValue}/>
                        </div>
                    </div>
                    <div className={`col-12 ${styles['button-wrapper']}`}>
                        {
                            editLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                                : <button onClick={editArticle} className={styles['button']}>ویرایش</button>
                        }
                        {
                            addLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                                : <button onClick={addArticle} className={styles['button']}>ایجاد</button>
                        }
                    </div>
                </div>
            </div>

            <div className={styles['articles']}>
                <div className={`row`}>
                    {articles.length ? articles.map(article => (
                        <div key={article._id} className={`col-zero-12 col-sm-6 m-b-2 flex-all-center`}>
                            <div className={styles['article-item']}>
                                {
                                    article.isReady ?
                                        <div className={styles['article-ready']}>مقاله منتشر شد</div> : null
                                }
                                <img className={styles['article-img']} src={article.poster} alt=""/>
                                <h4 className={styles['article-title']}>{article.title}</h4>
                                <div className={styles['article-buttons']}>
                                    <button onClick={() => setCurrentArticle(article)}
                                            className={styles['article-button']}>ویرایش
                                    </button>
                                    <button onClick={() => removeArticle(article._id)}
                                            className={styles['article-button']}>حذف
                                    </button>
                                    <button onClick={() => publishArticle(article._id)}
                                            className={styles['article-button']}>منتشر
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : <p className={styles['alert-empty']}>مقاله ای یافت نشد</p>}
                </div>
            </div>
        </div>
    )
}