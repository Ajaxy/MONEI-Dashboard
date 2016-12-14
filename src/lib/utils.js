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

export const copyTextToClipboard = (text) => {
  var textArea = document.createElement('textarea');
  textArea.style.top = 0;
  textArea.style.left = 0;
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = 0;
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }
  document.body.removeChild(textArea);
};

export const objectToArray = (object) => (
  Object.keys(object).map(key => object[key])
);
