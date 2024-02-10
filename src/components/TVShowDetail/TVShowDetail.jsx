import { useState, useEffect } from 'react';
import { TVShowAPI } from "../../api/tv-show"; // Ajuste le chemin selon ta structure
import s from "./style.module.css";
import { FiveStarRating } from "../FiveStarRating/FiveStarRating.jsx";
import TVShowTrailer, { } from "../TVShowTrailer/TVShowTrailer.jsx";

export function TVShowDetail({ tvShow }) {
    const [trailerUrl, setTrailerUrl] = useState('');
    const rating = tvShow.vote_average / 2;

    const [isTVShowTrailerOpen, setIsTVShowTrailerOpen] = useState(false);

    const openTrailerModal = () => setIsTVShowTrailerOpen(true);
    const closeTrailerModal = () => setIsTVShowTrailerOpen(false);


    useEffect(() => {
        async function fetchTrailer() {
            const url = await TVShowAPI.fetchTrailer(tvShow.id);
            setTrailerUrl(url);
        }

        if (tvShow.id) {
            fetchTrailer();
        }
    }, [tvShow.id]);

    return (
        <div>
            <div className={s.title}>{tvShow.name}</div>
            <div className={s.rating_container}>
                <FiveStarRating rating={rating} />
                <div className={s.rating}>{rating.toFixed(1)}</div>
            </div>
            <div className={s.overview}>{tvShow.overview}</div>
            {trailerUrl && (
                <button onClick={openTrailerModal} className={s.trailerButton}>
                    Bande-annonce
                </button>
            )}
            <TVShowTrailer trailerUrl={isTVShowTrailerOpen ? trailerUrl.replace("watch?v=", "embed/") : ''} onClose={closeTrailerModal} />
        </div>
    );
}
