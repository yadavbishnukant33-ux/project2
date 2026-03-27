package com.gantavya.seed;

import com.gantavya.domain.CatalogDtos;
import com.gantavya.domain.CatalogDtos.Guide;
import com.gantavya.domain.CatalogDtos.GuideAvailabilityDay;
import com.gantavya.domain.CatalogDtos.GuideReview;
import com.gantavya.domain.CatalogDtos.Trek;
import com.gantavya.domain.CatalogDtos.TrekCheckpoint;
import com.gantavya.domain.CatalogDtos.TrekItineraryItem;

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
        )
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
        List.of()
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
        List.of()
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
        List.of()
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
        List.of()
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
        List.of()
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
        true,
        true,
        false,
        List.of(new GuideAvailabilityDay(1, true)),
        List.of()
    ));

    return list;
  }
}

