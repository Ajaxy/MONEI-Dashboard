import AWSMqtt from 'aws-mqtt-client';
import storage from 'store';
import createDispatcher from './dispatcher';
let websocket = {};

export const connect = (userProfile, awsCredentials, topic) => {
  const credentials = awsCredentials || storage.get('credentials') || {};
  const profile = userProfile || storage.get('profile') || {};
  const notificationTopic = topic || profile.user_id;
  websocket = new AWSMqtt({
    accessKeyId: credentials.AccessKeyId,
    secretAccessKey: credentials.SecretAccessKey,
    sessionToken: credentials.SessionToken,
    endpointAddress: APP_CONFIG.iotEndpoint,
    region: APP_CONFIG.region
  });
  return dispatch => {
    const dispatchMessage = createDispatcher(dispatch);
    websocket.on('connect', () => {
      if (notificationTopic) {
        websocket.subscribe(notificationTopic);
        console.log(`connected to ${notificationTopic}`);
      }
    });
    websocket.on('message', (topic, message) => {
      const action = JSON.parse(message.toString());
      dispatchMessage(action);
    });
  };
};

export const disconnect = () => {
  return dispatch => {
    if (websocket.end) {
      websocket.end();
    }
  };
};
