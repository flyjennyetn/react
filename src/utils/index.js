/**
 * Created by flyjennyetn on 2016-10-26.
 */
import moment from "moment";

export const setTitle = (title) => {
    document.title = title
    if (is_IOS) {
        let i = document.createElement('iframe')
        i.src = '/favicon.ico'
        i.style.display = 'none'
        i.onload = () => {
            setTimeout(() => {
                i.remove()
            }, 0)
        }
        document.body.appendChild(i)
    }
}