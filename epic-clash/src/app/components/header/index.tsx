import Link from "next/link";

function Header({ play = false, about = false }) {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-white font-8bit">
      {play && (
        <Link href="/game" className="hover:text-gray-300">
          Jugar
        </Link>
      )}
      <div className="flex-1 text-center">
        <h1 className="text-3xl">Epic</h1>
        <h1 className="text-3xl">Clash</h1>
      </div>
      {about && (
        <Link href="/about" className="hover:text-gray-300">
          Acerca de
        </Link>
      )}
    </header>
  );
}

export default Header;
