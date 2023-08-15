import express from "express";
import cors from "cors";

import { connection } from "./mysql.js";

const app = express();
app.use(cors());
app.use(express.json());

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("BD STARTED");
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("SERVER STARTED");
  }
});

app.post("/auth", (req, res) => {
  const { login, password } = req.body;

  connection.query(
    `SELECT * FROM USERS WHERE login="${login}" and password="${password}"`,
    (_, data) => {
      if (data?.length) {
        res.status(200).json({
          message: true,
          data,
        });
      } else {
        res.status(301).json({
          message: false,
        });
      }
    }
  );
});
