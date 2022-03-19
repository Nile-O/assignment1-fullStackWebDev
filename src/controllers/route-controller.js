import { db } from "../models/db.js";
import { StopSpec } from "../models/db/joi-schemas.js";

export const routeController = {
  index: {
    handler: async function (request, h) {
      const route = await db.routeStore.getRouteById(request.params.id);
      const viewData = {
        title: "Route",
        route: route,
      };
      return h.view("route-view", viewData);
    },
  },

  addStop: {
    validate: {
        payload: StopSpec,
        options: { abortEarly: false },
        failAction: function (request, h, error) {
          return h.view("route-view", { title: "Add Stop error", errors: error.details }).takeover().code(400);
        },
      },
    handler: async function (request, h) {
      const route = await db.routeStore.getRouteById(request.params.id);
      const newStop = {
        title: request.payload.title,
        locationlat: Number(request.payload.locationlat),
        locationlong: Number(request.payload.locationlong),
        description: request.payload.description,
      };
      await db.stopStore.addStop(route._id, newStop);
      return h.redirect(`/route/${route._id}`);
    },
  },

  deleteStop: {
    handler: async function(request, h) {
      const route = await db.routeStore.getRouteById(request.params.id);
      await db.stopStore.deleteStop(request.params.stopid);
      return h.redirect(`/route/${route._id}`);
    },
  },
};