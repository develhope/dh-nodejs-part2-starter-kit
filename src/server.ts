import express from "express";
import "express-async-errors";
import morgan from "morgan";
const app = express();
const port = 3000;

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  { id: 1, name: "Earth" },
  { id: 2, name: "Mars" },
];
app.use(morgan("dev"));
app.get("/api/plantes", (req, res) => {
  res.status(200).json(planets);
});
app.get("/api/plantes/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  res.status(200).json(planet);
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
