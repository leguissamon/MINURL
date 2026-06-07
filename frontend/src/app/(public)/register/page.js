"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Senha:", password);
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://img.freepik.com/vetores-gratis/design-do-quadro-desenhado-mao_23-2149676133.jpg')",
      }}
    >
      
      {/* card */}
      <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        {/* título */}
        <h1 className="text-2xl font-bold text-center mb-6 text-[#3b1f1f]">
           Criar sua conta
        </h1>

        {/* formulário */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3e26]"
          />

          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3e26]"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3e26]"
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3e26]"
          />

          <button
            type="submit"
            className="bg-[#6b3e26] text-white py-3 rounded-lg hover:bg-[#5a321f] transition"
          >
            Cadastrar
          </button>
        </form>

        {/* link */}
        <div className="mt-4 text-sm text-center">
          <span>Já tem conta? </span>
          <Link href="/login" className="text-[#6b3e26] hover:underline">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
}