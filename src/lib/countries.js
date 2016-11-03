const countries = [
  {
    name: 'Spain',
    phoneCode: '+34',
    code: 'ES'
  },
  {
    name: 'United States',
    phoneCode: '+1',
    code: 'US'
  }
];

export const findByPhone = (phoneNumber = '') => (
  countries.find(country => phoneNumber.startsWith(country.phoneCode)) || {}
);

export const findByName = (name) => (
  countries.find(country => country.name === name) || {}
);

export const findByCode = (code) => (
  countries.find(country => country.code === code) || {}
);

export default countries;
