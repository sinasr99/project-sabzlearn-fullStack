import styles from "./ArticleBox.module.css"
import Link from "next/link"
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default ({id, image, title, caption, writer, date}) => {
    console.log("id => ", id)
    return (
        <div className={styles['article-box']}>
            <img className={styles['image']} src={image} alt="Article Image"/>
            <Link href={`/articles/${id}`} className={styles['title']}>{title}</Link>
            <p className={styles['caption']}>{caption}</p>
            <div className={styles['contents']}>
                <span className={styles['writer']}>{writer}</span>
                <span className={styles['date']}>{date}</span>
            </div>
            <Link href={`/articles/${id}`} className={styles['link']}>
                مطالعه مقاله
                <FaArrowAltCircleLeft className={styles['icon']}/>
            </Link>
        </div>
    )
}