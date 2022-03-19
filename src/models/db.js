import { userMemStore } from "./mem/user-mem-store.js";
import { routeMemStore } from "./mem/route-mem-store.js";
import { stopMemStore } from "./mem/stop-mem-store.js";

export const db = {
  userStore: null,
  routeStore: null,
  stopStore: null,

  init() {
    this.userStore = userMemStore;
    this.routeStore = routeMemStore;
    this.stopStore = stopMemStore;
  },
};