import { Router } from "express";
import userRoute from "./userRoute";
import bookRoute from "./bookRoute";

const router = Router();

const defaultRoutes = [
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/books",
    route: bookRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
