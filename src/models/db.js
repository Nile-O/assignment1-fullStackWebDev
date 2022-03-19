import { userMemStore } from "./mem/user-mem-store.js";
import { routeMemStore } from "./mem/route-mem-store.js";
import { stopMemStore } from "./mem/stop-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { routeJsonStore } from "./json/route-json-store.js";
import { stopJsonStore } from "./json/stop-json-store.js";

export const db = {
  userStore: null,
  routeStore: null,
  stopStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.routeStore = routeJsonStore;
        this.stopStore = stopJsonStore;
        break;
      default:
        this.userStore = userMemStore;
        this.routeStore = routeMemStore;
        this.stopStore = stopMemStore;
    }
  },
};