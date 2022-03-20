import Boom from "@hapi/boom";
import { IdSpec, RouteArraySpec, RouteSpec, RouteSpecPlus } from "../models/db/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

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
    tags: ["api"],
    response: { schema: RouteArraySpec, failAction: validationError },
    description: "Get all routes",
    notes: "Returns all routes",
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
    tags: ["api"],
    description: "Find a Route",
    notes: "Returns a route",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: RouteSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Create a Route",
    notes: "Returns the newly created route",
    validate: { payload: RouteSpec, failAction: validationError },
    response: { schema: RouteSpecPlus, failAction: validationError },
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
    tags: ["api"],
    description: "Delete a route",
    validate: { params: { id: IdSpec }, failAction: validationError },
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
    tags: ["api"],
    description: "Delete all RouteApi",
  },
};
