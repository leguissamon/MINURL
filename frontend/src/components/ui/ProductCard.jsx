"use client";

import { useState } from "react";

export default function ProductCard({ image, title, description }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  return (
    <div className="bg-[#4b2e2e] text-white rounded-2xl shadow-lg p-4 w-full hover:scale-105 transition">
      {/* Imagem */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-xl"
      />

      {/* Conteúdo */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-500 text-sm mt-1">{description}</p>

        {/* Avaliação */}
        <div className="flex gap-1 mt-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={`cursor-pointer text-xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Input de comentário */}
        <textarea
          placeholder="Deixe seu comentário..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full mt-3 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Botão */}
        <button className="mt-3 w-full bg-white text-black py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
          Enviar Avaliação
        </button>
      </div>
    </div>
  );
}