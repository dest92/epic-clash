"use client";
import { useState, FormEvent } from "react";

// Definición de interfaces para los estados y el evento de formulario
interface LoginFormState {
  username: string;
  password: string;
  loading: boolean;
  error?: string; // Opcional para manejar mensajes de error
}

export default function LoginForm() {
  const [formState, setFormState] = useState<LoginFormState>({
    username: "",
    password: "",
    loading: false,
  });

  // Manejador del cambio de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Validación simple de username y contraseña
  const validateForm = (): boolean => {
    const { username, password } = formState;
    if (!username || !password) {
      setFormState((prevState) => ({
        ...prevState,
        error: "Todos los campos son obligatorios.",
      }));
      return false;
    }
    // Agrega aquí más validaciones según sea necesario
    return true;
  };

  // Manejador de envío de formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState((prevState) => ({
      ...prevState,
      loading: true,
      error: undefined,
    }));

    try {
      // Aquí iría la lógica de autenticación
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formState.username,
          password: formState.password,
        }),
      });

      if (res.status === 200) {
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        // Si hay un error en la autenticación, muestra el mensaje de error
        const data = await res.json();
        setFormState((prevState) => ({
          ...prevState,
          loading: false,
          error: data.message || "Error al iniciar sesión.",
        }));
      }

      //   setTimeout(
      //     () => setFormState((prevState) => ({ ...prevState, loading: false })),
      //     2000
      //   );
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        loading: false,
        error: "Error al iniciar sesión.",
      }));
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        {formState.error && (
          <div className="mb-3 text-red-500">{formState.error}</div>
        )}
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-8bit text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formState.username}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-8bit"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-8bit text-gray-900 dark:text-white"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formState.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 font-8bit"
            required
          />
        </div>

        <button
          type="submit"
          disabled={formState.loading}
          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 font-8bit animate-pulse"
        >
          {formState.loading ? "Cargando..." : "Submit"}
        </button>
      </form>
    </>
  );
}
