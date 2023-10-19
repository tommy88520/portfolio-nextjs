export interface iWorkPage {
  workPageContent: {
    id: number;
    title: string;
    workDetail: {
      id: number;
      title: string;
      content: string;
      workDetailImages: { id: number; image: string }[];
    }[];
  };
  getWorkPageContent: (e) => void;

  isWorkPageLoading: boolean;
}
