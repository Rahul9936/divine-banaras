export type Review = {
  name: string;
  location?: string;
  tour?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  comment: string;
  /** Path under /public, e.g. "/reviews/anita.jpg" or "/reviews/anita.mp4" */
  media?: { type: "image" | "video"; src: string; poster?: string };
};

// Add real customer reviews here. Put their photos/videos in /public/reviews.
// Example:
// {
//   name: "Anita Sharma",
//   location: "Mumbai",
//   tour: "Varanasi 2 Days Itinerary",
//   rating: 5,
//   comment: "Everything was smooth and the guide was wonderful.",
//   media: { type: "image", src: "/reviews/anita.jpg" },
// },
export const reviews: Review[] = [
  // TEST DATA - replace with a real review before publishing
  {
    name: "Test Customer",
    location: "Delhi",
    tour: "Varanasi 2 Days Itinerary",
    rating: 5,
    comment: "This is a sample review to test the layout. The Ganga aarti was unforgettable and the guide was very helpful.",
    media: { type: "image", src: "/ganga-aarti.jpg" },
  },
];
