import Link from "next/link";
import Layout from "./components/layout";

export const metadata = {
  title: "Total Games | Inicio",
};
export default function Home() {
  return (
    <>
      <Layout about={true}>
        <div className="fondo-juego min-h-screen flex justify-center items-center">
          <div className="bg-transparent min-h-screen flex justify-center items-center">
            <div className="text-center p-5 bg-black bg-opacity-50 rounded-lg">
              <h1 className="text-white text-6xl font-bold font-8bit">
                Epic Clash
              </h1>
              <p className="text-gray-300 font-8bit my-5">
                Lucha de guerreros y magos contra monstruos
              </p>
              <Link
                href="/game"
                className="mt-20 bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded font-8bit animate-pulse"
              >
                Jugar
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
