import { v4 } from "uuid";
import { stopMemStore } from "./stop-mem-store.js";

let routes = [];

export const routeMemStore = {
  async getAllRoutes() {
    return routes;
  },

  async addRoute(route) {
    route._id = v4();
    routes.push(route);
    return route;
  },

  async getRouteById(id) {
      const list = routes.find((route) => route._id === id);
      if (list) {
        list.stops = await stopMemStore.getStopsByRouteId(list._id);
        return list;
      }
      return null;
  },

  async deleteRouteById(id) {
    const index = routes.findIndex((route) => route._id === id);
    if (index !== -1) routes.splice(index, 1);
  },

  async deleteAllRoutes() {
    routes = [];
  },

  async getUserRoutes(userid) {
      return routes.filter((route) => route.userid === userid);
  }
};