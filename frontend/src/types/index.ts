// export interface MusicRelease {
//   id: string;
//   title: string;
//   releaseDate: string;
//   coverImage: string;
//   description: string;
//   links: {
//     spotify?: string;
//     appleMusic?: string;
//     soundcloud?: string;
//     youtube?: string;
//   };
// }

export interface PageSection {
  id: string;
  title: string;
  backgroundImage?: string;
}

// frontend/src/types/index.ts
export interface MusicRelease {
  id: string;
  title: string;
  releaseDate: string;
  coverImage: string;
  description: string;
  embedCode?: string;
  embedType?: 'spotify' | 'soundcloud';
  links: {
    spotify?: string;
    appleMusic?: string;
    soundcloud?: string;
    youtube?: string;
  };
}
