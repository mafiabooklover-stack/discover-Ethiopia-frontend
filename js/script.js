const API = "http://localhost:5001/api";

document.addEventListener("DOMContentLoaded", function () {
  // Render auth nav on every page
  const authNav = document.getElementById("authNav");
  if (authNav) renderAuthNav(authNav);

  // Load featured destinations on home page
  if (document.getElementById("featuredDestinations")) {
    loadFeaturedDestinations();
  }

  // Load all destinations on destinations page
  if (document.getElementById("allDestinations")) {
    loadAllDestinations();
  }

  // Handle contact form — opens the user's email app with fields pre-filled
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const replyTo = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMessage").value.trim();

      const to = "melatakalework@gmail.com";
      const subject = encodeURIComponent(
        `Message from ${name} via Discover Ethiopia`,
      );
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${replyTo}\n\n${message}`,
      );

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
});

// Load featured destinations (1 from each category) on home page
async function loadFeaturedDestinations() {
  const container = document.getElementById("featuredDestinations");
  if (!container) return;

  container.innerHTML = '<div class="loading">Loading destinations...</div>';

  try {
    const res = await fetch(`${API}/destinations/featured`);
    if (!res.ok) throw new Error("API error");
    const destinations = await res.json();

    container.innerHTML = "";
    destinations.forEach((dest) => {
      container.innerHTML += createDestinationCard(dest);
    });
  } catch (err) {
    // Fallback to static data if API is unavailable
    container.innerHTML = "";
    const featured = [
      staticDestinations.historical[0],
      staticDestinations.natural[0],
      staticDestinations.cultural[0],
    ];
    featured.forEach((dest) => {
      container.innerHTML += createDestinationCard(dest);
    });
  }
}

// Load ALL destinations organized by category on destinations page
async function loadAllDestinations() {
  const container = document.getElementById("allDestinations");
  if (!container) return;

  container.innerHTML =
    '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading amazing places...</div>';

  try {
    const res = await fetch(`${API}/destinations`);
    if (!res.ok) throw new Error("API error");
    const allDests = await res.json();

    container.innerHTML = "";

    const categories = [
      { key: "historical", label: "Historical Sites", icon: "fa-landmark" },
      { key: "natural", label: "Natural Wonders", icon: "fa-mountain" },
      { key: "cultural", label: "Cultural Experiences", icon: "fa-users" },
    ];

    categories.forEach((cat) => {
      const items = allDests.filter((d) => d.category === cat.key);
      if (!items.length) return;

      container.innerHTML += `
                <div class="category-title">
                    <i class="fas ${cat.icon}"></i> ${cat.label}
                    <span class="count">(${items.length} places)</span>
                </div>`;
      items.forEach((dest) => {
        container.innerHTML += createDestinationCard(dest);
      });
    });
  } catch (err) {
    // Fallback to static data
    container.innerHTML = "";
    container.innerHTML +=
      '<div class="category-title"><i class="fas fa-landmark"></i> Historical Sites <span class="count">(6 places)</span></div>';
    staticDestinations.historical.forEach((dest) => {
      container.innerHTML += createDestinationCard(dest);
    });
    container.innerHTML +=
      '<div class="category-title"><i class="fas fa-mountain"></i> Natural Wonders <span class="count">(6 places)</span></div>';
    staticDestinations.natural.forEach((dest) => {
      container.innerHTML += createDestinationCard(dest);
    });
    container.innerHTML +=
      '<div class="category-title"><i class="fas fa-users"></i> Cultural Experiences <span class="count">(6 places)</span></div>';
    staticDestinations.cultural.forEach((dest) => {
      container.innerHTML += createDestinationCard(dest);
    });
  }
}

// Create HTML for a destination card
function createDestinationCard(dest) {
  // Support both MongoDB _id and static fallback with name-based link
  const detailLink = dest._id
    ? `place.html?id=${dest._id}`
    : `place.html?name=${encodeURIComponent(dest.name)}`;

  return `
        <div class="destination-card" onclick="window.location='${detailLink}'" style="cursor:pointer;">
            <div class="card-image">
                <img src="${dest.image}" alt="${dest.name}" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${dest.name}</h3>
                <div class="destination-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${dest.region}</span><br>
                    <span><i class="fas fa-calendar-alt"></i> Best: ${dest.bestTime}</span>
                </div>
                <p>${dest.description}</p>
                <div class="importance">
                    <i class="fas fa-star"></i> ${dest.importance}
                </div>
                <a href="${detailLink}" class="btn btn-details" onclick="event.stopPropagation();">
                    <i class="fas fa-info-circle"></i> View Details
                </a>
            </div>
        </div>
    `;
}

// ===== Static fallback data (used if backend is offline) =====
const staticDestinations = {
  historical: [
    {
      name: "Lalibela",
      region: "Amhara Region",
      image: "assets/Lalibela.jpg.jpg",
      description:
        "Famous for its remarkable rock-hewn churches, often called the 'Eighth Wonder of the World'. These 11 medieval monolithic churches were carved out of rock in the 12th century.",
      bestTime: "October to March",
      importance: "UNESCO World Heritage Site",
    },
    {
      name: "Axum",
      region: "Tigray Region",
      image: "assets/Axum.jpg",
      description:
        "Ancient city with towering obelisks, ruins of the ancient Axumite Empire. Believed to house the Ark of the Covenant according to Ethiopian tradition.",
      bestTime: "October to March",
      importance: "Ancient civilization center",
    },
    {
      name: "Gondar",
      region: "Amhara Region",
      image: "assets/gondar.jpg",
      description:
        "Known as the 'Camelot of Africa' with its medieval castles and churches. The Royal Enclosure has several castles built by Ethiopian emperors.",
      bestTime: "October to March",
      importance: "Historical castles",
    },
    {
      name: "Harar Jugol",
      region: "Harari Region",
      image: "assets/harar.jpg",
      description:
        "Ancient walled city with 82 mosques and over 100 shrines. Known as the fourth holiest city of Islam with unique culture and hyena men.",
      bestTime: "November to February",
      importance: "UNESCO World Heritage Site",
    },
    {
      name: "Yeha Temple",
      region: "Tigray Region",
      image: "assets/damo.jpg",
      description:
        "The oldest standing structure in Ethiopia, dating back to the 5th century BC. This ancient temple shows the influence of South Arabian civilization.",
      bestTime: "October to March",
      importance: "Oldest structure in Ethiopia",
    },
    {
      name: "Debre Damo",
      region: "Tigray Region",
      image: "assets/yeha.jpg",
      description:
        "A 6th-century monastery located on a flat-topped mountain. Accessible only by climbing a 15-meter rope.",
      bestTime: "October to March",
      importance: "Ancient monastery",
    },
  ],
  natural: [
    {
      name: "Simien Mountains",
      region: "Northern Ethiopia",
      image: "assets/simen mountains.jpg.jpg",
      description:
        "UNESCO World Heritage site with dramatic landscapes, deep valleys, and unique wildlife including Gelada baboons and Walia ibex.",
      bestTime: "September to November",
      importance: "Spectacular hiking",
    },
    {
      name: "Danakil Depression",
      region: "Afar Region",
      image: "assets/depression.jpg",
      description:
        "One of the hottest and most alien landscapes on Earth with active volcanoes, colorful sulfur springs, and salt flats.",
      bestTime: "November to February",
      importance: "Unique geological features",
    },
    {
      name: "Blue Nile Falls",
      region: "Amhara Region",
      image: "assets/blue nile.jpg.jpg",
      description:
        "Spectacular waterfall on the Blue Nile river, known locally as 'Tis Abay' meaning 'smoking water'.",
      bestTime: "August to October",
      importance: "Majestic waterfalls",
    },
    {
      name: "Bale Mountains",
      region: "Oromia Region",
      image: "assets/bale.jpg",
      description:
        "Home to the rare Ethiopian wolf and many endemic birds. Features Africa's largest alpine habitat.",
      bestTime: "November to March",
      importance: "Unique wildlife",
    },
    {
      name: "Sof Omar Caves",
      region: "Oromia Region",
      image: "assets/sof omar cave.jpg",
      description:
        "The longest cave system in Ethiopia, stretching over 15 kilometers with unique rock formations.",
      bestTime: "October to March",
      importance: "Longest cave system",
    },
    {
      name: "Lake Tana",
      region: "Amhara Region",
      image: "assets/tana.jpg",
      description:
        "Ethiopia's largest lake and the source of the Blue Nile. Home to ancient island monasteries.",
      bestTime: "October to April",
      importance: "Source of Blue Nile",
    },
  ],
  cultural: [
    {
      name: "Omo Valley",
      region: "Southern Ethiopia",
      image: "assets/omo.jpg",
      description:
        "Home to diverse indigenous tribes with rich cultural traditions, unique ceremonies, and traditional ways of life.",
      bestTime: "June to September",
      importance: "Cultural diversity",
    },
    {
      name: "Timket Festival",
      region: "Throughout Ethiopia",
      image: "assets/timket.jpg",
      description:
        "Ethiopian Epiphany celebration with colorful processions, prayers, and ceremonies.",
      bestTime: "January 19th",
      importance: "Religious celebration",
    },
    {
      name: "Addis Merkato",
      region: "Addis Ababa",
      image: "assets/merkato.jpg",
      description:
        "One of Africa's largest open-air markets. Experience local trade, spices, traditional crafts.",
      bestTime: "Monday to Saturday",
      importance: "Largest market in Africa",
    },
    {
      name: "Ethiopian Coffee Ceremony",
      region: "Nationwide",
      image: "assets/coffee.jpg",
      description:
        "Experience the traditional coffee ceremony, an important part of Ethiopian culture.",
      bestTime: "Any time",
      importance: "Birthplace of coffee",
    },
    {
      name: "Meskel Festival",
      region: "Addis Ababa (celebrated nationwide)",
      image: "assets/meskel.jpg",
      description:
        "Annual religious festival celebrating the finding of the True Cross. Huge bonfires and colorful processions.",
      bestTime: "September 27th",
      importance: "UNESCO Intangible Cultural Heritage",
    },
    {
      name: "Irreecha Festival",
      region: "Oromia Region",
      image: "assets/irreecha.jpg",
      description:
        "Oromo thanksgiving festival celebrating the end of the rainy season.",
      bestTime: "September/October",
      importance: "Oromo cultural celebration",
    },
  ],
};
