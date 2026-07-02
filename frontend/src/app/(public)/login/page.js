import LoginForm from "@/components/ui/login-form";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/vetores-gratis/design-do-quadro-desenhado-mao_23-2149676133.jpg')",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}