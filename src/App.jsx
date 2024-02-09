import { useState, useEffect } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from "./style.module.css"
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail.jsx"
import { Logo } from "./components/Logo/Logo.jsx";
import logo from "./assets/images/logo.png"
import { TVShowList } from "./components/TVShowList/TVShowList.jsx";
import { SearchBar } from "./components/SearchBar/SearchBar.jsx";

export function App() {
    const [currentTVShow, setCurrentTVShow] = useState();
    const [recommendationList, setRecommendationList] = useState([]);

    async function fetchPopulars() {
        try {
            const populars = await TVShowAPI.fetchPopulars();
            if (populars.length > 0) {
                setCurrentTVShow(populars[0]);
            }
        } catch (error) {
            alert("Erreur du serveur durant la recherche des séries recommendées: " + error.message)
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



    async function searchTVShow(tvShowName) {
        try {
            const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
            if (searchResponse.length > 0) {
                setCurrentTVShow(searchResponse[0]);
            }
        } catch (error) {
            alert("Erreur du serveur durant la recherche de la série: " + error.message);
        }

    }


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
                            title="ShowSeeker"
                            subtitle="Trouve une série qui pourrait te plaire!"
                        />
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <SearchBar onSubmit={searchTVShow} />
                    </div>
                </div>
            </div>
            <div className={s.tv_show_detail}>
                {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
            </div>
            <div className={s.recommended_shows}>
                {recommendationList && recommendationList.length > 0 && (
                    <TVShowList
                        onClickItem={setCurrentTVShow}
                        tvShowList={recommendationList}
                    />
                )}
            </div>
        </div>
    )
}