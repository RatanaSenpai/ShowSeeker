import { useState, useEffect } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from "./style.module.css"
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail.jsx"
import { Logo } from "./components/Logo/Logo.jsx";
import logo from "./assets/images/logo.png"
import { TVShowList } from "./components/TVShowList/TVShowList.jsx";

export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        const populars = await TVShowAPI.fetchPopulars();
        if (populars.length > 0) {
            setCurrentTVShow(populars[0]);
        }
    }

    async function fetchRecommendations(tvShowId) {
        const recommendations = await TVShowAPI.fetchRecommendations(
            tvShowId
        );
        if (recommendations.length > 0) {
            setRecommendationList(recommendations.slice(0, 10));
        }
    }

    useEffect(() => {
        fetchPopulars();
    }, []);

    useEffect(() => {
        if (currentTVShow) {
            fetchRecommendations(currentTVShow.id);
        }
    }, [currentTVShow]);

    console.log("***", currentTVShow);

    function setCurrentTvShowFromRecommendation(tvShow) {
        alert(JSON.stringify(tvShow));
    }

    console.log('***', recommendationList);
    return (

        <div className={s.main_container}
            style={{
                background: currentTVShow
                    ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
                    : "black",
            }}
        >
            <div className={s.header}>
                <div className="row">
                    <div className="col-4">
                        <Logo
                            image={logo}
                            title="Watowatch"
                            subtitle="Find a show you may like"
                        />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <input style={{ width: "100%" }} type="text" />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommended_shows}>
                {recommendationList && recommendationList.length > 0 && (
                    <TVShowList tvShowList={recommendationList} />
                )}
            </div>
        </div>
    )
}