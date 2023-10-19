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

      if (error.response.status == 401) {
        console.log('未登入或是登入時效已到期，請重新登入');
      }
    });
};

export const getWorkPageData = async (e) => {
  return await userRequest
    .post('portfolio/get-work-page', e)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
      if (error.response.status == 401) {
        console.log('未登入或是登入時效已到期，請重新登入');
      }
    });
};
