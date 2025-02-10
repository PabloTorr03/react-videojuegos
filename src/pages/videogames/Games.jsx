import { useEffect, useState } from "react";
import { fetchGames } from "../../service/games.js";
import { Link } from "react-router-dom";

function Games() {
    const [isLoading, setLoading] = useState(true);
    const [games, setGames] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getGames = async () => {
            setLoading(true);
            const data = await fetchGames(searchTerm);
            setGames(data);
            setLoading(false);
        };

        getGames();
    }, [searchTerm]);

    return (
        <section className="p-5 bg-gray-700">
            {/* Contenedor para el título y la barra de búsqueda */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="font-rubiksh text-yellow-400 font-extrabold text-4xl">
                    Biblioteca de Juegos
                </h1>

                <div className="flex items-center"> {/* Nuevo contenedor flex */}
                    <i className="fas fa-search mr-2"></i> {/* Margen a la derecha */}
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-92 p-2 text-yellow-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            {isLoading ? (
                <p className="text-center text-white text-lg">Cargando juegos...</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {games.length > 0 ? (
                        games.map((game) => (
                            <Link to={`/gamesDetails/${game.id}`} key={game.id}>
                            <div key={game.id} className="bg-yellow-400 p-4 rounded-xl shadow-md">
                                <img src={game.background_image} alt={game.name} className="w-full h-40 object-cover rounded-lg" />
                                <h3 className="text-lg font-bold mt-2">{game.name}</h3>
                                <p className="text-gray-600">⭐ {game.rating}</p>
                            </div>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-white text-lg">No se encontraron juegos</p>
                    )}
                </div>
            )}
        </section>
    );
}

export default Games;
