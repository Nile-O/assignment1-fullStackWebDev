import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testRoutes, testStops, sarria, frances, portugues, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Stop Model tests", () => {

  let francesList = null;

  setup(async () => {
    db.init("mongo");
    await db.routeStore.deleteAllRoutes();
    await db.stopStore.deleteAllStops();
    francesList = await db.routeStore.addRoute(frances);
    for (let i = 0; i < testStops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testStops[i] = await db.stopStore.addStop(francesList._id, testStops[i]);
    }
  });

  test("create single stop", async () => {
    const portuguesList = await db.routeStore.addRoute(portugues);
    const stop = await db.stopStore.addStop(portuguesList._id, sarria)
    assert.isNotNull(stop._id);
    assertSubset (sarria, stop);
  });

  test("get multiple stops", async () => {
    const stops = await db.stopStore.getStopsByRouteId(francesList._id);
    assert.equal(testStops.length, testStops.length)
  });

  test("delete all stops", async () => {
    const stops = await db.stopStore.getAllStops();
    assert.equal(testStops.length, stops.length);
    await db.stopStore.deleteAllStops();
    const newStops = await db.stopStore.getAllStops();
    assert.equal(0, newStops.length);
  });

  test("get a stop - success", async () => {
    const portuguesList = await db.routeStore.addRoute(portugues);
    const stop = await db.stopStore.addStop(portuguesList._id, sarria)
    const newStop = await db.stopStore.getStopById(stop._id);
    assertSubset (sarria, newStop);
  });

  test("delete One Stop - success", async () => {
    await db.stopStore.deleteStop(testStops[0]._id);
    const stops = await db.stopStore.getAllStops();
    assert.equal(stops.length, testRoutes.length - 1);
    const deletedStop = await db.stopStore.getStopById(testStops[0]._id);
    assert.isNull(deletedStop);
  });

  test("get a stop - bad params", async () => {
    assert.isNull(await db.stopStore.getStopById(""));
    assert.isNull(await db.stopStore.getStopById());
  });

  test("delete one stop - fail", async () => {
    await db.stopStore.deleteStop("bad-id");
    const stops = await db.stopStore.getAllStops();
    assert.equal(stops.length, testRoutes.length);
  });
});
