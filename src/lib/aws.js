import AWS from 'aws-sdk';
import storage from 'store';

export const buildCreds = (data) => {
  if (!data) data = storage.get('credentials');
  const credentials = new AWS.Credentials(data.AccessKeyId, data.SecretAccessKey, data.SessionToken);
  AWS.config.credentials = credentials;
  return credentials;
};

const getS3Bucket = () => {
  buildCreds();
  return new AWS.S3({
    params: {Bucket: APP_CONFIG.userBucket},
    region: APP_CONFIG.region
  });
};

export const fileUpload = (userId, file, onProgress) => {
  return new Promise((resolve, reject) => {
    const Key = `${userId}/${file.name}`;
    const params = {Key, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256'};
    getS3Bucket().putObject(params, (err, data) => {
      err ? reject(err) : resolve(data);
    }).on('httpUploadProgress', (progress) => {
      if (onProgress) onProgress(progress);
    });
  });
};

export const fileDelete = (userId, name) => {
  return new Promise((resolve, reject) => {
    const Key = `${userId}/${name}`;
    const params = {Key, Bucket: APP_CONFIG.userBucket};
    getS3Bucket().deleteObject(params, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};

export const fileGetUrl = (userId, name, isAdmin) => {
  return new Promise((resolve, reject) => {
    const Key = `${userId}/${name}`;
    const Bucket = isAdmin ? APP_CONFIG.adminBucket : APP_CONFIG.userBucket;
    const params = {Key, Bucket};
    getS3Bucket().getSignedUrl('getObject', params, (err, url) => {
      err ? reject(err) : resolve(url);
    });
  });
};
