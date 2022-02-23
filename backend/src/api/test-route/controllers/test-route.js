module.exports = {
  async index(ctx) {
    ctx.body = {
      route: "/api/test-route",
      name: "Test Event",
    };
  },
};
