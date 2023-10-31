import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 w-full ">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">Epic Clash</h2>
        </div>
        <p className="mt-4">
          © 2023 Total Games. Todos los derechos reservados.
        </p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-red-500">
            Política de privacidad
          </a>
          <a href="#" className="hover:text-red-500">
            Términos de servicio
          </a>
          <a href="#" className="hover:text-red-500">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


