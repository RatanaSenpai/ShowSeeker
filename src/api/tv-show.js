import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY_PARAM = "?api_key=9adccddab05670b7227438f18baa5f60";

export class TVShowAPI {
    static async fetchPopulars() {
        const response = await axios.get(`${BASE_URL}tv/popular${API_KEY_PARAM}`);
        console.log(response.data.results);
        return response.data.results;
    }
}