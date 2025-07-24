"use client"

import styles from "./SeasonCourse.module.css"

import {FaGraduationCap} from "react-icons/fa6"
import {FaCircle} from "react-icons/fa"
import {IoIosArrowUp} from "react-icons/io"
import {IoPlayCircle} from "react-icons/io5"
import {useEffect, useState} from "react"
import Link from "next/link"

export default ({categoryId, courseId, seasons}) => {
    const [items, setItems] = useState([])
    const [isDark, setIsDark] = useState(false)

    const getEpisodeHref = episodeHref => {
        console.log("episode id =>", episodeHref )
        return `/courses/${categoryId}/${courseId}/${episodeHref}`
    }

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark") {
            setIsDark(true)
        } else {
            setIsDark(false)
        }

        const loadDurations = async () => {
            const clonedSeasons = JSON.parse(JSON.stringify(seasons))

            for (const season of clonedSeasons) {
                let totalDuration = 0

                for (const episode of season.episodes) {
                    const durationSec = await getVideoDuration(episode.video)
                    episode.duration = formatDuration(durationSec)
                    totalDuration += durationSec
                }

                season.duration = formatDuration(totalDuration)
            }

            setItems(clonedSeasons)
        }

        loadDurations().then()
    }, [seasons])

    const changeStatus = index => {
        setItems(prev =>
            prev.map((item, i) =>
                i === index ? {...item, isOpen: !item.isOpen} : item
            )
        )
    }

    return (
        <div className={styles['seasons-wrapper']}>
            <h3 className={styles['header']}>
                <FaGraduationCap className={styles['header-icon']}/>
                سرفصل ها
            </h3>
            {
                items.map((season, index) => (
                    <div
                        key={index}
                        className={season.isOpen ? `${styles['seasons-item']} ${styles['open']}` : `${styles['seasons-item']}`}>
                        <div
                            style={season.isOpen ? {color: "#fff"} : {backgroundColor: isDark ? "#333C4C" : "#F3F4F6"}}
                            onClick={() => changeStatus(index)}
                            className={styles['seasons-header']}>
                            <h3 className={styles['seasons-title']}>{season.title}</h3>
                            <div className={styles['left']}>
                                <IoIosArrowUp
                                    className={season.isOpen ? `${styles['seasons-icon']} ${styles['open']}` : `${styles['seasons-icon']}`}/>
                                <span className={styles['left-content']}>{season.episodes.length} lesson</span>
                                <FaCircle className={styles['circle']}/>
                                <span className={styles['left-content']}>{season.duration}</span>
                            </div>
                        </div>
                        {
                            season.episodes.map((episode, i) => (
                                <div key={i} className={styles['episode']}>
                                    <div className={styles['episode-right']}>
                                        <span className={styles['episode-number']}>{i + 1}</span>
                                        <Link href={getEpisodeHref(episode.id)} className={styles['episode-title']}>{episode.title}</Link>
                                    </div>
                                    <div className={styles['episode-left']}>
                                        <IoPlayCircle className={styles['episode-icon']}/>
                                        <span className={styles['episode-duration']}>{episode.duration}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

// ✅ گرفتن مدت ویدیو از روی فایل
const getVideoDuration = (src) => {
    return new Promise((resolve, reject) => {
        const video = document.createElement("video")
        video.src = src
        video.preload = "metadata"
        video.onloadedmetadata = () => {
            resolve(video.duration)
        }
        video.onerror = () => {
            resolve(0) // اگر خطا بود، صفر
        }
    })
}

// ✅ تبدیل ثانیه به فرمت 1h 30m یا 30m
const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours > 0) {
        return `${hours}h ${remainingMinutes}m`
    }
    return `${remainingMinutes}m`
}
