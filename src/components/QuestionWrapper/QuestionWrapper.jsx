"use client";

import {Editor} from '@tinymce/tinymce-react';
import {useEffect, useRef, useState} from 'react';
import styles from "./QuestionWrapper.module.css";
import {GoAlertFill, GoPersonFill} from "react-icons/go";
import {FaUpload} from "react-icons/fa";
import {toast} from "react-toastify";

export default function QuestionWrapper({episodeId}) {
    const inputFileRef = useRef(null);
    const [question, setQuestion] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState(null);

    const getUser = async () => {
        const res = await fetch(`/api/authentication/getme`)
        const json = await res.json();

        if (res.status === 200) {
            setUser(json)
        }
    }

    const openFileInput = () => {
        inputFileRef.current.click();
    };

    useEffect(() => {
        setLoaded(true);
        getUser().then()
    }, []);

    const sendQuestion = async () => {
        if (user) {
            console.log("creator => ", user._id)
            console.log("question => ", question)
            console.log("episodeId => ", episodeId)
            const res = await fetch(`/api/questions`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({creator: user._id, message: question, episodeId})
            })
            const json = await res.json();

            if (res.status === 200) {
                toast.success("سوال شما ارسال شد")
            } else {
                toast.error(json)
            }
            setQuestion("");
        } else {
            toast.error("قبل ارسال سوال احراز هویت کنید")
        }
    }

    return (
        <div className={styles["question-wrapper"]}>

            <div className={styles["comment-create-header"]}>
                <button className={styles["profile-wrapper"]}>
                    <GoPersonFill className={styles["profile"]}/>
                </button>
                <div className={styles["name-wrapper"]}>
                    <h5 className={styles["create-name"]}>SINA.s</h5>
                    <p className={styles["create-caption"]}>ثبت پرسش جدید</p>
                </div>
            </div>

            <p className={styles["create-alert"]}>
                <GoAlertFill className={styles["alert-icon"]}/>
                لطفاً قبل از ثبت پرسش، قوانین ایجاد سوال را مطالعه کنید.
            </p>

            {loaded &&
                <Editor
                    apiKey="sttscuejvusrvvh83polz7zmvia2sm8os98q9x1pr86x2ag3"
                    value={question}
                    init={{
                        placeholder: "سوال خود را بنویسید...",
                        height: 300,
                        menubar: false,
                        directionality: 'rtl',
                        plugins: [
                            'link', 'lists', 'directionality'
                        ],
                        toolbar:
                            'styleselect | undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist',
                        block_formats: 'عنوان 1=h1; عنوان 2=h2; عنوان 3=h3; پاراگراف=p',
                        fontsize_formats: "10px 12px 14px 16px 18px 20px 24px 28px 36px"
                    }}
                    onEditorChange={(content) => setQuestion(content)}
                />
            }

            <div className={styles['file-upload-wrapper']}>
                <div
                    onClick={openFileInput}
                    className={styles['file-input-wrapper']}
                >
                    <FaUpload className={styles['icon-upload']}/>
                    آپلود فایل پیوست
                    <input
                        ref={inputFileRef}
                        type="file"
                        className={styles['file-input']}
                        style={{display: "none"}}
                    />
                </div>
                <button onClick={sendQuestion} className={styles['send-button']}>ارسال</button>
            </div>

            <p className={styles['message-empty']}>
                هنوز برای این جلسه سوالی نپرسیده‌اید!
            </p>
        </div>
    );
}