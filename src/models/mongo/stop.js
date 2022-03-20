import Mongoose from "mongoose";

const { Schema } = Mongoose;

const stopSchema = new Schema({
  title: String,
  locationlat: Number,
  locationlong: Number,
  description: String,
  routeid: {
    type: Schema.Types.ObjectId,
    ref: "Route",
  },
});

export const Stop = Mongoose.model("Stop", stopSchema);