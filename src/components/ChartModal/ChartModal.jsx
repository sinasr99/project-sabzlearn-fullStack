import styles from "./ChartModal.module.css";
import { FaWindowClose } from "react-icons/fa";
import Chart from "@/components/Chart/Chart";
import { useEffect, useRef, useState } from "react";

export default ({ title, setIsShowModal, data, getSpaceX, clickX }) => {
    const [position, setPosition] = useState({ top: 100, left: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const offset = useRef({ x: 0, y: 0 });

    const handleMouseDown = e => {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.left,
            y: e.clientY - position.top
        };
    };

    const handleMouseMove = e => {
        if (!isDragging) return;
        setPosition({
            left: e.clientX - offset.current.x,
            top: e.clientY - offset.current.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    useEffect(() => {
        const close = () => setIsShowModal(false);
        window.addEventListener("keyup", close);
        return () => window.removeEventListener("keyup", close);
    }, []);

    return (
        <div
            style={{ left: position.left, top: position.top, position: "fixed" }}
            className={styles['modal']}
        >
            <div
                className={styles['header']}
                onMouseDown={handleMouseDown}
                style={{ cursor: "grab" }}
            >
                <h4 className={styles['title']}>{title}</h4>
                <FaWindowClose
                    onClick={() => setIsShowModal(false)}
                    className={styles['icon']}
                />
            </div>
            <div className={styles['chart-wrapper']}>
                {
                    data ?    <Chart clickX={clickX} data={data} getSpaceX={getSpaceX} />
                        : <p className={styles['alert']}>هیچ فروشی در این بازه زمانی یافت نشد</p>
                }
            </div>
        </div>
    );
};