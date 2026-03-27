package com.gantavya.seed;

import com.gantavya.domain.CatalogDtos;
import com.gantavya.domain.CatalogDtos.Guide;
import com.gantavya.domain.CatalogDtos.GuideAvailabilityDay;
import com.gantavya.domain.CatalogDtos.GuideReview;
import com.gantavya.domain.CatalogDtos.Trek;
import com.gantavya.domain.CatalogDtos.TrekCheckpoint;
import com.gantavya.domain.CatalogDtos.TrekItineraryItem;
import com.gantavya.domain.CatalogDtos.StayPlan;
import com.gantavya.domain.CatalogDtos.StayOption;
import com.gantavya.domain.CatalogDtos.Activity;

import java.util.ArrayList;
import java.util.List;

public final class SeedData {
  private SeedData() {}

  public static List<Trek> treks() {
    List<Trek> list = new ArrayList<>();

    // Trek Listing data (catalog)
    list.add(new Trek(
        1,
        "Everest Base Camp",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
        "Moderate",
        "12 Days",
        "$1,200",
        "5,364m",
        "Everest",
        "The Everest Base Camp trek is one of the most popular trekking routes in Nepal.",
        "March-May, September-November",
        List.of(
            "View of Mount Everest and surrounding peaks",
            "Visit Namche Bazaar, the Sherpa capital",
            "Experience Buddhist culture at Tengboche Monastery",
            "Trek through Sagarmatha National Park"
        ),
        List.of(
            new TrekItineraryItem(1, "Arrival in Kathmandu", "Meet and greet, hotel transfer"),
            new TrekItineraryItem(2, "Fly to Lukla, Trek to Phakding", "2-3 hours trek"),
            new TrekItineraryItem(3, "Phakding to Namche Bazaar", "5-6 hours trek")
        ),
        List.of(
            new TrekCheckpoint(1, "Lukla", "2,860m", "start", 15, 85, "Starting point - Mountain airport"),
            new TrekCheckpoint(2, "Phakding", "2,610m", "village", 20, 78, "First overnight stop"),
            new TrekCheckpoint(3, "Namche Bazaar", "3,440m", "village", 28, 65, "Sherpa capital - Acclimatization"),
            new TrekCheckpoint(4, "Tengboche", "3,867m", "monastery", 40, 58, "Famous Buddhist monastery"),
            new TrekCheckpoint(5, "Dingboche", "4,410m", "village", 52, 52, "Acclimatization stop"),
            new TrekCheckpoint(6, "Lobuche", "4,940m", "village", 65, 45, "High altitude village"),
            new TrekCheckpoint(7, "Gorak Shep", "5,164m", "stop", 75, 38, "Last stop before EBC"),
            new TrekCheckpoint(8, "Everest Base Camp", "5,364m", "destination", 85, 30, "Final destination - Base of Mt. Everest")
        ),
        "long",
        List.of(
            new StayPlan(1, "Kathmandu", List.of(
                new StayOption("Hotel de l'Annapurna", "hotel", "$80-120", List.of("WiFi", "Hot Water", "Restaurant")),
                new StayOption("Kantipur Temple House", "hotel", "$60-90", List.of("WiFi", "Courtyard", "Guided Tours"))
            )),
            new StayPlan(2, "Lukla", List.of(
                new StayOption("Yeti Mountain Home", "teahouse", "$30-40", List.of("Heating", "Local Meals")),
                new StayOption("Lukla Airport Hotel", "hotel", "$45-60", List.of("WiFi", "Hot Showers"))
            )),
            new StayPlan(3, "Phakding", List.of(
                new StayOption("Phakding Lodge", "teahouse", "$25-35", List.of("Basic Amenities", "Local Food")),
                new StayOption("Riverside Teahouse", "teahouse", "$20-30", List.of("Mountain View", "Meals"))
            )),
            new StayPlan(4, "Namche Bazaar", List.of(
                new StayOption("Namche Lodge", "hotel", "$50-70", List.of("Heating", "Hot Water", "Restaurant")),
                new StayOption("Thamel House Lodge", "teahouse", "$40-50", List.of("WiFi", "Local Meals"))
            )),
            new StayPlan(5, "Tengboche", List.of(
                new StayOption("Tengboche Lodge", "teahouse", "$30-40", List.of("Monastery View", "Heating")),
                new StayOption("Buddhist Guesthouse", "teahouse", "$25-35", List.of("Peaceful", "Local Meals"))
            )),
            new StayPlan(6, "Dingboche", List.of(
                new StayOption("Dingboche Teahouse", "teahouse", "$30-40", List.of("Heating", "Acclimatization Stop")),
                new StayOption("Himalayan Lodge", "teahouse", "$35-45", List.of("Hot Water", "Local Meals"))
            )),
            new StayPlan(7, "Lobuche", List.of(
                new StayOption("Lobuche Lodge", "teahouse", "$25-35", List.of("Basic Amenities", "Meals")),
                new StayOption("High Mountain Guesthouse", "teahouse", "$20-30", List.of("Budget Option", "Hot Meals"))
            )),
            new StayPlan(8, "Gorak Shep", List.of(
                new StayOption("Everest View Hotel", "teahouse", "$30-40", List.of("View of EBC Route", "Meals")),
                new StayOption("Summit Lodge", "teahouse", "$25-35", List.of("Basic", "Quick Service"))
            ))
        ),
        List.of(1, 2, 3, 6)
    ));

    list.add(new Trek(
        2,
        "Annapurna Circuit",
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
        "Challenging",
        "15 Days",
        "$1,400",
        "5,416m",
        "Annapurna",
        "Complete circuit around the Annapurna massif.",
        "",
        List.of(),
        List.of(),
        List.of(),
        "long",
        List.of(
            new StayPlan(1, "Kathmandu", List.of(
                new StayOption("Hotel de l'Annapurna", "hotel", "$80-120", List.of("WiFi", "Hot Water", "Restaurant"))
            )),
            new StayPlan(2, "Besisahar", List.of(
                new StayOption("Besisahar Lodge", "teahouse", "$25-35", List.of("riverside", "meals"))
            )),
            new StayPlan(3, "Dhamildhaka", List.of(
                new StayOption("Mountain Teahouse", "teahouse", "$20-30", List.of("local food", "heating"))
            ))
        ),
        List.of(1, 3, 6)
    ));

    list.add(new Trek(
        3,
        "Langtang Valley",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "Easy",
        "7 Days",
        "$800",
        "3,800m",
        "Langtang",
        "Beautiful valley trek close to Kathmandu.",
        "",
        List.of(),
        List.of(),
        List.of(),
        "short",
        List.of(
            new StayPlan(1, "Kathmandu", List.of(
                new StayOption("Kantipur Temple House", "hotel", "$60-90", List.of("WiFi", "Courtyard"))
            )),
            new StayPlan(2, "Langtang", List.of(
                new StayOption("Langtang Lodge", "teahouse", "$30-40", List.of("heating", "meals"))
            )),
            new StayPlan(3, "Kyanjin Gompa", List.of(
                new StayOption("Gompa Guesthouse", "teahouse", "$25-35", List.of("monastery view", "local food"))
            ))
        ),
        List.of(2, 4, 5)
    ));

    list.add(new Trek(
        4,
        "Manaslu Circuit",
        "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800",
        "Challenging",
        "14 Days",
        "$1,350",
        "5,160m",
        "Manaslu",
        "Remote trek around the eighth highest mountain.",
        "",
        List.of(),
        List.of(),
        List.of(),
        "long",
        List.of(
            new StayPlan(1, "Kathmandu", List.of(
                new StayOption("Hotel de l'Annapurna", "hotel", "$80-120", List.of("WiFi", "Restaurant"))
            )),
            new StayPlan(2, "Soti Khola", List.of(
                new StayOption("Soti Lodge", "teahouse", "$25-35", List.of("river view", "meals"))
            )),
            new StayPlan(3, "Namrung", List.of(
                new StayOption("Namrung Teahouse", "teahouse", "$20-30", List.of("heating", "local food"))
            ))
        ),
        List.of(1, 6)
    ));

    list.add(new Trek(
        5,
        "Ghorepani Poon Hill",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800",
        "Easy",
        "5 Days",
        "$600",
        "3,210m",
        "Annapurna",
        "Short trek with stunning sunrise views.",
        "",
        List.of(),
        List.of(),
        List.of(),
        "short",
        List.of(
            new StayPlan(1, "Kathmandu", List.of(
                new StayOption("Kantipur Temple House", "hotel", "$60-90", List.of("WiFi", "Courtyard"))
            )),
            new StayPlan(2, "Ghorepani", List.of(
                new StayOption("Poon Hill Lodge", "teahouse", "$25-35", List.of("sunrise view", "heating"))
            )),
            new StayPlan(3, "Poon Hill", List.of(
                new StayOption("Summit Guesthouse", "teahouse", "$20-30", List.of("best views", "meals"))
            ))
        ),
        List.of(4, 5)
    ));

    list.add(new Trek(
        6,
        "Upper Mustang",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "Moderate",
        "10 Days",
        "$1,100",
        "3,840m",
        "Mustang",
        "Ancient kingdom with Tibetan culture.",
        "",
        List.of(),
        List.of(),
        List.of(),
        "long",
        List.of(
            new StayPlan(1, "Kathmandu", List.of(
                new StayOption("Hotel de l'Annapurna", "hotel", "$80-120", List.of("WiFi", "Restaurant"))
            )),
            new StayPlan(2, "Jomsom", List.of(
                new StayOption("Jomsom Lodge", "hotel", "$40-60", List.of("heating", "meals"))
            )),
            new StayPlan(3, "Lo Manthang", List.of(
                new StayOption("Royal Guesthouse", "guesthouse", "$35-45", List.of("cultural immersion", "meals"))
            ))
        ),
        List.of(1, 3, 6)
    ));

    return list;
  }

