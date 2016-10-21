import aws4 from 'aws4';
import AWS from 'aws-sdk';
import {compact} from 'lib/utils';

const transformData = (request) => {
  let data = request.data;
  if (Array.isArray(request.transformRequest)) {
    request.transformRequest.forEach((transformer) => {
      data = transformer(data);
    });
  } else {
    data = request.transformRequest(data);
  }
  return data;
};

const parseUrl = (url) => {
  const parser = document.createElement('a');
  parser.href = url;
  return {
    host: parser.host.split(':')[0],
    path: parser.pathname
  };
};

export const buildCreds = (data) => {
  const credentials = new AWS.Credentials(data.AccessKeyId, data.SecretAccessKey, data.SessionToken);
  AWS.config.credentials = credentials;
  return credentials;
};

export const signRequest = (request, credentials) => {
  const data = transformData(request);
  const parser = parseUrl(request.url);
  const headers = request.headers;
  const params = request.params ? '?' + $.param(compact(request.params)) : '';
  if (!data) delete headers['Content-Type'];

  const options = aws4.sign({
    service: "execute-api",
    region: APP_CONFIG.region,
    host: parser.host,
    path: parser.path + params,
    method: request.method.toUpperCase(),
    body: data,
    headers
  }, buildCreds(credentials));

  delete options.headers['Host'];
  delete options.headers['Content-Length'];

  request.headers = options.headers;
  request.data = options.body;
  request.transformRequest = [];
  return request;
};

const getS3Bucket = () => {
  return new AWS.S3({params: {Bucket: APP_CONFIG.userBucket}, region: APP_CONFIG.region});
}

export const fileUpload = (userId, file, onProgress) => {
  return new Promise((resolve, reject) => {
    const Key = `${userId}/${file.name}`;
    const params = {Key, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256'};
    getS3Bucket().putObject(params, (err, data) => {
      err ? reject(err) : resolve(data);
    }).on('httpUploadProgress', (progress) => {
      if(onProgress) onProgress(progress);
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