export type Review = {
  name: string;
  location?: string;
  tour?: string; // shown as "Travelled to …"
  rating?: 1 | 2 | 3 | 4 | 5;
  comment: string;
};

// Add real customer reviews here. 
// Example:
// {
//   name: "Anita Sharma",
//   location: "Mumbai",
//   tour: "Varanasi",
//   rating: 5,
//   comment: "Everything was smooth and the guide was wonderful.",
// },
export const reviews: Review[] = [
  // TEST DATA - replace with a real review before publishing
  {
    name: "Kris Lakshmi Radhakrishnan",
    location: "Varanasi",
    tour: "Varanasi",
    rating: 5,
    comment: "Mr.Rahul fulfilled my wishes in Varanasi. I strongly recommend the Divine Banaras tours and travels. No any tension. Good service.",
  },
];
