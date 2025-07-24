import styles from "./transactions.module.css"

import { FaCommentDollar } from "react-icons/fa";
import Transactions from "@/components/Transactions/Transactions";

export default () => {
    return (
        <>
            <div className={styles['wallet-wrapper']}>
              <div className={styles['wallet-icon-wrapper']}>
                  <FaCommentDollar className={styles['wallet-icon']}/>
              </div>
                <div className={styles['wallet-left']}>
                    <p className={styles['wallet-title']}>موجودی کیف پول</p>
                    <p className={styles['wallet-value']}>0 تومان</p>
                </div>
            </div>

            <Transactions/>
        </>
    )
}