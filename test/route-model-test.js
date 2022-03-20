import { assert } from "chai";
import { db } from "../src/models/db.js";
import { testRoutes, frances } from "./fixtures.js";
import { assertSubset } from "./test-utils.js";

suite("Route Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.routeStore.deleteAllRoutes();
    for (let i = 0; i < testRoutes.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testRoutes[i] = await db.routeStore.addRoute(testRoutes[i]);
    }
  });

  test("create a route", async () => {
    const route = await db.routeStore.addRoute(frances);
    assertSubset(frances, route);
    assert.isDefined(route._id);
  });

  test("delete all routes", async () => {
    let returnedRoutes = await db.routeStore.getAllRoutes();
    assert.equal(returnedRoutes.length, 3);
    await db.routeStore.deleteAllRoutes();
    returnedRoutes = await db.routeStore.getAllRoutes();
    assert.equal(returnedRoutes.length, 0);
  });

  test("get a route - success", async () => {
    const route = await db.routeStore.addRoute(frances);
    const returnedRoute = await db.routeStore.getRouteById(route._id);
    assertSubset(frances, route);
  });

  test("delete One Route - success", async () => {
    const id = testRoutes[0]._id;
    await db.routeStore.deleteRouteById(id);
    const returnedRoutes = await db.routeStore.getAllRoutes();
    assert.equal(returnedRoutes.length, testRoutes.length - 1);
    const deletedRoute = await db.routeStore.getRouteById(id);
    assert.isNull(deletedRoute);
  });

  test("get a route - bad params", async () => {
    assert.isNull(await db.routeStore.getRouteById(""));
    assert.isNull(await db.routeStore.getRouteById());
  });

  test("delete One Route - fail", async () => {
    await db.routeStore.deleteRouteById("bad-id");
    const allRoutes = await db.routeStore.getAllRoutes();
    assert.equal(testRoutes.length, allRoutes.length);
  });
});