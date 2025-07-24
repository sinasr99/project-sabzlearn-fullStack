import styles from "./BasketItem.module.css"

import { FaTrash } from "react-icons/fa";

export default ({image, title, price, offer}) => {
    return (
        <div className={styles['product']}>
            <img src={image} alt="Course Image" className={styles['image']}/>
            <div className={styles['basket-body-left']}>
                <h5 className={styles['course-title']}>{title}</h5>
                <div className={styles['price-wrapper']}>
                    <span className={styles['price']}>{price.toLocaleString()}</span>
                    <span className={styles['price-off']}>{(price - (price / 100 * offer)).toLocaleString()} تومان</span>
                </div>
            </div>
            <FaTrash className={styles['icon']}/>
        </div>
    )
}