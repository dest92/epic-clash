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
    <header className="flex items-center justify-between p-4 bg-black text-white font-8bit">
      <div className="flex justify-start flex-1 gap-10">
        {home && (
          <Link href="/" className="hover:text-green-400">
            Inicio
          </Link>
        )}
        {play && (
          <Link href="/game" className="hover:text-green-400 mx-2">
            Jugar
          </Link>
        )}
      </div>

      {/* Sección central para el título */}
      <div className="mx-auto justify-center text-center">
        {title && (
          <div>
            <h1 className="text-3xl">Epic</h1>
            <h1 className="text-3xl">Clash</h1>
          </div>
        )}
      </div>

      {/* Sección derecha */}
      <div className="flex justify-end flex-1 gap-10">
        {/* Mueve los enlaces de iniciar sesión y registrarse aquí si deseas que estén a la derecha */}
        <Link href="/login" className="hover:text-green-400 mx-2">
          Iniciar sesión
        </Link>
        <Link href="/register" className="hover:text-green-400 mx-2">
          Registrarse
        </Link>
      </div>
    </header>
  );
};

export default Header;
