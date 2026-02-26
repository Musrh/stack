const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 MongoDB
// Quand tu es prêt, ajoute ta variable Railway : process.env.MONGO_URL
// const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/testdb";
// mongoose.connect(mongoURL)
//   .then(() => console.log("MongoDB connecté"))
//   .catch(err => console.log("Erreur MongoDB :", err));

// 🔹 Routes

// Test serveur
app.get("/", (req, res) => {
  res.send("🚀 Server Railway minimal fonctionne !");
});

// Exemple route /users (vide pour l’instant)
app.get("/users", (req, res) => {
  res.json([]);
});

// PORT dynamique fourni par Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port", PORT);
});
