import "@/styles/style.css"
import {ToastContainer} from "react-toastify";

export default function RootLayout({children}) {
    return (
        <html lang="fa">
        <body>
        <ToastContainer position="top-left"/>
        {children}
        </body>
        </html>
    );
}
