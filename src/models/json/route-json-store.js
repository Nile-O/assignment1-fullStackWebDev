import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { trackJsonStore } from "./stop-json-store.js";

const db = new Low(new JSONFile("./src/models/json/routes.json"));
db.data = { routes: [] };

export const routeJsonStore = {
  async getAllRoutes() {
    await db.read();
    return db.data.routes;
  },

  async addRoute(route) {
    await db.read();
    route._id = v4();
    db.data.routes.push(route);
    await db.write();
    return route;
  },

  async getRouteById(id) {
    await db.read();
    const list = db.data.routes.find((route) => route._id === id);
    list.stops = await stopJsonStore.getStopsByRouteId(list._id);
    return list;
  },

  async getUserRoutes(userid) {
    await db.read();
    return db.data.routes.filter((route) => route.userid === userid);
  },

  async deleteRouteById(id) {
    await db.read();
    const index = db.data.routes.findIndex((route) => route._id === id);
    db.data.routes.splice(index, 1);
    await db.write();
  },

  async deleteAllRoutes() {
    db.data.routes = [];
    await db.write();
  },
};