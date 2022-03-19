import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const routes = await db.routeStore.getUserRoutes(loggedInUser._id);
      const viewData = {
        title: "POI Dashboard",
        user: loggedInUser,
        routes: routes,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addRoute: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newRoute = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.routeStore.addRoute(newRoute);
      return h.redirect("/dashboard");
    },
  },

  deleteRoute: {
    handler: async function (request, h) {
      const route = await db.routeStore.getRouteById(request.params.id);
      await db.routeStore.deleteRouteById(route._id);
      return h.redirect("/dashboard");
    },
  },
};