//=-=-=-=-=-=-=-=-=-=- Styles =-=-=-=-=-=-=-=-=-=-
import styles from "./SectionHeader.module.css"
import Link from "next/link";
import {GoArrowUpLeft} from "react-icons/go";

export default ({title, caption, link}) => {
    return (
        <div className={styles['section-header']}>
            <div className={styles['right']}>
                <h4 className={styles['title']}>{title}</h4>
                <p className={styles.caption}>{caption}</p>
            </div>
            <div className={styles['left']}>
                {
                    link && (
                        <>
                            <Link className={styles['link']} href={link.href}>{link.text}</Link>
                            <GoArrowUpLeft className={styles['icon']}/>
                        </>
                    )
                }
            </div>
        </div>
    )
}