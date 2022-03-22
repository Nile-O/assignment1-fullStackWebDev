import { Stop } from "./stop.js";

export const stopMongoStore = {
  async getAllStops() {
    const stops = await Stop.find().lean();
    return stops;
  },

  async addStop(routeId, stop) {
    stop.routeid = routeId;
    const newStop = new Stop(stop);
    const stopObj = await newStop.save();
    return this.getStopById(stopObj._id);
  },

  async getStopsByRouteId(id) {
    const stops = await Stop.find({ routeid: id }).lean();
    return stops;
  },

  async getStopById(id) {
    if (id) {
      const stop = await Stop.findOne({ _id: id }).lean();
      return stop;
    }
    return null;
  },

  async deleteStop(id) {
    try {
      await Stop.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllStops() {
    await Stop.deleteMany({});
  },

  async updateStop(stopId, stop) {
      await Stop.findByIdAndUpdate(stopId, stop) 
      const updatedStop = await this.getStopById(stopId);
      return updatedStop;
    }
};
