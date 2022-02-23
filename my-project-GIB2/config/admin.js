module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3fd1c6d019419f054791d6e76ffdc322'),
  },
});
