/**
 * Divine Home Stay — content for the /homestay page.
 * Photos live in public/homestay/photos as `<room>-<n>.webp` (+ `-sm.webp` thumbnails).
 */

export const homestay = {
  name: "Divine Home Stay",
  tagline: "Your home in Kashi, beside the BHU Vishwanath Temple",
  pricePerNight: 3000,
  maxGuests: 4, // two king-size beds
  checkIn: "12:00 PM",
  checkOut: "11:00 AM",
  phone: "7080291130",
  phoneHref: "tel:+917080291130",
  whatsapp: "917080291130",
  address: "Radhey Shree Apartment, near Gyandeep Academy, ITI Karaundi, Varanasi",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Radhey%20Shree%20Apartment%2C%20ITI%20Karaundi%2C%20Varanasi",
} as const;

export function photo(id: string, small = false) {
  return `/homestay/photos/${id}${small ? "-sm" : ""}.webp`;
}

export type RoomId =
  | "living"
  | "bedroom1"
  | "bedroom2"
  | "kitchen"
  | "dining"
  | "bath1"
  | "bath2"
  | "entrance"
  | "balcony";

export type Room = {
  id: RoomId;
  name: string;
  icon: string;
  blurb: string;
  features: string[];
  photos: string[];
};

export const rooms: Room[] = [
  {
    id: "living",
    name: "Living Room",
    icon: "🛋️",
    blurb:
      "A warm, spacious lounge with a plush sofa set, glass-top centre table and a backlit marble TV wall that glows gold in the evening.",
    features: ["Smart TV", "5-seater sofa set", "Designer pendant lights", "Ambient LED wall"],
    photos: ["living-1", "living-6", "living-13", "living-7", "living-9", "living-16", "living-2", "living-12", "living-4", "living-5"],
  },
  {
    id: "bedroom1",
    name: "Master Bedroom",
    icon: "🛏️",
    blurb:
      "King-size bed with fresh white linen, a cosy armchair, full-height wardrobe and split air-conditioning.",
    features: ["King-size bed", "Split AC", "Wardrobe", "Attached bathroom"],
    photos: ["bedroom1-5", "bedroom1-6", "bedroom1-2", "bedroom1-1", "bedroom1-4", "bedroom1-3"],
  },
  {
    id: "bedroom2",
    name: "Second Bedroom",
    icon: "🛏️",
    blurb: "A second king-size bedroom — quiet, bright and air-conditioned, ideal for family or friends.",
    features: ["King-size bed", "Air conditioner", "Fresh linen & pillows", "Attached bathroom"],
    photos: ["bedroom2-3", "bedroom2-2", "bedroom2-1"],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    icon: "🍳",
    blurb:
      "A fully equipped modular kitchen — cook your own satvik meals after darshan, just like home.",
    features: ["Microwave oven", "Induction cooktop", "RO water purifier", "Utensils & crockery"],
    photos: ["kitchen-1", "kitchen-2", "kitchen-3", "kitchen-4", "kitchen-5"],
  },
  {
    id: "dining",
    name: "Dining Area",
    icon: "🍽️",
    blurb: "A six-seater dining table right next to the kitchen for family meals together.",
    features: ["6-seater dining table", "Opens to living room"],
    photos: ["dining-2", "dining-1"],
  },
  {
    id: "bath1",
    name: "Bathroom 1",
    icon: "🚿",
    blurb: "Modern tiled bathroom with western toilet, rain shower and geyser for hot water any time.",
    features: ["Hot water (geyser)", "Rain shower", "Western toilet", "Fresh towels"],
    photos: ["bath1-1", "bath1-3", "bath1-4", "bath1-2", "bath1-5", "bath1-6"],
  },
  {
    id: "bath2",
    name: "Bathroom 2",
    icon: "🚿",
    blurb: "Second full bathroom with pebble-stone tiles, western toilet and hot water.",
    features: ["Hot water (geyser)", "Shower", "Western toilet", "Toiletries"],
    photos: ["bath2-4", "bath2-1", "bath2-3", "bath2-2", "bath2-5"],
  },
  {
    id: "entrance",
    name: "Entrance & Wash Area",
    icon: "🚪",
    blurb: "Secure entrance with a separate washbasin — wash up as soon as you return from the ghats.",
    features: ["Common washbasin", "Lift & power backup in building"],
    photos: ["entrance-2", "entrance-1"],
  },
  {
    id: "balcony",
    name: "Balcony — Temple View",
    icon: "🛕",
    blurb:
      "Step out onto the balcony and see the shikhara of the BHU Shri Vishwanath Temple rising above the trees.",
    features: ["View of BHU Vishwanath Temple", "Morning sun & fresh air"],
    photos: ["balcony-1"],
  },
];

export const amenities: Array<{ icon: string; title: string; text: string }> = [
  { icon: "🛏️", title: "2 King-size Beds", text: "Two private bedrooms, each with a king-size bed and fresh linen." },
  { icon: "❄️", title: "AC in Both Rooms", text: "Stay cool through Banaras summers in every bedroom." },
  { icon: "🍳", title: "Kitchen Facility", text: "Microwave, induction, utensils and crockery — cook as you like." },
  { icon: "📶", title: "Free WiFi", text: "High-speed internet throughout the flat." },
  { icon: "🔥", title: "Hot Water (Geyser)", text: "Geysers in the bathrooms for hot water round the clock." },
  { icon: "💧", title: "Water Purifier", text: "RO purified drinking water in the kitchen." },
  { icon: "📺", title: "Smart TV", text: "A large TV in the living room for the evenings." },
  { icon: "🚗", title: "Free Parking", text: "Covered parking inside the apartment building." },
  { icon: "🛗", title: "Lift Access", text: "No climbing stairs with your luggage." },
  { icon: "🔋", title: "Power Backup", text: "Uninterrupted power, even during cuts." },
  { icon: "🛕", title: "Temple View", text: "BHU Vishwanath Temple visible from the balcony." },
  { icon: "🙏", title: "Yatra Support", text: "Book darshan, boat rides and cabs with Divine Banaras." },
];

// Approximate road distances — verify before publishing.
export const nearby: Array<{ place: string; distance: string }> = [
  { place: "BHU Shri Vishwanath Temple", distance: "Visible from balcony" },
  { place: "Banaras Hindu University (main gate)", distance: "~3 km" },
  { place: "Sankat Mochan Hanuman Temple", distance: "~4 km" },
  { place: "Assi Ghat", distance: "~5 km" },
  { place: "Kashi Vishwanath Temple", distance: "~8 km" },
  { place: "Varanasi Junction (Railway)", distance: "~12 km" },
  { place: "Lal Bahadur Shastri Airport", distance: "~30 km" },
];

export const houseRules = [
  `Check-in from ${homestay.checkIn} · Check-out by ${homestay.checkOut}`,
  "Valid government photo ID required for all guests",
  "Families and couples welcome",
  "No smoking inside the flat",
  "Please respect neighbours — quiet hours after 10 PM",
];
