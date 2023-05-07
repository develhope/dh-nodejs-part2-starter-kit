import express from "express";
import "express-async-errors";
import morgan from "morgan";
import {
  create,
  deleteById,
  getAll,
  getOneById,
  updateById,
} from "./planets.js";
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(express.json());
app.get("/api/plantes", getAll);
app.get("/api/plantes/:id", getOneById);
app.post("/api/planets", create);

app.put("api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById);
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
