
export interface Slide {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

export interface SlideData {
  slides: Slide[];
  projectTitle: string;
  projectSubtitle: string;
}
