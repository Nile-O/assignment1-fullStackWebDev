import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { poiService } from "./poi-service.js";
import { maggie, maggieCredentials, frances, testRoutes, testStops, sarria } from "../fixtures.js";

suite("Stop API tests", () => {
  let user = null;
  let portuguesList = null;

  setup(async () => {
    poiService.clearAuth();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggieCredentials);
    await poiService.deleteAllRoutes();
    await poiService.deleteAllStops();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    await poiService.authenticate(maggieCredentials);
    frances.userid = user._id;
    portuguesList = await poiService.createRoute(frances);
  });

  teardown(async () => {});

  test("create stop", async () => {
    const returnedStop = await poiService.createStop(portuguesList._id, sarria);
    assertSubset(sarria, returnedStop);
  });

  test("create Multiple stops", async () => {
    for (let i = 0; i < testStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createStop(portuguesList._id, testStops[i]);
    }
    const returnedStops = await poiService.getAllStops();
    assert.equal(returnedStops.length, testStops.length);
    for (let i = 0; i < returnedStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const stop = await poiService.getStop(returnedStops[i]._id);
      assertSubset(stop, returnedStops[i]);
    }
  });

  test("Delete StopApi", async () => {
    for (let i = 0; i < testStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createStop(portuguesList._id, testStops[i]);
    }
    let returnedStops = await poiService.getAllStops();
    assert.equal(returnedStops.length, testStops.length);
    for (let i = 0; i < returnedStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const stop = await poiService.deleteStop(returnedStops[i]._id);
    }
    returnedStops = await poiService.getAllStops();
    assert.equal(returnedStops.length, 0);
  });

  test("denormalised route", async () => {
    for (let i = 0; i < testStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await poiService.createStop(portuguesList._id, testStops[i]);
    }
    const returnedRoute = await poiService.getRoute(portuguesList._id);
    assert.equal(returnedRoute.stops.length, testStops.length);
    for (let i = 0; i < testStops.length; i += 1) {
      assertSubset(testStops[i], returnedRoute.stops[i]);
    }
  });
});
