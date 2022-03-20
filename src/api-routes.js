import { userApi } from "./api/user-api.js";
import { routeApi } from "./api/route-api.js";

export const apiRoutes = [
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/routes", config: routeApi.create },
  { method: "DELETE", path: "/api/routes", config: routeApi.deleteAll },
  { method: "GET", path: "/api/routes", config: routeApi.find },
  { method: "GET", path: "/api/routes/{id}", config: routeApi.findOne },
  { method: "DELETE", path: "/api/routes/{id}", config: routeApi.deleteOne },

];