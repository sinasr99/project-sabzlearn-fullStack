"use client"

import styles from "./SeasonWrapper.module.css"
import { IoIosArrowUp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from 'next/link';

export default ({ categoryId, courseId, seasons }) => {
    const [items, setItems] = useState(seasons);

    // برای ذخیره آی‌دی فصل در localStorage
    const setCurrentSeason = seasonId => {
        localStorage.setItem("seasonId", seasonId);
    };

    // فرمت نمایش زمان ویدیو
    const formatDuration = seconds => {
        if (isNaN(seconds)) return "00:00";
        const min = Math.floor(seconds / 60).toString().padStart(2, '0');
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    // تغییر وضعیت باز/بسته بودن فصل
    const changeStatus = (index) => {
        setItems(prev => {
            const updated = prev.map((item, i) => ({
                ...item,
                isOpen: i === index ? !item.isOpen : false
            }));

            if (updated[index].isOpen) {
                setCurrentSeason(updated[index].id);
            }
            return updated;
        });
    };

    useEffect(() => {
        const loadDurations = async () => {
            const updated = await Promise.all(
                seasons.map(async season => {
                    const updatedEpisodes = await Promise.all(
                        season.episodes.map(async episode => {
                            if (!episode.video) return episode;
                            return new Promise(resolve => {
                                const video = document.createElement('video');
                                video.src = episode.video;
                                video.preload = 'metadata';
                                video.onloadedmetadata = () => {
                                    const duration = formatDuration(video.duration);
                                    resolve({ ...episode, duration });
                                };
                                video.onerror = () => {
                                    resolve({ ...episode, duration: "خطا در لود" });
                                };
                            });
                        })
                    );
                    return { ...season, episodes: updatedEpisodes };
                })
            );

            // ست کردن اطلاعات فصل‌ها با زمان
            setItems(prev => {
                const seasonId = localStorage.getItem("seasonId");
                return updated.map(item => ({
                    ...item,
                    isOpen: item.id === seasonId
                }));
            });
        };

        loadDurations();
    }, [seasons]);

    return (
        <>
            {items.map((season, index) => (
                <div
                    key={index}
                    className={season.isOpen ? `${styles['seasons-item']} ${styles['open']}` : `${styles['seasons-item']}`}
                >
                    <div
                        style={season.isOpen ? { color: "#fff" } : { backgroundColor: "#F3F4F6" }}
                        onClick={() => changeStatus(index)}
                        className={styles['seasons-header']}
                    >
                        <h5 className={styles['seasons-title']}>{season.title}</h5>
                        <div className={styles['left']}>
                            <IoIosArrowUp
                                className={season.isOpen ? `${styles['seasons-icon']} ${styles['open']}` : `${styles['seasons-icon']}`}
                            />
                        </div>
                    </div>

                    {season.episodes.map((episode, i) => (
                        <div key={i} className={styles['episode']}>
                            <div className={styles['episode-right']}>
                                <Link
                                    onClick={() => setCurrentSeason(season.id)}
                                    href={`/courses/${categoryId}/${courseId}/${episode.id}`}
                                    className={styles['episode-title']}
                                >
                                    {episode.title}
                                </Link>
                                <span className={`${styles['seen-wrapper']} ${episode.seen && styles['seen']}`}>
                                    {episode.seen ? <FaCheck className={styles['seen-icon']} /> : null}
                                </span>
                            </div>
                            <div className={styles['episode-left']}>
                                <span className={styles['episode-duration']}>
                                    {episode.duration || "در حال بارگذاری..."}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};
