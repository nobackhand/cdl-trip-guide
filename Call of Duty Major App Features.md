# **Strategic Deployment Protocol: OpTic Major I Companion Application**

## **Comprehensive Functional Specification, Technical Architecture, and Content Strategy**

### **Executive Overview and Strategic Mandate**

The rapid digitization of the live event experience has shifted fan expectations from passive consumption to active, digitally augmented participation. For the Call of Duty League (CDL) Major I, hosted by OpTic Texas at Moody Coliseum in Dallas, the requirement to deploy a companion application within a condensed "one-night" development window presents a unique engineering and user experience challenge. This report outlines a high-precision strategy to convert a personal itinerary project into a public-facing "Digital Sherpa" for thousands of attendees. The objective is not merely to provide information but to mitigate the specific frictions associated with large-scale esports events—connectivity congestion, logistical confusion, and time-sensitive decision-making.  
The analysis that follows is structured to serve as both a technical blueprint and a content repository. It synthesizes real-time data regarding the 2026 CDL season, the specific operational constraints of Southern Methodist University (SMU) venues, and the cultural nuances of the OpTic "GreenWall" fanbase.1 By strictly adhering to a "static-first" architecture, the proposed solution prioritizes reliability over complexity, ensuring that the application remains functional even under the strain of thousands of simultaneous users on congested cellular networks.

### **1\. Situational Analysis: The "GreenWall" Convergence**

#### **1.1 The Operational Environment: Moody Coliseum**

The choice of Moody Coliseum as the venue for Major 1 introduces distinct variables compared to traditional esports arenas. Located in University Park on the SMU campus, the venue operates under collegiate regulations that differ from the municipal convention centers often used for CDL events.2  
The venue's location in University Park, distinct from downtown Dallas, dictates a specific logistical flow. Attendees cannot rely on the dense, walkable grid of a downtown metropolis; instead, they must navigate a campus environment with specific parking zones, strict "dry campus" exterior policies, and rigorous security checkpoints.4 The application must therefore bridge the gap between the "esports bubble" inside the arena and the surrounding academic and residential geography.

#### **1.2 User Persona Archetypes**

To design an effective utility in a single night, one must ruthlessly prioritize features based on specific user needs. The analysis identifies three primary user archetypes attending Major 1:

* **The "GreenWall" Ultra:** This user is hyper-focused on OpTic Texas. They require real-time updates on match delays, precise bracket permutations, and knowledge of where the "procession" or fan meet-ups are occurring. Their primary anxiety is missing a moment of the action.  
* **The Social Traveler:** Often visiting Dallas for the first time, this user treats the Major as a vacation. They are the primary consumers of the "Afters" (nightlife) guides and dining recommendations. They are vulnerable to logistical errors, such as underestimating Uber wait times or misinterpreting the "Clear Bag Policy".4  
* **The Competitor/VIP:** Players, staff, and VIP ticket holders who need quick access to entrance maps, re-entry policy clarifications, and high-end dining options like Nick & Sam’s or Uchi.6

#### **1.3 The "One-Night" Constraint: Technical Philosophy**

The constraint of a single night for development necessitates a departure from traditional full-stack engineering. Attempting to build a dynamic backend with user authentication, databases, and live API polling is a recipe for failure within this timeframe. The strategy must rely on **Static Site Generation (SSG)**.  
The core philosophy is **"Hardcoded Reliability."**

* **Zero Latency:** The site must load instantly.  
* **Deep Linking:** Do not build maps; link to Google Maps. Do not build ride-hailing widgets; link to Uber.  
* **Offline Capability:** The site should function as a Progressive Web App (PWA), caching critical schedules and maps for access when venue Wi-Fi fails.

### **2\. Technical Architecture for Rapid Deployment**

#### **2.1 The "Static-First" Stack**

To meet the requirement of a robust, high-traffic application built in hours, the recommended stack is **Next.js** deployed on **Vercel**.

