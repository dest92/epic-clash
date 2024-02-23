import Link from "next/link";
import Layout from "../components/layout";
import LoginForm from "../components/LoginForm";

export const metadata = {
  title: "Epic Clash | Login",
};

export default function Login() {
  return (
    <Layout home title about>
      <div className="fondo-login min-h-screen flex justify-center items-center">
        <div className="bg-transparent min-h-screen flex justify-center items-center">
          <div className="text-center p-5 bg-black bg-opacity-50 rounded-lg">
            <h1 className="text-white text-6xl font-bold font-8bit">Login</h1>
            <p className="text-gray-300 font-8bit my-5">
              Inicia sesión para guardar tu progreso
            </p>
            <LoginForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
