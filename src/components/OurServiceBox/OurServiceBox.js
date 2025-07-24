import styles from "./OurServiceBox.module.css"

export default ({icon, title, caption, color}) => {
    return (
        <div className={styles['service']}>
           <div className={styles['right']}>
               <div style={{backgroundColor: color}} className={styles['background-color']}></div>
               {icon}
           </div>
            <div className={styles['left']}>
                <h4 className={styles['title']}>{title}</h4>
                <p className={styles['caption']}>{caption}</p>
            </div>
        </div>
    )
}