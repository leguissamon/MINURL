"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Senha:", password);
  }

  return (
    <div
  className="min-h-screen flex items-center justify-center bg-cover bg-center"
  style={{
    backgroundImage: "url('https://img.freepik.com/vetores-gratis/design-do-quadro-desenhado-mao_23-2149676133.jpg')",
  }}
>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        {/* Título */}
        <h1 className="text-2xl font-bold text-center mb-6 text-[#4b2e2e]">
           Entrar na sua conta
        </h1>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          
          {/* Email */}
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3e26]"
          />

          {/* Senha */}
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3e26]"
          />

          {/* Botão */}
          <button
            type="submit"
            className="bg-[#6b3e26] text-white py-3 rounded-lg hover:bg-[#5a321f] transition"
          >
            Entrar
          </button>
        </form>

        {/* Links extras */}
        <div className="flex justify-between mt-4 text-sm">
          <Link href="#" className="text-[#6b3e26] hover:underline">
            Esqueci minha senha
          </Link>
          <Link href="/register" className="text-[#6b3e26] hover:underline">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}