"use client"

import styles from "./CreateCourseWrapper.module.css"

import AdvancedEditor from "@/components/AdvancedEditor/AdvancedEditor";
import {MdDescription, MdDriveFileRenameOutline} from "react-icons/md";
import {FaClock, FaDollarSign, FaImage, FaPlus, FaRegSquare, FaVideo} from "react-icons/fa";
import {useEffect, useRef, useState} from "react";
import SweetAlert from "sweetalert2";
import {toast} from "react-toastify";
import {ImCheckboxChecked} from "react-icons/im";
import {CircularProgress} from "@mui/material";

export default ({getCourses}) => {
    let currentId = 0
    const [isAddLoading, setIsAddLoading] = useState(false)
    const [categories, setCategories] = useState([])

    async function getCategories() {
        const res = await fetch(`/api/categories`)
        const json = await res.json()

        if (res.status === 200) {
            setCategories(json)
        }
    }

    const [courseStatus, setCourseStatus] = useState([
        {text: "تکمیل شده", selected: false},
        {text: "در حال برگزاری", selected: false}
    ])

    const [seenItems, setSeenItems] = useState([
        {text: "دانلودی", selected: false},
        {text: "آنلاین", selected: false},
    ])
    const [title, setTitle] = useState("")
    const [shortCaption, setShortCaption] = useState("")
    const [duration, setDuration] = useState("")
    // const []

    const [price, setPrice] = useState("")
    const [video, setVideo] = useState(null)
    const [image, setImage] = useState(null)
    const videoRef = useRef(null);
    const imageRef = useRef(null);

    const [isCategoriesHover, setIsCategoriesHover] = useState(false)
    const [isTypeSeenHover, setIsTypeSeenHover] = useState(false)
    const [isCourseStatusHover, setIsCourseStatusHover] = useState(false)
    const [currentCategory, setCurrentCategory] = useState(null)
    const [editorValue, setEditorValue] = useState("")

    useEffect(() => {
        getCategories().then()
    }, []);

    const openGetFile = ref => {
        ref.current.click()
    }

    const setFile = (event, type) => {
        const file = event.target.files[0];
        if (!file) return;

        if (type === "image") {
            const allowedImageTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
            if (allowedImageTypes.includes(file.type)) {
                setImage(file);
            } else {
                alert("فقط فرمت‌های تصویر مجاز است (jpg, png, jpeg, webp)");
            }
        }

        if (type === "video") {
            const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];
            if (allowedVideoTypes.includes(file.type)) {
                setVideo(file);
            } else {
                alert("فقط فرمت‌های ویدیو مجاز است (mp4, webm, ogg)");
            }
        }
    }

    const getNewCategory = () => {
        let res = ""
        let json = ""

        SweetAlert.fire({
                title: "نام دسته بندی جدید را وارد کنید :",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off"
                },
                showCancelButton: true,
                cancelButtonText: "لغو",
                confirmButtonText: "ثبت",
                showLoaderOnConfirm: true,
                preConfirm: async value => {
                    res = await fetch(`/api/categories`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({title: value})
                    })
                    json = await res.json()
                }
            }
        ).then(result => {
            if (result.isConfirmed) {
                if (res.status === 200) {
                    getCourses().then()
                    getCategories().then()
                    toast.success(json)
                } else {
                    toast.error(json)
                }
            }
        }).catch(err => {
            toast.error(err)
        })
    }

    const setSeenType = index => {
        setSeenItems(prev => {
            return prev.map((item, i) => {
                return i === index ? {...item, selected: !item.selected} : {...item}
            })
        })
    }

    const setCourseStatusItems = index => {
        setCourseStatus(prev => {
            return prev.map((item, i) => {
                return i === index ? {...item, selected: !item.selected} : {...item}
            })
        })
    }

    const addCourse = async () => {
        setIsAddLoading(true)
        const formData = new FormData()
        formData.append("title", title)
        formData.append("price", +price)
        formData.append("shortCaption", shortCaption)
        formData.append("description", editorValue)
        formData.append("duration", duration)
        formData.append("introductionVideo", video)
        formData.append("introductionPoster", image)
        formData.append("category", currentCategory?._id)
        formData.append("canDownload", seenItems[0].selected)
        formData.append("isReady", courseStatus[0].selected)

        const res = await fetch(`/api/courses`, {
            method: "POST",
            body: formData
        })
        const json = await res.json()

        setIsAddLoading(false)

        if (res.status === 200) {
            getCourses().then()
            toast.success(json)
            return true
        }
        toast.error(json)
    }

    return (
        <>
            <div className={`row ${styles['create-inputs']}`}>
                <div className={`col-12 ${styles['create-wrapper']}`}>
                    <h4 className={styles['title']}>ایجاد دوره جدید</h4>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div className={styles['input-wrapper']}>
                        <input value={title} onChange={e => setTitle(e.target.value)} className={styles['input']}
                               type="text" placeholder="نام دوره..."/>
                        <MdDriveFileRenameOutline className={styles['input-icon']}/>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div className={styles['input-wrapper']}>
                        <input value={shortCaption} onChange={e => setShortCaption(e.target.value)}
                               className={styles['input']} type="text" placeholder="توضیحات کوتاه دوره..."/>
                        <MdDescription className={styles['input-icon']}/>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div className={styles['input-wrapper']}>
                        <input value={duration} onChange={e => setDuration(e.target.value)} className={styles['input']}
                               type="text" placeholder="مدت زمان تقریبی دوره"/>
                        <FaClock className={styles['input-icon']}/>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div className={styles['input-wrapper']}>
                        <input value={price} onChange={e => setPrice(e.target.value)} className={styles['input']}
                               type="text" placeholder="قیمت دوره به تومان"/>
                        <FaDollarSign className={styles['input-icon']}/>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div
                        onClick={() => openGetFile(videoRef)}
                        className={styles['input-video-wrapper']}>
                        {
                            video ? <ImCheckboxChecked className={styles['is-there']}/> : null
                        }
                        <input ref={videoRef} onChange={event => setFile(event, "video")}
                               className={styles['input-file']} type="file"/>
                        <p className={styles['video-input-caption']}>ویدئوی معرفی را وارد کنید</p>
                        <FaVideo className={styles['file-input-icon']}/>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div
                        onClick={() => openGetFile(imageRef)}
                        className={styles['input-video-wrapper']}>
                        {
                            image ? <ImCheckboxChecked className={styles['is-there']}/> : null
                        }
                        <input ref={imageRef}
                               onChange={event => setFile(event, "image")}
                               className={styles['input-file']} type="file"/>
                        <p className={styles['video-input-caption']}>پوستر ویدئوی معرفی را وارد کنید</p>
                        <FaImage className={styles['file-input-icon']}/>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div
                        onMouseLeave={() => setIsCourseStatusHover(false)}
                        onMouseEnter={() => setIsCourseStatusHover(true)}
                        className={styles['select-box']}>
                        <div
                            className={styles['header-select-box']}>
                            <p className={styles['select-box-caption']}>وضعیت دوره</p>
                        </div>
                        <div
                            style={isCourseStatusHover ? {opacity: "1", top: "100%", zIndex: "10"} : {
                                opacity: "0",
                                top: "0",
                                zIndex: "-1"
                            }}
                            className={styles['select-items']}
                        >
                            {
                                courseStatus.map((item, index) => (
                                    <p onClick={() => setCourseStatusItems(index)}
                                       key={index} className={styles['select-item']}>
                                        {item.text}
                                        {
                                            item.selected ? <ImCheckboxChecked style={{color: "black"}}
                                                                               className={styles['is-there']}/> : null
                                        }
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div
                        onMouseLeave={() => setIsTypeSeenHover(false)}
                        onMouseEnter={() => setIsTypeSeenHover(true)}
                        className={styles['select-box']}>
                        <div className={styles['header-select-box']}>
                            <p className={styles['select-box-multiple-caption']}>نوع مشاهده</p>
                        </div>
                        <div
                            style={isTypeSeenHover ? {opacity: "1", top: "100%", zIndex: "10"} : {
                                opacity: "0",
                                top: "0",
                                zIndex: "-1"
                            }}
                            className={styles['select-items']}>
                            {
                                seenItems.map((item, i) => (
                                    <p key={i} onClick={() => setSeenType(i)} className={styles['multi-select-item']}>
                                        {item.text}
                                        {
                                            item.selected ?
                                                <ImCheckboxChecked className={styles['multi-select-item-icon']}/> :
                                                <FaRegSquare className={styles['multi-select-item-icon']}/>
                                        }
                                    </p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div
                        onMouseLeave={() => setIsCategoriesHover(false)}
                        onMouseEnter={() => setIsCategoriesHover(true)}
                        className={styles['choose-course-wrapper']}>
                        <div className={styles['header-choose-course']}>
                            {
                                currentCategory ? <p className={styles['choose-course-caption']}>{currentCategory.title}</p> :
                                    <p className={styles['choose-course-caption']}>انتخاب دسته بندی دوره</p>
                            }
                            <button
                                onClick={getNewCategory}
                                title="اضافه کردن دسته بندی جدید" className={styles['choose-course-button']}>
                                <FaPlus className={styles[['plus-icon']]}/>
                            </button>
                        </div>
                        <div
                            style={isCategoriesHover ? {opacity: "1", top: "100%", zIndex: "10"} : {
                                opacity: "0",
                                top: "0",
                                zIndex: "-1"
                            }}
                            className={styles['select-items']}>
                            {
                                categories.map(item => (
                                    <p key={item._id} onClick={() => setCurrentCategory(item)}
                                       className={styles['select-item']}>{item.title}</p>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className={`col-zero-12 col-md-6`}>
                    <div className={styles['buttons']}>
                        {
                            isAddLoading ? <CircularProgress size="30px" style={{color: "#1EB35B"}}/>
                                : <button onClick={addCourse} className={styles['button']}>ثبت</button>
                        }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className={`col-12 ${styles['description-course-wrapper']}`}>
                    <AdvancedEditor value={editorValue} setValue={setEditorValue}/>
                </div>
            </div>
        </>
    )
}