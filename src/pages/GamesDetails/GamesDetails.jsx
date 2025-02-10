import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { fetchGames } from "../../service/games.js";

export async function loader({ params }) {
  return { id: params.id };
}

export default function GamesDetails() {
  const { id } = useLoaderData();
  const [game, setGame] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const data = await fetchGames("", id);
        setGame(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-yellow-400 text-2xl font-semibold animate-pulse">Cargando detalles...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-red-500 text-2xl font-semibold">Error al cargar el juego.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-gray-700 text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Imagen del juego */}
          <img
            src={game.background_image || "/placeholder.svg"}
            alt={game.name}
            className="rounded-xl shadow-lg w-full lg:w-1/3 max-h-[500px] object-cover"
          />
          {/* Información del juego */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">{game.name}</h1>
            <p className="text-xl leading-relaxed text-white mb-6">{game.description_raw}</p>

            <div className="text-xl space-y-4">
              <p>
                <span className="font-semibold text-yellow-400">Fecha de lanzamiento:</span>{" "}
                {game.released || "N/A"}
              </p>
              <p>
                <span className="font-semibold text-yellow-400">Rating:</span> ⭐ {game.rating}
              </p>
              <div>
                <p className="font-semibold text-yellow-400">Géneros:</p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {game.genres.map((genre) => (
                    <li
                      key={genre.id}
                      className="px-3 py-1 rounded-full bg-black text-gray-300 text-sm font-medium"
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Mostrar plataformas */}
              <div>
                <p className="font-semibold text-yellow-400">Plataformas:</p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {game.platforms.map((platform) => (
                    <li
                      key={platform.platform.id}
                      className="px-3 py-1 rounded-full bg-black text-gray-300 text-sm font-medium"
                    >
                      {platform.platform.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}