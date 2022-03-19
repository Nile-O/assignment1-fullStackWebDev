import { v4 } from "uuid";

let stops = [];

export const stopMemStore = {
  async getAllStops() {
    return stops;
  },

  async addStop(routeId, stop) {
    stop._id = v4();
    stop.routeid = routeId;
    stops.push(stop);
    return stop;
  },

  async getStopsByRouteId(id) {
    return stops.filter((stop) => stop.routeid === id);
  },

  async getStopById(id) {
    return stops.find((stop) => stop._id === id);
  },

  async getRouteStops(routeId) {
    return stops.filter((stop) => stop.routeid === routeId);
  },

  async deleteStop(id) {
    const index = stops.findIndex((stop) => stop._id === id);
    stops.splice(index, 1);
  },

  async deleteAllStops() {
    stops = [];
  },

  async updateStop(stop, updatedStop) {
    stop.title = updatedStop.title;
    stop.location = updatedStop.location;
    stop.description = updatedStop.description;
  },
};