* **Framework:** Next.js (React) allows for component-based architecture. You can build a single "Match Card" component and reuse it for the entire bracket.  
* **Data Storage:** Instead of a database (SQL/NoSQL), use a local data.json file. This file will contain the schedule, restaurant coordinates, and FAQ text. This eliminates database connection latency and removes the risk of API rate limits.  
* **Styling:** **Tailwind CSS** provides utility-first styling, enabling rapid UI development without writing custom CSS files. This is critical for maintaining the "OpTic Green" aesthetic without spending hours on design systems.

#### **2.2 Progressive Web App (PWA) Implementation**

Cellular saturation at esports events is a documented phenomenon. To ensure the app remains useful when 5,000 fans are simultaneously trying to tweet, the app must be installable.  
**Implementation Strategy:**

1. Include a manifest.json file defining the app name ("OpTic Major 1"), icons, and theme color (\#93C90E).  
2. Register a Service Worker to cache the index.html and schedule routes.  
3. This allows users to "Add to Home Screen," removing the browser chrome and giving the feel of a native app without the App Store approval process.

#### **2.3 The "Deep Link" Ecosystem**

The application should function as a launchpad for other native utilities on the user's device. This "Deep Link" strategy reduces development time by offloading complex functionality to established apps.

* **Uber Universal Links:** Facilitate transport.  
* **Google Maps URLs:** Facilitate navigation.  
* **Calendar Exports (.ics):** Facilitate scheduling.

### **3\. Feature Set 1: The Intelligent Schedule & Bracket**

The core utility of the application is the tournament schedule. However, a simple list of times is insufficient. The schedule must be "intelligent," highlighting the narrative stakes and providing context for the matches.

#### **3.1 Hardcoded Schedule Data (Thursday, Jan 29\)**

The application must present the Thursday "Winners Bracket Quarterfinals" with extreme clarity. Based on the current bracket intel, the following matches must be hardcoded into the landing page 1:

| Time (CST) | Matchup | Context & Narrative |
| :---- | :---- | :---- |
| **10:30 AM** | **Paris Gentle Mates vs. Toronto KOI** | **The European Invasion.** Paris enters as the \#1 seed (5-2 record). Toronto KOI (3-4) looks to upset the favorites early. |
| **12:00 PM** | **Carolina Royal Ravens vs. LA Thieves** | **The Grudge Match.** LA Thieves, fielding their new "God Squad" of HyDra, Scrap, Kenny, and aBeZy, face a surging Carolina team. |
| **01:30 PM** | **Riyadh Falcons vs. OpTic Texas** | **The Main Event.** The hosts and defending champs (OpTic) vs. the new powerhouse (Falcons). Moody Coliseum will be deafening. |
| **03:00 PM** | **Vegas FaZe vs. G2 Minnesota** | **The Dynasty Returns.** FaZe Vegas (formerly Atlanta) brings the terror trio of Simp, Cellium, and Abezy against the rebranded G2 roster. |

*Insight for App:* Highlight the 1:30 PM match in Green. This is the "Anchor Match" that will drive attendance.

#### **3.2 The Double-Elimination Visualizer**

Friday (Jan 30\) introduces the Elimination Bracket. The app must clearly distinguish between "Winners Bracket" (Upper) and "Losers Bracket" (Lower) matches. The risk of confusion is high for casual fans.  
**Design Recommendation:**

* Use a "Life Bar" visual indicator. Upper bracket teams have "2 Lives" (Green Icon). Lower bracket matches should be marked with a "Sudden Death" or "Elimination Risk" warning icon (Red Skull).  
* **Friday Schedule:**  
  * 10:30 AM: Vancouver Surge vs. TBD.1  
  * 12:00 PM: Miami Heretics vs. TBD.8  
  * 01:30 PM: Cloud9 New York vs. TBD.8  
  * 03:00 PM: Boston Breach vs. TBD.8

#### **3.3 Roster Integration**

The 2026 season has seen massive roster turnover. The app serves as a "Cheat Sheet" for fans who haven't kept up with the off-season changes.3  
**Key Roster Data to Include:**

* **OpTic Texas:** Shotzzy, Dashy, Mercules (New Signing), Pred. *Note: Confirm final 4th spot via social feeds, but Mercules is the key narrative addition.*  
* **LA Thieves:** The aggregation of superstars HyDra (formerly NYSL) and Scrap (formerly Toronto) alongside Kenny and aBeZy makes them the team to beat.10  
* **FaZe Vegas:** The core remains, but the relocation to Vegas introduces a new branding element.11

### **4\. Feature Set 2: Logistics & Venue Operations**

Operational friction is the primary detractor from event enjoyment. The application must proactively solve the "Pain Points" of entry and existence within Moody Coliseum.

#### **4.1 The "Clear Bag" Policy Visualizer**

Security at collegiate venues is notoriously strict. The "Clear Bag Policy" is the number one cause of line delays.4  
**Feature Description:**  
A dedicated "Security Check" page featuring a visual Go/No-Go grid.

* **Green Check:** Clear Plastic/Vinyl Tote (Max 12" x 6" x 12").  
* **Green Check:** 1-Gallon Ziploc Freezer Bag.  
* **Green Check:** Small Clutch Purse (Max 4.5" x 6.5" \- roughly the size of a hand).  
* **Red X:** Backpacks (Mesh or Solid), Camera Bags, Binocular Cases, Printed Pattern Totes.

**Insight:** Include a specific warning: *"Mesh backpacks are often rejected. Do not risk it. If you have a backpack, leave it in the car or hotel. There is NO coat check for rejected bags."*

#### **4.2 Re-Entry Protocols**

The research indicates strict policies often apply to Moody Coliseum events.12

* **Policy:** **NO RE-ENTRY.** Once a ticket is scanned, the attendee cannot leave to smoke or go to their car and return.  
* **App Alert:** This information must be prominent on the "Venue" page. It influences decisions about bringing jackets (for the potential ice storm) and eating meals before entering.

#### **4.3 Cashless Environment**

Most venues, including SMU facilities, have transitioned to cashless operations.

* **Advisory:** "Moody Coliseum is a Cashless Venue. Apple Pay, Google Pay, and Credit Cards only for concessions and merchandise."

#### **4.4 Merch & Pop-Up Strategy**

Activations are a major draw. The app should list known locations for team pop-ups.

* **OpTic Texas:** Inside the venue (Concourse Level).  
* **100 Thieves:** Often hosts off-site pop-ups. The app should link to the 100 Thieves Twitter account for "Drop Location" announcements, as these are often revealed 24 hours prior.14  
* **FaZe Clan:** Check for "The Armory" or similar pop-up style events.15

### **5\. Feature Set 3: Geospatial Intelligence (Dining & Nightlife)**

The original request highlighted the need for finding bars and food. University Park (SMU) is distinct from the nightlife hub of Deep Ellum. The app must curate these options based on "Mission Profiles" (e.g., "Quick Lunch" vs. "Team Dinner").

#### **5.1 The "Fuel" Guide (Dining)**

The following establishments are verified local staples near the venue.6

| Name | Type | Distance from Venue | Mission Profile |
| :---- | :---- | :---- | :---- |
| **Torchy's Tacos** (SMU Blvd) | Tex-Mex | Walking (5 mins) | **The Essential.** Breakfast tacos all day. High volume, fan favorite. |
| **Kuby's Sausage House** | German/Deli | Walking (Snider Plaza) | **The Hidden Gem.** Hearty lunch. Great for escaping the crowd. |
| **Goff's Hamburgers** | Burgers | Walking (Hillcrest) | **Fast Fuel.** Charcoal-grilled burgers. Quick service. |
| **Campisi's (Egyptian Lounge)** | Italian | Uber (Short) | **The Institution.** Pizza and pasta. Good for sit-down team dinners. |
| **Whataburger** | Fast Food | Uber/Drive | **The Late Night.** 24/7. Honey Butter Chicken Biscuit (11pm-11am). |

#### **5.2 The "Afters" Guide (Nightlife)**

Esports nightlife in Dallas centers around two hubs: Deep Ellum (Alternative/Party) and Uptown (Social/Sports).  
**Deep Ellum (The Hub):**

* **Adair's Saloon:** A dive bar legend. Graffiti on the walls, cheap beer, live country music. A perfect low-key spot for gamers to unwind.18  
* **Vidorra:** Large rooftop patio, Mexican food, large format cocktails. Ideal for large groups.19  
* **Serious Pizza:** Open very late. Massive slices. The standard "end of night" stop.

**Uptown/Victory Park:**

* **Katy Trail Ice House:** A massive beer garden. If the weather holds (heaters available), this is the premier social spot in Dallas.20  
* **Hero:** Located near the American Airlines Center. Massive screens, arcade games, sports bar vibe. Very gamer-friendly.21

**Insight:** The app should explicitly differentiate these vibes. *"Go to Deep Ellum for the party. Go to Katy Trail for the conversation."*

#### **5.3 Hotel Proximity**

* **The Highland Dallas:** Located directly across US-75 from SMU. This is likely the "Player Hotel" or where high-tier VIPs stay.22  
* **The Beeman Hotel:** A boutique hotel also within walking distance.  
* **App Utility:** Include a "Walking Directions" link for these specific hotels, as the pedestrian bridges over US-75 can be confusing to find.

### **6\. Feature Set 4: Transportation & Weather Contingency**

The weather forecast for late January in Dallas indicates a significant risk of "Winter Weather" or Ice Storms.23 Dallas infrastructure is highly sensitive to ice; even minor freezing rain can shut down overpasses and surge Uber prices.

#### **6.1 The "Ice Protocol"**

The app must have a contingency section titled **"Ice Storm Protocol."**

* **Warning:** "Dallas roads may ice over Thursday/Friday. Uber availability may drop to zero."  
* **Solution:** **DART Rail (Dallas Area Rapid Transit).**  
  * **Station:** Mockingbird Station (Red/Orange/Blue Lines).  
  * **Proximity:** Mockingbird Station is the primary transit hub for SMU. It is walkable to the venue (approx. 1 mile/20 mins) or serviced by the "Mustang Express" shuttles (768/743).23  
  * **Advice:** "If staying Downtown, take the Red/Orange line North to Mockingbird Station to avoid highway traffic."

#### **6.2 Uber Deep Linking Technical Specification**

To solve the transport friction, the app should use Uber's **Universal Link** format. This ensures that when a user clicks the button, it opens the native Uber app (if installed) or the mobile web experience, with the destination pre-filled to minimize user error.25  
**Constructed Deep Link for Major 1:**  
https://m.uber.com/ul/?action=setPickup\&dropoff\[latitude\]=32.842778\&dropoff\[longitude\]=-96.7825\&dropoff\[nickname\]=Moody%20Coliseum%20(West%20Entrance)

* **Logic:**  
  * action=setPickup: Initiates the ride flow.  
  * dropoff\[latitude/longitude\]: Hardcodes the coordinates for Moody Coliseum (32.842778, \-96.7825).  
  * dropoff\[nickname\]: "Moody Coliseum (West Entrance)" \- Ensures the driver sees the correct entrance name.

### **7\. Feature Set 5: Safety & Emergency Intelligence**

Providing "Duty of Care" information builds trust with the user base.

#### **7.1 Emergency Contacts**

* **Dallas Police (Non-Emergency):** 214-744-4444.27 Use for lost property or non-violent reporting.  
* **SMU Police:** 214-768-3333. Primary contact for any incident *on campus* or within the venue perimeter.  
* **Venue Lost & Found:** Located at the Guest Services booth near the main West entrance.28

#### **7.2 Medical Resources**

* **Nearest Hospital:** Texas Health Presbyterian Hospital Dallas (located just north on Walnut Hill Ln).  
* **First Aid:** Locate the First Aid station on the concourse map (typically Section 105/106 area in collegiate arenas).

### **8\. Implementation Strategy: The "One-Night" Build**

#### **8.1 Deployment Pipeline**

1. **Repository:** Create a GitHub repository.  
2. **Scaffold:** Run npx create-next-app@latest optic-major-guide.  
3. **Data Injection:** Create a data folder. Create schedule.json, places.json, and faq.json. Paste the content provided in this report into those files.  
4. **Component Build:** Create MatchCard.js, PlaceCard.js, and BagCheck.js.  
5. **Deploy:** Link the GitHub repo to Vercel. It will auto-deploy.

#### **8.2 Marketing the Utility**

How do you get users to a website built in one night?

* **QR Codes:** Generate a QR code for the Vercel URL. Print 50 copies. Tape them (with permission) near the line-up area or hand them out as "Unofficial Survival Guides."  
* **Reddit Distribution:** Post the link to r/CoDCompetitive and r/OpTicGaming with the title "I made a survival guide for Major 1 so you don't have to." This community is highly receptive to community-built tools.7  
* **Hashtag Strategy:** Tweet the link using \#OpTicMajor1, \#CDL2026, and \#GreenWall to tap into the active conversation streams.30

### **9\. Conclusion**

The "OpTic Major 1 Companion" is not merely a schedule; it is a piece of community infrastructure. By addressing the specific anxieties of the traveling fan—weather contingencies, bag policies, and transport reliability—this application transforms from a "side project" into an essential asset for the GreenWall. The "Static-First" architecture ensures it survives the cellular congestion of the event, while the curated content provides the local knowledge of a resident.  
The following sections provide the granular data tables and specific code structures required to populate the application immediately.

### **Appendices: Ready-to-Deploy Data Assets**

#### **Appendix A: Restaurant Data Structure (JSON)**

JSON

#### **Appendix B: Uber Deep Link Component (React/Next.js)**

JavaScript

const UberButton \= () \=\> (  
  \<a  
    href="https://m.uber.com/ul/?action=setPickup\&dropoff\[nickname\]=Moody%20Coliseum\&dropoff\[latitude\]=32.842778\&dropoff\[longitude\]=-96.7825"  
    className="bg-black text-\[\#93C90E\] font-bold py-4 px-8 rounded-full border-2 border-\[\#93C90E\] hover:bg-\[\#93C90E\] hover:text-black transition-all w-full text-center block"  
  \>  
    RIDE TO VENUE  
  \</a\>  
);

#### **Appendix C: Bag Policy Check Logic**

* **User Input:** "I have a Jansport Backpack." \-\> **Output:** "REJECTED. Leave it."  
* **User Input:** "I have a clear tote bag." \-\> **Output:** "APPROVED. Proceed."  
* **User Input:** "I have a small Gucci clutch." \-\> **Output:** "APPROVED (If under 4.5x6.5 inches)."

**End of Strategic Report.**

#### **Works cited**

1. Call of Duty League 2026: Stage 1 Major \- Liquipedia, accessed January 28, 2026, [https://liquipedia.net/callofduty/Call\_of\_Duty\_League/Season\_7/Stage\_1/Major](https://liquipedia.net/callofduty/Call_of_Duty_League/Season_7/Stage_1/Major)  
2. Call of Duty League OpTic Texas Major I | Dallas Sports Commission, accessed January 28, 2026, [https://www.dallassports.org/events/call-of-duty-league-optic-texas-major-i/](https://www.dallassports.org/events/call-of-duty-league-optic-texas-major-i/)  
3. 2026 Season Announcement \- Article Detail Meta Data | Call of Duty League, accessed January 28, 2026, [https://callofdutyleague.com/en-us/news/2026-season-announcement](https://callofdutyleague.com/en-us/news/2026-season-announcement)  
4. SMU Athletics Bag Policy, accessed January 28, 2026, [https://smumustangs.com/sports/2024/10/31/smu-athletics-bag-policy.aspx](https://smumustangs.com/sports/2024/10/31/smu-athletics-bag-policy.aspx)  
5. Permitted and Prohibited Items \- SMU, accessed January 28, 2026, [https://www.smu.edu/businessfinance/campusservices/moody-and-miller-event-center/permittied-and-prohibited-items](https://www.smu.edu/businessfinance/campusservices/moody-and-miller-event-center/permittied-and-prohibited-items)  
6. Best place for dinner near AAC? : r/DallasStars \- Reddit, accessed January 28, 2026, [https://www.reddit.com/r/DallasStars/comments/1qh9f1o/best\_place\_for\_dinner\_near\_aac/](https://www.reddit.com/r/DallasStars/comments/1qh9f1o/best_place_for_dinner_near_aac/)  
7. Call of Duty League 2026 \- Major 1, accessed January 28, 2026, [https://cod-esports.fandom.com/wiki/Call\_of\_Duty\_League/2026\_Season/Major\_1](https://cod-esports.fandom.com/wiki/Call_of_Duty_League/2026_Season/Major_1)  
8. Schedule \- Call of Duty League, accessed January 28, 2026, [https://callofdutyleague.com/en-us/schedule](https://callofdutyleague.com/en-us/schedule)  
9. Call of Duty League 2026 Major I bracket set \- Esports News UK, accessed January 28, 2026, [https://esports-news.co.uk/2026/01/28/call-of-duty-league-2026-major-i-bracket-set/](https://esports-news.co.uk/2026/01/28/call-of-duty-league-2026-major-i-bracket-set/)  
10. LA Thieves 2026 Roster, accessed January 28, 2026, [https://100thieves.com/blogs/news/la-thieves-2026-roster](https://100thieves.com/blogs/news/la-thieves-2026-roster)  
11. CDL Major 1 Preview: What to Expect From Every Team | Monster Energy Gaming, accessed January 28, 2026, [https://www.monsterenergy.com/en-us/gaming/first-blood-cdl-major-1-preview/](https://www.monsterenergy.com/en-us/gaming/first-blood-cdl-major-1-preview/)  
12. contents \- Cloudfront.net, accessed January 28, 2026, [http://d9hjv462jiw15.cloudfront.net/media/212273\_2017-2018-smu-mbb-club-services-and-policy-guide.pdf?1509735398](http://d9hjv462jiw15.cloudfront.net/media/212273_2017-2018-smu-mbb-club-services-and-policy-guide.pdf?1509735398)  
13. Stadium Policies \- Gerald J. Ford Stadium \- SMU Athletics, accessed January 28, 2026, [https://smumustangs.com/sports/2018/8/29/stadium-policies-gerald-j-ford-stadium.aspx](https://smumustangs.com/sports/2018/8/29/stadium-policies-gerald-j-ford-stadium.aspx)  
14. Event Calendar \- 100 Thieves, accessed January 28, 2026, [https://100thieves.com/pages/event-calendar](https://100thieves.com/pages/event-calendar)  
15. FaZe Clan Pop Up, accessed January 28, 2026, [https://shop.fazeclan.com/pages/pop-up](https://shop.fazeclan.com/pages/pop-up)  
16. Good restaurants in the University Park area? \- Dallas \- Reddit, accessed January 28, 2026, [https://www.reddit.com/r/Dallas/comments/1dq1l3/good\_restaurants\_in\_the\_university\_park\_area/](https://www.reddit.com/r/Dallas/comments/1dq1l3/good_restaurants_in_the_university_park_area/)  
17. Hotels and Dining \- Dallas \- SMU, accessed January 28, 2026, [https://www.smu.edu/businessfinance/campusservices/moody-and-miller-event-center/hotels-and-dining](https://www.smu.edu/businessfinance/campusservices/moody-and-miller-event-center/hotels-and-dining)  
18. DIve bars / Happy hour spots in Downtown or Deep Ellum? : r/askdfw \- Reddit, accessed January 28, 2026, [https://www.reddit.com/r/askdfw/comments/1ob58b2/dive\_bars\_happy\_hour\_spots\_in\_downtown\_or\_deep/](https://www.reddit.com/r/askdfw/comments/1ob58b2/dive_bars_happy_hour_spots_in_downtown_or_deep/)  
19. Exploring the Best Bars in Deep Ellum, Dallas: A Nightlife Adventure \- Oreate AI Blog, accessed January 28, 2026, [https://www.oreateai.com/blog/exploring-the-best-bars-in-deep-ellum-dallas-a-nightlife-adventure/b919cc811dd076a122c65389cc4e7f10](https://www.oreateai.com/blog/exploring-the-best-bars-in-deep-ellum-dallas-a-nightlife-adventure/b919cc811dd076a122c65389cc4e7f10)  
20. Best Sports Bars to Watch the Cowboys, Mavs and Stars \- Dallas Observer, accessed January 28, 2026, [https://www.dallasobserver.com/food-drink/15-best-sports-bars-dallas-13208549/](https://www.dallasobserver.com/food-drink/15-best-sports-bars-dallas-13208549/)  
21. 28 Bars with Indoor Games in DFW \- Dallasites 101, accessed January 28, 2026, [https://www.dallasites101.com/blog/post/bars-arcade-board-games/](https://www.dallasites101.com/blog/post/bars-arcade-board-games/)  
22. Pre-theatre Dining near Moody Coliseum, Dallas, TX, accessed January 28, 2026, [https://www.dallas-theater.com/venues/moody-coliseum/dining](https://www.dallas-theater.com/venues/moody-coliseum/dining)  
23. Dallas ISD monitoring January 2026 winter weather, accessed January 28, 2026, [https://thehub.dallasisd.org/2026/01/25/dallas-isd-monitoring-january-2026-winter-weather/](https://thehub.dallasisd.org/2026/01/25/dallas-isd-monitoring-january-2026-winter-weather/)  
24. Dallas, TX Monthly Weather | AccuWeather, accessed January 28, 2026, [https://www.accuweather.com/en/us/dallas/75202/january-weather/351194](https://www.accuweather.com/en/us/dallas/75202/january-weather/351194)  
25. Ride Request Deep Links \- Uber Developers, accessed January 28, 2026, [https://developer.uber.com/docs/deep-linking](https://developer.uber.com/docs/deep-linking)  
26. Integrate Uber in your app \- Solutions \- AppMachine, accessed January 28, 2026, [https://support.appmachine.com/support/solutions/articles/80000978137-integrate-uber-in-your-app](https://support.appmachine.com/support/solutions/articles/80000978137-integrate-uber-in-your-app)  
27. Helpful Numbers \- Dallas Police Department, accessed January 28, 2026, [https://www.dallaspolice.net/abouts/helpfulnumbers](https://www.dallaspolice.net/abouts/helpfulnumbers)  
28. Stadium Policies \- Moody Coliseum \- SMU Athletics, accessed January 28, 2026, [https://smumustangs.com/sports/2018/11/8/stadium-policies-moody-coliseum](https://smumustangs.com/sports/2018/11/8/stadium-policies-moody-coliseum)  
29. Major 1 OpTic : r/CoDCompetitive \- Reddit, accessed January 28, 2026, [https://www.reddit.com/r/CoDCompetitive/comments/1ql33re/major\_1\_optic/](https://www.reddit.com/r/CoDCompetitive/comments/1ql33re/major_1_optic/)  
30. Call of Duty League Major I Qualifiers | Day 1 \- YouTube, accessed January 28, 2026, [https://www.youtube.com/watch?v=iiNT7O7wCXg](https://www.youtube.com/watch?v=iiNT7O7wCXg)