export default function Home() {
  return (
    <div className="fondo-juego min-h-screen flex justify-center items-center">
      <div className="bg-transparent min-h-screen flex justify-center items-center">
        <div className="text-center p-5 bg-black bg-opacity-50 rounded-lg">
          <h1 className="text-white text-6xl font-bold font-8bit">
            Epic Clash
          </h1>
          <p className="text-gray-300 font-8bit">
            Lucha de guerreros y magos contra monstruos
          </p>
          <button className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded font-8bit">
            Jugar
          </button>
        </div>
      </div>
    </div>
  );
}
