export interface iSkillsPage {
  skillsState: { skill: ''; image: '' }[];
  getSkills: () => void;
}

export interface iWorks {
  worksContent: {
    articleId: string;
    title: string;
    content: string;
    tags: string[];
    lang: string;
    orderNumber: number;
    workImage: string;
  }[];

  getWorks: (e) => void;
}

export interface irootUrl {
  rootUrlState: boolean;
  toggleRootUrl: (e) => void;
}

export interface iAllState {
  lang: string;
  setLang: (e) => void;
}
