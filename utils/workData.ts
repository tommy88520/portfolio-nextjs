import { userRequest } from '~/utils/axios';

export const getWorksData = async (lang) => {
  const regexZh = /^zh/;
  const matchZh = lang.match(regexZh);
  if (matchZh) {
    lang = 'zh-TW';
  } else {
    lang = 'en';
  }
  return await userRequest
    .post('portfolio/get-work', { lang: lang })
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export const getWorkPageData = async (e) => {
  return await userRequest
    .post('portfolio/get-work-page', e)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};
