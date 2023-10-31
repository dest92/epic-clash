import Link from "next/link";

type HeaderProps = {
  play?: boolean;
  about?: boolean;
  home?: boolean;
  title?: boolean; // Opción para mostrar el título
};

const Header: React.FC<HeaderProps> = ({
  play = false,
  about = false,
  home = false,
  title = false, // Título es opcional
}) => {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-white font-8bit">
      <div className="flex-1 text-center">
        {home ? (
          <Link href="/" className="hover:text-green-400">
            Inicio
          </Link>
        ) : null}
      </div>

      <div className="flex-1 text-center">
        {title && ( // Mostrar el título si es necesario
          <div>
            <h1 className="text-3xl">Epic</h1>
            <h1 className="text-3xl">Clash</h1>
          </div>
        )}
      </div>

      <div className="flex-1 text-center">
        {play && (
          <Link href="/game" className="hover:text-green-400 mx-2">
            Jugar
          </Link>
        )}
        {about && (
          <Link href="/about" className="hover:text-green-400 mx-2">
            Sobre nosotros
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
