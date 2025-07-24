"use client"

import styles from "./PanelMenu.module.css"

import {CiLogout} from "react-icons/ci"
import {IoSettingsOutline} from "react-icons/io5"

import Link from "next/link"
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";

export default ({user: userInput, links}) => {
    const [user, setUser] = useState(userInput);
    const inputProfileRef = useRef(null);

    const router = useRouter()

    const [loaded, setLoaded] = useState(false);
    const path = usePathname()
    const firstSegment = path.split('/')[2]

    const checkPath = inputPath => inputPath === firstSegment

    useEffect(() => {
        setLoaded(true)
    }, [])

    const logout = async () => {
        try {
            await fetch(`/api/authentication/signout`)
            router.push("/")
            toast.info("شما از حساب کاربری خود خارج شدید")
        } catch (error) {
            toast.error("مشکلی پیش آمده")
        }
    }

    const openProfileInput = () => {
        if (inputProfileRef.current) {
            inputProfileRef.current.click()
        }
    }

    const updateUser = async () => {
        const res = await fetch(`/api/authentication/getme`)

        if (res.status === 200) {
            setUser(await res.json())
        }
    }

    const changeFileInput = async event => {
        const file = event.target.files[0];
        if (!file) return;

        // فقط فرمت‌های مجاز، مثلا jpg و png و jpeg
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

        if (!allowedTypes.includes(file.type)) {
            toast.error("فرمت فایل باید jpeg, png, webp, jpg باشد")
            return;
        }

        const formData = new FormData()
        formData.append("image", file)

        const res = await fetch(`/api/change-profile`, {
            method: "POST",
            body: formData
        })
        const json = await res.json()

        if (res.status === 201) {
            updateUser().then()
        } else {
            toast.error(json)
        }
    }

    return (
        <>
            <input onChange={changeFileInput} ref={inputProfileRef} type="file" className={styles['input-profile']}/>
            <aside className={styles['user-menu']}>
                <div className={styles['menu-header']}>
                    <div className={styles['menu-header-right']}>
                        <img onClick={openProfileInput} className={styles['account-img']} src={user.profile}
                             alt="Account Image"/>
                        <div className={styles['account-name-wrapper']}>
                            <p className={styles['name']}>{user.username}</p>
                            <p className={styles['phone']}>{user.phone}</p>
                        </div>
                    </div>
                    <div className={styles['menu-header-left']}>
                        <CiLogout
                            onClick={logout}
                            className={styles['menu-left-icon']}/>
                        <IoSettingsOutline className={styles['menu-left-icon']}/>
                    </div>
                </div>
                <p className={styles['menu-body-title']}>دسترسی سریع</p>
                <div className={styles['menu-body']}>
                    {
                        loaded ? links.map((link, i) => (
                            <Link key={i} href={link.href}
                                  className={checkPath(link.href.split('/')[2]) ? `${styles['menu-body-item']} ${styles['active']}` : `${styles['menu-body-item']}`}>
                                {link.icon}
                                <p className={styles['menu-body-content']}>{link.text}</p>
                            </Link>
                        )) : null
                    }
                </div>
            </aside>
        </>
    )
}