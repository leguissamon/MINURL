"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Dashboard() {
  const router = useRouter();

  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  async function loadProducts() {
    const response = await fetch("http://localhost:5500/api/products", {
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      setProducts(data);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const url = editingId
      ? `http://localhost:5500/api/products/${editingId}`
      : "http://localhost:5500/api/products";

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        description,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (!response.ok) {
      alert(data.error || "Erro ao salvar produto.");
      return;
    }

    setName("");
    setDescription("");
    setEditingId(null);

    await loadProducts();

    alert(editingId ? "Produto editado!" : "Produto cadastrado!");
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description || "");
  }

  async function handleDelete(id) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este produto?");

    if (!confirmDelete) return;

    const response = await fetch(`http://localhost:5500/api/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Erro ao excluir produto.");
      return;
    }

    await loadProducts();

    alert("Produto excluído!");
  }

  function cancelEdit() {
    setEditingId(null);
    setName("");
    setDescription("");
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-5xl rounded-xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="mt-2 text-gray-500">
              Cadastre, edite e exclua produtos para receber avaliações.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-10 flex flex-col gap-6">
          <div>
            <label className="mb-2 block font-medium">Nome do Produto</label>

            <input
              type="text"
              placeholder="Ex.: Notebook Dell"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Descrição</label>

            <textarea
              rows={4}
              placeholder="Descreva o produto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              {loading
                ? "Salvando..."
                : editingId
                  ? "Salvar Alterações"
                  : "Cadastrar Produto"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg bg-gray-500 px-5 py-3 font-semibold text-white transition hover:bg-gray-600"
              >
                Cancelar edição
              </button>
            )}
          </div>
        </form>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Produtos cadastrados</h2>

          {products.length === 0 ? (
            <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
          ) : (
            <div className="grid gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-lg border bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-gray-600">
                        {product.description || "Sem descrição."}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="rounded-lg bg-yellow-500 px-4 py-2 font-semibold text-white transition hover:bg-yellow-600"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}