import "./global.css";
import s from "./style.module.css"

export function App() {

    return (

        <div className={s.main_container}>
            <div className={s.header}>Header</div>
            <div className={s.tv_show_detail}>Detail</div>
            <div className={s.recommendations}>Recommendations</div>
        </div>
    )
}