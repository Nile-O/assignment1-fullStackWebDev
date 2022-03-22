import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { routeController } from "./controllers/route-controller.js";
import { stopController } from "./controllers/stop-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/route/{id}", config: routeController.index },
  { method: "POST", path: "/route/{id}/addstop", config: routeController.addStop },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addroute", config: dashboardController.addRoute },
  { method: "GET", path: "/dashboard/deleteroute/{id}", config: dashboardController.deleteRoute },
  { method: "GET", path: "/route/{id}/deletestop/{stopid}", config: routeController.deleteStop },

  { method: "GET", path: "/stop/{id}/editstop/{stopid}", config: stopController.index },
  { method: "POST", path: "/stop/{id}/updatestop/{stopid}", config: stopController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } }
];