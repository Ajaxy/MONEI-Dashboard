export const trackEvent = (eventName, eventData) => {
	window.Intercom('trackEvent', eventName, eventData);
};