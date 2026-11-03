export type Place = {
  slug: string;
  name: string;
  location: string;
  image: string;
  summary: string;
  overview: string[];
  highlights: string[];
  visitorNotes: string[];
  localExperiences: { title: string; description: string; timingNote?: string }[];
};

export const places: Place[] = [
  {
    slug: "sankat-mochan-temple",
    name: "Sankat Mochan Hanuman Temple",
    location: "Durgakund, Varanasi",
    image: "/sankat-mochan.jpg",
    summary: "Visit one of Varanasi’s best-loved Hanuman temples, known for its devotional atmosphere and long-standing connection with the city.",
    overview: [
      "Sankat Mochan Temple is dedicated to Lord Hanuman and is an important place of worship for residents and pilgrims visiting Varanasi. Its name is commonly understood as the one who relieves troubles.",
      "The temple is associated with the poet-saint Tulsidas and is especially busy on Tuesdays and Saturdays, when devotees come to offer prayers. Visitors can take time for darshan and experience a quieter, devotional side of the city beyond the ghats.",
    ],
    highlights: ["Dedicated to Lord Hanuman", "A cherished place of worship in Varanasi", "Especially lively on Tuesdays and Saturdays", "Can be included in a local temple itinerary"],
    localExperiences: [
      {
        title: "Join the noon aarti",
        description: "If the temple schedule allows, attend the noon aarti and listen as devotees gather to chant together. The collective voices and energy can make this a deeply moving moment for visitors.",
        timingNote: "You mentioned the temple closes around noon. Please confirm the current aarti and closing time locally before planning your visit, as timings can change.",
      },
      {
        title: "Feel the temple’s devotional rhythm",
        description: "On busy prayer days, the sound of Hanuman Chalisa and other devotional singing is part of the experience. Take a quiet moment to observe respectfully and follow the flow of worshippers.",
      },
    ],
    visitorNotes: ["Dress modestly and follow temple instructions.", "Expect larger crowds on Tuesdays, Saturdays and festival days.", "Photography may be restricted inside; check current signage and guidance.", "Keep personal belongings secure and allow extra time for security checks."],
  },
  {
    slug: "kashi-vishwanath-temple",
    name: "Kashi Vishwanath Temple",
    location: "Vishwanath Gali, Varanasi",
    image: "/kashi-vishwanath-temple.jpg",
    summary: "Learn about Kashi Vishwanath, one of the most revered Shiva temples and a central destination for pilgrims in Varanasi.",
    overview: [
      "Kashi Vishwanath Temple is dedicated to Lord Shiva in his form as Vishwanath, the Lord of the Universe. Located in the old city near the Ganga, it is among the most significant pilgrimage sites in Varanasi and one of the twelve Jyotirlingas revered by devotees.",
      "The temple corridor connects the shrine with the nearby ghats and offers a more accessible approach through the dense lanes of the old city. Darshan procedures, entry arrangements and crowd levels can change, so visitors should check official temple guidance before travelling.",
    ],
    highlights: ["One of the twelve Jyotirlingas", "A major centre of Shiva worship", "Located in the heart of old Varanasi", "Near the Ganga and the historic ghats"],
    localExperiences: [
      {
        title: "Walk through the Kashi Vishwanath Corridor",
        description: "Make time to experience the corridor linking the temple area with the Ganga. The transition from the tightly woven lanes of the old city to the open riverfront is a memorable part of the visit.",
      },
      {
        title: "Take in the old-city atmosphere",
        description: "Allow a little time around darshan to explore Vishwanath Gali and notice the devotional life, sounds and small shrines that make this part of Kashi distinctive.",
      },
    ],
    visitorNotes: ["Check the official temple website for current darshan, entry and security requirements.", "Expect security screening and busy periods, especially during festivals.", "Rules for phones, bags and photography may apply; confirm before arrival.", "Consider visiting early and allow time to walk through the old-city lanes."],
  },
];

export function getPlace(slug: string) {
  return places.find((place) => place.slug === slug);
}
