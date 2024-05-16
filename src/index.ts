import express from "express";
import bodyParser from "body-parser";

import routes from "./routes/index";
import { initDB, syncDB } from "./utils/database";
import { errorHandler } from "./middlewares/error-handler";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

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

app.use(errorHandler);

initDB();
syncDB();

export default app;
