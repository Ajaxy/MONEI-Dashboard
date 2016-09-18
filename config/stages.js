// Here is where you can define configuration overrides based on the execution stage.
// Supply a key to the default export matching the STAGE that you wish to target, and
// the base configuration will apply your overrides before exporting itself.
export default {
  // ======================================================
  // Overrides when STAGE === 'development'
  // ======================================================
  development: (config) => {
    const region = 'us-east-1';
    Object.assign(config.globals.APP_CONFIG, {
      apiBaseURL: 'https://oq60megra3.execute-api.us-east-1.amazonaws.com/production/',
      // apiBaseURL: 'https://oq60megra3.execute-api.us-east-1.amazonaws.com/monei/',
      // apiBaseURL: 'https://api.monei.net/',
      csvImportBucket: '',
      staticCdnURL: 'http://monei-v2-dashboard-development.s3.amazonaws.com',
      intercomID: 'd84d8u48',
      stripeKey: '',
      iotEndpoint: '',
      region
    });

    config.S3Plugin = {
      s3Options: {
        accessKeyId: process.env.DEV_ACCESS_KEY_ID,
        secretAccessKey: process.env.DEV_SECRET_ACCESS_KEY,
        region
      },
      s3UploadOptions: {
        Bucket: 'monei-v2-dashboard-development'
      }
    };
    return config;
  },

  // ======================================================
  // Overrides when STAGE === 'production'
  // ======================================================
  production: (config) => {
    const region = 'eu-west-1';
    Object.assign(config.globals.APP_CONFIG, {
      apiBaseURL: '',
      csvImportBucket: '',
      staticCdnURL: '',
      intercomID: '',
      stripeKey: '',
      iotEndpoint: '',
      region
    });

    config.S3Plugin = {
      s3Options: {
        accessKeyId: process.env.PROD_ACCESS_KEY_ID,
        secretAccessKey: process.env.PROD_SECRET_ACCESS_KEY,
        region
      },
      s3UploadOptions: {
        Bucket: ''
      },
      cloudfrontInvalidateOptions: {
        DistributionId: '',
        Items: ['/index.html']
      }
    };
    return config;
  }
};
