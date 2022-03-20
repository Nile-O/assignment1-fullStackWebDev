import { Stop } from "./stop.js";

export const stopMongoStore = {
  async getStopsByRouteId(id) {
    const stops = await Stop.find({ routeid: id }).lean();
    return stops;
  },
};