import moment from 'moment/src/moment';

export const formatUnixDate = (unixDate, format) => {
  if (!unixDate) return '';
  return moment.unix(unixDate).format(format || 'MMM DD, YYYY HH:mm');
};

export const formatDate = (date, format) => {
  if (!date) return '';
  return moment(date).format(format || 'MMM DD, YYYY');
};

export const stringToArray = (string = '') => {
  return string.replace(/ /g, '').split(',');
};

export const mergeArrays = (...arrays) => {
  arrays = arrays.filter(a => a !== undefined);
  return Array.from(new Set([].concat(...arrays)));
};

export const pickProps = (object, ...props) => (
  props.reduce((a, x) => {
    if (object.hasOwnProperty(x)) a[x] = object[x];
    return a;
  }, {})
);

export const omitProps = (object, ...props) => {
  const no = {...object};
  props.forEach(p => delete no[p]);
  return no;
};

export const omitInternalProps = (object) => {
  const no = {...object};
  Object.keys(object).forEach(p => p.startsWith('_') && delete no[p]);
  return no;
};

function *iterator(begin, end, interval = 1) {
  for (let i = begin; i <= end; i += interval) {
    yield i;
  }
}

export const range = (begin, end, interval = 1) => (
  Array.from(iterator(begin, end, interval))
);

export const padDigits = (number, digits) => {
  return new Array(Math.max(digits - String(number).length + 1, 0)).join('0') + number;
};

export const compact = (object) => {
  Object.keys(object).forEach((key) => {
    if (object[key] === undefined || object[key] === null || object[key] === '') {
      delete object[key];
    }
  });
  return object;
};

export const capitalize = (s = ' ') => s[0].toUpperCase() + s.slice(1);
export const deCapitalize = (s = ' ') => s[0].toLowerCase() + s.slice(1);

export const isEmpty = (object = {}) => (
  object.constructor === Object && Object.keys(object).length === 0
);

const URL_PATTERN = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
export const isUrlValid = (url) => {
  return URL_PATTERN.test(url);
}
