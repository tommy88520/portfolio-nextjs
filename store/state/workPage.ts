export interface iWorkPage {
  workPageContent: {
    title: string;
    workDetail: { title: string; content: string; workDetailImages: { image: string }[] }[];
  };
  getWorkPageContent: (e) => void;
}
