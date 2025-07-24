import styles from "./AccountModal.module.css"

import {FaHome, FaPowerOff} from "react-icons/fa";
import {MdAccountCircle} from "react-icons/md";
import {BiSolidMessage} from "react-icons/bi";
import {GoFileDirectoryFill} from "react-icons/go";

export default ({changeModal}) => {

    const setChange = () => {
        changeModal(false)
    }

    return (
        <div onClick={setChange} className={styles['modal-container']}>
            <div className={styles['header']}>
                <img src="/images/account-image.jpg" alt="Profile Image" className={styles['profile']}/>
                <div className={styles['header-left']}>
                    <h5 className={styles['name']}>Sina Saber</h5>
                    <span className={styles['inventory']}>موجودی : 0 تومان</span>
                </div>
            </div>
            <div className={styles['body']}>
                <p className={styles['body-item']}>
                    <FaHome className={styles['icon']}/>
                    پیشخوان
                </p>
                <p className={styles['body-item']}>
                    <MdAccountCircle className={styles['icon']}/>
                    دوره های من
                </p>
                <p className={styles['body-item']}>
                    <BiSolidMessage className={styles['icon']}/>
                    تیکت های من
                </p>
                <p className={styles['body-item']}>
                    <GoFileDirectoryFill className={styles['icon']}/>
                    جزئیات حساب
                </p>
            </div>
            <p className={styles['bottom']}>
                <FaPowerOff className={styles['icon']}/>
                خروج
            </p>
        </div>
    )
}