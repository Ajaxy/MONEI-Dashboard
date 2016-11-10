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
      apiBaseURL: 'https://api.monei.net/',
      staticCdnURL: 'http://monei-v2-dashboard-development.s3.amazonaws.com',
      adminBucket: 'microapps-monei-verified-documents',
      userBucket: 'microapps-monei-documents',
      intercomID: 'd84d8u48',
      stripeKey: '',
      iotEndpoint: '',
      region
    });

    config.S3 = {
      region,
      accessKeyId: process.env.DEV_ACCESS_KEY_ID,
      secretAccessKey: process.env.DEV_SECRET_ACCESS_KEY,
      params: {
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
      apiBaseURL: 'https://api.monei.net/',
      staticCdnURL: 'https://dashboard.monei.net',
      adminBucket: 'microapps-monei-verified-documents',
      userBucket: 'microapps-monei-documents',
      intercomID: 'za787poa',
      stripeKey: '',
      iotEndpoint: '',
      region
    });

    config.S3 = {
      region,
      accessKeyId: process.env.PROD_AWS_KEY,
      secretAccessKey: process.env.PROD_AWS_SECRET,
      params: {
        Bucket: process.env.PROD_S3_BUCKET_NAME
      }
    };
    config.cloudfront = {
      credentials: {
        accessKeyId: 'AKIAJGU5HX6CVBBNALSA',
        secretAccessKey: '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'
      },
      region,
      distributionId: process.env.PROD_CF_DISTRIBUTION_ID
    };

    return config;
  }
};
