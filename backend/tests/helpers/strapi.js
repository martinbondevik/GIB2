const fs = require("fs");
const Strapi = require("@strapi/strapi");

let instance;

async function setupStrapi() {
  if (!instance) {
    instance = await Strapi().load();
    instance.server.mount();
    instance = instance.server.app.callback();
  }
  return instance;
}

async function teardownStrapi() {
  const dbSettings = strapi.config.get("database.connection.connection");
  await strapi.server.destroy();

  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${dbSettings.filename}`;

    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
}

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({
      where: {
        type: "public",
      },
    });

  // Create the new permissions and link them to the public role
  const allPermissionsToCreate = [];
  Object.keys(newPermissions).map((controller) => {
    const actions = newPermissions[controller];
    const permissionsToCreate = actions.map((action) => {
      return strapi.query("plugin::users-permissions.permission").create({
        data: {
          action: `api::${controller}.${controller}.${action}`,
          role: publicRole.id,
        },
      });
    });
    allPermissionsToCreate.push(...permissionsToCreate);
  });
  await Promise.all(allPermissionsToCreate);
}

module.exports = {
  setupStrapi,
  teardownStrapi,
};
