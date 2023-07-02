const express = require("express");
const router = express.Router();
const Model = require("../model/model");
const { SchemaTypeOptions } = require("mongoose");

module.exports = router;

// Enviar datos a db
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    age: req.body.age,
    genre: req.body.genre,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Recibir todos los objetos de la bs
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Recibir por ID
router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar mediante ID
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Borrar por ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Dcoumento con nombre ${data.name} ha sido eliminado.`);
  } catch {
    res.status(400).json({ message: error.message });
  }
});
