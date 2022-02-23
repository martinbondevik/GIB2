const request = require("supertest");
const { setupStrapi, teardownStrapi } = require("./helpers/strapi");

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  await teardownStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});

it("should return test-route object", async (done) => {
  await request(strapi.server.httpServer)
    .get("/api/test-route")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200, {
      route: "/api/test-route",
      name: "Test Event",
    });
  done();
});

require("./user");
