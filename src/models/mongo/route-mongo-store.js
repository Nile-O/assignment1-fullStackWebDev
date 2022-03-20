import { Route } from "./route.js";
import { stopMongoStore } from "./stop-mongo-store.js";

export const routeMongoStore = {
  async getAllRoutes() {
    const routes = await Route.find().lean();
    return routes;
  },

  async getRouteById(id) {
    if (id) {
      const route = await Route.findOne({ _id: id }).lean();
      if (route) {
        route.stops = await stopMongoStore.getStopsByRouteId(route._id);
      }
      return route;
    }
    return null;
  },

  async addRoute(route) {
    const newRoute = new Route(route);
    const routeObj = await newRoute.save();
    return this.getRouteById(routeObj._id);
  },

  async getUserRoutes(id) {
    const route = await Route.find({ userid: id }).lean();
    return route;
  },

  async deleteRouteById(id) {
    try {
      await Route.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllRoutes() {
    await Route.deleteMany({});
  }
};


