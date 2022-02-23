const path = require("path");

module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: path.join(
        __dirname,
        "../../../",
        env("TEST_DATABASE_FILENAME")
      ),
    },
    useNullAsDefault: true,
  },
});
