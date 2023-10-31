import React, { ReactNode } from 'react';
import Header from '../header'; // Asegúrate de que la ruta sea correcta

type LayoutProps = {
  children: ReactNode;
  play?: boolean;
  about?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, play = false, about = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header play={play} about={about} />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
