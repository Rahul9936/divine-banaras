/**
 * Tour itineraries for Divine Banaras.
 * Add, edit or remove tours by editing this file — every page reads from here.
 */
import { RouteStop } from "@/components/RouteMap";

export type TourCategory = "Spiritual Circuit" | "Buddhist Circuit" | "Varanasi" | "Cultural Heritage";

export interface ItineraryStop {
  id?: string;           // e.g., "A", "B", "C"
  title: string;         // e.g., "Baba Kaal Bhairav Temple"
  description?: string;   // e.g., "Seek permission from Baba Kal Bhairav..."
  type?: "temple" | "hotel" | "shopping" | "transport" | "sightseeing" | "other"; // Optional type for icon representation
}

export interface ItineraryDay {
  day: string;
  title: string;
  description: string;
  activities?: string[];
  stops?: ItineraryStop[];
}

export interface Tour {
  slug: string;
  title: string;
  subtitle: string;
  category: TourCategory;
  duration: string;
  places: string[];
  priceFrom: number; // per person, in INR
  startsIn: string;
  stay: string;
  transport: string;
  featured?: boolean;
  gradient?: string; // Tailwind CSS gradient class for card background
  /** An optional list of stops used by the route map component. */
  routeMapStops?: RouteStop[];
  /** Background image path for tour hero section. */
  imageSrc: string;
  images?: string[];
  summary: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  popularOrder: number; // popularOrder in Popular Yatras
}

