import React from 'react';
import s from "./style.module.css";

const TVShowTrailer = ({ trailerUrl, onClose }) => {
    if (!trailerUrl) return null;

    const autoplayUrl = `${trailerUrl}?autoplay=1`;

    return (
        <div className={s.modalBackground}>
            <div className={s.modalContent}>
                <button className={s.closeButton} onClick={onClose}>x</button>
                <iframe
                    src={autoplayUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Trailer"
                    className={s.trailerIframe}
                ></iframe>
            </div>
        </div>
    );
};

export default TVShowTrailer;
