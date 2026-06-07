import Link from "next/link";
import { Button } from "./button";

export function TopbarMenu (){
    return(
        <header className="flex items-center gap-9 bg-[#4b2e2e] h-20">


          <img src="https://lh6.googleusercontent.com/proxy/8tOlIE0-g0OhNo7AJRuOMJA69j78JN9sWLZJoel0EuICoIwlafA_VgFoVBGK9omdbLQNXBc8py3HCmfrw1Hqo4obrin0jjngYlXvdKBRoFMuC_hlsj3tVkJPiFCNqu9I" alt="Logo" className="h-15" />


            <nav className="flex justify-between items-center w-full">
                <div className=" flex gap-6 text-sm text-white">
                  <Link href="/">Home</Link>
                  <Link href="/">historia</Link>
                </div>
                <div className="flex gap-7.5">
                    <Link href="/login">
                    <Button variant="outline">Entrar</Button>
                    </Link>
                    <Link href="/register">
                    <Button>Cadastrar-se</Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}