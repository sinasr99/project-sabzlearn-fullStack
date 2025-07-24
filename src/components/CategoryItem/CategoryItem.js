//=-=-=-=-=-=-=-=-=-=- Styles =-=-=-=-=-=-=-=-=-=-
import styles from "./CategoryItem.module.css"
import Link from "next/link";

export default ({href, icon, title, value, fromColor, toColor, col}) => {
    return (
        <Link href={href}  style={{background: `linear-gradient(to right, ${fromColor}, ${toColor})`}}
              className={`${styles['category-item']}`}>
               {icon}
              <div>
                  <p className={styles['title']}>{title}</p>
                  <p className={styles['value']}>{value}</p>
              </div>
        </Link>
    )
}