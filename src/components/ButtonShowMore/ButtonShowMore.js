import styles from "./ButtonShowMore.module.css"

import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default () => {
    return (
        <button className={styles['button']}>
            مشاهده بیشتر
            <MdOutlineKeyboardArrowDown className={styles['arrow-down']}/>
        </button>
    )
}