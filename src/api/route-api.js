import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const routeApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const routes = await db.routeStore.getAllRoutes();
        return routes;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const route = await db.routeStore.getRouteById(request.params.id);
        if (!route) {
          return Boom.notFound("No Route with this id");
        }
        return route;
      } catch (err) {
        return Boom.serverUnavailable("No Route with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const route = request.payload;
        const newRoute = await db.routeStore.addRoute(route);
        if (newRoute) {
          return h.response(newRoute).code(201);
        }
        return Boom.badImplementation("error creating route");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const route = await db.routeStore.getRouteById(request.params.id);
        if (!route) {
          return Boom.notFound("No Route with this id");
        }
        await db.routeStore.deleteRouteById(route._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Route with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.routeStore.deleteAllRoutes();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};
