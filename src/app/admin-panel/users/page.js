"use client"

import styles from "./page.module.css"
import {IoIosArrowDown} from "react-icons/io";
import SimpleSwiper from "@/components/SimpleSwiper/SimpleSwiper";
import {FaWindowClose} from "react-icons/fa";
import {useEffect, useState} from "react";
import SweetAlert from "sweetalert2";
import {toast} from "react-toastify";

export default () => {
    const [users, setUsers] = useState([]);
    const [windowWidth, setWindowWidth] = useState(0);

    const [isShowSort, setIsShowSort] = useState(false)
    const [isShowModal, setIsShowModal] = useState(false)

    const agreeRemove = phone => {
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
                res = await fetch(`/api/users/remove`, {
                    method: "DELETE",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({phone})
                })
               json = await res.json()
            }
        }).then(result => {
            if (result.isConfirmed) {
               if (res.status === 200) {
                   toast.success("کاربر حذف شد")
                   setUsers(prev => {
                       return prev.filter(user => user.phone !== phone)
                   })
               } else {
                   toast.error(json)
               }
            }
        })
    }

    function blockUser(phone) {
        let res = null
        let json = null

        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از بلاک کاربر اطمینان دارید ؟",
            icon: "info",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
            confirmButtonColor: "#c32525",
            cancelButtonColor: "#1EB35B",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                res = await fetch(`/api/users/block`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({phone})
                })
                json = await res.json()
            }
        }).then(result => {
            if (result.isConfirmed) {
              if (res.status === 200) {
                  toast.success(json)
                  setUsers(prev => {
                      return prev.map(user => {
                          if (user.phone === phone) {
                              user.isBlock = true
                              return user
                          } else {
                              return user
                          }
                      })
                  })
              } else {
                  toast.error(json)
              }
            }
        })
    }

    function upgradeUser(phone) {
        let res = null
        let json = null

        SweetAlert.fire({
            title: "پیام اطمینان",
            text: "آیا از ارتقای کاربر به مدرس اطمینان دارید ؟",
            icon: "info",
            showCancelButton: true,
            showCloseButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
            confirmButtonColor: "#0A97D4",
            cancelButtonColor: "#1EB35B",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                res = await fetch(`/api/users/upgrade`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({phone})
                })
                json = await res.json()
            }
        }).then(result => {
            if (result.isConfirmed) {
              if (res.status === 200) {
                  toast.success(json)
                  setUsers(prev => {
                      return prev.filter(user => user.phone !== phone)
                  })
              } else {
                  toast.error(json)
              }
            }
        })
    }

    const getUsers = async () => {
        const res = await fetch(`/api/users`)
        const json = await res.json()

        if (res.status === 200) {
            setUsers(json.filter(user => user.role === "User"))
            return true
        }
        toast.error(json)
    }

    useEffect(() => {
        getUsers().then()

        // مربوط به رسپانسیو براساس عرض
        const handleResize = () => setWindowWidth(window.innerWidth)

        window.addEventListener('resize', handleResize);

        // مقدار اولیه هم بخوای بگیری:
        handleResize();

        window.addEventListener("click", () => {
            setIsShowSort(false)
        })

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={styles['wrapper']}>
            <div className={styles['header']}>
                <h3 className={styles['title']}>لیست کاربران</h3>
                <div className={styles['sort-wrapper']}>
                    <p
                        onClick={e => {
                            e.stopPropagation()
                            setIsShowSort(prev => !prev)
                        }}
                        className={styles['current-sort']}>
                        بیشترین خرید
                        <IoIosArrowDown
                            style={{rotate: isShowSort ? "180deg" : "0deg"}}
                            className={styles['icon']}/>
                    </p>
                    <div
                        style={isShowSort ? {opacity: "1", zIndex: "20", top: "100%"} : {
                            opacity: "0",
                            zIndex: "-1",
                            top: "0"
                        }}
                        className={styles['sort-items']}>
                        <p className={styles['sort-item']}>بیشترین کامنت</p>
                        <p className={styles['sort-item']}>بیشترین سوال</p>
                    </div>
                </div>
            </div>

            <div className={styles['comments-wrapper']}>
                <div className={styles['comments-header']}>
                    <div className={windowWidth <= 800 ? styles['grid'] : "row"}>
                        <p className={`${windowWidth <= 800 ? "" : "col-1"} ${styles['content']}`}>ردیف</p>
                        <p className={`${windowWidth <= 800 ? "" : "col-3"} ${styles['content']}`}>پروفایل</p>
                        <p className={`${windowWidth <= 800 ? "" : "col-3"} ${styles['content']}`}>نام</p>
                        {
                            windowWidth <= 800 ? null :
                                <p className={`${windowWidth <= 800 ? "" : "col-1"} ${styles['content']}`}>جایگاه</p>
                        }
                        {/*<p className={`col-3 ${styles['content']}`}>میزان خرید</p>*/}
                        {/*<p className={`col-1 ${styles['content']}`}>تعداد سوال</p>*/}
                        {/*<p className={`col-1 ${styles['content']}`}>تعداد کامنت</p>*/}
                    </div>
                </div>
                {
                    users.length ? users.map(((user, i) => (
                        <div key={user._id} className={styles['comment']}>
                            {
                                user.isBlock ? <div className={styles['block']}>کاربر بلاک است</div>
                                    : null
                            }
                            <div className={windowWidth <= 800 ? `${styles['grid-body']}` : "row"}>
                                <p className={`${windowWidth >= 800 ? "col-1" : ""} ${styles['content']}`}>{i + 1}</p>
                                <div className={`${windowWidth >= 800 ? "col-3" : ""} ${styles['content']}`}>
                                    <img className={styles['profile']} src={user.profile} alt="Profile"/>
                                </div>
                                <p className={`${windowWidth >= 800 ? "col-3" : ""} ${styles['content']}`}>{user.username}</p>
                                {
                                    windowWidth >= 800 ?
                                        <p className={`${windowWidth >= 800 ? "col-1" : ""} ${styles['content']}`}>کاربر</p> : null
                                }
                                {/*<p className={`col-2 ${styles['content']}`}>7,600,000 تومان</p>*/}
                                {/*<p className={`col-2 ${styles['content']}`}>20</p>*/}
                                {/*<p className={`col-2 ${styles['content']}`}>4</p>*/}
                                <div className={`${windowWidth >= 800 ? "col-4" : ""} ${styles['content']}`}>
                                    <div className={styles['buttons']}>
                                        <SimpleSwiper
                                            numberItems={windowWidth <= 576 ? 1 : 2}
                                            items={[
                                                <button onClick={() => agreeRemove(user.phone)} className={styles['button']}>حذف کاربر</button>,
                                                <button disabled={user.isBlock} onClick={() => blockUser(user.phone)} className={styles['button']}>بلاک کاربر</button>,
                                                <button onClick={() => upgradeUser(user.phone)} className={styles['button']}>ارتقای
                                                    کاربر</button>,
                                                <button onClick={() => setIsShowModal(true)}
                                                        className={styles['button']}>جزئیات</button>,
                                            ]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))) : <p className={styles['empty-alert']}>کاربری یافت نشد</p>
                }
            </div>
            {
                isShowModal ?
                    <DetailModal
                        role="کاربر"
                        set={setIsShowModal}
                        questionNumber={10}
                        name="سینا"
                        commentNumber={20}
                        money={7_500_000}
                    /> : null
            }
        </div>
    )
}

function DetailModal({role, name, money, questionNumber, commentNumber, set}) {
    return (
        <div
            onClick={() => set(false)}
            className={styles['modal']}>
            <div
                onClick={e => e.stopPropagation()}
                className={styles['modal-box']}>
                <h3 className={styles['name']}>
                    {name}
                    <FaWindowClose
                        onClick={() => set(false)}
                        className={styles['close']}/>
                </h3>
                <div className={styles["details"]}>
                    <p className={styles['detail-content']}>
                        جایگاه : {role}
                    </p>
                    <p className={styles['detail-content']}>
                        خرج : {money.toLocaleString()} تومان
                    </p>
                    <p className={styles['detail-content']}>
                        تعداد سوال : {questionNumber}
                    </p>
                    <p className={styles['detail-content']}>
                        تعداد کامنت : {commentNumber}
                    </p>
                </div>
            </div>
        </div>
    )
}