import { NextResponse } from "next/server";

const rotasPrivadas = ["/dashboard", "/links"];
const rotasDeAuth = ["/login", "/register"];

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  let estaLogado = false;

  try {
    const sessionResponse = await fetch(
      "http://localhost:5500/api/auth/get-session",
      {
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
      }
    );

    const session = await sessionResponse.json();
    estaLogado = !!session?.user;
  } catch (error) {
    console.log("Backend offline:", error.message);
  }

  if (!estaLogado && rotasPrivadas.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (estaLogado && rotasDeAuth.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/relatorio/:path*", "/login", "/register"],
};