import { db } from "../models/db.js";

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
    handler: async function (request, h) {
      const route = await db.routeStore.getRouteById(request.params.id);
      const newStop = {
        title: request.payload.title,
        location: request.payload.location,
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