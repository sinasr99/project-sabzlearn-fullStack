import styles from "./CourseSort.module.css"

import {IoSearch} from "react-icons/io5";
import {FaSortNumericDown} from "react-icons/fa";

export default ({changeSort, sortItems}) => {
    return (
        <div className='flex'>
            <div className={styles['filter-wrapper']}>
                <p className={styles['filter-caption']}>
                    <FaSortNumericDown className={styles['filter-icon']}/>
                    مرتب سازی براساس
                </p>
                <div className={styles['filter-items']}>
                    {
                        sortItems.map((item, index) => (
                            <p onClick={e => changeSort(e.target.innerText)} key={index}
                               className={item.selected ? `${styles['filter-item']} ${styles['filter-item--active']}` : `${styles['filter-item']}`}>
                                {item.text}
                            </p>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}