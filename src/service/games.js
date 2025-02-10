const API_KEY = "e621543c33ee44e48e7b82cfdc83fb23";
const BASE_URL = "https://api.rawg.io/api/games";

export const fetchGames = async (searchQuery = "", id = "") => {
    try {
        let url;
        if (id) {
            url = `${BASE_URL}/${id}?key=${API_KEY}`;
        } else {
            url = searchQuery 
                ? `${BASE_URL}?key=${API_KEY}&search=${searchQuery}` 
                : `${BASE_URL}?key=${API_KEY}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al obtener los datos");

        const data = await response.json();
        return id ? data : data.results;
    } catch (error) {
        console.error("Error:", error);
        return id ? null : []; 
    }
};