  public static List<Guide> guides() {
    // Availability/reviews based on your current `GuideProfile` page (Pemba).
    List<GuideAvailabilityDay> pembaAvailability = List.of(
        new GuideAvailabilityDay(1, false),
        new GuideAvailabilityDay(2, true),
        new GuideAvailabilityDay(3, true),
        new GuideAvailabilityDay(4, false),
        new GuideAvailabilityDay(5, true),
        new GuideAvailabilityDay(6, true),
        new GuideAvailabilityDay(7, true),
        new GuideAvailabilityDay(8, false),
        new GuideAvailabilityDay(9, false),
        new GuideAvailabilityDay(10, true),
        new GuideAvailabilityDay(11, true),
        new GuideAvailabilityDay(12, true),
        new GuideAvailabilityDay(13, true),
        new GuideAvailabilityDay(14, true),
        new GuideAvailabilityDay(15, false)
    );

    List<GuideReview> pembaReviews = List.of(
        new GuideReview(1, "Sarah Johnson", "USA", 5.0, "March 2026",
            "Pemba was an outstanding guide! His knowledge of the region and attention to detail made our EBC trek unforgettable. Highly recommended!"),
        new GuideReview(2, "Marco Rossi", "Italy", 5.0, "February 2026",
            "Professional, friendly, and very experienced. Pemba made sure we were safe and comfortable throughout the journey."),
        new GuideReview(3, "Yuki Tanaka", "Japan", 4.8, "January 2026",
            "Great guide with excellent English. He shared many interesting stories about Sherpa culture and the mountains.")
    );

    List<Guide> list = new ArrayList<>();

    list.add(new Guide(
        1,
        "Pemba Sherpa",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200",
        "15 years",
        List.of("English", "Nepali", "Hindi"),
        4.9,
        127,
        80,
        false,
        "Namche Bazaar, Nepal",
        "I am a professional mountain guide born and raised in the Khumbu region. I have been guiding trekkers and climbers in the Himalayas for over 15 years. My passion is to share the beauty of my homeland and the rich Sherpa culture with visitors from around the world. Safety and customer satisfaction are my top priorities.",
        "High altitude treks",
        List.of("NNMGA Certified", "Wilderness First Aid", "Avalanche Training Level 1"),
        List.of("Everest Base Camp", "Gokyo Lakes", "Three Passes Trek", "Island Peak Climbing"),
        340,
        true,
        "NLP-2008-00541",
        true,
        true,
        true,
        pembaAvailability,
        pembaReviews
    ));

    list.add(new Guide(
        2,
        "Dawa Tamang",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200",
        "12 years",
        List.of("English", "Nepali"),
        4.8,
        94,
        70,
        true,
        "Kathmandu Valley, Nepal",
        "Friendly guide passionate about sharing Sherpa culture.",
        "Cultural tours",
        List.of("NNMGA Certified"),
        List.of("Everest Base Camp", "Gokyo Lakes"),
        210,
        true,
        "NLP-2011-00712",
        true,
        false,
        false,
        List.of(new GuideAvailabilityDay(1, true)),
        List.of()
    ));

    list.add(new Guide(
        3,
        "Mingma Dorje",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200",
        "18 years",
        List.of("English", "Nepali", "Tibetan", "Mandarin"),
        5.0,
        156,
        95,
        false,
        "Khumbu Region, Nepal",
        "Expert guide with summit experience on multiple 8000m peaks.",
        "Technical mountaineering",
        List.of("IFMGA Certified", "Avalanche Training"),
        List.of("Everest Base Camp", "Three Passes Trek", "Island Peak Climbing"),
        450,
        true,
        "NLP-2006-00389",
        true,
        true,
        false,
        List.of(new GuideAvailabilityDay(1, true)),
        List.of()
    ));

    list.add(new Guide(
        4,
        "Lakpa Sherpa",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200",
        "2 years",
        List.of("English", "Nepali"),
        4.7,
        12,
        45,
        true,
        "Pokhara, Nepal",
        "Young and energetic guide with great knowledge of local flora and fauna.",
        "Nature & Wildlife",
        List.of("NNMGA Certified"),
        List.of("Ghorepani Poon Hill"),
        15,
        true,
        "NLP-2022-01256",
        false,
        false,
        false,
        List.of(new GuideAvailabilityDay(1, true)),
        List.of()
    ));

    list.add(new Guide(
        5,
        "Pasang Lhamu",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200",
        "5 years",
        List.of("English", "Nepali", "Japanese"),
        4.9,
        68,
        75,
        true,
        "Pokhara, Nepal",
        "One of the few female guides in the region, known for excellent hospitality.",
        "Family groups",
        List.of("NNMGA Certified", "First Aid"),
        List.of("Langtang Valley", "Ghorepani Poon Hill"),
        85,
        true,
        "NLP-2019-00934",
        true,
        true,
        false,
        List.of(new GuideAvailabilityDay(1, true)),
        List.of()
    ));

    list.add(new Guide(
        6,
        "Tenzing Norgay",
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400",
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=1200",
        "20 years",
        List.of("English", "Nepali", "German"),
        4.8,
        201,
        85,
        false,
        "Namche Bazaar, Nepal",
        "Veteran guide with extensive experience leading international groups.",
        "Large group expeditions",
        List.of("IFMGA Certified", "Rescue Training"),
        List.of("Everest Base Camp", "Annapurna Circuit", "Upper Mustang"),
        500,
        true,
        "NLP-2004-00267",
        true,
        true,
        false,
        List.of(new GuideAvailabilityDay(1, true)),
        List.of()
    ));

    return list;
  }

