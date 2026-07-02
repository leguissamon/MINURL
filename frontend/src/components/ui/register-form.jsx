"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./button";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      console.log("Cadastro:", data);

      if (error) {
        setError(error.message || "Erro ao criar conta.");
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erro inesperado ao criar conta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Criar Conta</h1>
          <p className="text-sm text-gray-500">
            Preencha os dados abaixo para se cadastrar.
          </p>
        </div>

        {error && (
          <p className="rounded-md bg-red-100 p-2 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nome
          </label>
          <input
            id="name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="email@teste.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Senha
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirmar senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Digite a senha novamente"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Criando..." : "Criar Conta"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Já possui conta?{" "}
          <Link href="/login" className="font-semibold underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}