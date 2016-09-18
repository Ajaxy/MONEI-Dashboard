import aws4 from 'aws4';
import AWS from 'aws-sdk';

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

const buildCreds = (data) => {
  return new AWS.Credentials(data.AccessKeyId, data.SecretAccessKey, data.SessionToken);
};

export const signRequest = (request, credentials) => {
  const data = transformData(request);
  const parser = parseUrl(request.url);
  const headers = request.headers;
  //!TODO: Separate param keys from axios object
  const params = /*request.params ? '?' + request.paramSerializer(request.params) :*/ '';
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
