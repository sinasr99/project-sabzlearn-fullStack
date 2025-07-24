"use client"

import styles from "./EditCourseWrapper.module.css"

import {useEffect, useRef, useState} from "react";
import {IoIosArrowDown} from "react-icons/io";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";

export default ({id}) => {
    const [user, setUser] = useState(null);
    const [season, setSeason] = useState(0)
    const fileRef = useRef(null)
    const videoRef = useRef(null)

    const [seasonInputs, setSeasonInputs] = useState([])

    const [episodeTitle, setEpisodeTitle] = useState("")
    const [file, setFile] = useState(null)
    const [video, setVideo] = useState(null)

    const [seasonTitle, setSeasonTitle] = useState("")
    const [seasonNumber, setSeasonNumber] = useState(0)

    const [course, setCourse] = useState(null);
    const [isShowSeasonItems, setIsShowSeasonItems] = useState([]);
    const [isShowSeasons, setShowSeasons] = useState(false)

    useEffect(() => {
        if (course) {
            setIsShowSeasonItems(course.parts.map(item => false))
            setSeasonInputs(course.parts.map(season => {
                return {seasonNumber: season.number, episodesNumber: season.episodes.map(episode => episode.number)}
            }))
        }
    }, [course]);

    const getUser = async () => {
        const res = await fetch(`/api/authentication/getme`)
        const json = await res.json()

        if (res.status === 200) {
            setUser(json)
        }
    }

    useEffect(() => {
        getCourse().then()

        getUser().then()

        const close = () => {
            setShowSeasons(false)
        }

        window.addEventListener("click", close);

        return () => {
            window.removeEventListener("click", close);
        }
    }, []);

    const getCourse = async () => {
        const res = await fetch(`/api/courses/${id}`)
        const json = await res.json()

        if (res.status === 200) {
            setCourse(json)
        }
    }

    const addSeason = async () => {
        const res = await fetch(`/api/courses/${id}/season`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title: seasonTitle, number: seasonNumber})
        })
        const json = await res.json()

        if (res.status === 200) {
            getCourse().then()
            toast.success(json)
        } else {
            toast.error(json)
        }
    }

    const addEpisode = async () => {
        const formData = new FormData()
        formData.append("title", episodeTitle)
        formData.append("video", video)
        formData.append("creator", user._id)
        formData.append("creator", user._id)
        formData.append("seasonId", season)
        formData.append("file", file)

        const res = await fetch(`/api/courses/${id}/episode`, {
            method: "POST",
            body: formData
        })
        const json = await res.json()

        if (res.status === 200) {
            getCourse().then()
            toast.success(json)
        } else {
            toast.error(json)
        }
    }

    const changeStatus = (event, set) => {
        event.stopPropagation();
        set(prev => !prev)
    }

    const setEpisodeFile = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/zip") {
            setFile(file);
        } else {
            toast.error("فقط فایل zip مجاز است.")
        }
    };

    const setEpisodeVideo = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("video/")) {
            setVideo(file);
        } else {
            toast.error("فقط فایل‌های ویدئویی مجاز هستند.")
        }
    };

    const updateNumbers = async () => {
        const updatedCourse = {
            ...course,
            parts: course.parts.map((part, i) => ({
                ...part,
                number: Number(seasonInputs[i].seasonNumber),
                episodes: part.episodes.map((episode, j) => ({
                    ...episode,
                    number: Number(seasonInputs[i].episodesNumber[j])
                }))
            }))
        };

        setCourse(updatedCourse); // آپدیت state برای UI

        const res = await fetch(`/api/courses/${id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(updatedCourse) // ارسال نسخه جدید مستقیم
        });

        const json = await res.json();

        if (res.status === 200) {
            await getCourse();
            toast.success("تغییرات ذخیره شد");
        } else {
            toast.error("خطا در ذخیره تغییرات");
        }
    }

    const removeSeason = async seasonId => {
        const res = await fetch(`/api/seasons`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({seasonId})
        })
        const json = await res.json()

        if (res.status === 200) {
            getCourse().then()
            toast.success(json)
        }else {
            toast.error(json)
        }
    }

    return (
        <>
            <h1 className={styles['title-course']}>{course?.title}</h1>
            <div className={styles['create-wrapper']}>
                <h4 className={styles['create-title']}>افزودن فصل جدید</h4>
                <div className={styles['input-wrapper']}>
                    <input value={seasonTitle} onChange={e => setSeasonTitle(e.target.value)}
                           className={styles['input-seasons']} type="text" placeholder="نام فصل جدید را وارد کنید"/>
                    <button onClick={addSeason} className={styles['button']}>ایجاد</button>
                </div>
            </div>
            <div className={styles['create-wrapper']}>
                <h4 className={styles['create-title']}>افزودن قسمت جدید</h4>
                <input value={episodeTitle} onChange={e => setEpisodeTitle(e.target.value)}
                       className={`${styles['input-seasons']} ${styles['m-b-20px']}`} type="text"
                       placeholder="نام قسمت جدید را وارد کنید"/>
                <div onClick={() => fileRef.current.click()} className={styles['input-file-wrapper']}>
                    <input ref={fileRef} onChange={setEpisodeFile} type="file" className={styles['input-file']}/>
                    فایل های پیوست را ارسال کنید
                </div>
                <div onClick={() => videoRef.current.click()} className={styles['input-file-wrapper']}>
                    <input ref={videoRef} onChange={setEpisodeVideo} type="file" className={styles['input-video']}/>
                    ویدئو را ارسال کنید
                </div>
                <div className={`row`}>
                    <div className={`col-6`}>
                        <div className={styles['select-seasons']}>
                            <p
                                onClick={event => changeStatus(event, setShowSeasons)}
                                className={styles['select-caption']}>انتخاب فصل</p>
                            <div
                                style={isShowSeasons ? {zIndex: "20", top: "100%", opacity: 1} : {
                                    zIndex: "-1",
                                    top: 0,
                                    opacity: 0
                                }}
                                className={styles['select-items']}>
                                {
                                    course?.parts.map((item, i) => (
                                        <div onClick={() => setSeason(item._id)} key={i}
                                             className={styles['select-item']}>{item.title}</div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={`col-6`}>
                        <button onClick={addEpisode} className={styles['button']}>ایجاد</button>
                    </div>
                </div>
            </div>
            {
                course?.parts.map(((season, i) => (
                    <div key={season._id} className={styles['course-detail-wrapper']}>
                        <div
                            style={{margin: "0 auto 2rem", maxHeight: isShowSeasonItems[i] ? "1000rem" : "4rem"}}
                            className={styles['seasons']}>
                            <div onClick={() => {
                                setIsShowSeasonItems(prev => {
                                    return prev.map((item, index) => {
                                        if (index === i) {
                                            item = !item
                                            return item
                                        }
                                        return item
                                    })
                                })
                            }}
                                 className={styles['seasons-title-wrapper']}>
                                <div className={styles['right-header']}>
                                    {
                                        seasonInputs.length ? <input value={seasonInputs[i]?.seasonNumber ?? ""}
                                                                     onChange={e => setSeasonInputs(prev => {
                                                                         return prev.map((item, index) => {
                                                                             if (index === i) {
                                                                                 item.seasonNumber = e.target.value
                                                                             }
                                                                             return item
                                                                         })
                                                                     })} maxLength={3}
                                                                     className={styles['seasons-number']}
                                                                     type="text"/> : null
                                    }
                                    <p className={styles['seasons-title']}>{season.title}</p>
                                </div>
                                <div className={styles['season-header-left']}>
                                    <FaTrash onClick={() => removeSeason(season._id)} className={styles['trash']}/>
                                    <IoIosArrowDown
                                        style={isShowSeasonItems[i] ? {rotate: "180deg"} : {}}
                                        className={styles['arrow-icon']}/>
                                </div>
                            </div>
                            <div className={styles['episodes']}>
                                {
                                    season.episodes.map((episdoe, index) => (
                                        <div key={episdoe._id} className={styles['episode']}>
                                            {
                                                seasonInputs.length ?
                                                    <input maxLength={3}
                                                           value={seasonInputs[i].episodesNumber[index] ?? ""}
                                                           onChange={e =>
                                                               setSeasonInputs(prev =>
                                                                   prev.map((item, itemIndex) => {
                                                                       if (itemIndex === i) {
                                                                           const updatedEpisodes = item.episodesNumber.map((insideItem, insideIndex) => {
                                                                               if (insideIndex === index) {
                                                                                   return e.target.value;
                                                                               }
                                                                               return insideItem;
                                                                           });

                                                                           return {
                                                                               ...item,
                                                                               episodesNumber: updatedEpisodes
                                                                           };
                                                                       }
                                                                       return item;
                                                                   })
                                                               )
                                                           }
                                                           className={`${styles['seasons-number']} ${styles['white']}`}
                                                           type="text"/> : null
                                            }
                                            <p className={styles['episode-title']}>{episdoe.title}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                )))
            }
            <button onClick={updateNumbers} style={{width: "12rem"}} className={styles['button']}>ذخیره تغییرات</button>
        </>
    )
}