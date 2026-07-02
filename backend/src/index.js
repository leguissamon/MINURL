import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { auth } from "./lib/auth.js";
import { prisma } from "./lib/prisma.js";
import { toNodeHandler } from "better-auth/node";
import { requireAuth } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/api/me", requireAuth, (req, res) => {
  res.json({
    message: "Bem-vindo ao seu perfil!",
    user: req.user,
  });
});

app.post("/api/products", requireAuth, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "O nome do produto é obrigatório.",
      });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao cadastrar produto.",
    });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao listar produtos.",
    });
  }
});

app.put("/api/products/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "O nome do produto é obrigatório.",
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao editar produto.",
    });
  }
});

app.delete("/api/products/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    return res.json({
      message: "Produto excluído com sucesso.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro ao excluir produto.",
    });
  }
});

app.all("/api/auth/*path", toNodeHandler(auth));

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`Servidor em http://localhost:${PORT}`);
  console.log(`Auth disponível em http://localhost:${PORT}/api/auth`);
});