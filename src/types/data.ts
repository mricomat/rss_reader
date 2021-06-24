/* eslint-disable camelcase */
export interface IRss {
  title?: string;
  links?: IRssLink[];
  description?: string;
  items: IRssItem[];
}

export interface IRssItem {
  id: string;
  title: string;
  links: IRssLink[];
  description: string;
  enclosures: IRssEnclosure[];
}

export interface IRssLink {
  url: string;
  rel: string;
}

export interface IRssEnclosure {
  url: string;
  length: string;
  mimeType: string;
}

export type ICache<T> = {
  get: (name: string) => Promise<T | undefined>;
  set: (name: string, data: T) => Promise<void>;
  has: (name: string) => Promise<boolean>;
  delete: (...names: string[]) => Promise<void>;
  clear: () => void;
};
