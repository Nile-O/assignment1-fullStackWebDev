import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/stops.json"));
db.data = { stops: [] };

export const stopJsonStore = {
  async getAllStops() {
    await db.read();
    return db.data.stops;
  },

  async addStop(routeId, stop) {
    await db.read();
    stop._id = v4();
    stop.routeid = routeId;
    db.data.stops.push(stop);
    await db.write();
    return stop;
  },

  async getStopsByRouteId(id) {
    await db.read();
    return db.data.stops.filter((stop) => stop.routeid === id);
  },

  async getStopById(id) {
    await db.read();
    return db.data.stops.find((stop) => stop._id === id);
  },

  async deleteStop(id) {
    await db.read();
    const index = db.data.stops.findIndex((stop) => stop._id === id);
    db.data.stops.splice(index, 1);
    await db.write();
  },

  async deleteAllStops() {
    db.data.stops = [];
    await db.write();
  },

  async updateStop(stop, updatedStop) {
    stop.title = updatedStop.title;
    stop.locationlat = updatedStop.locationlat;
    stop.locationlong = updatedStop.locationlong;
    track.description = updatedStop.description;
    await db.write();
  },
};