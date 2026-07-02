"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./button";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      console.log("Login:", data);

      if (error) {
        setError(error.message || "Email ou senha inválidos.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Erro inesperado ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 text-center mb-6">
          <h1 className="text-2xl font-bold text-[#4b2e2e]">
            Entrar na sua conta
          </h1>

          <p className="text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link href="/register" className="text-[#6b3e26] underline">
              Cadastre-se
            </Link>
          </p>
        </div>

        {error && (
          <p className="rounded-md bg-red-100 p-2 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3e26]"
          required
        />

        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b3e26]"
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="flex justify-center text-sm">
        <Link href="/register" className="text-[#6b3e26] hover:underline">
          Criar conta
        </Link>
      </div>
    </div>
  );
}