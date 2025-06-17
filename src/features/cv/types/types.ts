export type Cv = {
  id: number;
  userId: number;
  title: string;
  description: string;
  theme: string;
  isPublic: boolean;
  slug: string;
  views: number;
  downloads: number;
  language: string;
  createdAt: string;
  updatedAt: string;
};

export type CvCreate = {
  title: string;
  description: string;
  theme?: string;
  isPublic?: boolean;
  slug?: string;
  language?: string;
};

export type CvUpdate = Partial<CvCreate>;

export type CvPaginatedResponse = {
  data: Cv[];
  total: number;
  limit: number;
  offset: number;
};

export type CvStore = {
  activeCvId: number | null;
  setActiveCvId: (id: number) => void;
  clearActiveCvId: () => void;
};
