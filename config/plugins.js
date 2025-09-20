module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        localServer: {
          maxage: 300000
        }
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      }
    }
  }
});
