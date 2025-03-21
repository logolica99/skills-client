// Types for competitive programming platforms
export interface CodeforcesStat {
  handle: string;
  rating: number;
}

export interface CodechefStat {
  handle: string;
  rating: number;
}

// Success story type definition
export interface SuccessStory {
  id: number;
  name: string;
  image: string;
  batch: number;
  codeforces?: CodeforcesStat;
  codechef?: CodechefStat;
}

// Mock data for success stories
export const successStories: SuccessStory[] = [
  {
    id: 1,
    name: "MD. Tanbir Hasan",
    image: "/assets/success-story/tanbir.jpg",
    batch: 5,
    codeforces: {
      handle: "mdkamrulhasant",
      rating: 1553
    },
    codechef: {
      handle: "mdkamrulhasant",
      rating: 1720
    }
  },
  {
    id: 2,
    name: "Abdullah Al Fahim",
    image: "/assets/success-story/abdullah.jpg",
    batch: 4,
    codeforces: {
      handle: "abdullahfahim",
      rating: 1484
    }
  },
  {
    id: 3,
    name: "Samiul Basir Fahim",
    image: "/assets/success-story/samiul.jpg",
    batch: 4,
    codeforces: {
      handle: "samiulbasir",
      rating: 1508
    }
  },
  {
    id: 4,
    name: "Md Murad Hossain",
    image: "/assets/success-story/murad.jpg",
    batch: 5,
    codeforces: {
      handle: "muradhossain",
      rating: 1572
    },
    codechef: {
      handle: "pupil_murad",
      rating: 1235
    }
  },
  {
    id: 5,
    name: "Motasem Billah Asik",
    image: "/assets/success-story/motasem.jpg",
    batch: 5,
    codeforces: {
      handle: "motasem_asik",
      rating: 1420
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