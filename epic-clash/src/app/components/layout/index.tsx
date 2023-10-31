import React, { ReactNode } from "react";
import Header from "../header"; // Asegúrate de que la ruta sea correcta
import Footer from "../Footer";

type LayoutProps = {
  children: ReactNode;
  play?: boolean;
  about?: boolean;
  home?: boolean;
  title?: boolean; // Opción para mostrar el título
};

const Layout: React.FC<LayoutProps> = ({
  children,
  play = false,
  about = false,
  home = false,
  title = false,
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header play={play} about={about} home={home} title={title} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
