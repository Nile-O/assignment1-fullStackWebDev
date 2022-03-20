import Mongoose from "mongoose";

const { Schema } = Mongoose;

const routeSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Route = Mongoose.model("Route", routeSchema);