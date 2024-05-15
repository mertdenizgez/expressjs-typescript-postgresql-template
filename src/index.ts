import express from "express";
import bodyParser from "body-parser";

import routes from "./routes/index";
import { initDB } from "./utils/database";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(routes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

initDB();

export default app;
