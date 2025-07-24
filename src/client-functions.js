export function getCookieValue(key) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [cookieKey, cookieValue] = cookie.split("=");
        if (cookieKey === key) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null
}