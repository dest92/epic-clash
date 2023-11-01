import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 w-full font-8bit">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold">Epic Clash</h2>
        </div>
        <p className="mt-4">
          © 2023 Total Games. Todos los derechos reservados.
        </p>
       
      </div>
    </footer>
  );
};

export default Footer;
