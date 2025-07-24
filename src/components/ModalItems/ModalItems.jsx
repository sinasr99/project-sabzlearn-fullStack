import styles from "./ModalItems.module.css"
import SimpleSwiper from "@/components/SimpleSwiper/SimpleSwiper";
import {FaWindowClose} from "react-icons/fa";
import {useEffect, useState} from "react";

export default ({items, title, set}) => {
    const [windowWidth, setWindowWidth] = useState(0);
    useEffect(() => {
        const close = event => {
            if (event.key === "Escape") {
                set(false)
            }
        }

        window.addEventListener("keyup", close)

        return () => {
            window.removeEventListener("keyup", close)
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // مقدار اولیه هم بخوای بگیری:
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getNumber = () => {
        if (windowWidth <= 550) {
            return 1
        } else {
            return 2
        }
    }

    return (
        <div
            onClick={() => set(false)}
            className={styles['modal']}>
            <div onClick={e => e.stopPropagation()} className={styles['modal-box']}>
                <div className={styles['header']}>
                    <h4 className={styles['title']}>{title}</h4>
                    <FaWindowClose onClick={() => set(false)} className={styles['close']}/>
                </div>
                <div className={styles['modal-items']}>
                    <SimpleSwiper numberItems={getNumber()} items={items}/>
                </div>
            </div>
        </div>
    )
}