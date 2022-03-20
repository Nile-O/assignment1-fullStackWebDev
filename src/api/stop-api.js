import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const stopApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const stops = await db.stopStore.getAllStops();
        return stops;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const stop = await db.stopStore.getStopById(request.params.id);
        if (!stop) {
          return Boom.notFound("No stop with this id");
        }
        return stop;
      } catch (err) {
        return Boom.serverUnavailable("No stop with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const stop = await db.stopStore.addStop(request.params.id, request.payload);
        if (stop) {
          return h.response(stop).code(201);
        }
        return Boom.badImplementation("error creating stop");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.stopStore.deleteAllStops();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const stop = await db.stopStore.getStopById(request.params.id);
        if (!stop) {
          return Boom.notFound("No Stop with this id");
        }
        await db.stopStore.deleteStop(stop._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Stop with this id");
      }
    },
  },
};
