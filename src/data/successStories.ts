// Types for competitive programming platforms
export interface CodeforcesStat {
  handle: string;
  rating: number;
  rankName?: string; // Pupil, Specialist, Expert, etc.
}

export interface CodechefStat {
  handle: string;
  rating: number;
  rankName?: string; // 1 star, 2 star, etc.
}

// Success story type definition
export interface SuccessStory {
  id: number;
  name: string;
  image: string;
  image_3d: string;
  batch: number;
  codeforces?: CodeforcesStat;
  codechef?: CodechefStat;
}

// Mock data for success stories
export const successStories: SuccessStory[] = [
  {
    id: 1,
    name: "Niloy Das",
    image: "/assets/success-story/niloydas.jpg",
    image_3d: "/assets/success-story/niloydas_3d.png",
    batch: 2,
    codeforces: {
      handle: "Niloy_Das_19",
      rating: 1781,
      rankName: "Expert"
    }
  },
  {
    id: 2,
    name: "Rahsan Al Saymon",
    image: "/assets/success-story/saimun.jpg",
    image_3d: "/assets/success-story/saimun_3d.png",
    batch: 1,
    codeforces: {
      handle: "saymon",
      rating: 1518,
      rankName: "Specialist"
    }
  },
  {
    id: 3,
    name: "Mahdi Talukder",
    image: "/assets/success-story/mahditalukder.jpeg",
    image_3d: "/assets/success-story/mahditalukder_3d.png",
    batch: 2,
    codeforces: {
      handle: "MahD",
      rating: 1581,
      rankName: "Specialist"
    }
  },
  {
    id: 4,
    name: "Aminul Haque",
    image: "/assets/success-story/aminulhaque.jpeg",
    image_3d: "/assets/success-story/aminulhaque_3d.png",
    batch: 2,
    codeforces: {
      handle: "Ami_Nul",
      rating: 1697,
      rankName: "Expert"
    }
  },
  {
    id: 5,
    name: "Mostofa Labib",
    image: "/assets/success-story/mostofalabib.jpg",
    image_3d: "/assets/success-story/mostofalabib_3d.png",
    batch: 1,
    codeforces: {
      handle: "Labib_",
      rating: 1488,
      rankName: "Specialist"
    }
  },
  {
    id: 6,
    name: "Tonmoy Shaha",
    image: "placeholder",
    image_3d: "/assets/success-story/tonmoyshaha_3d.png",
    batch: 1,
    codeforces: {
      handle: "tonmoy6052",
      rating: 1548,
      rankName: "Specialist"
    }
  },
  {
    id: 7,
    name: "Md. Anamul Haque",
    image: "/assets/success-story/anamulhaque.jpg",
    image_3d: "/assets/success-story/anamulhaque_3d.png",
    batch: 2,
    codeforces: {
      handle: "BrAin",
      rating: 1400,
      rankName: "Specialist"
    }
  },
  {
    id: 8,
    name: "Mahfuz Saim",
    image: "/assets/success-story/profile.png",
    image_3d: "/assets/success-story/profile_3d.png",
    batch: 1,
    codeforces: {
      handle: "attoCoder",
      rating: 1327,
      rankName: "Pupil"
    }
  },
  {
    id: 9,
    name: "MD. Akibur Rahman",
    image: "/assets/success-story/akiburrahman.jpg",
    image_3d: "/assets/success-story/akiburrahman_3d.png",
    batch: 2,
    codeforces: {
      handle: "akibur_r",
      rating: 1300,
      rankName: "Pupil"
    }
  },
  {
    id: 10,
    name: "Faiyaz Ismail",
    image: "/assets/success-story/profile.png",
    image_3d: "/assets/success-story/profile_3d.png",
    batch: 1,
    codeforces: {
      handle: "EDM",
      rating: 1249,
      rankName: "Pupil"
    }
  },
  {
    id: 11,
    name: "Arko Chowdhury",
    image: "/assets/success-story/profile.png",
    image_3d: "/assets/success-story/profile_3d.png",
    batch: 1,
    codeforces: {
      handle: "Quanta07",
      rating: 1236,
      rankName: "Pupil"
    }
  },
  {
    id: 12,
    name: "Snehangshu Roy",
    image: "/assets/success-story/snehangshu.jpg",
    image_3d: "/assets/success-story/snehangshu_3d.png",
    batch: 2,
    codeforces: {
      handle: "Snehangshu7494",
      rating: 1246,
      rankName: "Pupil"
    }
  },
  {
    id: 13,
    name: "Akik Mutsuddy",
    image: "/assets/success-story/akik.jpg",
    image_3d: "/assets/success-story/akik_3d.png",
    batch: 2,
    codeforces: {
      handle: "Akik04",
      rating: 1315,
      rankName: "Pupil"
    }
  },
  {
    id: 14,
    name: "Md. Farhan Israq",
    image: "/assets/success-story/profile.png",
    image_3d: "/assets/success-story/profile_3d.png",
    batch: 1,
    codeforces: {
      handle: "Cheater_",
      rating: 1226,
      rankName: "Pupil"
    }
  },
  {
    id: 15,
    name: "Tafsir Al Nafin",
    image: "/assets/success-story/nafin.jpg",
    image_3d: "/assets/success-story/nafin_3d.png",
    batch: 2,
    codeforces: {
      handle: "Tafsir_Al_Nafin",
      rating: 1248,
      rankName: "Pupil"
    }
  },
  {
    id: 16,
    name: "Safiullah Saimun",
    image: "/assets/success-story/saimun.jpg",
    image_3d: "/assets/success-story/saimun_3d.png",
    batch: 1,
    codeforces: {
      handle: "JorgeSaimun",
      rating: 1219,
      rankName: "Pupil"
    }
  },
  {
    id: 17,
    name: "Aritra Debnath",
    image: "/assets/success-story/profile.png",
    image_3d: "/assets/success-story/profile_3d.png",
    batch: 1,
    codeforces: {
      handle: "noobguyone",
      rating: 1211,
      rankName: "Pupil"
    }
  },
  {
    id: 18,
    name: "Tamvir Shahabuddin",
    image: "/assets/success-story/tamvir.jpg",
    image_3d: "/assets/success-story/tamvir_3d.png",
    batch: 2,
    codeforces: {
      handle: "tamdesu",
      rating: 1206,
      rankName: "Pupil"
    }
  },
  {
    id: 19,
    name: "Tanzim Tousif",
    image: "/assets/success-story/profile.png",
    image_3d: "/assets/success-story/profile_3d.png",
    batch: 1,
    codeforces: {
      handle: "tuko_tanzwoo",
      rating: 1200,
      rankName: "Pupil"
    }
  },
  {
    id: 20,
    name: "Sadman",
    image: "/assets/success-story/sadman.jpg",
    image_3d: "/assets/success-story/sadman_3d.png",
    batch: 2,
    codeforces: {
      handle: "_Sadman_",
      rating: 1298,
      rankName: "Pupil"
    }
  },
  {
    id: 21,
    name: "Sarafat Karim",
    image: "/assets/success-story/sarafat.jpg", 
    image_3d: "/assets/success-story/sarafat_3d.png",
    batch: 1,
    codeforces: {
      handle: "Schr0Smi1ey",
      rating: 1290,
      rankName: "Pupil"
    }
  },
  {
    id: 22,
    name: "Mohammad Jahid Hasan",
    image: "/assets/success-story/jahid.jpg",
    image_3d: "/assets/success-story/jahid_3d.png",
    batch: 1,
    codeforces: {
      handle: "Jahid__Noob",
      rating: 1550,
      rankName: "Specialist"
    }
  }
];

// Helper function to get top N success stories
export const getTopSuccessStories = (count: number = 3): SuccessStory[] => {
  return successStories
    .sort((a, b) => {
      const aRating = a.codeforces?.rating || 0;
      const bRating = b.codeforces?.rating || 0;
      return bRating - aRating;
    })
    .slice(0, count);
};

// Helper function to get stories by batch
export const getStoriesByBatch = (batch: string | number): SuccessStory[] => {
  if (batch === 'all') return successStories;
  
  const batchNum = typeof batch === 'string' ? parseInt(batch) : batch;
  return successStories.filter(story => story.batch === batchNum);
}; 


// with codeforces and codechef data
// {
//     id: 1,
//     name: "Niloy Das",
//     image: "/assets/success-story/niloydas.jpg",
//     batch: 2,
//     codeforces: {
//       handle: "Niloy_Das_19",
//       rating: 1553
//     },
//     codechef: {
//       handle: "mdkamrulhasant",
//       rating: 1720
//     }
//   }
