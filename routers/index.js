import authRoute from "./authRoute.js";
import recordRoute from "./recordRoute.js";

const TerminalRoutes = (app) => {
  app.use(authRoute);
  app.use(recordRoute);
};

export default TerminalRoutes;
