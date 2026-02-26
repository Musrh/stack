const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔹 Connexion MongoDB
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/testdb";

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.log("Erreur MongoDB ❌ :", err));

// 🔹 Modèle User
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", userSchema);

// 🔹 Routes

// Test serveur
app.get("/", (req, res) => {
  res.send("🚀 Server Railway + MongoDB fonctionne !");
});

// GET /users → liste tous les utilisateurs
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// POST /users → ajouter un utilisateur
app.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
});

// PORT dynamique pour Railway
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serveur lancé sur le port", PORT));
