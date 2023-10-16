import { create } from 'zustand';
import { userRequest } from '~/utils/axios';
import { devtools } from 'zustand/middleware';
import { iMenu } from './state/navbar';
import { iWorkPage } from './state/workPage';
import { iSkillsPage, iWorks, irootUrl, iAllState } from './state/homePage';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

// const menuStore = create<iMenu[]>()(
//   devtools(
//     persist((set) => ({
//       menu: '',
//     })),
//   ),
// );

const allStore = create<iAllState>()(
  devtools((set) => ({
    lang: '',
    setLang: (query) => {
      set(() => ({ lang: query }));
    },
  })),
);

const menuStore = create<iMenu>()(
  devtools((set) => ({
    menuState: [
      {
        navigation: '',
        image: '',
      },
    ],
    getMenu: async () => {
      await userRequest
        .get('portfolio/get-menu')
        .then((res) => {
          set(() => ({ menuState: res.data }));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  })),
);

const worksStore = create<iWorks>()(
  devtools((set) => ({
    worksContent: [
      {
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
          // console.log(error);
          if (error.response.status == 401) {
            // Swal.fire('未登入或是登入時效已到期，請重新登入');
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
      title: '',
      workDetail: [
        {
          title: '',
          content: '',
          workDetailImages: [{ image: '' }],
        },
      ],
    },
    getWorkPageContent: async (e) => {
      await userRequest
        .post('portfolio/get-work-page', e)
        .then((res) => {
          set(() => ({ workPageContent: res.data }));
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 401) {
            console.log('未登入或是登入時效已到期，請重新登入');
          } else {
            location.href = '/notFound';
          }
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

export { allStore, menuStore, skillsStore, worksStore, rootUrlStore, workPageStore };
