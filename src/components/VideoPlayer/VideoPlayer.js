"use client"

import styles from "./VideoPlayer.module.css"
import {useEffect, useRef, useState} from "react";
import Slider from '@mui/material/Slider';
import {FaPlay, FaPause, FaVolumeUp, FaVolumeMute} from "react-icons/fa";
import {RiForward10Fill, RiReplay10Fill} from "react-icons/ri";
import {IoMdSettings} from "react-icons/io";
import {MdOutlineCloseFullscreen} from "react-icons/md";
import {BsArrowsFullscreen} from "react-icons/bs";

export default ({src, poster}) => {
    const [isMouseOver, setMouseOver] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isSettingOpen, setIsSettingOpen] = useState(false)
    const [beforeVolZero, setBeforeVolZero] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isSeeking, setIsSeeking] = useState(false);

    const videoRef = useRef(null);

    useEffect(() => {
        if (volume) {
            videoRef.current.muted = false
        }
    }, [volume]);

    useEffect(() => {
        setTimeout(() => {
            setVideoDuration(videoRef.current.duration)
        }, 50)
    }, []);

    useEffect(() => {
        const video = videoRef.current;

        const handleLoadedMetadata = () => {
            if (!isNaN(video.duration)) {
                setVideoDuration(video.duration);
            }
        };

        const handleTimeUpdate = () => {
            if (!isSeeking) {
                setCurrentTime(video.currentTime);
            }
        };

        video.addEventListener("loadedmetadata", handleLoadedMetadata);
        video.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            video.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, [isSeeking]);

    const play = () => {
        videoRef.current.play()
    }

    const pause = () => {
        videoRef.current.pause();
    };

    const handleSeek = (e, newValue) => {
        setCurrentTime(newValue);
    };

    const handleSeekStart = () => {
        setIsSeeking(true);
    };

    const handleSeekEnd = (e, newValue) => {
        videoRef.current.currentTime = newValue;
        setCurrentTime(newValue);
        setIsSeeking(false);
    };

    const handleVolumeChange = (e, newValue) => {
        setVolume(newValue);
        videoRef.current.volume = newValue / 100;
    };

    const formatTime = seconds => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);

        const hh = h > 0 ? `${h}:` : '';
        const mm = h > 0 ? String(m).padStart(2, '0') : m;
        const ss = String(s).padStart(2, '0');

        return `${hh}${mm}:${ss}`;
    };

    const changeVideoSpeed = speed => {
        videoRef.current.playbackRate = speed
    }

    useEffect(() => {
        if (isFullScreen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isFullScreen])

    const changeVideoScreen = () => setIsFullScreen(prev => !prev)
    return (
        <div
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            onClick={() => setIsSettingOpen(false)}
            className={!isFullScreen ? `${styles['video-wrapper']}` : `${styles['video-wrapper-f']}`}>
            {
                (currentTime === 0 && poster) ? <img className={styles['video-poster']} src={poster} alt="Video Poster"/> : null
            }
            <video
                ref={videoRef}
                src={src}
                className={styles['video']}
            />

            {
                (isMouseOver || !currentTime || currentTime === videoDuration) ? videoRef.current?.paused ?
                    <div className={styles['btn-wrapper']}>
                        <FaPlay onClick={play} className={styles['icon-button']}/>
                    </div>
                    : <div className={styles['btn-wrapper']}>
                        <FaPause onClick={pause} className={styles['icon-button']}/>
                    </div> : null
            }
            {
                (isMouseOver || !currentTime || currentTime === videoDuration) ?
                    <div className={styles['buttons-wrapper']}>
                        <div className={styles['time-wrapper']}>
                            <p className={styles['duration']}>{formatTime(videoDuration)}</p>
                            <Slider
                                valueLabelFormat={formatTime}
                                sx={{
                                    '& .MuiSlider-thumb': {
                                        width: 12,
                                        height: 12,
                                    }
                                }}
                                style={{width: "75%", zIndex: "25", color: "#1EB35B"}}
                                aria-label="Progress"
                                valueLabelDisplay="auto"
                                min={0}
                                max={videoDuration || 0}
                                value={currentTime}
                                onChange={handleSeek}
                                onChangeCommitted={handleSeekEnd}
                                onMouseDown={handleSeekStart}
                                onTouchStart={handleSeekStart}
                            />
                            <p className={styles['duration']}>{formatTime(currentTime)}</p>
                        </div>

                        <div className={styles['options-wrapper']}>
                            <div className={styles['left']}>
                                {
                                    videoRef.current?.muted ?
                                        <FaVolumeUp className={styles['volume-icon']} onClick={() => {
                                            videoRef.current.muted = false
                                            setVolume(beforeVolZero)
                                        }}/> : <FaVolumeMute className={styles['volume-icon']} onClick={() => {
                                            videoRef.current.muted = true
                                            setBeforeVolZero(volume)
                                            setVolume(0)
                                        }}/>

                                }
                                <Slider
                                    sx={{
                                        '& .MuiSlider-thumb': {
                                            width: 12,
                                            height: 12,
                                        }
                                    }}
                                    style={{width: "5rem", color: "#1EB35B"}}
                                    className={styles['vol-slider']}
                                    aria-label="Volume"
                                    valueLabelDisplay="auto"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                            </div>
                            <div className={styles['right']}>
                                <RiReplay10Fill className={styles['sec-icon-10']} onClick={() => {
                                    videoRef.current.currentTime = videoRef.current.currentTime - 10
                                }}/>
                                <RiForward10Fill className={styles['sec-icon-10']} onClick={() => {
                                    videoRef.current.currentTime = videoRef.current.currentTime + 10
                                }}/>
                                <div
                                    onClick={e => {
                                        e.stopPropagation()
                                        setIsSettingOpen(prev => !prev)
                                    }}
                                    className={styles['setting-wrapper']}>
                                    <IoMdSettings className={styles['setting-icon']}/>
                                    {
                                        isSettingOpen ?
                                            <div className={styles['setting-items']}>
                                                <p onClick={() => changeVideoSpeed(0.5)}
                                                   className={styles['setting-item']}>0.5
                                                    X</p>
                                                <p onClick={() => changeVideoSpeed(1)}
                                                   className={styles['setting-item']}>1
                                                    X</p>
                                                <p onClick={() => changeVideoSpeed(1.5)}
                                                   className={styles['setting-item']}>1.5
                                                    X</p>
                                                <p onClick={() => changeVideoSpeed(2)}
                                                   className={styles['setting-item']}>2
                                                    X</p>
                                            </div> : null
                                    }
                                </div>
                                {
                                    isFullScreen ?
                                        <MdOutlineCloseFullscreen className={styles['screen-icon']}
                                                                  onClick={changeVideoScreen}/>
                                        :
                                        <BsArrowsFullscreen className={styles['screen-icon']}
                                                            onClick={changeVideoScreen}/>
                                }
                            </div>
                        </div>
                    </div> : null
            }
        </div>
    );
};
