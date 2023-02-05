
const express = require('express')
const mswjs = require('@mswjs/data')
const cors = require('cors')

const app = express()
const port = 3030

const corsOptions = {
    methods: "GET,PUT,POST,DELETE",
    origin: true,
    optionsSuccessStatus: 200,
  };

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const projectName = "ID";

const nextId = (() => {
    let id = 0;
    return () => `${projectName}-${++id}`;
  })();
  

 const db = mswjs.factory({
    score: {
        id: mswjs.primaryKey(() => nextId()),
        name: String,
        score: Number,
      },
  });

  db.score.create({
    id: "liraz hadad",
    name: "liraz hadad",
    score: 30,
  });

  app.get("/scores", (req, res) => {
    const scores = db.score
      .getAll()
      .map((t) => ({ id: t.id, name: t.name, score: t.score }));
  
    return res.json(scores);
  });

  app.post("/scores", async (req, res) => {
    const { body } = req;
    console.log(body);
    if (!("name" in body || "score" in body)) {
      return res.status(400).send("Missing both name and score");
    }
    const typedBody = body;
    try {
      const score = db.score.create(typedBody);
      return res.json(score);
    } catch (e) {
      return res.status(400).send(e);
    }
  });

  app.delete("/scores/:id", (req, res) => {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).send("Missing id");
    }
    try {
      db.score.delete({
        where: {
          id: {
            equals: id,
          },
        },
      });
      return res.sendStatus(200);
    } catch (e) {
      return res.status(400).send(e);
    }
  });

  app.put("/scores/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const typedBody = body;
    const data = {};
    if ("name" in typedBody && typeof typedBody.name === "string") {
      data.name = typedBody.name;
    }
    if ("score" in typedBody && typeof typedBody.score === "number") {
      data.score = typedBody.score;
    }
    try {
      const score = db.score.update({
        where: {
          id: {
            equals: id,
          },
        },
        data,
      });
      return res.json(score);
    } catch (e) {
      return res.status(400).send(e);
    }
  });
  

// app.get('/', (req, res) => {
//   res.send(db)
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})