export const tours: Tour[] = [
  {
    "slug": "varanasi-2-days-itinerary",
    "title": "Varanasi 2 Days Itinerary",
    "subtitle": "A compact spiritual journey through the oldest living city, exploring ancient temples, historic sites, and sacred river rituals",
    "category": "Cultural Heritage",
    "duration": "2 Days / 1 Night",
    "places": ["Varanasi", "Sarnath"],
    "priceFrom": 0,
    "startsIn": "Starts in Varanasi",
    "stay": "1-night stay included",
    "transport": "Private local vehicle",
    "featured": true,
    "popularOrder": 1, // Popular Yatras popularOrder
    "imageSrc": "/ganga-aarti.jpg",
    "images": ["/ganga-aarti.jpg", "/vt-bhu.jpg", "/kashi-vishwanath-temple.jpg", "/sankat-mochan.jpg", "/sarnath.jpg"],
    "gradient": "bg-sunrise-gradient",
    "summary": "Immerse yourself in the spiritual essence of Kashi with this optimal 2-day guide. Witness the spellbinding Ganga Aarti from a boat, visit the highly revered Kashi Vishwanath and Kal Bhairav temples, explore the historical lanes of Godowlia, and experience the peaceful Buddhist heritage of Sarnath.",
    "highlights": [
      "Seek blessings at the ancient Baba Kal Bhairav and Shri Kashi Vishwanath Temples",
      "Experience a magnificent evening boat ride and Ganga Aarti ceremony at Dashashwamedh Ghat",
      "Explore the historic Banaras Hindu University (BHU) campus and the New Kashi Vishwanath Temple",
      "Excursion to the sacred Buddhist site of Sarnath, featuring ancient ruins and the Dhamek Stupa"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Arrival, Central Temples & Evening Ganga Aarti",
        "description": "Arrive in Varanasi and check into your hotel. Begin your spiritual journey by seeking permission from Baba Kal Bhairav Temple, followed by a visit to the historic Mritunjay Mahadev Temple. Proceed to the legendary Shri Kashi Vishwanath Temple and the adjacent Maa Annapurna Temple. In the late afternoon, head to the vibrant old city lanes of Vishwanath Gali for local shopping. Conclude your day with an evening boat ride on the Ganges River, witnessing the magnificent Ganga Aarti ceremony at Dashashwamedh Ghat from the water. Overnight stay at the hotel.",
        "stops": [
          {
            "id": "A",
            "title": "Hotel Check-in",
            "description": "Arrive in Varanasi and check into your hotel",
            "type": "hotel"
          },
          {
            "id": "B",
            "title": "Kaal Bhairav & Mrityunjay Mahadev Temple",
            "description": "Begin your spiritual journey by seeking permission from Baba Kal Bhairav Temple, followed by Mritunjay Mahadev Temple",
            "type": "temple"
          },
          {
            "id": "C",
            "title": "Shri Kashi Vishwanath & Annapurna Temple",
            "description": "Proceed to the legendary Shri Kashi Vishwanath Temple and the adjacent Maa Annapurna Temple",
            "type": "temple"
          },
          {
            "id": "D",
            "title": "Vishwanath Gali",
            "description": "In the late afternoon, head to the vibrant old city lanes of Vishwanath Gali for local shopping",
            "type": "shopping"
          },
          {
            "id": "E",
            "title": "Dashashwamedh Ghat",
            "description": "Conclude your day with an evening boat ride on the Ganges River, witnessing the magnificent Ganga Aarti ceremony",
            "type": "other"
          },
          {
            "id": "F",
            "title": "Overnight stay at the hotel",
            "description": "Take rest and prepare for the next day's spiritual journey",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 2",
        "title": "Southern Temples, BHU Tour & Sarnath Excursion",
        "description": "Start early to witness a serene sunrise aarti by the ghats. Afterward, head out to visit the southern temples of Varanasi, including Durga Mata Mandir (Durgakund), Tulsi Manas Mandir, and Sankat Mochan Hanuman Mandir. Explore the green campus of Banaras Hindu University (BHU), visiting the New Kashi Vishwanath Temple and the Bharat Kala Bhavan Museum. Relish a traditional local breakfast of Kachori Sabzi and Jalebi on the streets. In the afternoon, take a short drive to Sarnath to tour the ancient Buddhist ruins, Dhamek Stupa, and the Archaeological Museum before transferring to the airport or railway station for departure."
      }
    ],
    "includes": [
      "1 night accommodation at a selected property",
      "Traditional morning local breakfast (Kachori Sabzi & Jalebi) on Day 2",
      "Dedicated local vehicle transfers for all mentioned sightseeing and temple visits",
      "Arrangements for the evening Ganga Aarti boat ride"
    ],
    "excludes": [
      "Midday meals, lunches, and dinners",
      "Temple fast-track entry fees or special pooja arrangements",
      "Personal expenses, tipping, and shopping costs",
      "Camera tokens and entry tickets at historical monuments or museums"
    ]
  },
  {
    "slug": "varanasi-prayagraj-ayodhya-tour-package",
    "title": "Varanasi, Prayagraj & Ayodhya Tour",
    "subtitle": "A rich cultural and spiritual experience covering three of the most revered religious cities of India",
    "category": "Spiritual Circuit",
    "duration": "3 Days / 2 Nights",
    "popularOrder": 2, // Popular Yatras popularOrder
    "places": [
      "Varanasi",
      "Prayagraj",
      "Ayodhya"
    ],
    "priceFrom": 0,
    "startsIn": "Starts in Varanasi",
    "stay": "Hotel stay except Ayodhya",
    "transport": "Intercity transport included",
    "imageSrc": "/divine-triangle.jpg ",
    "images": [
      "/kashi.jpg",
      "/sangam.jpg",
      "/ram-mandir.jpg"
    ],
    "featured": true,
    "gradient": "bg-sunrise-gradient",
    "summary": "This spiritual journey covers three of the most revered religious cities of India, offering you a rich cultural and spiritual experience in Varanasi, Prayagraj, and Ayodhya.",
    "highlights": [
      "Witness the sacred evening Ganga Aarti ceremony by boat",
      "Visit the revered Kashi Vishwanath Temple and Kaal Bhairav in Varanasi",
      "Take a holy dip at the Triveni Sangam confluence in Prayagraj",
      "Explore the birthplace of Lord Rama at Ram Janmabhoomi in Ayodhya"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Arrival in Varanasi, Local Sightseeing & Evening Aarti",
        "description": "Upon arrival in Varanasi, transfer to your hotel. In the afternoon, visit the famous Manas Temple, Durga Temple, and Banaras Hindu University (BHU). In the evening, visit the revered Kashi Vishwanath Temple and witness the sacred Ganga Aarti ceremony by motor boat while enjoying a calming ride on the Ganges River. Overnight stay at the hotel.",
        "stops": [
          {
            "id": "A",
            "title": "Hotel Check-in & Transfer",
            "description": "Arrive in Varanasi and check into your hotel to freshen up",
            "type": "hotel"
          },
          {
            "id": "B",
            "title": "Varanasi Temple Sightseeing & BHU Tour",
            "description": "Explore Tulsi Manas Mandir, Durga Temple, and the scenic Banaras Hindu University campus",
            "type": "temple"
          },
          {
            "id": "C",
            "title": "Shri Kashi Vishwanath Temple",
            "description": "Seek blessings at the holy Kashi Vishwanath Jyotirlinga",
            "type": "temple"
          },
          {
            "id": "D",
            "title": "Evening Ganga Aarti & Boat Ride",
            "description": "Witness the divine Ganga Aarti ceremony from a motorboat on the Ganges River",
            "type": "other"
          },
          {
            "id": "E",
            "title": "Overnight stay in Varanasi",
            "description": "Return to the hotel for a comfortable overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 2",
        "title": "Varanasi - Prayagraj - Ayodhya",
        "description": "Early in the morning, visit Kashi Vishwanath Temple and Kaal Bhairav. Return to the hotel for breakfast, then drive to Prayagraj. Visit the Triveni Sangam to take a holy dip at the confluence of the Ganga, Yamuna, and Saraswati rivers, and visit the revered Hanuman Temple. In the evening, drive to Ayodhya for an overnight stay.",
        "stops": [
          {
            "id": "A",
            "title": "Morning Darshan & Hotel Breakfast",
            "description": "Early morning visit to Kaal Bhairav Temple followed by breakfast at the hotel",
            "type": "temple"
          },
          {
            "id": "B",
            "title": "Transfer to Prayagraj",
            "description": "Scenic road drive from Varanasi to Prayagraj",
            "type": "transport"
          },
          {
            "id": "C",
            "title": "Triveni Sangam & Bade Hanuman Mandir",
            "description": "Take a sacred dip at the confluence of rivers and visit the legendary Lete Hanuman Temple",
            "type": "sightseeing"
          },
          {
            "id": "D",
            "title": "Transfer to Ayodhya",
            "description": "Evening drive from Prayagraj to the holy city of Ayodhya",
            "type": "transport"
          },
          {
            "id": "E",
            "title": "Overnight stay in Ayodhya",
            "description": "Check in to your hotel for rest and overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 3",
        "title": "Ayodhya Exploration & Departure",
        "description": "After breakfast, explore Ayodhya's prominent religious landmarks, including the 10th-century Hanuman Garhi Temple dedicated to Lord Hanuman, the Ram Janmabhoomi (birthplace of Lord Rama), and Kanak Bhawan Temple where Lord Rama and Sita are worshipped. Conclude your tour with a transfer to the airport or railway station for your onward journey.",
        "stops": [
          {
            "id": "A",
            "title": "Hanuman Garhi Temple",
            "description": "Visit the iconic 10th-century temple dedicated to Lord Hanuman",
            "type": "temple"
          },
          {
            "id": "B",
            "title": "Shri Ram Janmabhoomi Temple Complex",
            "description": "Pay respects at the revered birthplace of Lord Rama",
            "type": "temple"
          },
          {
            "id": "C",
            "title": "Kanak Bhawan Temple",
            "description": "Explore the beautiful palace-style temple dedicated to Lord Rama and Goddess Sita",
            "type": "temple"
          },
          {
            "id": "D",
            "title": "Departure Transfer",
            "description": "Transfer to Ayodhya / Varanasi Airport or Railway Station for onward travel",
            "type": "transport"
          }
        ]
      }
    ],
    "includes": [
      "Hotel accommodations (except in Ayodhya)",
      "Meals: 2 Breakfasts and 1 Dinner",
      "Transportation between cities",
      "Boating and motorboat rides on the Ganges",
      "Temple visits as mentioned in the itinerary"
    ],
    "excludes": [
      "Any personal expenses",
      "Entry fees for monuments",
      "Meals not mentioned in the itinerary",
      "Self-arranged stay in Ayodhya"
    ]
  },
  {
    "slug": "varanasi-gaya-tour-package",
    "title": "Varanasi Gaya Tour Package",
    "subtitle": "A delightful spiritual journey exploring the ethereal vibes, ancient heritage, and sacred rituals of Gaya and Kashi",
    "category": "Buddhist Circuit",
    "duration": "3 Days / 2 Nights",
    "popularOrder": 3, // Popular Yatras popularOrder
    "places": [
      "Gaya",
      "Varanasi"
    ],
    "priceFrom": 18000,
    "startsIn": "Starts in Gaya",
    "stay": "2-night 3-star stay included",
    "transport": "Dedicated cab with driver",
    "featured": true,
    "imageSrc": "/bodhgaya.jpg",
    "images": [
      "/bodhgaya.jpg",
      "/kashi.jpg",
      "/ganga-aarti.jpg"
    ],
    "gradient": "bg-sunrise-gradient",
    "summary": "Experience a profound 3-day Hindu and Buddhist pilgrimage. Discover the sacred monuments of Gaya and Bodhgaya, witness the timeless evening Ganga Aarti, and explore the revered temples and historic landmarks of ancient Varanasi.",
    "highlights": [
      "Explore iconic Buddhist and Hindu sites in Gaya, including the Mahabodhi Temple and Vishnupad Mandir",
      "Visit the legendary Kashi Vishwanath Temple and Bharat Mata Temple in Varanasi",
      "Witness the breathtaking evening Ganga Aarti along the ancient ghats",
      "Excursion to historic spiritual and cultural landmarks like Chunar Fort and Dhamek Stupa"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Gaya Sightseeing City Tour",
        "description": "Upon arrival at the airport, railway station, or other pickup locations, your guide and cab driver will meet you and transfer you to your hotel. After a brief half-hour rest to settle your luggage, head out for a comprehensive sightseeing tour of Gaya and Bodhgaya. Visit the Mahabodhi Temple, Archaeological Museum, Bodhi Tree, Wat Thai Buddhagaya, Great Buddha Statue, Thai Temple, Vishnupad Mandir, Dungeshwari Cave, Buddha Temple Bodhgaya, Prachin Bharat Multimedia Museum, Tergar Monastery, and Mucalinda Lake. Overnight stay at your hotel.",
        "stops": [
          {
            "id": "A",
            "title": "Hotel Check-in & Arrival",
            "description": "Pickup from airport/railway station and transfer to hotel to settle luggage",
            "type": "hotel"
          },
          {
            "id": "B",
            "title": "Mahabodhi Temple & Sacred Bodhi Tree Complex",
            "description": "Visit the UNESCO Heritage Mahabodhi Temple, Bodhi Tree, and Mucalinda Lake",
            "type": "sightseeing"
          },
          {
            "id": "C",
            "title": "Great Buddha Statue & Monasteries",
            "description": "Explore the 80-foot Great Buddha Statue, Wat Thai, and Tergar Monastery",
            "type": "sightseeing"
          },
          {
            "id": "D",
            "title": "Vishnupad Mandir & Dungeshwari Caves",
            "description": "Visit the revered Hindu Vishnupad Temple and the historic Dungeshwari Cave Temples",
            "type": "temple"
          },
          {
            "id": "E",
            "title": "Overnight stay in Gaya / Bodhgaya",
            "description": "Return to the hotel for rest and overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 2",
        "title": "Varanasi Sightseeing City Tour - Part 1",
        "description": "Travel to Varanasi to experience its deep spiritual heritage. Your city tour includes visits to the revered Kashi Vishwanath Temple, Bharat Mata Temple, and the historic Chunar Fort. Continue your exploration with visits to the Assi Ghat Aarti, Shivala Ghat, Banaras Hindu University, Rana Mahal Ghat, and the Alamgir Mosque. Overnight stay in Varanasi.",
        "stops": [
          {
            "id": "A",
            "title": "Transfer to Varanasi",
            "description": "Drive from Gaya to the holy city of Varanasi",
            "type": "transport"
          },
          {
            "id": "B",
            "title": "Shri Kashi Vishwanath & Bharat Mata Temple",
            "description": "Seek blessings at the legendary Kashi Vishwanath Jyotirlinga and Bharat Mata Mandir",
            "type": "temple"
          },
          {
            "id": "C",
            "title": "Historic Chunar Fort Excursion",
            "description": "Explore the ancient fort overlooking the Ganges",
            "type": "sightseeing"
          },
          {
            "id": "D",
            "title": "BHU Campus & Ghat Exploration",
            "description": "Tour Banaras Hindu University and the scenic Shivala, Rana Mahal, and Alamgir Ghats",
            "type": "sightseeing"
          },
          {
            "id": "E",
            "title": "Evening Aarti at Assi Ghat",
            "description": "Witness the mesmerising evening Ganga Aarti at Assi Ghat",
            "type": "other"
          },
          {
            "id": "F",
            "title": "Overnight stay in Varanasi",
            "description": "Check in to your hotel for an overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 3",
        "title": "Varanasi Sightseeing City Tour - Part 2 & Departure",
        "description": "Dedicate your final day to exploring more of Varanasi's prominent landmarks. Visit the Tulsi Manasa Temple, Durga Mandir, Dashashwamedh Ghat, Dhamek Stupa, Sankat Mochan Mandir, Khidkiya Ghat, and the Trade Center Museum, alongside experiencing the regular Ganga Aarti rituals. Conclude your tour with a drop-off at your designated departure location, such as the airport or railway station.",
        "stops": [
          {
            "id": "A",
            "title": "Southern Temples Circuit",
            "description": "Visit Tulsi Manas Mandir, Durga Mandir, and Sankat Mochan Hanuman Mandir",
            "type": "temple"
          },
          {
            "id": "B",
            "title": "Sarnath Excursion (Dhamek Stupa)",
            "description": "Tour the ancient Buddhist heritage site and Dhamek Stupa",
            "type": "sightseeing"
          },
          {
            "id": "C",
            "title": "Khidkiya Ghat & Trade Center Museum",
            "description": "Visit modern cultural developments and the Trade Facilitation Center",
            "type": "sightseeing"
          },
          {
            "id": "D",
            "title": "Dashashwamedh Ghat & Rituals",
            "description": "Explore the prominent Dashashwamedh Ghat and its ancient ritual spaces",
            "type": "other"
          },
          {
            "id": "E",
            "title": "Departure Transfer",
            "description": "Transfer to Varanasi Airport or Railway Station for your onward journey",
            "type": "transport"
          }
        ]
      }
    ],
    "includes": [
      "2 nights accommodation at a 3-star hotel",
      "Daily breakfast and meals as provided by the hotel",
      "Dedicated cab, fuel/oil costs, and professional driver service",
      "Pickup and drop-off assistance at airport, railway station, or hotel locations"
    ],
    "excludes": [
      "Camera fees at monuments and temples",
      "Optional language converter guide service (available for an extra fee of Rs. 1500)",
      "Personal expenses, tipping, and anything not explicitly mentioned in the inclusions"
    ]
  },
  {
    "slug": "varanasi-allahabad-chitrakoot-ayodhya-yatra",
    "title": "Varanasi, Allahabad, Chitrakoot & Ayodhya Tour",
    "subtitle": "A grand 6-day spiritual odyssey traversing the holiest shrines and historical landmarks of Uttar Pradesh",
    "category": "Spiritual Circuit",
    "duration": "6 Days / 5 Nights",
    "popularOrder": 5, // Popular Yatras popularOrder
    "places": [
      "Varanasi",
      "Sarnath",
      "Allahabad",
      "Chitrakoot",
      "Ayodhya"
    ],
    "priceFrom": 0,
    "startsIn": "Starts in Varanasi",
    "stay": "5-night stay included",
    "transport": "Private dedicated vehicle",
    "featured": true,
    "imageSrc": "/sangam.jpg",
    "images": [
      "/sangam.jpg",
      "/kashi.jpg",
      "/sarnath.jpg",
      "/ram-mandir.jpg"
    ],
    "gradient": "bg-sunrise-gradient",
    "summary": "Immerse yourself in a comprehensive 6-day pilgrimage across India's most sacred destinations. Witness the divine Ganga Aarti in Varanasi, explore the ancient ruins of Sarnath, take a holy dip at Triveni Sangam, trace the footsteps of Lord Rama in Chitrakoot, and seek blessings at the historic Ram Janmabhoomi in Ayodhya.",
    "highlights": [
      "Comprehensive Varanasi temple tour and evening Ganga Aarti with boat ride",
      "Excursion to Sarnath Buddhist heritage sites and historic Ramnagar Fort",
      "Sacred dip at Triveni Sangam and darshan at Vindhyavasini Shaktipeeth",
      "Full-day exploration of Lord Rama's exile landmarks in Chitrakoot",
      "Darshan at the grand Shri Ram Janmabhoomi Mandir and Hanuman Garhi in Ayodhya"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Arrival in Varanasi, Temple Sightseeing & Evening Aarti",
        "description": "Upon arrival at Varanasi Airport or Railway Station, receive a traditional welcome and transfer to your hotel. After refreshing, proceed for a city tour of Varanasi. Visit the New Vishwanath Temple (BHU), Sankat Mochan Temple, Tulsi Manas Mandir, Durga Mandir, Tridev Temple, and Kaudi Mata Temple. In the evening, witness the spectacular Ganga Aarti and enjoy a boat ride on the River Ganga at Dashashwamedh Ghat. Overnight stay at the hotel.",
        "stops": [
          {
            "id": "A",
            "title": "Hotel Check-in & Arrival",
            "description": "Traditional welcome upon arrival and transfer to the hotel to freshen up",
            "type": "hotel"
          },
          {
            "id": "B",
            "title": "BHU & Southern Temples Tour",
            "description": "Visit New Vishwanath Temple (BHU), Sankat Mochan, Tulsi Manas, Durga Mandir, and Tridev Temple",
            "type": "temple"
          },
          {
            "id": "C",
            "title": "Dashashwamedh Ghat",
            "description": "Witness the spectacular evening Ganga Aarti and enjoy a scenic boat ride on the Ganges",
            "type": "other"
          },
          {
            "id": "D",
            "title": "Overnight stay in Varanasi",
            "description": "Return to the hotel for rest and overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 2",
        "title": "Sarnath Excursion, Ramnagar Fort & Silk Weaving Centre",
        "description": "After breakfast, head to Sarnath, the revered site where Lord Buddha preached his first sermon. Explore the Dhamek Stupa, Chaukhandi Stupa, Jain Temple, Buddha Temple, Sarnath Museum, Ashok Pillar, and Deer Park. Later, drive to the historic Ramnagar Fort, the palace of the King of Varanasi. In the evening, visit a traditional Silk Weaving centre, followed by a visit to the Kal Bhairav Mandir. Return to the hotel for an overnight stay.",
        "stops": [
          {
            "id": "A",
            "title": "Sarnath Buddhist Circuit",
            "description": "Explore Dhamek Stupa, Chaukhandi Stupa, Ashoka Pillar, Deer Park, and Sarnath Museum",
            "type": "sightseeing"
          },
          {
            "id": "B",
            "title": "Ramnagar Fort",
            "description": "Visit the historic 18th-century fort and royal residence on the banks of the Ganges",
            "type": "sightseeing"
          },
          {
            "id": "C",
            "title": "Silk Weaving Centre & Kaal Bhairav Mandir",
            "description": "Experience local Banarasi silk craft followed by darshan at Kaal Bhairav Temple",
            "type": "shopping"
          },
          {
            "id": "D",
            "title": "Overnight stay in Varanasi",
            "description": "Return to the hotel for rest and overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 3",
        "title": "Varanasi to Allahabad via Vindhyavasini Temple",
        "description": "After breakfast, check out and drive towards Allahabad (Prayagraj). En route, stop for darshan at the holy Maa Vindhyavasini Temple, a prominent Shaktipeeth. Upon reaching Allahabad, check into your hotel and proceed to visit the Triveni Sangam (the sacred confluence of the Ganga, Yamuna, and invisible Saraswati rivers) for a holy dip. Later, visit Allahabad Fort, Hanuman Temple, Anand Bhawan, Alopi Devi Temple, and the Nav Graha Temple. Overnight stay at the hotel.",
        "stops": [
          {
            "id": "A",
            "title": "Maa Vindhyavasini Temple (Vindhyachal)",
            "description": "Stop en route to pray at the revered Shaktipeeth shrine",
            "type": "temple"
          },
          {
            "id": "B",
            "title": "Hotel Check-in at Prayagraj",
            "description": "Arrive in Prayagraj (Allahabad) and check into your hotel",
            "type": "hotel"
          },
          {
            "id": "C",
            "title": "Triveni Sangam & Bade Hanuman Mandir",
            "description": "Take a sacred dip at the confluence of rivers and visit the Lete Hanuman Temple",
            "type": "sightseeing"
          },
          {
            "id": "D",
            "title": "Prayagraj Heritage Tour",
            "description": "Visit Allahabad Fort, Anand Bhawan, Alopi Devi Temple, and Nav Graha Temple",
            "type": "sightseeing"
          },
          {
            "id": "E",
            "title": "Overnight stay in Prayagraj",
            "description": "Relax and stay overnight at the hotel",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 4",
        "title": "Chitrakoot Day Excursion",
        "description": "After breakfast, embark on a full-day excursion to Chitrakoot. Explore its highly revered religious sites, including Ram Ghat, Hanuman Dhara, Kamadgiri, Bharat Koop, Bharat Milap Temple, Gupt Godavari, Janki Kund, Sati Anusuya Ashram, Sphatik Shila, Ganesh Bagh, Valmiki Ashram, Lakshman Chowki, and Ram Shaiyya. After a thorough exploration, drive back to Allahabad for an overnight stay.",
        "stops": [
          {
            "id": "A",
            "title": "Excursion Drive to Chitrakoot",
            "description": "Morning drive from Prayagraj to the holy city of Chitrakoot",
            "type": "transport"
          },
          {
            "id": "B",
            "title": "Ram Ghat & Kamadgiri Temple Circuit",
            "description": "Visit Ram Ghat on the Mandakini River, Kamadgiri, and Bharat Milap Temple",
            "type": "temple"
          },
          {
            "id": "C",
            "title": "Sacred Caves & Ashrams Tour",
            "description": "Explore Gupt Godavari, Hanuman Dhara, Janki Kund, Sphatik Shila, and Sati Anusuya Ashram",
            "type": "sightseeing"
          },
          {
            "id": "D",
            "title": "Return Transfer to Prayagraj",
            "description": "Drive back to Prayagraj for overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 5",
        "title": "Allahabad to Ayodhya & Local Sightseeing",
        "description": "After breakfast, check out from Allahabad and drive to the sacred city of Ayodhya. Upon arrival, check into your hotel and proceed to explore major landmarks including Hanuman Garhi, Ram Janmabhoomi (Shri Ram Mandir), Ram Darbar, Kanak Bhawan, and Nageshwar Nath Temple. Overnight stay at the hotel in Ayodhya.",
        "stops": [
          {
            "id": "A",
            "title": "Transfer to Ayodhya",
            "description": "Drive from Prayagraj to the holy city of Ayodhya and check into hotel",
            "type": "transport"
          },
          {
            "id": "B",
            "title": "Hanuman Garhi & Shri Ram Janmabhoomi",
            "description": "Pay homage at Hanuman Garhi and the magnificent Shri Ram Mandir",
            "type": "temple"
          },
          {
            "id": "C",
            "title": "Kanak Bhawan & Nageshwar Nath Temple",
            "description": "Explore Kanak Bhawan and the historic Nageshwar Nath Temple near Ram Ki Paidi",
            "type": "temple"
          },
          {
            "id": "D",
            "title": "Overnight stay in Ayodhya",
            "description": "Check in and rest overnight at the hotel",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 6",
        "title": "Departure from Ayodhya / Lucknow",
        "description": "Enjoy breakfast at the hotel, then check out. You will be provided a departure transfer to the Ayodhya or Lucknow Airport / Railway Station for your onward train or flight home, carrying sweet spiritual memories.",
        "stops": [
          {
            "id": "A",
            "title": "Hotel Check-out",
            "description": "Enjoy breakfast and complete checkout procedures at the hotel",
            "type": "hotel"
          },
          {
            "id": "B",
            "title": "Departure Transfer",
            "description": "Transfer to Ayodhya or Lucknow Airport / Railway Station for onward travel",
            "type": "transport"
          }
        ]
      }
    ],
    "includes": [
      "5 nights accommodation on a twin/triple-sharing basis as per itinerary",
      "Daily breakfast served at the hotels",
      "Traditional welcome upon arrival",
      "All intercity transfers and local sightseeing in a private dedicated vehicle",
      "Arrangement for the evening Ganga Aarti and boating at Varanasi"
    ],
    "excludes": [
      "Midday meals, lunches, and dinners not specified",
      "Monument entry fees, camera tickets, and local guide charges",
      "Personal expenses such as tipping, laundry, and religious offerings (pooja samagri)",
      "Any airfare or train tickets to/from the starting and ending destinations"
    ]
  },

  {
    "slug": "kashi-prayag-gaya-pind-daan-special-package",
    "title": "Pind Daan Special Package",
    "subtitle": "A sacred and meticulously guided ritual journey across the holy trithas of Varanasi, Prayagraj, and Gaya",
    "category": "Buddhist Circuit",
    "duration": "4 Days / 3 Nights",
    "popularOrder": 4, // Popular Yatras popularOrder
    "places": [
      "Varanasi",
      "Prayagraj",
      "Gaya"
    ],
    "priceFrom": 15999,
    "startsIn": "Starts in Varanasi",
    "stay": "3-night stay included",
    "transport": "Private dedicated vehicle",
    "featured": true,
    "imageSrc": "/pinddaan.jpg",
    "images": [
      "/pinddaan.jpg",
      "/kashi.jpg",
      "/sangam.jpg"
    ],
    "gradient": "bg-sunrise-gradient",
    "summary": "Perform the sacred rites of Pind Daan with complete peace of mind. This specialized 4-day itinerary connects the highly revered ghats of Kashi, the holy Triveni Sangam in Prayagraj, and the ancient Vishnupad Temple in Gaya, with dedicated Purohit services and ritual arrangements included.",
    "highlights": [
      "Perform sacred Pind Daan rituals at Kedar Ghat in Varanasi with arranged Purohits",
      "Take a holy bath and complete ritual offerings at the Triveni Sangam confluence",
      "Travel to Gaya for ancestral rites at the legendary Falgu River and Vishnupad Temple",
      "Experience the iconic evening Ganga Aarti and explore central temples of Kashi"
    ],
    "itinerary": [
      {
        "day": "Day 1",
        "title": "Varanasi Arrival & Pind Daan at Kedar Ghat",
        "description": "Upon arrival at Varanasi Airport or Railway Station, transfer to your hotel for check-in. Proceed to Kedar Ghat to perform the initial Pind Daan rituals, a comprehensive 3 to 4-hour activity completely arranged with a local Purohit and necessary pooja materials. Afterward, visit the highly religious Shri Kashi Vishwanath Temple, Maa Annapurna Temple, and Vishalakshi Devi Temple. In the evening, witness the magnificent Ganga Aarti ceremony from the riverfront ghats. Overnight stay in Varanasi.",
        "stops": [
          {
            "id": "A",
            "title": "Hotel Check-in & Arrival",
            "description": "Pickup from airport/railway station and transfer to hotel",
            "type": "hotel"
          },
          {
            "id": "B",
            "title": "Pind Daan Rituals at Kedar Ghat",
            "description": "Perform 3-4 hour ancestral rites with arranged local Purohit and ritual items",
            "type": "other"
          },
          {
            "id": "C",
            "title": "Central Kashi Temples Tour",
            "description": "Visit Shri Kashi Vishwanath, Maa Annapurna, and Vishalakshi Devi Temples",
            "type": "temple"
          },
          {
            "id": "D",
            "title": "Evening Ganga Aarti",
            "description": "Experience the divine Ganga Aarti ceremony from the riverfront ghats",
            "type": "other"
          },
          {
            "id": "E",
            "title": "Overnight stay in Varanasi",
            "description": "Return to hotel for rest and overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 2",
        "title": "Prayagraj Excursion & Sangam Rituals",
        "description": "Depart early at 6:00 AM for a 130 km drive to Prayagraj (Allahabad). Enjoy a holy bath at the sacred Triveni Sangam—the confluence of the Ganga, Yamuna, and mythical Saraswati rivers. Engage in the designated Pind Daan rituals here (approx. 3-4 hours, fully arranged with a priest and materials). Before driving back to Varanasi, visit local holy sites including the Let Hanuman Temple and Alopi Devi Temple. Overnight stay in Varanasi.",
        "stops": [
          {
            "id": "A",
            "title": "Drive to Prayagraj",
            "description": "Early morning drive (approx. 130 km) from Varanasi to Prayagraj",
            "type": "transport"
          },
          {
            "id": "B",
            "title": "Triveni Sangam Bath & Pind Daan",
            "description": "Holy dip at the confluence and 3-4 hour ancestral ritual offerings",
            "type": "sightseeing"
          },
          {
            "id": "C",
            "title": "Prayagraj Temples Visit",
            "description": "Visit the famous Lete Hanuman Temple and Alopi Devi Temple",
            "type": "temple"
          },
          {
            "id": "D",
            "title": "Return Drive to Varanasi",
            "description": "Drive back to Varanasi for overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 3",
        "title": "Gaya Day Excursion for Ancestral Rites",
        "description": "Start with an early morning 4:00 AM drive to Gaya (256 km). Upon arrival, proceed directly to perform the main Pind Daan rituals for your ancestors, taking roughly 3 to 4 hours with all arrangements handled. After completing the offerings, seek blessings at the historic Vishnupad Temple and Mangla Gauri Temple. Drive back to Varanasi in the evening for an overnight stay.",
        "stops": [
          {
            "id": "A",
            "title": "Drive to Gaya",
            "description": "Early morning drive (approx. 256 km) from Varanasi to Gaya",
            "type": "transport"
          },
          {
            "id": "B",
            "title": "Ancestral Pind Daan Rituals",
            "description": "Perform comprehensive 3-4 hour ancestral rites along the sacred Falgu River area",
            "type": "other"
          },
          {
            "id": "C",
            "title": "Vishnupad & Mangla Gauri Temple Darshan",
            "description": "Seek blessings at the ancient Vishnupad Temple footprint shrine and Mangla Gauri Shaktipeeth",
            "type": "temple"
          },
          {
            "id": "D",
            "title": "Return Drive to Varanasi",
            "description": "Evening drive back to Varanasi for overnight stay",
            "type": "hotel"
          }
        ]
      },
      {
        "day": "Day 4",
        "title": "Varanasi Departure",
        "description": "Enjoy breakfast at the hotel, check out, and receive a timely transfer to the Varanasi Airport or Railway Station for your onward journey, concluding your holy pilgrimage with pleasant spiritual memories.",
        "stops": [
          {
            "id": "A",
            "title": "Hotel Check-out",
            "description": "Enjoy breakfast and complete checkout procedures",
            "type": "hotel"
          },
          {
            "id": "B",
            "title": "Departure Transfer",
            "description": "Transfer to Varanasi Airport or Railway Station for your onward journey",
            "type": "transport"
          }
        ]
      }
    ],
    "includes": [
      "3 nights accommodation in Varanasi based on selected hotel category",
      "Daily breakfast served at the hotel",
      "Complete Pind Daan arrangements (dedicated Purohit and all necessary pooja items) at Varanasi, Prayagraj, and Gaya",
      "All intercity transfers and sightseeing in a dedicated private vehicle",
      "Assistance during evening Ganga Aarti viewings"
    ],
    "excludes": [
      "Midday meals, lunches, and dinners",
      "Personal expenses, traditional tipping, and any extra religious offerings",
      "Fast-track or VIP temple entry passes",
      "Anything not explicitly mentioned in the package inclusions"
    ]
  }
];

export function getTour(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

export function getFeaturedTours(): Tour[] {
  return tours
    .filter((t) => t.featured)
    .sort((a, b) => a.popularOrder - b.popularOrder);
}

export const categories: TourCategory[] = [
  "Cultural Heritage",
  "Spiritual Circuit",
  "Buddhist Circuit", 
];

/** Format an INR amount like ₹42,999 */
export function formatINR(amount: number): string {
  return "₹" + amount.toLocaleString("en-IN");
}
