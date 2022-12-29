import { getConnection } from "../database.js";



function lastid(){
  const lastid = getConnection().data.regiones.length;
  return lastid;
}

export const getRegiones = (req, res) => {
  const regiones = getConnection().data.regiones;
  res.json(regiones);
};


export const createRegion = async (req, res) => {
  const newRegion = {
    id: ""+lastid(),
    region: req.body.region,
    comunas: req.body.comunas,
  };

  try {
    const db = getConnection();
    db.data.regiones.push(newRegion);
    await db.write();

    res.json(newRegion);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getRegion = (req, res) => {
  const regionFound = getConnection().data.regiones.find(
    (t) => t.id === req.params.id
  );
  if (!regionFound) res.sendStatus(404);
  res.json(regionFound);
};

export const updateRegion = async (req, res) => {
  const { region, comunas } = req.body;

  try {
    const db = getConnection();
    const regionFound = db.data.regiones.find((t) => t.id === req.params.id);
    if (!regionFound) return res.sendStatus(404);

    regionFound.region = region;
    regionFound.comunas = comunas;

    db.data.regiones.map((t) => (t.id === req.params.id ? regionFound : t));

    await db.write();

    res.json(regionFound);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export const deleteRegion = async (req, res) => {
  const db = getConnection();
  const regionFound = db.data.regiones.find((t) => t.id === req.params.id);
  if (!regionFound) res.sendStatus(404);

  const newTasks = db.data.regiones.filter((t) => t.id !== req.params.id);
  db.data.regiones = newTasks;
  await db.write();

  return res.json(regionFound);
};

export const count = async (req, res) => {
  const totalTasks = getConnection().data.regiones.length;
  res.json(totalTasks);
};