  public static List<Activity> activities() {
    List<Activity> list = new ArrayList<>();

    // Cultural Events
    list.add(new Activity(
        1,
        "Pashupatinath Temple Festival",
        "event",
        "cultural",
        "Kathmandu",
        27.7245,
        85.3340,
        "https://images.unsplash.com/photo-1514890547357-a9db7bdd2d8f?w=800",
        "Traditional Hindu festival at the sacred Pashupatinath Temple with rituals and celebrations",
        "March 4-5, 2026",
        "Free Entry",
        "Full day"
    ));

    list.add(new Activity(
        2,
        "Boudhanath Stupa Circumambulation",
        "event",
        "cultural",
        "Kathmandu Valley",
        27.7209,
        85.3640,
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "Spiritual walk around the largest stupa in Nepal with Buddhist monks",
        "Daily",
        "Free",
        "2-3 hours"
    ));

    // Adventure Activities
    list.add(new Activity(
        3,
        "Paragliding Over Pokhara",
        "adventure",
        "adventure",
        "Pokhara",
        28.2096,
        83.9863,
        "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800",
        "Thrilling paragliding experience with panoramic views of Annapurna and Dhaulagiri",
        "Year-round",
        "$150-200",
        "1-2 hours"
    ));

    list.add(new Activity(
        4,
        "Zip-lining at Shivapuri",
        "adventure",
        "adventure",
        "Kathmandu",
        27.8427,
        85.3645,
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        "Exciting zip-line adventure through forests with scenic views of the valley",
        "Daily",
        "$50-75",
        "3-4 hours"
    ));

    list.add(new Activity(
        5,
        "White Water Rafting - Bhote Kosi",
        "adventure",
        "adventure",
        "Bhote Kosi River",
        27.9500,
        85.9000,
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        "Thrilling rafting on grade III-IV rapids with stunning Himalayan backdrop",
        "September-May",
        "$100-150",
        "Full day"
    ));

    // Sightseeing/Places
    list.add(new Activity(
        6,
        "Monkey Temple (Swayambhunath)",
        "place",
        "sightseeing",
        "Kathmandu",
        27.7132,
        85.2816,
        "https://images.unsplash.com/photo-1548013146-72e2ca0a3024?w=800",
        "Ancient synagogue stupa atop a hill with panoramic city views and playful monkeys",
        "Daily 6am-6pm",
        "$10 entry",
        "2-3 hours"
    ));

    list.add(new Activity(
        7,
        "Chitwan National Park Safari",
        "place",
        "sightseeing",
        "Chitwan",
        27.5408,
        84.4000,
        "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
        "Jungle safari to spot Bengal tigers, rhinos, and diverse wildlife",
        "October-May",
        "$50-100",
        "Full day"
    ));

    list.add(new Activity(
        8,
        "Thamel Night Market",
        "place",
        "sightseeing",
        "Kathmandu - Thamel",
        27.7139,
        85.3087,
        "https://images.unsplash.com/photo-1555939594-58d7cb561518?w=800",
        "Vibrant night market with local crafts, souvenirs, and street food",
        "Daily 6pm-10pm",
        "Free to browse",
        "2-3 hours"
    ));

    list.add(new Activity(
        9,
        "Phewa Lake Boating",
        "place",
        "sightseeing",
        "Pokhara",
        28.2075,
        83.9862,
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "Scenic boating on beautiful Phewa Lake with views of Annapurna and Fish Tail",
        "Daily dawn-dusk",
        "$15-30",
        "2-3 hours"
    ));

    list.add(new Activity(
        10,
        "Nagarkot Sunrise Trek",
        "adventure",
        "sightseeing",
        "Nagarkot",
        27.6875,
        85.5294,
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        "Short trek to watch sunrise over the Himalayan range",
        "Daily",
        "Free",
        "3-4 hours"
    ));

    return list;
  }
}

