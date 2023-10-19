import { create } from 'zustand';
import { userRequest } from '~/utils/axios';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { iWorkPage } from './state/workPage';
import { iSkillsPage, iWorks, irootUrl } from './state/homePage';

// import Swal from 'sweetalert2/dist/sweetalert2.js';

const worksStore = create<iWorks>()(
  devtools((set) => ({
    worksContent: [
      {
        id: 1,
        articleId: '',
        title: '',
        content: '',
        tags: [''],
        lang: '',
        orderNumber: 0,
        workImage: '',
      },
    ],
    getWorks: async (lang) => {
      const regexZh = /^zh/;
      const matchZh = lang.match(regexZh);
      if (matchZh) {
        lang = 'zh-TW';
      } else {
        lang = 'en';
      }
      await userRequest
        .post('portfolio/get-work', { lang: lang })
        .then((res) => {
          set(() => ({ worksContent: res.data }));
        })
        .catch((error) => {
          if (error.response.status == 401) {
            console.log('未登入或是登入時效已到期，請重新登入');
          } else {
            location.href = '/notFound';
          }
        });
    },
  })),
);

const skillsStore = create<iSkillsPage>()(
  devtools((set) => ({
    skillsState: [
      {
        skill: '',
        image: '',
      },
    ],
    getSkills: async () => {
      await userRequest
        .get('portfolio/get-skills')
        .then((res) => {
          set(() => ({ skillsState: res.data }));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  })),
);

const workPageStore = create<iWorkPage>()(
  devtools((set) => ({
    workPageContent: {
      id: 1,
      title: '',
      workDetail: [
        {
          id: 1,
          title: '',
          content: '',
          workDetailImages: [{ id: 1, image: '' }],
        },
      ],
    },
    isWorkPageLoading: false,
    getWorkPageContent: async (e) => {
      set(() => ({
        isWorkPageLoading: true,
      }));
      await userRequest
        .post('portfolio/get-work-page', e)
        .then((res) => {
          set(() => ({ workPageContent: res.data }));
          set(() => ({
            isWorkPageLoading: false,
          }));
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 401) {
            console.log('未登入或是登入時效已到期，請重新登入');
          } else {
            location.href = '/notFound';
          }
          set(() => ({
            isWorkPageLoading: false,
          }));
        });
    },
  })),
);

const rootUrlStore = create<irootUrl>()(
  devtools((set) => ({
    rootUrlState: true,
    toggleRootUrl: (query) => {
      set(() => ({ rootUrlState: query }));
    },
  })),
);

export { skillsStore, worksStore, rootUrlStore, workPageStore };
