import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, frances, testRoutes } from "../fixtures.js";

suite("Route API tests", () => {

  let user = null;

  setup(async () => {
    await poiService.deleteAllRoutes();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    frances.userid = user._id;
  });

  teardown(async () => {});

  test("create route", async () => {
    const returnedRoute = await poiService.createRoute(frances);
    assert.isNotNull(returnedRoute);
    assertSubset(frances, returnedRoute);
  });

  test("delete a route", async () => {
    const route = await poiService.createRoute(frances);
    const response = await poiService.deleteRoute(route._id);
    assert.equal(response.status, 204);
    try {
      const returnedRoute = await poiService.getRoute(route.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Route with this id", "Incorrect Response Message");
    }
  });

  test("create multiple routes", async () => {
    for (let i = 0; i < testRoutes.length; i += 1) {
      testRoutes[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await poiService.createRoute(testRoutes[i]);
    }
    let returnedLists = await poiService.getAllRoutes();
    assert.equal(returnedLists.length, testRoutes.length);
    await poiService.deleteAllRoutes();
    returnedLists = await poiService.getAllRoutes();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant route", async () => {
    try {
      const response = await poiService.deleteRoute("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Route with this id", "Incorrect Response Message");
    }
  });
});
