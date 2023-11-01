import Layout from "../components/layout"; // Asegúrate de ajustar la ruta del importe si es necesario

export const metadata = {
  title: "Total Games | Acerca de",
};
const About = () => {
  return (
    <>
      <Layout home play title>
        <main className="fondo-about min-h-screen flex flex-col items-center bg-black text-white font-8bit">
          <section className="container mx-auto p-8">
            <h1 className="text-5xl text-center mb-8">Acerca de Total Games</h1>
            <div className="bg-gray-800 bg-opacity-50 p-8 rounded">
              <p className="mb-4">
                Total Games es una empresa líder en la industria del
                entretenimiento digital. Desde su fundación en Noviembre de
                2023, nos hemos dedicado a crear experiencias de juego
                inolvidables, combinando narrativas cautivadoras con tecnología
                innovadora.
              </p>
              <p className="mb-4">
                Nuestra pasión por los videojuegos es lo que nos impulsa. Desde
                clásicos juegos de arcade hasta modernas aventuras en 2D, cada
                título de Total Games es una muestra de nuestro compromiso con
                la calidad y la diversión.
              </p>
              <p>
                En Total Games, creemos en el poder de los videojuegos para unir
                a las personas. Ya sea que estés luchando contra monstruos
                épicos o explorando mundos mágicos, nuestras creaciones están
                diseñadas para ofrecerte una experiencia única y emocionante.
              </p>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default About;
