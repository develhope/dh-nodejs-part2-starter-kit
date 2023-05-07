import { Request, Response } from "express";
import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/video");

const setupDb = async () => {
  db.none(
    `
      DROP TABLE IF EXISTS planets;

      CREATE TABLE planets (
        id SERIAL NOT NULL PRIMARY KEY,
        name TEXT NOT NULL
      );`
  );

  await db.none(`INSERT INTO planets (name) VALUE ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUE ('Mars')`);
};
setupDb();

const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
};

const getOneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = await db.one(`SELECT * FROM planets WHERE id=$1;`, Number(id));
  res.status(200).json(planet);
};
const create = async (req: Request, res: Response) => {
  const { name } = req.body;
  const newPlanet = { name };

  await db.none(`INSERT INTO planets (name) VALUES ($1)`, name);
  res.status(201).json({ msg: "The planet was created" });
};

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name]);

  res.status(200).json({ msg: "The planet was updated" });
};

const deleteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id));

  res.status(200).json({ msg: "The planet was deleted" });
};

export { getAll, getOneById, create, updateById, deleteById };
