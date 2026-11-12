// Pahadi Trails - beginner-friendly JavaScript interactions

const trekInfo = {
  chandrashila: {name:'Chopta – Tungnath – Chandrashila', intro:'A popular Garhwal route combining a forest-and-meadow approach, the Tungnath temple and a steep final climb to Chandrashila.', route:'Reach Rishikesh or Haridwar first. From there, shared jeeps or taxis commonly travel towards Ukhimath/Chopta; confirm the current roadhead and local transport before departure.', walk:'The Chopta–Tungnath section is roughly 3–4 km one way; Chandrashila adds around 1–1.5 km uphill. Total distance varies with the exact start point and snow conditions.', season:'Spring and autumn are often preferred. Winter can bring deep snow, icy sections and route changes; go only with suitable gear and current local guidance.', tips:['Start early and allow daylight for the return.','Carry grippy footwear, warm layers, water and snacks.','Snow can cover trail markers; do not continue if visibility or conditions deteriorate.'], warning:'The summit is high and exposed. Distances and access can change; check with local authorities and guides before setting out.'},
  kedarkantha: {name:'Kedarkantha', intro:'A well-known summit trek in the Govind Pashu Vihar region, usually approached from Sankri through forest and campsite stages.', route:'Reach Dehradun by train or bus, then travel by road towards Sankri via the Uttarkashi/Purola side. The road journey is long; arrange a reliable local transfer and keep buffer time.', walk:'Many itineraries take about 5–6 days with roughly 20 km of trekking overall. The exact route and camp sequence depend on the operator and conditions.', season:'Winter is popular for snow, but it is colder and more demanding. Spring and early summer can offer clearer trails; check snow, forest and local access advisories.', tips:['Use a registered, experienced local operator if you are new to snow trekking.','Carry insulated layers, gloves, a headlamp and waterproof protection.','Keep a buffer day for road delays and changing weather.'], warning:'Snow and ice can make a moderate trek difficult. Do not attempt a summit push without appropriate equipment and guidance.'},
  kedarnath: {name:'Kedarnath Yatra', intro:'A pilgrimage to the Kedarnath shrine in the high Himalaya. The usual route is by road to Gaurikund followed by a steep uphill trek.', route:'Travel by road from Rishikesh/Haridwar towards Sonprayag. Local arrangements and shuttle/permit procedures may apply between Sonprayag and Gaurikund. Confirm current official instructions.', walk:'The commonly described walking route is about 16–18 km one way from Gaurikund, depending on the current route and measurement. Ponies, palkis and helicopter services may operate under official rules.', season:'The temple is seasonal. Opening and closing dates, registration, route timings and services are announced by authorities; never rely on old dates.', tips:['Complete mandatory registration through the official Tourist Care portal when required.','Carry valid ID, warm clothing, rain protection, water and personal medicines.','Start early, pace yourself and follow the administration’s route and timing instructions.'], warning:'This is a high-altitude pilgrimage, not a casual walk. Check official registration, health advisories, weather and route status before travel.'},
  madhyamaheshwar: {name:'Madhyamaheshwar', intro:'A quieter Panch Kedar pilgrimage reached on foot from the roadhead at Ransi through remote villages and forested mountain paths.', route:'Reach Rishikesh/Haridwar, travel towards Ukhimath and continue to Ransi by local road transport. Public transport can be limited, so confirm return options before starting.', walk:'The trek is commonly around 16–18 km one way from Ransi, with steep sections and village stops. Many travellers allow 2 days each way or plan a 3–4 day trek with an overnight stay.', season:'The main temple season is seasonal and follows official opening/closing announcements. May–June and September–October are commonly considered, subject to weather and temple dates.', tips:['Carry enough cash; facilities and network can be limited.','Stay overnight en route rather than rushing the ascent.','Budha Madhmaheshwar is a separate steep climb; assess conditions and energy first.'], warning:'Remote terrain and limited services mean you should plan accommodation, food and return transport in advance.'},
  auli: {name:'Auli – Gorson Bugyal', intro:'A gentler meadow walk from the Auli area towards Gorson Bugyal, with broad Himalayan views on clear days.', route:'Reach Joshimath by road from Rishikesh/Haridwar via Rudraprayag and Chamoli. From Joshimath, continue to Auli by road or the operating ropeway, subject to schedules.', walk:'The Gorson Bugyal walk is often described as around 3 km one way from Auli, but the route and distance vary with the starting point and seasonal access.', season:'Spring and summer are good for meadow walks; winter brings snow and may require specialised footwear or local guidance.', tips:['Carry sun protection even in cool weather.','Check ropeway/road operations before relying on them.','Avoid walking into fog or snow without local advice.'], warning:'A relatively short route can still be slippery, cold or exposed in poor weather.'},
  flowers: {name:'Valley of Flowers', intro:'A protected alpine valley in Nanda Devi Biosphere Reserve, famous for seasonal wildflowers and reached from Ghangaria.', route:'Reach Govindghat via Joshimath. From Govindghat, travel to Pulna as permitted and trek to Ghangaria, the usual base for the valley and Hemkund Sahib.', walk:'Govindghat to Ghangaria is a substantial uphill walk; the valley visit is a separate out-and-back walk. Allow multiple days and verify current route arrangements.', season:'The valley is generally visited during the monsoon flowering season, but heavy rain, landslides and trail closures are real risks. Confirm park opening dates and permits.', tips:['Check national park entry rules, fees and opening dates.','Carry rain protection, trekking poles and dry spare layers.','Stay on marked paths; picking flowers or disturbing wildlife is not appropriate.'], warning:'Monsoon conditions can change quickly. Never enter a closed trail or cross swollen streams.'}
};

// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  menuToggle.textContent = isOpen ? '×' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

// Search and difficulty filters
const trekSearch = document.getElementById('trekSearch');
const difficultyFilter = document.getElementById('difficultyFilter');
const trekCards = [...document.querySelectorAll('.trek-card')];
function filterTreks() {
  const term = trekSearch.value.toLowerCase().trim();
  const difficulty = difficultyFilter.value;
  let visible = 0;
  trekCards.forEach(card => {
    const matchesText = card.dataset.name.includes(term) || card.innerText.toLowerCase().includes(term);
    const matchesDifficulty = difficulty === 'all' || card.dataset.difficulty === difficulty;
    card.hidden = !(matchesText && matchesDifficulty);
    if (!card.hidden) visible++;
  });
  document.getElementById('noResults').hidden = visible !== 0;
}
trekSearch.addEventListener('input', filterTreks);
difficultyFilter.addEventListener('change', filterTreks);

// Destination details dialog
const dialog = document.getElementById('detailsDialog');
const dialogContent = document.getElementById('dialogContent');
document.querySelectorAll('.details-button').forEach(button => {
  button.addEventListener('click', () => {
    const trek = trekInfo[button.dataset.trek];
    dialogContent.innerHTML = `
      <div class="dialog-content">
        <p class="section-kicker">FIELD GUIDE / UTTARAKHAND</p>
        <h2>${trek.name}</h2>
        <p>${trek.intro}</p>
        <h3>How to reach</h3><p>${trek.route}</p>
        <h3>Trail distance & time</h3><p>${trek.walk}</p>
        <h3>When to go</h3><p>${trek.season}</p>
        <h3>Before you leave</h3><ul>${trek.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>
        <div class="dialog-warning"><strong>Important:</strong> ${trek.warning}</div>
      </div>`;
    dialog.showModal();
  });
});
document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

// Simple trip planner: creates a practical checklist, not a live forecast
const plannerData = {
  chandrashila: ['Reach Rishikesh/Haridwar and arrange onward transport to Chopta.','Keep 1–2 flexible days for the drive, trek and weather.','Check snow/ice conditions on the Tungnath–Chandrashila section.'],
  kedarkantha: ['Reach Dehradun, then arrange road transport to Sankri.','Allow around 5–6 days for a typical trek itinerary.','Confirm operator, forest permissions, snow gear and road status.'],
  kedarnath: ['Reach Sonprayag via Rishikesh/Haridwar and confirm local shuttle arrangements.','Complete official yatra registration and check current route timings.','Keep extra time for the uphill walk, rest and possible weather delays.'],
  madhyamaheshwar: ['Reach Ransi via Ukhimath and confirm local transport.','Plan overnight stops and food/water along the village trail.','Keep a spare day because services and weather can be unpredictable.'],
  auli: ['Reach Joshimath and check road/ropeway operating status.','Plan a day for the Gorson Bugyal walk and a weather buffer.','Carry layers, water and sun protection.'],
  flowers: ['Reach Govindghat via Joshimath and check park opening/entry rules.','Plan the Ghangaria approach and a separate valley visit day.','Check monsoon forecasts, trail closures and rain protection.']
};
document.getElementById('makePlan').addEventListener('click', () => {
  const key = document.getElementById('plannerTrek').value;
  const season = document.getElementById('travelMonth').selectedOptions[0].text;
  const first = document.getElementById('firstTrek').checked;
  const result = document.getElementById('plannerResult');
  const extra = first ? '<li>As a first-timer, avoid solo trekking; choose a reputable local guide/operator and a conservative pace.</li>' : '<li>Review the route profile and make sure the distance matches your current fitness.</li>';
  result.innerHTML = `<span class="result-icon">✳</span><p class="section-kicker">YOUR STARTING POINT · ${season.toUpperCase()}</p><h3>${trekInfo[key].name}</h3><p>Use these steps to begin planning:</p><ul>${plannerData[key].map(item => `<li>${item}</li>`).join('')}${extra}</ul><p style="margin-top:14px">Always confirm current local conditions and official instructions shortly before departure.</p>`;
});

// Preparation checklist progress
const prepChecks = [...document.querySelectorAll('#prepChecklist input[type="checkbox"]')];
function updateProgress() {
  const done = prepChecks.filter(check => check.checked).length;
  document.getElementById('progressText').textContent = `${done} of ${prepChecks.length} completed`;
  document.getElementById('progressBar').style.width = `${done / prepChecks.length * 100}%`;
}
prepChecks.forEach(check => check.addEventListener('change', updateProgress));
