import { create } from 'zustand';
import { userRequest } from '~/utils/axios';
import { devtools } from 'zustand/middleware';
import { iSkillsPage, irootUrl } from './state/homePage';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

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

const rootUrlStore = create<irootUrl>()(
  devtools((set) => ({
    rootUrlState: true,
    toggleRootUrl: (query) => {
      set(() => ({ rootUrlState: query }));
    },
  })),
);

export { skillsStore, rootUrlStore };
