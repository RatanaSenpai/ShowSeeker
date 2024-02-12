import axios from "axios";
import { BASE_URL } from "../config";

export class TVShowAPI {
    static async fetchPopulars() {
        const response = await axios.get(`${BASE_URL}tv/top_rated?api_key=${process.env.REACT_APP_API_KEY_PARAM}&language=fr-FR`);
        return response.data.results;
    }

    static async fetchRecommendations(tvShowId) {
        const response = await axios.get(
            `${BASE_URL}tv/${tvShowId}/recommendations?api_key=${process.env.REACT_APP_API_KEY_PARAM}&language=fr-FR`
        );
        return response.data.results;
    }

    static async fetchByTitle(title) {
        const response = await axios.get(
            `${BASE_URL}search/tv?api_key=${process.env.REACT_APP_API_KEY_PARAM}&language=fr-FR&query=${title}`
        );
        return response.data.results;
    }

    static async fetchTrailer(tvShowId) {
        const response = await axios.get(
            `${BASE_URL}tv/${tvShowId}/videos?api_key=${process.env.REACT_APP_API_KEY_PARAM}&language=fr-FR`
        );
        const trailers = response.data.results.filter(video => video.type === "Trailer" && video.site === "YouTube");
        return trailers.length > 0 ? `https://www.youtube.com/watch?v=${trailers[0].key}` : null;
    }
}