import express from "express";
import bodyParser from "body-parser";

import routes from "./routes/index";
import { initDB, syncDB } from "./utils/database";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(routes);
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

initDB();
syncDB();

app.use(errorHandler);

export default app;
