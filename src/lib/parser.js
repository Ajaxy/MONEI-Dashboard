import Liquid from 'liquid.js';

export const parse = (html, requireUnsubscribeLink = true) => {
  return new Promise((resolve, reject) => {
    if (!html) {
      return reject();
    }
    try {
      const template = Liquid.parse(html);
      if (requireUnsubscribeLink && !template.root.nodelist.some(n => n.name === 'unsubscribe_url')) {
        reject('Please include {{unsubscribe_url}}');
      }
      resolve(template);
    } catch (error) {
      reject(error);
    }
  });
};
