import styles from "@/styles/home.module.css";

export default ({title, icon, count}) => {
    return (
        <>
            <div className={styles['info-item']}>
                {icon}
                <p className={styles['count']}>{count}</p>
                <h4 className={styles['info-title']}>{title}</h4>
            </div>
        </>
    )
}