import { StopSpec } from "../models/db/joi-schemas.js";
import { db } from "../models/db.js";

export const stopController = {
  index: {
    handler: async function (request, h) {
      const route = await db.routeStore.getRouteById(request.params.id);
      const stop = await db.stopStore.getStopById(request.params.stopid);
      const viewData = {
        title: "Edit Stop",
        route: route,
        stop: stop,
      };
      return h.view("stop-view", viewData);
    },
  },

  update: {
    validate: {
      payload: StopSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("stop-view", { title: "Edit stop error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const stop = await db.stopStore.getStopById(request.params.stopid);
      const newStop = {
        title: request.payload.title,
        locationlat: Number(request.payload.locationlat),
	    locationlong: Number(request.payload.locationlong),
        description: request.payload.description,
      };
      await db.stopStore.updateStop(stop, newStop);
      return h.redirect(`/route/${request.params.id}`);
    },
  },
};


