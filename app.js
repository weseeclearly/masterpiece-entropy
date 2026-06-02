// Entropic Radar — Core Generative Simulation Engine
// High-Fidelity abstract force visualizer mapping dynamic situations and high-contrast layered decay.

let canvas;
let activeArtwork = 'basquiat';
let activeCycle = 'freeport'; // 'freeport' | 'penthouse' | 'museum' | 'catastrophe'
let renderMode = 'visible'; // Visible mode always active in Unified Vitrine
let timeScale = 1; // 1 = normal, 30 = accelerated

// Diagnostic UI Elements
let barMechanical, barChemical, barBiological;
let txtMechanical, txtChemical, txtBiological;
let valuationTicker, devaluationPct;
let notesTitle, notesBody;
let simBadge, metaStatus, metaFPS, metaLot;
let btnPhaseIndicator, btnIntegrityIndicator, btnTimelineIndicator;

// Curated high-contrast glowing aesthetic force palette (guarantees zero color washout)
const colors = {
  stress: [255, 30, 95],       // Magenta (Mechanical Strain & Craquelure)
  crackTip: [255, 110, 190],    // Neon Pink (Active Propagation Energy)
  uvFlux: [115, 30, 255],      // Ultraviolet Indigo (Direct Photochemical Wavefront)
  bleach: [0, 195, 255],       // Cyan / Ice Blue (Photolytic Bleaching Void)
  sapon: [255, 175, 12],       // Amber Gold (Crystalline Lead Soap Migration)
  biological: [15, 240, 135],  // Vivid Green-Teal (Fungal Mold Creep & Specimen Rot)
  moisture: [30, 75, 255],     // Cobalt Blue (Humidity Saturation Front)
  
  // Synthetic Resurrection Accents
  syntheticCyan: [0, 255, 200],  // Neon Cyan (Paraloid B-72 Restoration Polymers)
  syntheticOrange: [255, 90, 0]  // Electric Orange (Beva 371 Adhesive Grids)
};

// Substrates config with highly precise physical parameters and ACTUAL aspect ratios
const substrates = {
  basquiat: {
    name: "Untitled (1982)",
    artist: "Jean-Michel Basquiat",
    lot: "LOT 24-B",
    startingValuation: 110500000,
    canvasWidth: 504, 
    canvasHeight: 420,
    paintedYear: 1982,
    notes: "Basquiat's unprimed cotton duck support (E = 0.22 GPa) contracts sharply at RH < 35%. Nitrocellulose spray paint layers (tensile limit: 2.5 MPa, elastic modulus: 1.2 GPa) experience severe interlayer shear stresses against elastic poly(methyl methacrylate) acrylic backings, spawning delamination fractures. permanently tacky linseed wax-oil sticks capture carbon/silica dust (K_dust = 1.2e-4)."
  },
  rothko: {
    name: "No. 6 (Violet, Green, and Red)",
    artist: "Mark Rothko",
    lot: "LOT 12-R",
    startingValuation: 186000000,
    canvasWidth: 300,
    canvasHeight: 500,
    paintedYear: 1951,
    notes: "Thin pigment washes (10µm thickness) combine egg lipids, dammar, and animal glue. Direct solar UV radiation cleaves the aromatic azo nitrogen bonds in Lithol Red (PR49) with an photolysis activation energy of Ea = 45 kJ/mol, leaving bleached chemical voids. Moisture hydrolyzes animal glues, forcing free stearic acids to migrate and crystallize into amber lead soap nodes."
  },
  hirst: {
    name: "In and Out of Love (1991)",
    artist: "Damien Hirst",
    lot: "LOT 08-H",
    startingValuation: 122000000,
    canvasWidth: 440,
    canvasHeight: 440,
    paintedYear: 1991,
    notes: "Specimen grid ovals hold real tropical butterfly wings (Morpho peleides) composed of biological chitin. High humidity (RH >= 70%) triggers fungal micro-colonies (Aspergillus niger) that expand along damp seams. Underlying commercial Ripolin alkyd gloss paint is highly brittle (tensile limit: 0.8 MPa), undergoing 3% volumetric shrinkage and spiderweb craquelure."
  },
  klimt: {
    name: "Portrait of Elisabeth Lederer",
    artist: "Gustav Klimt",
    lot: "LOT 14-K",
    startingValuation: 236400000,
    canvasWidth: 340,
    canvasHeight: 480,
    paintedYear: 1916,
    notes: "Genuine silver, gold, and platinum leaf layered over highly hygroscopic calcium carbonate gesso ground (E = 4.5 GPa). Ambient sulfur drives rapid sulfidation of silver leaf coordinates (flat dark gray Ag_2S), while relative humidity fluctuations generate massive shear stresses at the metal-ground boundary, flaking foil. Mobile lead fatty acid soaps bubble through foil."
  },
  pollock: {
    name: "Number 7A, 1948",
    artist: "Jackson Pollock",
    lot: "LOT 27-P",
    startingValuation: 181200000,
    canvasWidth: 480,
    canvasHeight: 320,
    paintedYear: 1948,
    notes: "Pollock's drip network merges liquid alkyd gloss enamel (Duco) with tube oils. Polymerisation of commercial enamel induces violent volumetric shrinkage (up to 4%), driving explosive alligator cracking craquelure. Heavy sand, pebbles, and cigarette ash aggregate stress concentrations on unprimed rigid Masonite wood fiberboard support."
  },
  magritte: {
    name: "L'empire des lumières",
    artist: "René Magritte",
    lot: "LOT 09-M",
    startingValuation: 121200000,
    canvasWidth: 360,
    canvasHeight: 448,
    paintedYear: 1954,
    notes: "Signature daytime sky Prussian Blue (Fe_4[Fe(CN)_6]_3) glazes suffer hexavalent-to-trivalent iron photo-reduction under solar UV exposure, leaving bleached cyan-gray voids. Basic zinc oxides react with linseed fatty acids, migrating to crystallise as microscopic semi-translucent zinc soap hazes that cloud nocturnal forest shadows."
  }
};

const milestones = {
  basquiat: {
    freeport: [
      { elapsed: 0, year: 1982, label: "Pristine", age: "0y", status: "STABLE", desc: "Cotton duck canvas exhibits high uniform tension. Bright oilstick and spray paints are elastic and intact." },
      { elapsed: 100, year: 2082, label: "Micro-fatigue", age: "100y", status: "EARLY AGING", desc: "Slow room-temperature moisture cycles initiate micro-fatigue around canvas margins." },
      { elapsed: 300, year: 2282, label: "Active Shear", age: "300y", status: "STEADY CRACKS", desc: "Diagonal corner shear stresses peak; nitrocellulose spray layers show active craquelure cracks." },
      { elapsed: 500, year: 2482, label: "Soap Nucleation", age: "500y", status: "ADVANCED SOAPS", desc: "Lead soaps slowly migrate and nucleate in dark, quiet crystalline structures." },
      { elapsed: 1000, year: 2982, label: "Total Entropy", age: "1000y", status: "COLLAPSE", desc: "Complete support structural failure. Raw linen cotton rots; oilsticks saponify into lead stearate pools." }
    ],
    penthouse: [
      { elapsed: 0, year: 1982, label: "Pristine", age: "0y", status: "STABLE", desc: "Oilstick and spray paints are elastic and intact under standard conditions." },
      { elapsed: 10, year: 1992, label: "Photo-decay", age: "10y", status: "EARLY FADING", desc: "Floor-to-ceiling glass windows expose canvas to high UV cycles. Azo red pigments begin to fade rapidly." },
      { elapsed: 30, year: 2012, label: "Solar Craquelure", age: "30y", status: "ACTIVE STRESS", desc: "Extreme solar heat drying out paint. Wide thermal expansion drives cracking through thick paint layers." },
      { elapsed: 44, year: 2026, label: "Active Bleaching", age: "44y", status: "TODAY", desc: "44 years of sharp temperature/RH cycles trigger massive craquelure and deep photochemical fading." },
      { elapsed: 100, year: 2082, label: "Total Devaluation", age: "100y", status: "COLLAPSE", desc: "Complete aesthetic and structural collapse under direct solar exposure. Paint layers crumble and shed from support." }
    ],
    museum: [
      { elapsed: 0, year: 1982, label: "Pristine", age: "0y", status: "STABLE", desc: "Canvas maintains stable physical properties inside clean showcases." },
      { elapsed: 20, year: 2002, label: "Vibration Fatigue", age: "20y", status: "EARLY CRACKS", desc: "Low-frequency vibrations from museum visitors' footsteps initiate early diagonal corner strain cracks." },
      { elapsed: 44, year: 2026, label: "Hairline Networks", age: "44y", status: "TODAY", desc: "Vibration cracks propagate across boundaries, forming fine hairline networks." },
      { elapsed: 118, year: 2100, label: "Delamination", age: "118y", status: "ADVANCED", desc: "Mechanical fatigue drives gesso ground detaching from canvas. Major pigment flakes separate from the support." },
      { elapsed: 268, year: 2250, label: "Brittle Collapse", age: "268y", status: "COLLAPSE", desc: "Complete paint flaking and delamination under continuous micro-vibrations, leaving a bare support." }
    ],
    catastrophe: [
      { elapsed: 0, year: "+0h", label: "Pristine", age: "0h", status: "STABLE", desc: "Secure shipping crate environment before climate system failure." },
      { elapsed: 2, year: "+2h", label: "Thermal Shock", age: "2h", status: "RAPID STRESS", desc: "Cargo hold heating to 42C triggers rapid volumetric expansions and early stress concentrations." },
      { elapsed: 6, year: "+6h", label: "Explosive Craquelure", age: "6h", status: "MAJOR CRACKS", desc: "Severe moisture leak saturates canvas. Wooden support swells rapidly, driving aggressive diagonal fractures." },
      { elapsed: 12, year: "+12h", label: "Biological Outbreak", age: "12h", status: "MOLD SPEEDS", desc: "Fungal spores explode in 95% relative humidity and 42C heat, feeding on wet organic canvas binders." },
      { elapsed: 24, year: "+24h", label: "Total Collapse", age: "24h", status: "TOTAL DECAY", desc: "Physical specimen rot and structural breakdown are complete in one day. Canvas is completely decayed." }
    ]
  },
  rothko: {
    freeport: [
      { elapsed: 0, year: 1951, label: "Pristine", age: "0y", status: "STABLE", desc: "Luminous azo Lithol Red and Violet washes are highly saturated, bound with egg lipid and dammar." },
      { elapsed: 100, year: 2051, label: "Mild Bleach", age: "100y", status: "EARLY FADING", desc: "Minor oxygen reaction and dark-oxidation slowly fade Lithol Red margins." },
      { elapsed: 300, year: 2251, label: "Crystalline Soaps", age: "300y", status: "STEADY SOAPS", desc: "Fatty acids slowly rise and nucleate, forming a scattering of tiny gold-amber soap nodes." },
      { elapsed: 500, year: 2451, label: "Haze Formation", age: "500y", status: "ADVANCED HAZES", desc: "Crystalline soap nodes cluster, forming a semi-translucent haze over the lower red block." },
      { elapsed: 1000, year: 2951, label: "Umber Eclipse", age: "1000y", status: "COLLAPSE", desc: "Total canvas degradation. Pigments are completely dulled, and animal glue substrate is fully broken down." }
    ],
    penthouse: [
      { elapsed: 0, year: 1951, label: "Pristine", age: "0y", status: "STABLE", desc: "Vibrant washes are highly saturated and intact." },
      { elapsed: 25, year: 1976, label: "Bleach Voids", age: "25y", status: "EARLY FADING", desc: "Direct UV radiation initiates aromatic azo nitrogen cleavage. Margins fade into subtle cyan-gray voids." },
      { elapsed: 75, year: 2026, label: "Pigment Cleavage", age: "75y", status: "TODAY", desc: "Lithol Red azo bonds undergo deep photolysis. Over 30% of the red field is replaced by cold carbon-ash voids." },
      { elapsed: 150, year: 2101, label: "Lead Soaps", age: "150y", status: "ADVANCED", desc: "Moisture hydrolyzes animal glue seams, prompting free fatty acids to rise as crystalline, amber lead soap nodes." },
      { elapsed: 300, year: 2251, label: "Chromatic Death", age: "300y", status: "COLLAPSE", desc: "Vibrant color fields fully bleached. A dense starfield of crystalline lead soaps clouds the entire vitrine." }
    ],
    museum: [
      { elapsed: 0, year: 1951, label: "Pristine", age: "0y", status: "STABLE", desc: "Azo red fields are highly saturated and structurally stable inside silent showcases." },
      { elapsed: 30, year: 1981, label: "Support Fatigue", age: "30y", status: "EARLY STRAIN", desc: "Low-level museum vibration induces mechanical fatigue on support framework." },
      { elapsed: 75, year: 2026, label: "Hairline Seams", age: "75y", status: "TODAY", desc: "Hairline cracks slowly trace the boundaries between violet and green color blocks." },
      { elapsed: 180, year: 2131, label: "Pigment Separation", age: "180y", status: "ADVANCED CRACKING", desc: "Vibration fatigue initiates fine flaking at edges. Wash layers slowly detach from gesso ground." },
      { elapsed: 400, year: 2351, label: "Structural Rupture", age: "400y", status: "COLLAPSE", desc: "Delamination along major glue lines causes massive surface paint shedding." }
    ],
    catastrophe: [
      { elapsed: 0, year: "+0h", label: "Pristine", age: "0h", status: "STABLE", desc: "Pristine Rothko layers protected in shipping crate container." },
      { elapsed: 2, year: "+2h", label: "Thermal Photolysis", age: "2h", status: "RAPID FADING", desc: "Searing cargo-hold heat combined with intense sunlight accelerates azo photolysis." },
      { elapsed: 6, year: "+6h", label: "Explosive Bleaching", age: "6h", status: "MAJOR VOIDS", desc: "Azo bonds undergo extreme photolytic cleavage. Extensive bleached gray voids erupt across the canvas." },
      { elapsed: 12, year: "+12h", label: "Soap Eruption", age: "12h", status: "ACTIVE SOAPS", desc: "42C heat melts animal glues, driving explosive lead soap crystallization through thin paint films." },
      { elapsed: 24, year: "+24h", label: "Chromatic Dissolution", age: "24h", status: "TOTAL DECAY", desc: "Complete color wash bleaching and crystalline soap saturation. Chromatic structure is entirely lost." }
    ]
  },
  hirst: {
    freeport: [
      { elapsed: 0, year: 1991, label: "Pristine", age: "0y", status: "STABLE", desc: "Iridescent tropical Morpho peleides wings pinned onto high-gloss household alkyd paint." },
      { elapsed: 100, year: 2091, label: "Slow Shrinkage", age: "100y", status: "EARLY CRACKS", desc: "Extremely slow polymerization and cooling in Freeport darkness triggers micro-craquelure around specimen pins." },
      { elapsed: 300, year: 2291, label: "Chitin Brittleness", age: "300y", status: "ADVANCED AGING", desc: "Butterfly wings slowly lose structural moisture and organic resilience, becoming highly fragile." },
      { elapsed: 600, year: 2591, label: "Chitin Cleavage", age: "600y", status: "DECAY SEEDS", desc: "Slow mechanical fatigue initiates delamination of structural color wing layers." },
      { elapsed: 1000, year: 2991, label: "Dust Saponification", age: "1000y", status: "COLLAPSE", desc: "Wings disintegrate into fine dry organic dust. The underlying alkyd paint is fully cracked and dull." }
    ],
    penthouse: [
      { elapsed: 0, year: 1991, label: "Pristine", age: "0y", status: "STABLE", desc: "Iridescent butterfly wings on shiny household gloss paint." },
      { elapsed: 10, year: 2001, label: "Gloss Shrinkage", age: "10y", status: "EARLY CRACKS", desc: "Brittle commercial Ripolin alkyd gloss suffers 3% volumetric shrinkage, cracking around specimen borders." },
      { elapsed: 35, year: 2026, label: "Chitin Collapse", age: "35y", status: "TODAY", desc: "Humidity triggers localized mold creep along specimens. Butterfly wings start losing structural chitin." },
      { elapsed: 80, year: 2071, label: "Fungal Creep", age: "80y", status: "ADVANCED", desc: "Aspergillus mold creeps outward in branching green hyphae, actively devouring raw organic chitin." },
      { elapsed: 200, year: 2191, label: "Total Rot", age: "200y", status: "COLLAPSE", desc: "Complete biological decay. Specimens are reduced to dark dust aggregates and powdery green rot." }
    ],
    museum: [
      { elapsed: 0, year: 1991, label: "Pristine", age: "0y", status: "STABLE", desc: "Butterfly specimens stable within inert gas vitrine casing." },
      { elapsed: 15, year: 2006, label: "Vibration Fatigue", age: "15y", status: "EARLY CRACKS", desc: "Museum vibrations cause fine fractures to radiate from heavy steel specimen pins into brittle gloss." },
      { elapsed: 35, year: 2026, label: "Craquelure Network", age: "35y", status: "TODAY", desc: "Continuous micro-shocks expand craquelure network, outlining butterfly wing attachment points." },
      { elapsed: 100, year: 2091, label: "Wing Flaking", age: "100y", status: "ADVANCED CRACKING", desc: "Resonant vibration stresses flake and dislodge fragile wing fragments." },
      { elapsed: 250, year: 2241, label: "Mechanical Shedding", age: "250y", status: "COLLAPSE", desc: "Specimens completely detach from pins and disintegrate due to perpetual structural vibration." }
    ],
    catastrophe: [
      { elapsed: 0, year: "+0h", label: "Pristine", age: "0h", status: "STABLE", desc: "Secure shipping crate environment before cargo leak failure." },
      { elapsed: 2, year: "+2h", label: "Moisture Tide", age: "2h", status: "RAPID STRESS", desc: "Wet air enters crate. Rapid swelling of backing panel initiates huge tension around butterfly pins." },
      { elapsed: 6, year: "+6h", label: "Volumetric Fission", age: "6h", status: "MAJOR CRACKS", desc: "Brittle Ripolin paint shatters under moisture expansion, tearing wings at boundary interfaces." },
      { elapsed: 12, year: "+12h", label: "Aspergillus Explosion", age: "12h", status: "MOLD SPEEDS", desc: "95% humidity and 42C heat spark massive fungal growth, consuming organic wing specimens in real-time." },
      { elapsed: 24, year: "+24h", label: "Biological Collapse", age: "24h", status: "TOTAL DECAY", desc: "Complete specimen rot. Butterfly wings are completely digested, leaving slimy black-green fungal traces." }
    ]
  },
  klimt: {
    freeport: [
      { elapsed: 0, year: 1916, label: "Gilded Splendor", age: "0y", status: "STABLE", desc: "Highly reflective gold, silver, and platinum foil shimmering over calcium carbonate gesso." },
      { elapsed: 100, year: 2016, label: "Tarnish Seeds", age: "100y", status: "EARLY SULFIDE", desc: "Trace sulfur in Freeport vault drives slow silver leaf sulfidation, forming thin Ag2S seeds." },
      { elapsed: 300, year: 2216, label: "Blackened Veins", age: "300y", status: "STEADY TARNISH", desc: "Silver sulfide seeds merge into dark veins traversing the silver and gold boundaries." },
      { elapsed: 600, year: 2516, label: "Lead Soap Bubbles", age: "600y", status: "ADVANCED SOAPS", desc: "Mobile lead soaps slowly bubble and erupt through genuine foil layers, forming amber craters." },
      { elapsed: 1000, year: 2916, label: "Gilded Decay", age: "1000y", status: "COLLAPSE", desc: "Gold and silver foil layers fully delaminate and flake, leaving a chalky gesso outline." }
    ],
    penthouse: [
      { elapsed: 0, year: 1916, label: "Gilded Splendor", age: "0y", status: "STABLE", desc: "Highly reflective gold, silver, and platinum foil shimmering over a hygroscopic chalk gesso ground." },
      { elapsed: 30, year: 1946, label: "Tarnish Seeds", age: "30y", status: "EARLY SULFIDE", desc: "Atmospheric sulfur drives initial silver sulfidation, forming thin dark silver sulfide (Ag2S) seeds." },
      { elapsed: 110, year: 2026, label: "Gold Flaking", age: "110y", status: "TODAY", desc: "Silver sulfidation darkens into black veins. Moisture cycles generate shear stresses, peeling gold foil borders." },
      { elapsed: 200, year: 2116, label: "Soap Eruption", age: "200y", status: "ADVANCED", desc: "Mobile lead soaps bubble through gold leaf layers, creating eruptive amber crystallization craters." },
      { elapsed: 400, year: 2316, label: "Metallic Death", age: "400y", status: "COLLAPSE", desc: "Complete gold delamination and tarnished silver decay, leaving a bare chalk gesso outline." }
    ],
    museum: [
      { elapsed: 0, year: 1916, label: "Gilded Splendor", age: "0y", status: "STABLE", desc: "Reflective foils are structurally stable inside standard cases." },
      { elapsed: 40, year: 1956, label: "Foil Fatigue", age: "40y", status: "EARLY STRAIN", desc: "Continuous floor micro-vibrations stress the weak boundary between foil layers and gesso ground." },
      { elapsed: 110, year: 2026, label: "Gesso Flaking", age: "110y", status: "TODAY", desc: "Vibration fatigue cracks the brittle chalk gesso ground, starting foil delamination at edges." },
      { elapsed: 220, year: 2136, label: "Foil Shedding", age: "220y", status: "ADVANCED CRACKING", desc: "Foils delaminate and flake off in large sheets under persistent vibration waves." },
      { elapsed: 500, year: 2416, label: "Chalky Skeleton", age: "500y", status: "COLLAPSE", desc: "All gold and silver foil is completely shed, leaving only the bare white chalky skeleton." }
    ],
    catastrophe: [
      { elapsed: 0, year: "+0h", label: "Pristine", age: "0h", status: "STABLE", desc: "Klimt masterpiece sealed in shipping container." },
      { elapsed: 2, year: "+2h", label: "Corrosive Acid", age: "2h", status: "RAPID TARNISH", desc: "Ambient sulfur and humidity vapor blacken silver leaf coordinates in minutes." },
      { elapsed: 6, year: "+6h", label: "Gesso Delamination", age: "6h", status: "MAJOR CRACKS", desc: "Hygroscopic gesso absorbs water, swelling rapidly and shattering gold foil layers." },
      { elapsed: 12, year: "+12h", label: "Explosive Bubbles", age: "12h", status: "ACTIVE SOAPS", desc: "Extreme heat triggers explosive lead soap eruptions, tearing through the remaining foils." },
      { elapsed: 24, year: "+24h", label: "Metallic Dissolution", age: "24h", status: "TOTAL DECAY", desc: "Gold delamination is complete; tarnished silver is entirely corroded and blackened." }
    ]
  },
  pollock: {
    freeport: [
      { elapsed: 0, year: 1948, label: "Liquid Labyrinth", age: "0y", status: "STABLE", desc: "Liquid loops of industrial alkyd enamel and tube oils poured over rigid unprimed Masonite board." },
      { elapsed: 100, year: 2048, label: "Polymer Fatigue", age: "100y", status: "EARLY AGING", desc: "Extremely slow cross-linking polymerisation drives subtle micro-stress inside alkyd loops." },
      { elapsed: 300, year: 2248, label: "Micro-craquelure", age: "300y", status: "STEADY CRACKS", desc: "Volumetric shrinkage over centuries initiates fine hairline cracks in thick paint intersections." },
      { elapsed: 600, year: 2548, label: "Board Fatigue", age: "600y", status: "ADVANCED WARPING", desc: "Hygroscopic Masonite wood fibers slowly absorb trace moisture, driving boundary shear." },
      { elapsed: 1000, year: 2948, label: "Shattered Grid", age: "1000y", status: "COLLAPSE", desc: "Paint delamination leads to catastrophic shedding. The drip network is fractured into isolated floating islands." }
    ],
    penthouse: [
      { elapsed: 0, year: 1948, label: "Liquid Labyrinth", age: "0y", status: "STABLE", desc: "Industrial alkyd enamel loops poured over unprimed Masonite." },
      { elapsed: 15, year: 1963, label: "Polymer Stress", age: "15y", status: "EARLY CRACKS", desc: "Polymerisation of commercial enamel induces volumetric shrinkage, driving early cracks in thick drip tracks." },
      { elapsed: 78, year: 2026, label: "Alligator Craquelure", age: "78y", status: "TODAY", desc: "Widespread explosive craquelure. Heavy sand, pebbles, and cigarette ash aggregate stress concentrations." },
      { elapsed: 150, year: 2098, label: "Board Warping", age: "150y", status: "ADVANCED", desc: "Hygroscopic Masonite wood support bends, tearing the locked alkyd loops at boundary coordinates." },
      { elapsed: 300, year: 2248, label: "Shattered Grid", age: "300y", status: "COLLAPSE", desc: "Paint delamination leads to catastrophic shedding. The drip network is fractured into isolated floating islands." }
    ],
    museum: [
      { elapsed: 0, year: 1948, label: "Liquid Labyrinth", age: "0y", status: "STABLE", desc: "Alkyd enamel loops are highly stable on Masonite support." },
      { elapsed: 25, year: 1973, label: "Resonant Fatigue", age: "25y", status: "EARLY STRAIN", desc: "Low-frequency museum resonance fatigue initiates micro-stress concentrations near embedded pebbles." },
      { elapsed: 78, year: 2026, label: "Anchor Craquelure", age: "78y", status: "TODAY", desc: "Vibration fatigue cracks propagate outward from heavy sand aggregates." },
      { elapsed: 160, year: 2108, label: "Board Splitting", age: "160y", status: "ADVANCED FISSURES", desc: "Continuous visitor floor vibrations split brittle Masonite board backing along edge boundaries." },
      { elapsed: 350, year: 2298, label: "Grid Fracture", age: "350y", status: "COLLAPSE", desc: "Complete mechanical disintegration of Masonite support, shattering Pollock's loops into dust." }
    ],
    catastrophe: [
      { elapsed: 0, year: "+0h", label: "Pristine", age: "0h", status: "STABLE", desc: "Pollock Masonite grid packed inside shipping container." },
      { elapsed: 2, year: "+2h", label: "Thermal Warping", age: "2h", status: "RAPID STRESS", desc: "High cargo temperature triggers aggressive alkyd shrinkage and early surface cracks." },
      { elapsed: 6, year: "+6h", label: "Masonite Swelling", age: "6h", status: "MAJOR CRACKS", desc: "Water leak saturates unprimed Masonite support. Extreme wood fiber expansion fractures loops instantly." },
      { elapsed: 12, year: "+12h", label: "Interlayer Ripping", age: "12h", status: "ACTIVE FRACTURES", desc: "Alkyd loops rip apart along boundaries under extreme moisture swelling, completely splitting thick tracks." },
      { elapsed: 24, year: "+24h", label: "Catastrophic Fission", age: "24h", status: "TOTAL DECAY", desc: "The backing is completely warped and split. The drip labyrinth is completely fractured and detached." }
    ]
  },
  magritte: {
    freeport: [
      { elapsed: 0, year: 1954, label: "Nocturnal Twilight", age: "0y", status: "STABLE", desc: "Luminescent Prussian Blue sky and zinc oxide streetlamp wash painted over a thin zinc oil ground." },
      { elapsed: 100, year: 2054, label: "Dark Photo-reduction", age: "100y", status: "EARLY FADING", desc: "Prussian blue undergoes slow atmospheric fading and oxidation, slightly bleaching sky glazes." },
      { elapsed: 300, year: 2254, label: "Haze Nucleation", age: "300y", status: "STEADY HAZES", desc: "Free zinc fatty acids slowly rise, forming microscopic zinc soap haze seeds in shadow regions." },
      { elapsed: 600, year: 2554, label: "Foggy Efflorescence", age: "600y", status: "ADVANCED HAZES", desc: "Crystalline zinc soaps aggregate into a semi-translucent white efflorescence layer." },
      { elapsed: 1000, year: 2954, label: "Ash Void", age: "1000y", status: "COLLAPSE", desc: "Prussian blue sky is completely grayed, and nocturnal forest shadows are completely hidden under zinc format crystals." }
    ],
    penthouse: [
      { elapsed: 0, year: 1954, label: "Nocturnal Twilight", age: "0y", status: "STABLE", desc: "Luminescent sky and zinc oxide streetlamp wash painted over a thin zinc oil ground." },
      { elapsed: 20, year: 1974, label: "Sky Photolysis", age: "20y", status: "EARLY FADING", desc: "Solar UV initiates Prussian Blue photo-reduction, creating cyan-gray sky bleaching seeds." },
      { elapsed: 72, year: 2026, label: "Zinc Soap Haze", age: "72y", status: "TODAY", desc: "Advanced sky bleaching; zinc oxides migrate to form microscopic semi-translucent zinc soap hazes over shadows." },
      { elapsed: 150, year: 2104, label: "Efflorescence Fog", age: "150y", status: "ADVANCED", desc: "Microscopic soap hazes expand into a dense, foggy white efflorescence layer, obscuring the house silhouette." },
      { elapsed: 300, year: 2254, label: "Ethereal Void", age: "300y", status: "COLLAPSE", desc: "The Prussian Blue sky is fully bleached, and nocturnal forest shadows are completely coated in white zinc format crystals." }
    ],
    museum: [
      { elapsed: 0, year: 1954, label: "Nocturnal Twilight", age: "0y", status: "STABLE", desc: "Sky glazes and streetlamp wash are highly stable." },
      { elapsed: 30, year: 1984, label: "Glaze Fatigue", age: "30y", status: "EARLY CRACKS", desc: "Low-frequency vibration fatigue initiates micro-cracking in the highly brittle thin sky glazes." },
      { elapsed: 72, year: 2026, label: "Hairline Mesh", age: "72y", status: "TODAY", desc: "Fine micro-cracks form a fine mesh across the luminescent blue sky." },
      { elapsed: 160, year: 2114, label: "Zinc Ground Cleavage", age: "160y", status: "ADVANCED CRACKING", desc: "Continuous micro-shocks peel thin oil washes from the reactive zinc ground layers." },
      { elapsed: 350, year: 2304, label: "Ethereal Disintegration", age: "350y", status: "COLLAPSE", desc: "Total glaze separation and cracking. The sky and house details are completely flaked off, leaving only bare metal." }
    ],
    catastrophe: [
      { elapsed: 0, year: "+0h", label: "Pristine", age: "0h", status: "STABLE", desc: "Magritte painting packed inside shipping container." },
      { elapsed: 2, year: "+2h", label: "Prussian Photolysis", age: "2h", status: "RAPID FADING", desc: "High temperature and intense light trigger rapid Prussian Blue photo-reduction." },
      { elapsed: 6, year: "+6h", label: "Explosive Bleaching", age: "6h", status: "MAJOR VOIDS", desc: "Sky glazes bleach into massive gray and cyan voids under extreme photolytic stress." },
      { elapsed: 12, year: "+12h", label: "Zinc Soap Outbreak", age: "12h", status: "MOLD SPEEDS", desc: "Moisture and 42C heat force explosive zinc oxide fat-reaction, rising as eruptive white soap blooms." },
      { elapsed: 24, year: "+24h", label: "White Efflorescence Fog", age: "24h", status: "TOTAL DECAY", desc: "The sky is completely bleached, and the house and streetlamp details are completely hidden under dense white zinc formats." }
    ]
  }
};

let activeMilestoneIndex = 0; // Default to "Pristine" milestone

let artworkSnapshots = []; // Holds the 5 deep-copied grid snapshots generated by the physics loop
let liveSimulationGrid = null; // Stores the active running simulation grid
let liveSimulatedFrames = 0;   // Stores the active running simulation frames
let isViewingSnapshot = false;  // Flag indicating if we are currently viewing a historical snapshot
let spectralStainVal = 0.0; // 0.0 = forensic aging, 1.0 = bio-spectral heatmap
let activeTheme = 'xray';   // 'xray' | 'naturalism'

// Persisted separate simulation states for each situation, keeping timelines, grids, and milestones fully isolated
let environmentStates = {
  freeport: null,
  penthouse: null,
  museum: null,
  catastrophe: null
};

// Premium Theme Color Mappings for the Spectral Stain Mode (target colors at 100% stain)
const themeColors = {
  xray: {
    moisture: [0, 240, 255],      // Neon cyan
    uvFlux: [230, 0, 255],        // Neon purple/magenta
    bleach: [0, 255, 127],        // Neon lime-green
    sapon: [255, 110, 0],         // Volcanic orange
    biological: [0, 255, 0],      // Bioluminescent green
    stress: [255, 0, 127]         // Laser pink / hot pink
  },
  naturalism: {
    moisture: [44, 95, 112],      // Organic sea-pine/cerulean blue
    uvFlux: [235, 175, 55],       // Luminous golden-sunlight
    bleach: [230, 222, 202],      // Warm alabaster/cream white
    sapon: [160, 82, 45],         // Deep burnt sienna
    biological: [107, 112, 92],   // Sage-green botanical creep
    stress: [166, 75, 45]         // Earthy rust/clay crack network
  }
};


// Force Grid Dimensions (Calculated dynamically to ensure zero sub-pixel aliasing)
const cellPitch = 4; // Absolute pixel pitch of the physical LED matrix
let cols, rows;
let forceGrid = [];
let scanLineY = 0;

// Environmental Presets (Housed under active presets panel)
const cyclePresets = {
  freeport: { rh: 0.50, temp: 20.0, uv: 0.0, dust: 1.0 },
  penthouse: { rh: 0.50, temp: 22.0, uv: 1.2, dust: 95.0 }, // Base levels, dynamic fluctuation inside draw loop
  museum: { rh: 0.50, temp: 21.0, uv: 0.0, dust: 12.0 },
  catastrophe: { rh: 0.95, temp: 42.0, uv: 3.5, dust: 180.0 }
};

// Asset Lifecycle State
let assetStatus = 'monitoring'; // 'monitoring' | 'shattered' | 'restoring'
let assetIntegrity = 100.0;
let isResurrected = false; // Tracks if it's currently a synthetic clone
let restoreSweepY = 0;
let simulatedFrames = 0; // Dynamic timeline frame accumulator

let artworkImages = {};

function preload() {
  artworkImages.basquiat = loadImage('basquiat.png', () => {}, () => {});
  artworkImages.rothko = loadImage('rothko.png', () => {}, () => {});
  artworkImages.hirst = loadImage('hirst.png', () => {}, () => {});
  artworkImages.klimt = loadImage('Gustav_Klimt_Bildnis_der_Elisabeth_Lederer.jpg', () => {}, () => {
    artworkImages.klimt = loadImage('klimt.png', () => {}, () => {});
  });
  artworkImages.pollock = loadImage('pollock.png', () => {}, () => {});
  artworkImages.magritte = loadImage("l'empire des lumieres.jpg", () => {}, () => {
    artworkImages.magritte = loadImage('magritte.png', () => {}, () => {});
  });
}

function setup() {
  const container = document.getElementById('canvas-container');
  
  // Dynamically adjust Basquiat aspect ratio from the actual loaded clipboard image!
  let img = artworkImages.basquiat;
  if (img && img.width > 10) {
    let imgRatio = img.height / img.width;
    substrates.basquiat.canvasWidth = 500;
    substrates.basquiat.canvasHeight = Math.round(500 * imgRatio);
  }

  const initWidth = substrates.basquiat.canvasWidth;
  const initHeight = substrates.basquiat.canvasHeight;
  
  cols = Math.floor(initWidth / cellPitch);
  rows = Math.floor(initHeight / cellPitch);
  
  canvas = createCanvas(cols * cellPitch, rows * cellPitch);
  canvas.parent('canvas-container');
  canvas.id('simulation-canvas');
  
  // Enforce absolute crisp pixels and disable high-DPI scaling blur
  pixelDensity(1);
  noSmooth();
  
  // Link UI Elements
  initUIElements();
  
  // Initialize grid and starting states
  resetSimulation();
  
  // Initialize dynamic forensic timeline snapshots
  renderTimelineSnapshots();
  
  // Prevent default context menu on canvas
  document.getElementById('simulation-canvas').addEventListener('contextmenu', e => e.preventDefault());
}

function initUIElements() {
  barMechanical = document.getElementById('bar-mechanical');
  barChemical = document.getElementById('bar-chemical');
  barBiological = document.getElementById('bar-biological');
  
  txtMechanical = document.getElementById('txt-mechanical');
  txtChemical = document.getElementById('txt-chemical');
  txtBiological = document.getElementById('txt-biological');
  
  valuationTicker = document.getElementById('valuation-ticker');
  devaluationPct = document.getElementById('devaluation-pct');
  
  notesTitle = document.getElementById('notes-title');
  notesBody = document.getElementById('notes-body');
  simBadge = document.getElementById('sim-badge');
  metaStatus = document.getElementById('meta-status');
  metaFPS = document.getElementById('meta-fps');
  metaLot = document.getElementById('meta-lot');
  
  btnPhaseIndicator = document.getElementById('btn-phase-indicator');
  btnIntegrityIndicator = document.getElementById('btn-integrity-indicator');
  btnTimelineIndicator = document.getElementById('btn-timeline-indicator');
  
  // Add card selectors for Masterpiece
  document.getElementById('card-basquiat').addEventListener('click', () => switchArtwork('basquiat'));
  document.getElementById('card-rothko').addEventListener('click', () => switchArtwork('rothko'));
  document.getElementById('card-hirst').addEventListener('click', () => switchArtwork('hirst'));
  document.getElementById('card-klimt').addEventListener('click', () => switchArtwork('klimt'));
  document.getElementById('card-pollock').addEventListener('click', () => switchArtwork('pollock'));
  document.getElementById('card-magritte').addEventListener('click', () => switchArtwork('magritte'));
  
  // Add listeners to Environmental Situation Cards
  document.getElementById('cycle-freeport').addEventListener('click', () => switchLifeCycle('freeport'));
  document.getElementById('cycle-penthouse').addEventListener('click', () => switchLifeCycle('penthouse'));
  document.getElementById('cycle-museum').addEventListener('click', () => switchLifeCycle('museum'));
  document.getElementById('cycle-catastrophe').addEventListener('click', () => switchLifeCycle('catastrophe'));
  
  // Add diagnostic display buttons
  document.getElementById('btn-visible-mode').addEventListener('click', (e) => setRenderMode('visible', e.currentTarget));
  document.getElementById('btn-stress-mode').addEventListener('click', (e) => setRenderMode('mechanical', e.currentTarget));
  document.getElementById('btn-uv-mode').addEventListener('click', (e) => setRenderMode('chemical', e.currentTarget));
  document.getElementById('btn-sapon-mode').addEventListener('click', (e) => setRenderMode('sapon', e.currentTarget));
  document.getElementById('btn-bio-mode').addEventListener('click', (e) => setRenderMode('biological', e.currentTarget));
  document.getElementById('btn-moisture-mode').addEventListener('click', (e) => setRenderMode('moisture', e.currentTarget));
  
  // Simulation admin controls
  document.getElementById('btn-toggle-time').addEventListener('click', toggleTimeScale);
  document.getElementById('btn-reset').addEventListener('click', resetSimulation);
  
  // Visual Stain Theme selector listener
  const selectTheme = document.getElementById('select-visual-theme');
  if (selectTheme) {
    selectTheme.addEventListener('change', (e) => {
      activeTheme = e.target.value;
      updateLegendColors();
    });
  }
  
  // Spectral Stain visual mode slider
  const sliderStain = document.getElementById('slider-spectral-stain');
  const lblStain = document.getElementById('lbl-spectral-stain');
  if (sliderStain && lblStain) {
    sliderStain.addEventListener('input', (e) => {
      let val = parseInt(e.target.value);
      spectralStainVal = val / 100.0;
      lblStain.innerText = val + "%";
      if (val > 50) {
        lblStain.style.color = "var(--accent-green)";
      } else {
        lblStain.style.color = "var(--accent-blue)";
      }
      updateLegendColors();
    });
  }
  
  // Initialize colormap legend dots to forensic defaults
  updateLegendColors();
}

function updateLegendColors() {
  const dStress = document.getElementById('legend-stress');
  const dMoisture = document.getElementById('legend-moisture');
  const dBleach = document.getElementById('legend-bleach');
  const dSapon = document.getElementById('legend-sapon');
  const dBio = document.getElementById('legend-biological');
  
  const currentColors = themeColors[activeTheme] || themeColors.xray;
  
  if (dStress) {
    let r = Math.round(lerp(255, currentColors.stress[0], spectralStainVal));
    let g = Math.round(lerp(56, currentColors.stress[1], spectralStainVal));
    let b = Math.round(lerp(56, currentColors.stress[2], spectralStainVal));
    dStress.style.background = `rgb(${r}, ${g}, ${b})`;
    dStress.style.boxShadow = `0 0 6px rgb(${r}, ${g}, ${b})`;
  }
  if (dMoisture) {
    let r = Math.round(lerp(30, currentColors.moisture[0], spectralStainVal));
    let g = Math.round(lerp(144, currentColors.moisture[1], spectralStainVal));
    let b = Math.round(lerp(255, currentColors.moisture[2], spectralStainVal));
    dMoisture.style.background = `rgb(${r}, ${g}, ${b})`;
    dMoisture.style.boxShadow = `0 0 6px rgb(${r}, ${g}, ${b})`;
  }
  if (dBleach) {
    let r = Math.round(lerp(240, currentColors.bleach[0], spectralStainVal));
    let g = Math.round(lerp(240, currentColors.bleach[1], spectralStainVal));
    let b = Math.round(lerp(240, currentColors.bleach[2], spectralStainVal));
    dBleach.style.background = `rgb(${r}, ${g}, ${b})`;
    dBleach.style.boxShadow = `0 0 6px rgb(${r}, ${g}, ${b})`;
  }
  if (dSapon) {
    let r = Math.round(lerp(212, currentColors.sapon[0], spectralStainVal));
    let g = Math.round(lerp(175, currentColors.sapon[1], spectralStainVal));
    let b = Math.round(lerp(55, currentColors.sapon[2], spectralStainVal));
    dSapon.style.background = `rgb(${r}, ${g}, ${b})`;
    dSapon.style.boxShadow = `0 0 6px rgb(${r}, ${g}, ${b})`;
  }
  if (dBio) {
    let r = Math.round(lerp(46, currentColors.biological[0], spectralStainVal));
    let g = Math.round(lerp(204, currentColors.biological[1], spectralStainVal));
    let b = Math.round(lerp(113, currentColors.biological[2], spectralStainVal));
    dBio.style.background = `rgb(${r}, ${g}, ${b})`;
    dBio.style.boxShadow = `0 0 6px rgb(${r}, ${g}, ${b})`;
  }
}

function draw() {
  // Prevent crash if grid is currently being reallocated or sized
  if (!forceGrid || forceGrid.length !== cols || !forceGrid[cols - 1] || forceGrid[cols - 1].length !== rows) {
    return;
  }

  background(6, 6, 8);
  
  // 1. Calculate dynamic environment values depending on selected Situation
  let rh = cyclePresets[activeCycle].rh;
  let temp = cyclePresets[activeCycle].temp;
  let uv = cyclePresets[activeCycle].uv;
  let dust = cyclePresets[activeCycle].dust;
  
  if (activeCycle === 'penthouse') {
    // Oligarch's Penthouse: Flucutate values over time (diurnal solar cycles)
    let dayTime = frameCount * 0.005;
    uv = max(0, Math.sin(dayTime) * 8.5); 
    temp = 18.0 + max(0, Math.sin(dayTime) * 10.0); 
    rh = 0.50 + Math.sin(dayTime * 1.5) * 0.15; 
  } 
  else if (activeCycle === 'museum') {
    // Museum Vitrine: UV/Humidity stable, footprints trigger vibration shocks
    if (random(1.0) < 0.25) {
      injectFootstepVibrations();
    }
  }
  
  metaFPS.innerText = Math.round(frameRate()) + " FPS";
  
  // 2. Advance generative physics or conservation scans
  if (assetStatus === 'restoring') {
    runResurrectionScan();
  } else if (!isViewingSnapshot) {
    const steps = timeScale;
    for (let s = 0; s < steps; s++) {
      updateGenerativeForces(rh, temp, uv, dust);
    }
    // Deep copy and preserve current live simulation state
    liveSimulationGrid = deepCopyGrid(forceGrid);
    liveSimulatedFrames = simulatedFrames;
  }
  
  // 3. Render Unified Layered Glowing Matrix Vitrine
  renderRadarGrid();
  
  // 4. Draw Overlay HUD Sweep (Removed artificial digital scan lines for pure organic aesthetics)
  
  // 5. Update Diagnostics Readouts
  updateAssetMetrics();
  
  // 6. Update Dynamic Simulated Timeline
  updateTimelineHUD();
  
  // 7. Save dynamic snapshots when reaching future milestones during the live simulation
  if (assetStatus === 'monitoring' && !isViewingSnapshot) {
    let currentTimeVal = getCurrentSimulatedTime();
    let list = milestones[activeArtwork][activeCycle];
    
    for (let idx = 1; idx < list.length; idx++) {
      if (currentTimeVal >= list[idx].elapsed && (!artworkSnapshots[idx] || !artworkSnapshots[idx].isCapturedFromLive)) {
        artworkSnapshots[idx] = deepCopyGrid(forceGrid);
        artworkSnapshots[idx].isCapturedFromLive = true;
        artworkSnapshots[idx].unlocked = true;
        renderTimelineSnapshots();
      }
    }
  }
}

function resetSimulation() {
  mechanicalDecay = 0.0;
  chemicalDecay = 0.0;
  biologicalDecay = 0.0;
  totalDegradation = 0.0;
  assetIntegrity = 100.0;
  currentValuation = substrates[activeArtwork].startingValuation;
  scanLineY = 0;
  assetStatus = 'monitoring';
  isResurrected = false;
  isViewingSnapshot = false;
  liveSimulationGrid = null;
  liveSimulatedFrames = 0;
  
  simulatedFrames = 0; // Reset timeline counter to Pristine (0 years elapsed)
  
  // Re-generate authentic, physics-based snapshots and load the Pristine baseline state
  generatePhysicsSnapshots();
  
  // Visual frame wrapper update
  const frameWrapper = document.getElementById('art-frame');
  if (frameWrapper) {
    frameWrapper.className = 'art-frame-wrapper frame-' + activeArtwork;
  }
  
  metaStatus.innerText = "MONITORING";
  metaStatus.style.color = "var(--accent-blue)";
  simBadge.innerText = "RADAR LOCK";
  simBadge.style.color = "var(--accent-blue)";
  simBadge.style.borderColor = "rgba(30, 144, 255, 0.3)";
  simBadge.style.background = "rgba(30, 144, 255, 0.12)";
}

function createForceCell(x, y) {
  return {
    x: x,
    y: y,
    // Forces levels (0.0 to 1.0)
    mechanicalStress: 0.0,
    fractureDensity: 0.0,
    photolyticBleach: 0.0,
    soapMigration: 0.0,
    biologicalCreep: 0.0,
    moistureSaturation: 0.0,
    
    // Dynamic emission and state change fields
    energyFlash: 0.0,
    
    // Synthetic Restoration State
    isRestored: false, // true = replaced by synthetic polymer matrix consolidant
    materialType: 'Paint Film',
    
    // Composition markers
    isCrown: false,
    isSkull: false,
    isBasquiatTeeth: false,
    isBasquiatTongue: false,
    isBasquiatScribble: false,
    isRothkoSeam: false,
    isHirstSpecimen: false,
    isKlimtGold: false,
    isKlimtSilver: false,
    isPollockDrip: false,
    isMagritteSky: false,
    isMagritteForest: false,
    
    // Substrate properties
    origR: 38,
    origG: 115,
    origB: 209,
    stressLimit: 0.6 + noise(x * 0.12, y * 0.12) * 0.35, 
    chemSusceptibility: 0.5,
    bioSusceptibility: 0.5,
    tackiness: 0.0
  };
}

function configureSubstrateFields() {
  let img = artworkImages[activeArtwork];
  
  if (img && img.width > 10) {
    // 1:1 Authentic downsampled color extraction directly from loaded image asset!
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let cell = forceGrid[x][y];
        cell.chemSusceptibility = 0.52;
        cell.bioSusceptibility = 0.15;
        
        let imgX = Math.floor(map(x, 0, cols, 0, img.width));
        let imgY = Math.floor(map(y, 0, rows, 0, img.height));
        
        let col = img.get(imgX, imgY);
        let r = 0, g = 0, b = 0;
        
        if (col && col.length >= 3 && typeof col[0] === 'number') {
          cell.origR = col[0];
          cell.origG = col[1];
          cell.origB = col[2];
          r = col[0];
          g = col[1];
          b = col[2];
        } else {
          cell.origR = 0;
          cell.origG = 0;
          cell.origB = 0;
        }
        
        // Dynamic material mappings and composition classification
        if (activeArtwork === 'basquiat') {
          // Target archetype colors for continuous, high-fidelity material RBF mapping
          const cLinen = [82, 61, 41];
          const cDark = [35, 35, 40];
          const cRed = [200, 45, 55];
          const cYellow = [230, 180, 30];
          const cWhite = [230, 230, 230];
          
          // Calculate Euclidean distances in 3D RGB color space
          let dLinen = dist(r, g, b, cLinen[0], cLinen[1], cLinen[2]);
          let dDark = dist(r, g, b, cDark[0], cDark[1], cDark[2]);
          let dRed = dist(r, g, b, cRed[0], cRed[1], cRed[2]);
          let dYellow = dist(r, g, b, cYellow[0], cYellow[1], cYellow[2]);
          let dWhite = dist(r, g, b, cWhite[0], cWhite[1], cWhite[2]);
          
          // Smooth Gaussian Radial Basis Functions to determine pixel blend contribution
          let wLinen = Math.exp(-dLinen * dLinen / 1800);
          let wDark = Math.exp(-dDark * dDark / 1600);
          let wRed = Math.exp(-dRed * dRed / 1200);
          let wYellow = Math.exp(-dYellow * dYellow / 1500);
          let wWhite = Math.exp(-dWhite * dWhite / 1200);
          
          // Prussian Blue acts as the absolute background baseline weight
          let wBlue = max(0.0, 1.0 - (wLinen + wDark + wRed + wYellow + wWhite));
          
          // Normalize weights to sum perfectly to 1.0, ensuring mathematical parameter conservation
          let sumW = wLinen + wDark + wRed + wYellow + wWhite + wBlue;
          if (sumW > 0.001) {
            wLinen /= sumW;
            wDark /= sumW;
            wRed /= sumW;
            wYellow /= sumW;
            wWhite /= sumW;
            wBlue /= sumW;
          }
          
          // Continuous, noise-free property interpolation directly mapped from pixel color values
          cell.stressLimit = wBlue * 0.75 + wLinen * 0.34 + wDark * 0.90 + wRed * 0.85 + wYellow * 0.65 + wWhite * 0.25;
          cell.chemSusceptibility = wBlue * 0.52 + wLinen * 0.20 + wDark * 0.10 + wRed * 0.30 + wYellow * 0.60 + wWhite * 0.80;
          cell.bioSusceptibility = wBlue * 0.15 + wLinen * 0.40 + wDark * 0.05 + wRed * 0.10 + wYellow * 0.12 + wWhite * 0.25;
          cell.tackiness = wDark * 0.60 + wWhite * 0.80 + wYellow * 0.30;
          cell.moistureSaturation = wLinen * 0.40;
          
          // Define discrete category tags based on the dominant material weight for text UI readouts
          let maxW = Math.max(wLinen, wDark, wRed, wYellow, wWhite, wBlue);
          if (maxW === wLinen) {
            cell.materialType = 'Unprimed Linen Support';
          } else if (maxW === wDark) {
            if (y < rows * 0.78 && x > cols * 0.15 && x < cols * 0.85) {
              cell.isSkull = true;
              cell.materialType = 'Nitrocellulose Spray';
            } else {
              cell.isCrown = true;
              cell.materialType = 'Linseed-Wax Oilstick';
            }
          } else if (maxW === wRed) {
            cell.isBasquiatTongue = true;
            cell.materialType = 'Vivid Acrylic Splash';
          } else if (maxW === wYellow) {
            cell.isBasquiatTeeth = true;
            cell.materialType = 'Mustard Oil Paint';
          } else if (maxW === wWhite) {
            if (y > rows * 0.08 && y < rows * 0.26 && x > cols * 0.3 && x < cols * 0.8) {
              cell.isBasquiatScribble = true;
              cell.materialType = 'White Oilstick Script';
            } else {
              cell.isBasquiatScribble = true;
              cell.materialType = 'White Oilstick Highlight';
            }
          } else {
            cell.materialType = 'Prussian Blue Acrylic';
          }
        } else if (activeArtwork === 'rothko') {
          cell.stressLimit = 0.96; 
          cell.bioSusceptibility = 0.05;
          
          // Classify by actual color to avoid hard horizontal lines
          let isViolet = (b > g * 1.25 && r > g * 1.05);
          let isGreen = (g > r * 1.15 && g > b * 1.05);
          let isRed = (r > g * 1.4 && r > b * 1.4);
          
          if (isViolet) {
            cell.chemSusceptibility = 0.65;
            cell.materialType = 'Violet Dammar Wash';
            cell.stressLimit = 0.88;
          } else if (isGreen) {
            cell.chemSusceptibility = 0.38;
            cell.materialType = 'Viridian Egg Glaze';
            cell.stressLimit = 0.92;
          } else if (isRed) {
            cell.chemSusceptibility = 0.99;
            cell.materialType = 'PR49 Lithol Red Azo';
            cell.stressLimit = 0.96;
          } else {
            // Organic transitional zone (seam)
            cell.isRothkoSeam = true;
            cell.stressLimit = 0.55;
            cell.materialType = 'Hygroscopic Animal Glue';
          }
        } 
        else if (activeArtwork === 'hirst') {
          // Dynamic color reference sampling of the canvas background
          let bgCol = img.get(0, 0);
          let bgR = bgCol[0], bgG = bgCol[1], bgB = bgCol[2];
          let colorDist = dist(r, g, b, bgR, bgG, bgB);
          
          if (colorDist > 32) {
            // High-contrast coordinates indicate organic butterfly specimen
            cell.isHirstSpecimen = true;
            cell.bioSusceptibility = 0.99; 
            cell.stressLimit = 0.88;
            cell.materialType = 'Morpho Peleides Chitin';
          } else {
            // Clean glossy background
            cell.stressLimit = 0.24; 
            cell.chemSusceptibility = 0.1;
            cell.bioSusceptibility = 0.01;
            cell.materialType = 'Commercial Ripolin Alkyd';
          }
        } 
        else if (activeArtwork === 'klimt') {
          cell.stressLimit = 0.65;
          cell.chemSusceptibility = 0.2;
          cell.bioSusceptibility = 0.0;
          cell.materialType = 'Chalk Ground Gesso';
          
          let isGold = (r > 130 && g > 90 && b < 90 && r > g);
          let isSilver = (r > 165 && g > 165 && b > 165 && Math.abs(r - g) < 20 && Math.abs(g - b) < 20);
          let isFlesh = (r > 180 && g > 140 && b > 115 && r > g && g > b);
          let isWhiteDress = (r > 185 && g > 185 && b > 185 && !isSilver);
          
          if (isSilver) {
            cell.isKlimtSilver = true;
            cell.stressLimit = 0.28;
            cell.chemSusceptibility = 0.99;
            cell.materialType = 'Genuine Silver Leaf';
          } else if (isGold) {
            cell.isKlimtGold = true;
            cell.stressLimit = 0.35;
            cell.materialType = 'Byzantine Gold Leaf';
          } else if (isFlesh) {
            cell.materialType = 'Delicate Portrait Glaze';
            cell.chemSusceptibility = 0.3;
            cell.stressLimit = 0.85;
          } else if (isWhiteDress) {
            cell.materialType = 'Flowing Silk Gown';
            cell.chemSusceptibility = 0.4;
            cell.stressLimit = 0.75;
          }
        } 
        else if (activeArtwork === 'pollock') {
          cell.stressLimit = 0.85;
          cell.chemSusceptibility = 0.0;
          cell.bioSusceptibility = 0.0;
          cell.materialType = 'Rigid Masonite Board';
          
          let isBlack = (r < 55 && g < 55 && b < 55);
          let isWhite = (r > 195 && g > 195 && b > 195);
          let isYellow = (r > 160 && g > 140 && b < 90 && r > g);
          let isRed = (r > 150 && g < 80 && b < 80);
          let isSilver = (r > 100 && g > 100 && b > 100 && Math.abs(r - g) < 15 && Math.abs(g - b) < 15);
          
          if (isBlack || isWhite || isYellow || isRed || isSilver) {
            cell.isPollockDrip = true;
            cell.stressLimit = 0.3;
            if (isBlack) cell.materialType = 'Liquid Black Alkyd';
            else if (isWhite) cell.materialType = 'Titanium White Enamel';
            else if (isYellow) cell.materialType = 'Chrome Yellow Drip';
            else if (isRed) cell.materialType = 'Alizarin Crimson Splatter';
            else cell.materialType = 'Liquid Silver Enamel';
          }
        } 
        else if (activeArtwork === 'magritte') {
          cell.stressLimit = 0.92;
          cell.bioSusceptibility = 0.0;
          
          let isWarmLight = (r > 180 && g > 150 && b < 110 && y > rows * 0.5);
          let isSky = (b > 100 || (r > 120 && g > 120 && b > 120 && y < rows * 0.6));
          
          if (isWarmLight) {
            cell.materialType = 'Luminescent Streetlamp Wash';
            cell.chemSusceptibility = 0.05;
            cell.stressLimit = 0.95;
          } else if (isSky) {
            cell.isMagritteSky = true;
            cell.chemSusceptibility = 0.95; 
            cell.materialType = 'Prussian Blue Sky';
          } else {
            cell.isMagritteForest = true;
            cell.bioSusceptibility = 0.85; 
            cell.stressLimit = 0.72;
            cell.materialType = 'Zinc Oxide Oil Base';
          }
        }
      }
    }
  } else {
    // FALLBACK PROCEDURAL GENERATION (Ensures perfect backward compatibility if image assets are not loaded yet)
    if (activeArtwork === 'basquiat') {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let cell = forceGrid[x][y];
          cell.chemSusceptibility = 0.52;
          cell.bioSusceptibility = 0.15;
          cell.materialType = 'Prussian Blue Acrylic';
          
          if (x < 6 || x > cols - 7 || y < 6 || y > rows - 7) {
            cell.stressLimit = 0.34; 
            cell.moistureSaturation = 0.4;
            cell.materialType = 'Unprimed Linen Support';
          }
          
          let dx = x - cols / 2;
          let dy = y - rows / 2;
          let isHead = (dx*dx*1.4 + dy*dy < 400) && dy < 5;
          let isJaw = (Math.abs(dx) < 10 && dy >= 5 && dy < 18);
          let isTeeth = isJaw && (dy > 8 && dy < 15) && (x % 3 === 0);
          
          if (isHead || isJaw || isTeeth) {
            cell.isSkull = true;
            cell.tackiness = 0.95;
            cell.stressLimit = 0.9;
            cell.materialType = 'Nitrocellulose Spray';
          }
          
          if (y < rows/2 - 22 && y > rows/2 - 36 && Math.abs(dx) < 12) {
            cell.isCrown = true;
            cell.tackiness = 0.8;
            cell.stressLimit = 0.25; 
            cell.materialType = 'Linseed-Wax Oilstick';
          }
        }
      }
    } else if (activeArtwork === 'rothko') {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let cell = forceGrid[x][y];
          cell.stressLimit = 0.96; 
          cell.bioSusceptibility = 0.05;
          
          let yNorm = y / rows;
          let n1 = noise(x * 0.08, y * 0.08) * 0.05;
          let border1 = 0.35 + n1;
          let border2 = 0.63 + n1;
          
          if (yNorm < border1) {
            cell.chemSusceptibility = 0.65;
            cell.materialType = 'Violet Dammar Wash';
            cell.stressLimit = 0.88;
          } else if (yNorm < border2) {
            cell.chemSusceptibility = 0.38;
            cell.materialType = 'Viridian Egg Glaze';
            cell.stressLimit = 0.92;
          } else {
            cell.chemSusceptibility = 0.99;
            cell.materialType = 'PR49 Lithol Red Azo';
            cell.stressLimit = 0.96;
          }
          
          // Organic transitional zone (seam)
          if (Math.abs(yNorm - border1) < 0.045 || Math.abs(yNorm - border2) < 0.045) {
            cell.isRothkoSeam = true;
            cell.stressLimit = 0.55; 
            cell.materialType = 'Hygroscopic Animal Glue';
          }
        }
      }
    } else if (activeArtwork === 'hirst') {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let cell = forceGrid[x][y];
          cell.stressLimit = 0.24; 
          cell.chemSusceptibility = 0.1;
          cell.bioSusceptibility = 0.01;
          cell.materialType = 'Commercial Ripolin Alkyd';
          
          // 4x3 Grid of specimens
          const colsCount = 4;
          const rowsCount = 3;
          const spacingX = cols / (colsCount + 1);
          const spacingY = rows / (rowsCount + 1);
          
          for (let i = 1; i <= colsCount; i++) {
            for (let j = 1; j <= rowsCount; j++) {
              let cx = Math.round(i * spacingX);
              let cy = Math.round(j * spacingY);
              let dx = x - cx;
              let dy = y - cy;
              
              // Symmetrical detailed butterfly shape
              let isBody = (dx === 0 && Math.abs(dy) <= 4);
              let isLeftUpper = (dx < 0 && dx >= -5 && dy < 0 && dy >= -4 && Math.abs(dx) >= Math.abs(dy) * 0.7);
              let isRightUpper = (dx > 0 && dx <= 5 && dy < 0 && dy >= -4 && Math.abs(dx) >= Math.abs(dy) * 0.7);
              let isLeftLower = (dx < 0 && dx >= -4 && dy >= 0 && dy <= 3 && Math.abs(dx) >= Math.abs(dy) * 0.8);
              let isRightLower = (dx > 0 && dx <= 4 && dy >= 0 && dy <= 3 && Math.abs(dx) >= Math.abs(dy) * 0.8);
              
              if (isBody || isLeftUpper || isRightUpper || isLeftLower || isRightLower) {
                cell.isHirstSpecimen = true;
                cell.bioSusceptibility = 0.99; 
                cell.stressLimit = 0.88;
                cell.materialType = 'Morpho Peleides Chitin';
              }
            }
          }
        }
      }
    } else if (activeArtwork === 'klimt') {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let cell = forceGrid[x][y];
          cell.stressLimit = 0.65;
          cell.chemSusceptibility = 0.2;
          cell.bioSusceptibility = 0.0;
          cell.materialType = 'Chalk Ground Gesso';
          
          let dx = x - cols / 2;
          let dy = y - rows / 2;
          
          // Female figure standing in the center
          let isHair = (Math.abs(dx) < 8 && dy < -rows * 0.28 && dy > -rows * 0.42);
          let isHead = (Math.abs(dx) < 6 && dy < -rows * 0.25 && dy > -rows * 0.38);
          let isBody = (Math.abs(dx) < 14 && dy >= -rows * 0.25);
          
          if (isHair) {
            cell.materialType = 'Delicate Portrait Glaze'; // dark hair
            cell.chemSusceptibility = 0.3;
            cell.stressLimit = 0.85;
          } else if (isHead) {
            cell.materialType = 'Delicate Portrait Glaze'; // skin tone
            cell.chemSusceptibility = 0.3;
            cell.stressLimit = 0.85;
          } else if (isBody) {
            cell.materialType = 'Flowing Silk Gown'; // white dress with patterned silk
            cell.chemSusceptibility = 0.4;
            cell.stressLimit = 0.75;
          } else {
            // Background gold spirals and silver panels
            let spiralNoise = noise(x * 0.15, y * 0.15);
            let goldFreq = (Math.sin(x * 0.25) * Math.cos(y * 0.25) > 0.12) || (spiralNoise > 0.62);
            
            if (goldFreq) {
              cell.isKlimtGold = true;
              cell.stressLimit = 0.35;
              cell.chemSusceptibility = 0.1;
              cell.materialType = 'Byzantine Gold Leaf';
            }
            
            if (cell.isKlimtGold && (x * y) % 17 < 3 && noise(x*0.1, y*0.1) > 0.45) {
              cell.isKlimtSilver = true;
              cell.stressLimit = 0.28;
              cell.chemSusceptibility = 0.99; 
              cell.materialType = 'Genuine Silver Leaf';
            }
          }
        }
      }
    } else if (activeArtwork === 'pollock') {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let cell = forceGrid[x][y];
          cell.stressLimit = 0.85;
          cell.chemSusceptibility = 0.0;
          cell.bioSusceptibility = 0.0;
          cell.materialType = 'Rigid Masonite Board';
          
          // Generate realistic chaotic paint filaments using multi-frequency ridge noise
          let nBlack = Math.abs(noise(x * 0.14, y * 0.14) - 0.5);
          let nWhite = Math.abs(noise(x * 0.16 + 50, y * 0.16) - 0.5);
          let nSilver = Math.abs(noise(x * 0.18 + 100, y * 0.18) - 0.5);
          let nYellow = noise(x * 0.2 + 150, y * 0.2);
          
          let isBlack = (nBlack < 0.038);
          let isWhite = (nWhite < 0.032);
          let isSilver = (nSilver < 0.026);
          let isYellow = (nYellow > 0.72);
          
          if (isBlack || isWhite || isSilver || isYellow) {
            cell.isPollockDrip = true;
            cell.stressLimit = 0.3;
            
            if (isBlack) cell.materialType = 'Liquid Black Alkyd';
            else if (isWhite) cell.materialType = 'Titanium White Enamel';
            else if (isSilver) cell.materialType = 'Liquid Silver Enamel';
            else cell.materialType = 'Chrome Yellow Drip';
          }
        }
      }
    } else if (activeArtwork === 'magritte') {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          let cell = forceGrid[x][y];
          cell.stressLimit = 0.92;
          cell.bioSusceptibility = 0.0;
          
          let forestNoise = noise(x * 0.06) * 12.0;
          let horizonY = rows * 0.52 + forestNoise;
          
          let lampX = cols * 0.35;
          let lampY = rows * 0.72;
          
          let dx = x - lampX;
          let dy = y - lampY;
          let distToLamp = Math.sqrt(dx*dx + dy*dy);
          
          if (y < horizonY) {
            cell.isMagritteSky = true;
            cell.chemSusceptibility = 0.95; 
            cell.materialType = 'Prussian Blue Sky';
          } else {
            cell.isMagritteForest = true;
            cell.bioSusceptibility = 0.85; 
            cell.stressLimit = 0.72;
            cell.materialType = 'Zinc Oxide Oil Base';
            
            // Streetlamp light bulb and post
            if (distToLamp < 4.0 || (Math.abs(dx) < 1.0 && y >= lampY && y < lampY + 12)) {
              cell.materialType = 'Luminescent Streetlamp Wash';
              cell.chemSusceptibility = 0.05;
              cell.stressLimit = 0.95;
            }
          }
        }
      }
    }
  }
}

function updateGenerativeForces(rh, temp, uv, dust, overrideEnvScale) {
  let deltaRH = Math.abs(rh - 0.5);
  let tempDrop = Math.max(0, 21.0 - temp);
  
  // Calculate dynamic physical environment scale based on stable vs failure situations
  let envScale = 1.0;
  if (overrideEnvScale !== undefined) {
    envScale = overrideEnvScale;
  } else {
    if (activeCycle === 'freeport') {
      envScale = 0.003; // extremely slow vault aging (centuries)
    } else if (activeCycle === 'museum') {
      envScale = 0.02;  // slow museum aging (years)
    } else if (activeCycle === 'penthouse') {
      envScale = 0.15;  // realistic penthouse exposure (decades)
    } else if (activeCycle === 'catastrophe') {
      envScale = 4.5;   // rapid physical failure (hours/days)
    }
  }
  
  // Simultaneous organic UV light undulation using slowly shifting 2D noise
  let timeVal = frameCount * 0.005 * timeScale;
  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let cell = forceGrid[x][y];
      
      // Decay dynamic state-change glow (cooling embers)
      if (cell.energyFlash > 0.01) {
        cell.energyFlash *= 0.88;
      } else {
        cell.energyFlash = 0.0;
      }
      
      // Moisture diffusion
      if (x === 0 || y === 0 || x === cols - 1 || y === rows - 1) {
        cell.moistureSaturation = lerp(cell.moistureSaturation, rh, 0.18);
      } else {
        cell.moistureSaturation = cell.moistureSaturation + 0.03 * (
          forceGrid[x+1][y].moistureSaturation +
          forceGrid[x-1][y].moistureSaturation +
          forceGrid[x][y+1].moistureSaturation +
          forceGrid[x][y-1].moistureSaturation -
          4.0 * cell.moistureSaturation
        );
      }
      
      // A. MECHANICAL STRESS & CRACK FRACTURES (Magenta)
      if (cell.fractureDensity < 0.9) {
        // Elastic relaxation factor: as overall fracturing increases, internal structural stress relaxes
        let relaxation = max(0.06, 1.0 - (mechanicalDecay / 100.0) * 0.85);
        
        // Scaled down for highly gradual and realistic craquelure growth over years
        let strain = ((deltaRH * 0.00018) + (tempDrop * 0.000036) + (cell.moistureSaturation * 0.000068)) * relaxation * envScale;
        
        if (activeArtwork === 'basquiat') {
          strain *= 2.4;
          if (cell.isCrown) strain *= 3.8;
        } else if (activeArtwork === 'hirst') {
          if (cell.isHirstSpecimen) {
            strain *= 0.1;
          } else {
            strain *= 4.0;
          }
        } else if (activeArtwork === 'rothko') {
          if (cell.isRothkoSeam) strain *= 3.2;
        } else if (activeArtwork === 'klimt') {
          strain *= 1.8;
          if (cell.isKlimtGold) strain *= 2.6; // metal-gesso boundary shears rapidly
        } else if (activeArtwork === 'pollock') {
          // Pollock's thick liquid industrial alkyd shrinks violently by 4%!
          strain *= 6.8; 
          if (cell.isPollockDrip) strain *= 3.8;
        } else if (activeArtwork === 'magritte') {
          strain *= 1.5;
          if (cell.isMagritteForest) strain *= 1.9;
        }
        
        // Synthetic restored resin is highly brittle
        if (cell.isRestored) {
          strain *= 5.0; 
          cell.stressLimit = 0.2; 
        }
        
        cell.mechanicalStress += strain;
        
        // Pre-fracture warning sparks at high-stress threshold coordinates
        let strainRatio = cell.mechanicalStress / cell.stressLimit;
        if (strainRatio > 0.85 && random(1.0) < 0.018) {
          cell.energyFlash = random(0.25, 0.55); // high-tension warning flash
        }
        
        // Highly sophisticated Craquelure Crack Propagation Logic:
        // Cracks grow outward from high-stress seeds (edges, corners, boundaries)
        // or propagate into neighboring cells. This forms beautiful connected veins rather than random dots!
        let canCrack = false;
        
        if (x < 3 || y < 3 || x > cols - 4 || y > rows - 4 || cell.isRothkoSeam || cell.isKlimtGold) {
          canCrack = true; // Stretcher frames and layered seams act as boundary stress concentrators
        } 
        else if (activeArtwork === 'pollock' && cell.isPollockDrip && random(1.0) < 0.04) {
          canCrack = true; // Poured drip tracks act as localized micro-shrinkage seeds
        }
        else {
          // Check for cracked adjacent neighbors (crack grows along its tip!)
          if ((x > 0 && forceGrid[x-1][y].fractureDensity > 0.9) || 
              (x < cols - 1 && forceGrid[x+1][y].fractureDensity > 0.9) || 
              (y > 0 && forceGrid[x][y-1].fractureDensity > 0.9) || 
              (y < rows - 1 && forceGrid[x][y+1].fractureDensity > 0.9)) {
            canCrack = true;
          }
        }
        
        if (canCrack && cell.mechanicalStress > cell.stressLimit) {
          triggerFracture(x, y);
        }
      }
      
      // B. PHOTOCHEMICAL PHOTO-FADING (Violet / Cyan)
      if (!cell.isRestored) {
        // Light touches the whole canvas simultaneously, modulated by shifting cloud shadow noise
        let uvNoise = noise(x * 0.08, y * 0.08, timeVal);
        
        // Spotlight intensity falloff towards edges (standard gallery spotlight simulation)
        let dx = (x - cols / 2) / (cols / 2);
        let dy = (y - rows / 3) / (rows / 3);
        let spotIntensity = max(0.2, 1.0 - (dx * dx + dy * dy) * 0.35);
        
        let localUV = uv * uvNoise * spotIntensity;
        
        if (localUV > 0.02) {
          cell.photolyticBleach += localUV * 0.0019 * cell.chemSusceptibility * envScale;
          cell.photolyticBleach = constrain(cell.photolyticBleach, 0.0, 1.0);
        }
      }
      
      // C. MOLECULAR MIGRATION & SAPONIFICATION (Amber / Gold)
      if (activeArtwork === 'basquiat') {
        if (cell.isSkull) {
          cell.soapMigration += (dust * 0.00004) * envScale;
          cell.soapMigration = constrain(cell.soapMigration, 0.0, 1.0);
        }
      } 
      else if (activeArtwork === 'rothko') {
        if (cell.isRothkoSeam && cell.moistureSaturation > 0.3) {
          let seamSapon = (cell.moistureSaturation * 0.0011) + (tempDrop * 0.00015);
          cell.soapMigration += seamSapon * envScale;
          cell.soapMigration = constrain(cell.soapMigration, 0.0, 1.0);
        } else if (cell.moistureSaturation > 0.4) {
          cell.soapMigration += (cell.moistureSaturation * 0.0003) * envScale;
          cell.soapMigration = constrain(cell.soapMigration, 0.0, 1.0);
        }
      }
      else if (activeArtwork === 'hirst') {
        if (!cell.isHirstSpecimen) {
          cell.soapMigration += ((uv * 0.00019) + (temp * 0.00001)) * envScale;
          cell.soapMigration = constrain(cell.soapMigration, 0.0, 0.95);
        }
      }
      else if (activeArtwork === 'klimt') {
        // Klimt: lead soaps erupting circular amber nodes through gold foil under moisture
        if (cell.isKlimtGold && cell.moistureSaturation > 0.35) {
          cell.soapMigration += (cell.moistureSaturation * 0.001) * envScale;
          cell.soapMigration = constrain(cell.soapMigration, 0.0, 1.0);
        }
      }
      else if (activeArtwork === 'magritte') {
        // Magritte: zinc oxide soaps forming surface efflorescence haze in deep forest
        if (cell.isMagritteForest && cell.moistureSaturation > 0.28) {
          cell.soapMigration += (cell.moistureSaturation * 0.0008) * envScale;
          cell.soapMigration = constrain(cell.soapMigration, 0.0, 0.9);
        }
      }
      
      // General Lead Soap Crystallisation Growth (forms gorgeous circular gold-amber islands)
      if (cell.soapMigration > 0.35 && random(1.0) < 0.08) {
        let rx = x + Math.floor(random(-1, 2));
        let ry = y + Math.floor(random(-1, 2));
        if (rx >= 0 && rx < cols && ry >= 0 && ry < rows) {
          let neighbor = forceGrid[rx][ry];
          neighbor.soapMigration = max(neighbor.soapMigration, cell.soapMigration * 0.94);
        }
      }
      
      // D. BIOLOGICAL DECAY & MOLD CREEP / EFFLORESCENCE (Teal / Green)
      if (cell.bioSusceptibility > 0.5 && !cell.isRestored) {
        let bioGrowth = 0.0;
        if (activeArtwork === 'magritte') {
          // Zinc soap haze efflorescence crawling over dark nocturnal paint
          if (rh > 0.4) {
            bioGrowth = (rh - 0.4) * 0.0014;
          }
        } else {
          // Mold growth on butterfly specimen chitin
          if (rh > 0.6) {
            bioGrowth = (rh - 0.6) * 0.0022;
          }
        }
        
        cell.biologicalCreep += (bioGrowth + temp * 0.00003) * envScale;
        cell.biologicalCreep = constrain(cell.biologicalCreep, 0.0, 1.0);
        
        // Fungal creep spreads in elegant, dendritic branches (creeping teal hyphae networks)
        if (cell.biologicalCreep > 0.35 && random(1.0) < 0.12) {
          let dirX = random(1.0) < 0.5 ? 1 : -1;
          let dirY = random(1.0) < 0.5 ? 1 : -1;
          let rx = x + (random(1.0) < 0.6 ? dirX : 0);
          let ry = y + (random(1.0) < 0.6 ? 0 : dirY);
          if (rx >= 0 && rx < cols && ry >= 0 && ry < rows) {
            let neighbor = forceGrid[rx][ry];
            neighbor.bioSusceptibility = max(neighbor.bioSusceptibility, 0.7);
            neighbor.biologicalCreep = max(neighbor.biologicalCreep, cell.biologicalCreep * 0.92);
          }
        }
      }
    }
  }
}

function injectFootstepVibrations() {
  let count = Math.floor(random(2, 6));
  for (let c = 0; c < count; c++) {
    let edgeX = random(1.0) < 0.5 ? 0 : cols - 1;
    let edgeY = Math.floor(random(rows));
    if (random(1.0) < 0.5) {
      edgeX = Math.floor(random(cols));
      edgeY = random(1.0) < 0.5 ? 0 : rows - 1;
    }
    
    let cell = forceGrid[edgeX][edgeY];
    if (cell.fractureDensity < 0.9) {
      cell.mechanicalStress += 0.45; 
      cell.energyFlash = 0.85; // dynamic vibration spark
    }
  }
}

function triggerFracture(x, y) {
  let cell = forceGrid[x][y];
  if (cell.fractureDensity >= 1.0) return;
  
  cell.fractureDensity = 1.0;
  cell.mechanicalStress = 0.0;
  cell.energyFlash = 1.0; // high-intensity electric snapping discharge!
  
  // Crack propagates in beautiful long flowing lines
  let dirX = random(1.0) < 0.5 ? 1 : -1;
  let dirY = random(1.0) < 0.5 ? 1 : -1;
  
  // Propagate along horizontal or vertical paths
  if (random(1.0) < 0.6) {
    let nx = x + dirX;
    if (nx >= 0 && nx < cols) {
      let neighbor = forceGrid[nx][y];
      if (neighbor.fractureDensity < 0.9) {
        neighbor.mechanicalStress += neighbor.stressLimit * 0.72; // Transfer high localized stress concentration
        neighbor.energyFlash = max(neighbor.energyFlash, 0.5); // propagation energy glow
      }
    }
  } else {
    let ny = y + dirY;
    if (ny >= 0 && ny < rows) {
      let neighbor = forceGrid[x][ny];
      if (neighbor.fractureDensity < 0.9) {
        neighbor.mechanicalStress += neighbor.stressLimit * 0.72; // Transfer high localized stress concentration
        neighbor.energyFlash = max(neighbor.energyFlash, 0.5); // propagation energy glow
      }
    }
  }
  
  // Rare perpendicular branching crack tip
  if (random(1.0) < 0.08) {
    let bx = x + (random(1.0) < 0.5 ? 1 : -1);
    let by = y + (random(1.0) < 0.5 ? 1 : -1);
    if (bx >= 0 && bx < cols && by >= 0 && by < rows) {
      let branch = forceGrid[bx][by];
      if (branch.fractureDensity < 0.9) {
        branch.mechanicalStress += branch.stressLimit * 0.5;
        branch.energyFlash = max(branch.energyFlash, 0.35);
      }
    }
  }
}

function runResurrectionScan() {
  restoreSweepY += 6 * timeScale;
  
  let sweepGridY = Math.floor(map(restoreSweepY, 0, height, 0, rows));
  
  if (sweepGridY >= 0 && sweepGridY < rows) {
    for (let x = 0; x < cols; x++) {
      let cell = forceGrid[x][sweepGridY];
      
      if (cell.fractureDensity > 0.0 || cell.biologicalCreep > 0.4 || cell.photolyticBleach > 0.4) {
        cell.isRestored = true;
        
        cell.fractureDensity = 0.0;
        cell.biologicalCreep = 0.0;
        cell.photolyticBleach = 0.0;
        cell.soapMigration = 0.0;
        cell.mechanicalStress = 0.0;
        cell.moistureSaturation = 0.0;
      }
    }
  }
  
  if (restoreSweepY >= height) {
    assetStatus = 'monitoring';
    isResurrected = true;
    restoreSweepY = 0;
    
    // reset valuation on synthetic copy
    currentValuation = substrates[activeArtwork].startingValuation * 0.35;
    
    metaStatus.innerText = "CONSOLIDATED";
    metaStatus.style.color = "var(--accent-orange)";
    simBadge.innerText = "SYNTHETIC CLONE";
    simBadge.style.color = "var(--accent-orange)";
    simBadge.style.borderColor = "rgba(255, 90, 0, 0.4)";
    simBadge.style.background = "rgba(255, 90, 0, 0.15)";
  }
}

function renderRadarGrid() {
  const cellWidth = width / cols;
  const cellHeight = height / rows;
  
  noStroke();
  
  // Dynamic simultaneous UV exposure noise reference
  let timeVal = frameCount * 0.005;
  
  // Single-Pass High-Contrast Sharp LED Matrix Emitter rendering
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let cell = forceGrid[x][y];
      let r = 0, g = 0, b = 0;
      
      // Calculate dynamic backing visibility (blooms and fades based on active transitions/state changes)
      let activity = cell.energyFlash * 0.95 + 
                     (cell.moistureSaturation * 0.35 + 
                      cell.photolyticBleach * 0.35 + 
                      cell.soapMigration * 0.35 + 
                      cell.biologicalCreep * 0.35);
      let alphaBacking = constrain(activity, 0.0, 1.0);
      
      if (cell.isRestored) {
        // SYNTHETIC RESIN PLASTIC GLOW (Neon Cyan / Electric Orange)
        let noiseSel = noise(x * 0.2, y * 0.2);
        if (noiseSel < 0.5) {
          r = colors.syntheticCyan[0];
          g = colors.syntheticCyan[1];
          b = colors.syntheticCyan[2];
        } else {
          r = colors.syntheticOrange[0];
          g = colors.syntheticOrange[1];
          b = colors.syntheticOrange[2];
        }
      } else {
        // Start with a silent, velvety midnight-slate baseline
        r = 2; g = 2; b = 3;
        
        // Faint, dynamic ghost composition backing (always has a subtle base outline that blooms under transition/degradation forces)
        let visibleAlpha = max(0.06, alphaBacking);
        let rGhost = 2, gGhost = 2, bGhost = 3;
        
        if (activeArtwork === 'basquiat') {
          let img = artworkImages.basquiat;
          if (img && img.width > 10) {
            rGhost = cell.origR;
            gGhost = cell.origG;
            bGhost = cell.origB;
          } else {
            let isMargin = (x < 6 || x > cols - 7 || y < 6 || y > rows - 7);
            let isStretcher = !isMargin && (Math.abs(x - y * (cols/rows)) < 1.5 || Math.abs(x - (rows - y) * (cols/rows)) < 1.5);
            
            if (isMargin) {
              rGhost = 82; gGhost = 61; bGhost = 41; // raw linen margins
            } else if (isStretcher) {
              rGhost = 66; gGhost = 46; bGhost = 31; // wooden stretchers
            } else {
              // Procedural composition layout
              if (cell.isCrown) {
                rGhost = 72; gGhost = 12; bGhost = 30; // warm gold/crimson
              } else if (cell.isSkull) {
                rGhost = 40; gGhost = 40; bGhost = 48; // bone white skull
              } else {
                rGhost = 38; gGhost = 115; bGhost = 209; // sky blue
              }
            }
          }
        } else if (activeArtwork === 'rothko') {
          let img = artworkImages.rothko;
          if (img && img.width > 10) {
            rGhost = cell.origR;
            gGhost = cell.origG;
            bGhost = cell.origB;
          } else {
            let yNorm = y / rows;
            let nTex = noise(x * 0.1, y * 0.1) * 20 - 10;
            
            // Feathered soft blending zones
            let border1 = 0.35 + noise(x * 0.08) * 0.05;
            let border2 = 0.63 + noise(x * 0.08) * 0.05;
            
            if (yNorm < border1 - 0.03) {
              rGhost = 32 + nTex; gGhost = 8; bGhost = 68 + nTex; // violet
            } else if (yNorm < border1 + 0.03) {
              // blend violet to green
              let t = map(yNorm, border1 - 0.03, border1 + 0.03, 0, 1);
              rGhost = lerp(32, 8, t) + nTex;
              gGhost = lerp(8, 52, t) + nTex;
              bGhost = lerp(68, 28, t) + nTex;
            } else if (yNorm < border2 - 0.03) {
              rGhost = 8 + nTex; gGhost = 52 + nTex; bGhost = 28 + nTex; // green
            } else if (yNorm < border2 + 0.03) {
              // blend green to red
              let t = map(yNorm, border2 - 0.03, border2 + 0.03, 0, 1);
              rGhost = lerp(8, 195, t) + nTex;
              gGhost = lerp(52, 30, t) + nTex;
              bGhost = lerp(28, 40, t) + nTex;
            } else {
              rGhost = 195 + nTex; gGhost = 30 + nTex; bGhost = 40 + nTex; // red
            }
            
            if (cell.isRothkoSeam) {
              rGhost = lerp(rGhost, 55, 0.45);
              gGhost = lerp(gGhost, 38, 0.45);
              bGhost = lerp(bGhost, 10, 0.45);
            }
          }
        } else if (activeArtwork === 'hirst') {
          let img = artworkImages.hirst;
          if (img && img.width > 10) {
            rGhost = cell.origR;
            gGhost = cell.origG;
            bGhost = cell.origB;
          } else {
            // Clean high-gloss off-white backing
            rGhost = 236; gGhost = 234; bGhost = 228;
            
            if (cell.isHirstSpecimen) {
              // Detailed, colorful grid of specimens
              const colsCount = 4;
              const rowsCount = 3;
              const spacingX = cols / (colsCount + 1);
              const spacingY = rows / (rowsCount + 1);
              
              // Find which specimen center this cell belongs to
              let minD = 9999;
              let targetI = 1, targetJ = 1;
              for (let i = 1; i <= colsCount; i++) {
                for (let j = 1; j <= rowsCount; j++) {
                  let cx = Math.round(i * spacingX);
                  let cy = Math.round(j * spacingY);
                  let d = dist(x, y, cx, cy);
                  if (d < minD) {
                    minD = d;
                    targetI = i;
                    targetJ = j;
                  }
                }
              }
              
              let cx = Math.round(targetI * spacingX);
              let cy = Math.round(targetJ * spacingY);
              let dx = x - cx;
              let dy = y - cy;
              
              if (dx === 0 && Math.abs(dy) <= 4) {
                // dark central body
                rGhost = 35; gGhost = 25; bGhost = 18;
              } else {
                // Symmetrical colorful wings depending on i & j index
                let hueVal = (targetI * 4 + targetJ * 7) % 5;
                if (hueVal === 0) {
                  rGhost = 10; gGhost = 150; bGhost = 240; // Iridescent blue Morpho peleides
                } else if (hueVal === 1) {
                  rGhost = 240; gGhost = 100; bGhost = 10; // Orange monarch
                } else if (hueVal === 2) {
                  rGhost = 230; gGhost = 210; bGhost = 10; // Sulfur yellow
                } else if (hueVal === 3) {
                  rGhost = 15; gGhost = 220; bGhost = 120; // Emerald green
                } else {
                  rGhost = 160; gGhost = 20; bGhost = 180; // Violet/purple
                }
                
                // Add delicate wing details
                if ((Math.abs(dx) + Math.abs(dy)) % 3 === 0) {
                  rGhost = max(0, rGhost - 80);
                  gGhost = max(0, gGhost - 80);
                  bGhost = max(0, bGhost - 80);
                }
              }
            }
          }
        } else if (activeArtwork === 'klimt') {
          let dx = x - cols / 2;
          let dy = y - rows / 2;
          
          // Standing figure in the center
          let isHair = (Math.abs(dx) < 8 && dy < -rows * 0.28 && dy > -rows * 0.42);
          let isHead = (Math.abs(dx) < 6 && dy < -rows * 0.25 && dy > -rows * 0.38);
          let isBody = (Math.abs(dx) < 14 && dy >= -rows * 0.25);
          
          if (isHair) {
            rGhost = 45; gGhost = 30; bGhost = 20; // dark hair
          } else if (isHead) {
            rGhost = 245; gGhost = 205; bGhost = 185; // glowing skin tones
          } else if (isBody) {
            // Flowing silk gown white base
            rGhost = 240; gGhost = 238; bGhost = 232;
            
            // Soft vertical painterly folds using Perlin noise
            let foldNoise = noise(x * 0.08, y * 0.03);
            let foldShade = map(foldNoise, 0.3, 0.7, -25, 25);
            rGhost += foldShade;
            gGhost += foldShade;
            bGhost += foldShade;
            
            // Gorgeous organic Klimt-style decorative spiral motifs and soft vertical stripe patterns
            let patternNoise = noise(x * 0.12, y * 0.12);
            let stripeNoise = noise(x * 0.06);
            
            // Soft vertical decorative bands (delicate gray-blue/sage)
            if (stripeNoise > 0.58 && Math.abs(dx) > 2) {
              rGhost = lerp(rGhost, 85, 0.55);
              gGhost = lerp(gGhost, 110, 0.55);
              bGhost = lerp(bGhost, 100, 0.55); // beautiful sage-blue stripe
            }
            
            // Elegant painterly golden spirals on her gown using smooth threshold noise
            if (patternNoise > 0.65) {
              rGhost = 212; gGhost = 175; bGhost = 55; // Klimt gold ornament
              // Add metallic relief shading
              if (noise(x * 0.3, y * 0.3) > 0.55) {
                rGhost = 160; gGhost = 120; bGhost = 30;
              }
            }
          } else {
            // Red-coral background
            rGhost = 140; gGhost = 35; bGhost = 30;
            
            if (cell.isKlimtSilver) {
              rGhost = 215; gGhost = 215; bGhost = 225; // reflective silver leaf
            } else if (cell.isKlimtGold) {
              rGhost = 220; gGhost = 165; bGhost = 30; // shimmering gold leaf
              // Organic, hand-crafted gold leaf texture and soft spiral shading
              let goldTexture = noise(x * 0.2, y * 0.2);
              if (goldTexture > 0.58) {
                rGhost = 175; gGhost = 115; bGhost = 10; // warm gold relief shadows
              }
            }
          }
        } else if (activeArtwork === 'pollock') {
          let img = artworkImages.pollock;
          if (img && img.width > 10) {
            rGhost = cell.origR;
            gGhost = cell.origG;
            bGhost = cell.origB;
          } else {
            // Fibrous unprimed Masonite backing
            let nWood = noise(x * 0.15, y * 0.05) * 15 - 7.5;
            rGhost = 115 + nWood; gGhost = 85 + nWood; bGhost = 55 + nWood;
            
            if (cell.isPollockDrip) {
              if (cell.materialType === 'Liquid Black Alkyd') {
                rGhost = 12; gGhost = 12; bGhost = 15;
              } else if (cell.materialType === 'Titanium White Enamel') {
                rGhost = 245; gGhost = 245; bGhost = 240;
              } else if (cell.materialType === 'Liquid Silver Enamel') {
                rGhost = 180; gGhost = 185; bGhost = 190;
              } else {
                rGhost = 235; gGhost = 185; bGhost = 25; // yellow
              }
            }
          }
        } else if (activeArtwork === 'magritte') {
          let img = artworkImages.magritte;
          if (img && img.width > 10) {
            rGhost = cell.origR;
            gGhost = cell.origG;
            bGhost = cell.origB;
          } else {
            let forestNoise = noise(x * 0.06) * 12.0;
            let horizonY = rows * 0.52 + forestNoise;
            
            let lampX = cols * 0.35;
            let lampY = rows * 0.72;
            let dx = x - lampX;
            let dy = y - lampY;
            let distToLamp = Math.sqrt(dx*dx + dy*dy);
            
            if (y < horizonY) {
              // Luminous Prussian Blue Sky with soft clouds
              let cloudN = noise(x * 0.08, y * 0.08) * 140 - 70;
              rGhost = constrain(40 + cloudN * 0.6, 15, 235);
              gGhost = constrain(115 + cloudN * 0.8, 25, 240);
              bGhost = constrain(210 + cloudN * 0.5, 65, 255);
            } else {
              // Nocturnal forest background
              let leafN = noise(x * 0.25, y * 0.25) * 10 - 5;
              rGhost = 8 + leafN; gGhost = 20 + leafN; bGhost = 14 + leafN;
              
              // House silhouette in the lower-right center
              let isHouse = (x > cols * 0.55 && x < cols * 0.85 && y > horizonY + 4 && y < rows - 6);
              if (isHouse) {
                rGhost = 15; gGhost = 15; bGhost = 18; // dark house walls
                
                // Glowing golden windows
                let isWindow1 = (x > cols * 0.62 && x < cols * 0.67 && y > rows * 0.68 && y < rows * 0.76);
                let isWindow2 = (x > cols * 0.73 && x < cols * 0.78 && y > rows * 0.68 && y < rows * 0.76);
                if (isWindow1 || isWindow2) {
                  rGhost = 245; gGhost = 185; bGhost = 25; // warm gold window glow
                }
              }
              
              // Slender dark lamp post
              if (Math.abs(dx) < 1.0 && y >= lampY && y < rows - 4) {
                rGhost = 20; gGhost = 20; bGhost = 22;
              }
              
              // Spherical volumetric streetlamp glow
              if (distToLamp < 12.0) {
                let aGlow = map(distToLamp, 0, 12, 0.95, 0);
                rGhost = lerp(rGhost, 245, aGlow);
                gGhost = lerp(gGhost, 195, aGlow);
                bGhost = lerp(bGhost, 35, aGlow);
              }
            }
          }
        }
        
        // Dynamic visual mode blending: shift to glowing, high-contrast, bio-spectral heatmap!
        if (spectralStainVal > 0.01) {
          // Increase background visibility to let the glowing digital landscape stand out
          visibleAlpha = lerp(visibleAlpha, max(0.24, alphaBacking), spectralStainVal);
          
          let intensity = (rGhost + gGhost + bGhost) / 3.0;
          
          let specR = 10, specG = 10, specB = 30;
          if (activeTheme === 'xray') {
            // Highly abstract, gorgeous bio-spectral thermal color ramp (confocal dye style!)
            if (intensity < 60) {
              // Dark regions map to rich deep blues/indigo
              specR = lerp(10, 80, intensity / 60);
              specG = lerp(10, 0, intensity / 60);
              specB = lerp(30, 240, intensity / 60);
            } else if (intensity < 130) {
              // Midtones map to vibrant neon green/cyan/magenta spectrum
              specR = lerp(80, 0, (intensity - 60) / 70);
              specG = lerp(0, 255, (intensity - 60) / 70);
              specB = lerp(240, 150, (intensity - 60) / 70);
            } else {
              // Highlights map to electric yellow, fiery orange, and laser-pink
              specR = lerp(0, 255, (intensity - 130) / 125);
              specG = lerp(255, 120, (intensity - 130) / 125);
              specB = lerp(150, 0, (intensity - 130) / 125);
            }
          } else {
            // Naturalism theme color ramp (Umber/sienna shadows -> Sage-green -> Sienna clay -> Alabaster white)
            if (intensity < 60) {
              // Shadows: deep umber/sienna [25, 18, 14] shifting to sage-green [107, 112, 92]
              specR = lerp(25, 107, intensity / 60);
              specG = lerp(18, 112, intensity / 60);
              specB = lerp(14, 92, intensity / 60);
            } else if (intensity < 135) {
              // Midtones: sage-green [107, 112, 92] shifting to sienna clay [160, 128, 85]
              specR = lerp(107, 160, (intensity - 60) / 75);
              specG = lerp(112, 128, (intensity - 60) / 75);
              specB = lerp(92, 85, (intensity - 60) / 75);
            } else {
              // Highlights: sienna clay [160, 128, 85] shifting to alabaster white [230, 222, 202]
              specR = lerp(160, 230, (intensity - 135) / 120);
              specG = lerp(128, 222, (intensity - 135) / 120);
              specB = lerp(85, 202, (intensity - 135) / 120);
            }
          }
          
          rGhost = lerp(rGhost, specR, spectralStainVal);
          gGhost = lerp(gGhost, specG, spectralStainVal);
          bGhost = lerp(bGhost, specB, spectralStainVal);
        }
        
        r = lerp(r, rGhost, visibleAlpha);
        g = lerp(g, gGhost, visibleAlpha);
        b = lerp(b, bGhost, visibleAlpha);

        if (renderMode === 'visible') {
          // ==================== UNIFIED VITRINE VIEW ====================
          // Non-Saturating Interpolated Layer Blending Stack
          
          const currentColors = themeColors[activeTheme] || themeColors.xray;
          
          // Layer 1: Moisture Saturation overlay (Soft Auroral Cobalt Blue Glow / Sea-pine)
          if (cell.moistureSaturation > 0.02) {
            let aMoist = cell.moistureSaturation * 0.45;
            let moistTide = 0.8 + 0.2 * Math.sin(frameCount * 0.012 + x * 0.06);
            aMoist *= moistTide;
            let mR = lerp(colors.moisture[0] * 0.7, currentColors.moisture[0], spectralStainVal);
            let mG = lerp(colors.moisture[1] * 0.7, currentColors.moisture[1], spectralStainVal);
            let mB = lerp(colors.moisture[2], currentColors.moisture[2], spectralStainVal);
            r = lerp(r, mR, aMoist);
            g = lerp(g, mG, aMoist);
            b = lerp(b, mB, aMoist);
          }
          
          // Layer 2: Ambient Solar UV Flux (Rolling Indigo Aurora / Golden Sun-haze)
          let uvNoiseVal = noise(x * 0.08, y * 0.08, timeVal);
          let dx = (x - cols / 2) / (cols / 2);
          let dy = (y - rows / 3) / (rows / 3);
          let spotIntensity = max(0.2, 1.0 - (dx * dx + dy * dy) * 0.35);
          
          let rhFactor = cyclePresets[activeCycle].uv;
          if (activeCycle === 'penthouse') {
            let dayTime = frameCount * 0.005;
            rhFactor = max(0, Math.sin(dayTime) * 8.5);
          }
          let auroralFlow = 0.55 + 0.45 * Math.sin(frameCount * 0.015 + noise(x * 0.06, y * 0.06) * 15.0);
          let fUV = (rhFactor * uvNoiseVal * spotIntensity) * 0.16 * auroralFlow;
          
          if (fUV > 0.02) {
            let aUV = fUV * 0.75;
            let uvR = lerp(colors.uvFlux[0], currentColors.uvFlux[0], spectralStainVal);
            let uvG = lerp(colors.uvFlux[1], currentColors.uvFlux[1], spectralStainVal);
            let uvB = lerp(colors.uvFlux[2], currentColors.uvFlux[2], spectralStainVal);
            r = lerp(r, uvR, aUV);
            g = lerp(g, uvG, aUV);
            b = lerp(b, uvB, aUV);
          }
          
          // Layer 3: Photolytic Bleaching voids (Breathe/Vaporous Chemical Voids)
          if (cell.photolyticBleach > 0.02) {
            let fullyBleached = cell.photolyticBleach;
            let glowingActivity = 1.0 - fullyBleached; // less glow as it burns out
            
            let aBleach = cell.photolyticBleach * 0.85 * (0.25 + 0.75 * glowingActivity);
            let bleachBreathe = 0.85 + 0.15 * Math.sin(frameCount * 0.03 + y * 0.1);
            aBleach *= bleachBreathe;
            
            let bR = lerp(colors.bleach[0] * 0.5, currentColors.bleach[0], spectralStainVal);
            let bG = lerp(colors.bleach[1] * 0.5, currentColors.bleach[1], spectralStainVal);
            let bB = lerp(colors.bleach[2] * 0.65, currentColors.bleach[2], spectralStainVal);
            r = lerp(r, bR, aBleach);
            g = lerp(g, bG, aBleach);
            b = lerp(b, bB, aBleach);
            
            // If fully cooked, coordinates fade back into a silent, cold carbon-ash void
            if (fullyBleached > 0.94) {
              r = lerp(r, 6, 0.7);
              g = lerp(g, 6, 0.7);
              b = lerp(b, 8, 0.7);
            }
          }
          
          // Layer 4: Saponification Soap migration nodes (Twinkling Gold-Amber / Sienna Starfield)
          if (cell.soapMigration > 0.02) {
            let fullyCooked = cell.soapMigration;
            let activity = 1.0 - fullyCooked;
            
            // Twinkles dynamically while active, but freezes into solid gold-crust when cooked
            let soapTwinkle = 0.3 + 0.7 * noise(x * 0.8, y * 0.8, frameCount * 0.06) * activity;
            let aSoap = cell.soapMigration * 0.8 * (0.4 + 0.6 * soapTwinkle);
            
            let sR = lerp(colors.sapon[0] * 0.6, currentColors.sapon[0], spectralStainVal);
            let sG = lerp(colors.sapon[1] * 0.6, currentColors.sapon[1], spectralStainVal);
            let sB = lerp(colors.sapon[2] * 0.15, currentColors.sapon[2], spectralStainVal);
            r = lerp(r, sR, aSoap);
            g = lerp(g, sG, aSoap);
            b = lerp(b, sB, aSoap);
            
            if (fullyCooked > 0.94) {
              r = lerp(r, 35, 0.45); // dull solid crystalline lead soap crust
              g = lerp(g, 22, 0.45);
              b = lerp(b, 4, 0.45);
            }
          }
          
          // Layer 5: Biological creep & efflorescence haze (Bioluminescent / Sage Pulse)
          if (cell.biologicalCreep > 0.02) {
            let fullyCooked = cell.biologicalCreep;
            let activity = 1.0 - fullyCooked;
            
            let bioPulse = 0.5 + 0.5 * Math.sin(frameCount * 0.022 + (x + y) * 0.15);
            // Bioluminescent pulse fades as coordinates fully rot
            let aBio = cell.biologicalCreep * 0.85 * (0.5 + 0.5 * bioPulse * activity);
            
            let bioR = lerp(colors.biological[0] * 0.15, currentColors.biological[0], spectralStainVal);
            let bioG = lerp(colors.biological[1] * 0.8, currentColors.biological[1], spectralStainVal);
            let bioB = lerp(colors.biological[2] * 0.6, currentColors.biological[2], spectralStainVal);
            r = lerp(r, bioR, aBio);
            g = lerp(g, bioG, aBio);
            b = lerp(b, bioB, aBio);
            
            if (fullyCooked > 0.94) {
              r = lerp(r, 2, 0.75); // inert, slimy, green-black rot
              g = lerp(g, 12, 0.75);
              b = lerp(b, 6, 0.75);
            }
          }
          
          // Layer 6: Mechanical Stress & Fractures (Blinding electric/rust cracks that fade to cold seams)
          if (cell.fractureDensity > 0.0 || cell.energyFlash > 0.02) {
            let flash = cell.energyFlash;
            if (cell.fractureDensity > 0.0) {
              let baseR = lerp(12, 255, flash);
              let baseG = lerp(2, 255, flash);
              let baseB = lerp(4, 255, flash);
              
              if (flash > 0.05) {
                let cool = flash;
                baseR = lerp(colors.stress[0] * 0.4, 255, cool);
                baseG = lerp(colors.stress[1] * 0.1, 255, cool);
                baseB = lerp(colors.stress[2] * 0.2, 255, cool);
              }
              
              let specR = lerp(baseR, currentColors.stress[0], spectralStainVal);
              let specG = lerp(baseG, currentColors.stress[1], spectralStainVal);
              let specB = lerp(baseB, currentColors.stress[2], spectralStainVal);
              r = specR;
              g = specG;
              b = specB;
            } else {
              let aFlash = flash * 0.9;
              let tR = lerp(r, colors.crackTip[0], aFlash);
              let tG = lerp(g, colors.crackTip[1], aFlash);
              let tB = lerp(b, colors.crackTip[2], aFlash);
              
              r = lerp(tR, currentColors.stress[0], spectralStainVal * aFlash);
              g = lerp(tG, currentColors.stress[1], spectralStainVal * aFlash);
              b = lerp(tB, currentColors.stress[2], spectralStainVal * aFlash);
            }
          }
        } 
        else if (renderMode === 'mechanical') {
          // ==================== MECHANICAL VIEW ====================
          if (cell.fractureDensity > 0.0 || cell.energyFlash > 0.02) {
            let flash = cell.energyFlash;
            if (cell.fractureDensity > 0.0) {
              r = lerp(12, 255, flash);
              g = lerp(2, 255, flash);
              b = lerp(4, 255, flash);
              
              if (flash > 0.05) {
                let cool = flash;
                r = lerp(colors.stress[0] * 0.4, 255, cool);
                g = lerp(colors.stress[1] * 0.1, 255, cool);
                b = lerp(colors.stress[2] * 0.2, 255, cool);
              }
            } else {
              r = lerp(r, colors.crackTip[0], flash);
              g = lerp(g, colors.crackTip[1], flash);
              b = lerp(b, colors.crackTip[2], flash);
            }
          }
        } 
        else if (renderMode === 'chemical') {
          // ==================== PHOTOCHEMICAL VIEW ====================
          let uvNoiseVal = noise(x * 0.08, y * 0.08, timeVal);
          let dx = (x - cols / 2) / (cols / 2);
          let dy = (y - rows / 3) / (rows / 3);
          let spotIntensity = max(0.2, 1.0 - (dx * dx + dy * dy) * 0.35);
          
          let rhFactor = cyclePresets[activeCycle].uv;
          if (activeCycle === 'penthouse') {
            let dayTime = frameCount * 0.005;
            rhFactor = max(0, Math.sin(dayTime) * 8.5);
          }
          
          let uvStrength = (rhFactor * uvNoiseVal * spotIntensity) * 0.28;
          let auroralFlow = 0.55 + 0.45 * Math.sin(frameCount * 0.015 + noise(x * 0.06, y * 0.06) * 15.0);
          uvStrength *= auroralFlow;
          
          // Ambient UV flux overlay
          if (uvStrength > 0.02) {
            let aUV = uvStrength * 0.65;
            r = lerp(r, colors.uvFlux[0], aUV);
            g = lerp(g, colors.uvFlux[1], aUV);
            b = lerp(b, colors.uvFlux[2], aUV);
          }
          // Bleach fade overlay
          if (cell.photolyticBleach > 0.02) {
            let fullyBleached = cell.photolyticBleach;
            let glowingActivity = 1.0 - fullyBleached;
            
            let aBleach = cell.photolyticBleach * 0.8 * (0.25 + 0.75 * glowingActivity);
            let bleachBreathe = 0.85 + 0.15 * Math.sin(frameCount * 0.03 + y * 0.1);
            aBleach *= bleachBreathe;
            
            r = lerp(r, colors.bleach[0] * 0.5, aBleach);
            g = lerp(g, colors.bleach[1] * 0.5, aBleach);
            b = lerp(b, colors.bleach[2] * 0.65, aBleach);
            
            if (fullyBleached > 0.94) {
              r = lerp(r, 6, 0.7);
              g = lerp(g, 6, 0.7);
              b = lerp(b, 8, 0.7);
            }
          }
        } 
        else if (renderMode === 'sapon') {
          // ==================== SAPONIFICATION VIEW ====================
          if (cell.soapMigration > 0.02) {
            let fullyCooked = cell.soapMigration;
            let activity = 1.0 - fullyCooked;
            
            let soapTwinkle = 0.3 + 0.7 * noise(x * 0.8, y * 0.8, frameCount * 0.06) * activity;
            let aSoap = cell.soapMigration * 0.85 * (0.4 + 0.6 * soapTwinkle);
            
            r = lerp(r, colors.sapon[0] * 0.6, aSoap);
            g = lerp(g, colors.sapon[1] * 0.6, aSoap);
            b = lerp(b, colors.sapon[2] * 0.15, aSoap);
            
            if (fullyCooked > 0.94) {
              r = lerp(r, 35, 0.45);
              g = lerp(g, 22, 0.45);
              b = lerp(b, 4, 0.45);
            }
          }
        } 
        else if (renderMode === 'biological') {
          // ==================== BIOLOGICAL VIEW ====================
          if (cell.biologicalCreep > 0.02) {
            let fullyCooked = cell.biologicalCreep;
            let activity = 1.0 - fullyCooked;
            
            let bioPulse = 0.5 + 0.5 * Math.sin(frameCount * 0.022 + (x + y) * 0.15);
            let aBio = cell.biologicalCreep * 0.85 * (0.5 + 0.5 * bioPulse * activity);
            
            r = lerp(r, colors.biological[0] * 0.15, aBio);
            g = lerp(g, colors.biological[1] * 0.8, aBio);
            b = lerp(b, colors.biological[2] * 0.5, aBio);
            
            if (fullyCooked > 0.94) {
              r = lerp(r, 2, 0.75);
              g = lerp(g, 12, 0.75);
              b = lerp(b, 6, 0.75);
            }
          }
        } 
        else if (renderMode === 'moisture') {
          // ==================== MOISTURE VIEW ====================
          if (cell.moistureSaturation > 0.02) {
            let aMoist = cell.moistureSaturation * 0.85;
            let moistTide = 0.8 + 0.2 * Math.sin(frameCount * 0.012 + x * 0.06);
            aMoist *= moistTide;
            r = lerp(r, colors.moisture[0] * 0.4, aMoist);
            g = lerp(g, colors.moisture[1] * 0.4, aMoist);
            b = lerp(b, colors.moisture[2] * 0.95, aMoist);
          }
        }
      }
      
      // Directly output sharp, un-aliased circular LED diode points (creates an intentional hardware LED matrix grid)
      fill(constrain(r, 0, 255), constrain(g, 0, 255), constrain(b, 0, 255));
      ellipse(x * cellPitch + cellPitch / 2, y * cellPitch + cellPitch / 2, cellPitch * 0.72, cellPitch * 0.72);
    }
  }
  
  // High-intensity conservation scanning laser sweep line (retains glowing visual aura)
  if (assetStatus === 'restoring') {
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = 'rgba(0, 255, 200, 0.8)';
    
    stroke(0, 255, 200, 150);
    strokeWeight(6);
    line(0, restoreSweepY, width, restoreSweepY);
    
    stroke(255, 255, 255, 240);
    strokeWeight(2);
    line(0, restoreSweepY, width, restoreSweepY);
    
    noStroke();
    drawingContext.shadowBlur = 0;
  }
}

function renderHUDSweep() {
  // Artificial cockpit scan lines and radar target graphics removed for pure organic museum aesthetics
}

function updateAssetMetrics() {
  if (assetStatus === 'restoring') return; 
  
  let totalMech = 0;
  let totalChem = 0;
  let totalBio = 0;
  let count = cols * rows;
  
  // Dynamic material decay accumulators
  let matSums = {};
  let matCounts = {};
  
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let cell = forceGrid[x][y];
      let cellMech = cell.fractureDensity > 0.0 ? 1.0 : cell.mechanicalStress;
      totalMech += cellMech;
      totalChem += cell.photolyticBleach;
      totalBio += cell.biologicalCreep;
      
      // Track material type decay
      let mat = cell.materialType || 'Paint Film';
      if (!matSums[mat]) {
        matSums[mat] = 0.0;
        matCounts[mat] = 0;
      }
      // Calculate individual cell's composite decay
      let cellDecay = cellMech * 0.35 + 
                      cell.photolyticBleach * 0.35 + 
                      cell.soapMigration * 0.30 + 
                      cell.biologicalCreep * 0.30;
      matSums[mat] += cellDecay;
      matCounts[mat] += 1;
    }
  }
  
  mechanicalDecay = (totalMech / count) * 100.0;
  chemicalDecay = (totalChem / count) * 100.0;
  biologicalDecay = (totalBio / count) * 100.0;
  
  // Custom normalize bounds for visual weight based on material physics
  if (activeArtwork === 'basquiat') {
    mechanicalDecay = constrain(mechanicalDecay * 2.2, 0, 100);
    chemicalDecay = constrain(chemicalDecay * 4.2, 0, 100);
    biologicalDecay = 0.0;
  } else if (activeArtwork === 'rothko') {
    mechanicalDecay = constrain(mechanicalDecay * 0.9, 0, 100);
    chemicalDecay = constrain(chemicalDecay * 3.4, 0, 100);
    biologicalDecay = 0.0;
  } else if (activeArtwork === 'hirst') {
    mechanicalDecay = constrain(mechanicalDecay * 1.5, 0, 100);
    chemicalDecay = 0.0;
    biologicalDecay = constrain(biologicalDecay * 14.0, 0, 100);
  } else if (activeArtwork === 'klimt') {
    mechanicalDecay = constrain(mechanicalDecay * 2.6, 0, 100);
    chemicalDecay = constrain(chemicalDecay * 4.8, 0, 100); // silver oxidation tarnish
    biologicalDecay = 0.0;
  } else if (activeArtwork === 'pollock') {
    mechanicalDecay = constrain(mechanicalDecay * 4.5, 0, 100); // enamel alligator cracks
    chemicalDecay = 0.0;
    biologicalDecay = 0.0;
  } else if (activeArtwork === 'magritte') {
    mechanicalDecay = constrain(mechanicalDecay * 1.2, 0, 100);
    chemicalDecay = constrain(chemicalDecay * 3.8, 0, 100); // Prussian Blue sky photolysis
    biologicalDecay = constrain(biologicalDecay * 4.8, 0, 100); // zinc soap efflorescence
  }
  
  // Progress bar updates
  barMechanical.style.width = mechanicalDecay + "%";
  txtMechanical.innerText = mechanicalDecay.toFixed(1) + "%";
  
  barChemical.style.width = chemicalDecay + "%";
  txtChemical.innerText = chemicalDecay.toFixed(1) + "%";
  
  barBiological.style.width = biologicalDecay + "%";
  txtBiological.innerText = biologicalDecay.toFixed(1) + "%";
  
  // Substrate Physical Integrity
  assetIntegrity = 100.0 - (mechanicalDecay * 0.35 + chemicalDecay * 0.35 + biologicalDecay * 0.30);
  assetIntegrity = constrain(assetIntegrity, 0.0, 100.0);
  
  btnIntegrityIndicator.innerText = "Integrity: " + assetIntegrity.toFixed(1) + "%";
  
  // Style integrity button dynamically
  if (assetIntegrity < 20.0) {
    btnIntegrityIndicator.style.color = "var(--accent-red)";
    btnIntegrityIndicator.style.borderColor = "rgba(255, 56, 56, 0.4)";
  } else if (assetIntegrity < 70.0) {
    btnIntegrityIndicator.style.color = "var(--accent-orange)";
    btnIntegrityIndicator.style.borderColor = "rgba(255, 127, 80, 0.4)";
  } else {
    btnIntegrityIndicator.style.color = "var(--accent-green)";
    btnIntegrityIndicator.style.borderColor = "rgba(46, 204, 113, 0.3)";
  }
  
  // Asset devaluation calculations
  const artData = substrates[activeArtwork];
  
  // Render Dynamic Material Health Tracker overlay inside the description notes box
  let matHTML = "<div class='material-tracker-grid' style='margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.12);'>";
  matHTML += "<h5 style='margin: 0 0 8px 0; font-size: 0.72rem; font-family: var(--font-mono); color: var(--accent-gold); letter-spacing: 0.5px; text-transform: uppercase;'>[Live Material Diagnostics]</h5>";
  
  for (let mat in matSums) {
    let avgDecay = (matSums[mat] / matCounts[mat]) * 100.0;
    
    // Scale for visual feedback matching asset levels
    let scaledDecay = avgDecay;
    if (activeArtwork === 'basquiat') {
      scaledDecay *= 2.2;
    } else if (activeArtwork === 'rothko') {
      scaledDecay *= 1.5;
    } else if (activeArtwork === 'hirst') {
      scaledDecay *= 3.5;
    } else if (activeArtwork === 'klimt') {
      scaledDecay *= 2.0;
    } else if (activeArtwork === 'pollock') {
      scaledDecay *= 3.0;
    } else if (activeArtwork === 'magritte') {
      scaledDecay *= 2.2;
    }
    
    scaledDecay = constrain(scaledDecay, 0.0, 100.0);
    let integrity = 100.0 - scaledDecay;
    
    let colorStr = "var(--accent-green)";
    if (integrity < 40) colorStr = "var(--accent-red)";
    else if (integrity < 75) colorStr = "var(--accent-orange)";
    
    matHTML += `<div class='material-row' style='display: flex; justify-content: space-between; align-items: center; font-size: 0.68rem; font-family: var(--font-mono); margin-bottom: 5px; line-height: 1.2;'>
      <span style='color: #a0a5b5;'>${mat}:</span>
      <span style='color: ${colorStr}; font-weight: 500;'>${integrity.toFixed(1)}% intact</span>
    </div>`;
  }
  matHTML += "</div>";
  notesBody.innerHTML = artData.notes + matHTML;
  
  if (assetStatus === 'monitoring') {
    let priceDropFactor = (100.0 - assetIntegrity) / 100.0;
    let basePrice = isResurrected ? artData.startingValuation * 0.35 : artData.startingValuation;
    currentValuation = basePrice * (1.0 - priceDropFactor);
    currentValuation = Math.max(0, currentValuation);
    
    let pctDrop = ((artData.startingValuation - currentValuation) / artData.startingValuation) * 100.0;
    
    // Dynamic financial display
    valuationTicker.innerHTML = "$" + Math.round(currentValuation).toLocaleString('en-US') + 
      `<span class="devaluation-percentage" id="devaluation-pct">-${pctDrop.toFixed(2)}%</span>`;
      
    const tickerContainer = document.getElementById('valuation-ticker');
    
    // Check if asset reaches "Total Entropy" (Integrity drops below 2.0%)
    if (assetIntegrity <= 2.0) {
      assetStatus = 'shattered';
      currentValuation = 0.0;
      valuationTicker.innerHTML = `<span style="color: var(--accent-red); font-weight: 700; font-size: 1.5rem; letter-spacing: 1px;">[ASSET SHATTERED]</span>`;
      
      simBadge.innerText = "TOTAL ENTROPY";
      simBadge.style.color = "var(--accent-red)";
      simBadge.style.borderColor = "rgba(255, 56, 56, 0.4)";
      simBadge.style.background = "rgba(255, 56, 56, 0.15)";
      
      metaStatus.innerText = "SHATTERED";
      metaStatus.style.color = "var(--accent-red)";
      
      setTimeout(() => {
        if (assetStatus === 'shattered') {
          assetStatus = 'restoring';
          restoreSweepY = 0;
          
          metaStatus.innerText = "RESTORING ASSET";
          metaStatus.style.color = "var(--accent-orange)";
          simBadge.innerText = "CONSERVING MATRIX";
        }
      }, 1500);
    } 
    else if (pctDrop > 18.0) {
      tickerContainer.classList.add('crashing');
      simBadge.innerText = "CRITICAL DECAY";
      simBadge.style.color = "var(--accent-red)";
      simBadge.style.borderColor = "rgba(255, 56, 56, 0.4)";
      simBadge.style.background = "rgba(255, 56, 56, 0.15)";
      
      metaStatus.innerText = "ENTROPY UNLOCKED";
      metaStatus.style.color = "var(--accent-red)";
    } 
    else if (pctDrop > 1.5) {
      tickerContainer.classList.remove('crashing');
      let badgeLabel = isResurrected ? "SYNTHETIC CLONE" : "DEVALUING";
      simBadge.innerText = badgeLabel;
      simBadge.style.color = "var(--accent-orange)";
      simBadge.style.borderColor = "rgba(255, 127, 80, 0.4)";
      simBadge.style.background = "rgba(255, 127, 80, 0.15)";
      
      metaStatus.innerText = "ACTIVE LOSS";
      metaStatus.style.color = "var(--accent-orange)";
    }
  }
}

function switchArtwork(artworkKey) {
  if (activeArtwork === artworkKey) return;
  
  // Remove 'active' class from all cards
  const cards = ['basquiat', 'rothko', 'hirst', 'klimt', 'pollock', 'magritte'];
  cards.forEach(k => {
    let el = document.getElementById('card-' + k);
    if (el) el.classList.remove('active');
  });
  
  const targetCard = document.getElementById('card-' + artworkKey);
  if (targetCard) targetCard.classList.add('active');
  
  activeArtwork = artworkKey;
  
  // Dynamically resize canvas to match the physical aspect ratio of the real loaded image!
  let img = artworkImages[artworkKey];
  if (img && img.width > 10) {
    let imgRatio = img.height / img.width;
    substrates[artworkKey].canvasWidth = 500;
    substrates[artworkKey].canvasHeight = Math.round(500 * imgRatio);
  }
  
  const targetWidth = substrates[artworkKey].canvasWidth;
  const targetHeight = substrates[artworkKey].canvasHeight;
  
  // Update dynamic columns and rows bounds to ensure clean integer grid boundaries
  cols = Math.floor(targetWidth / cellPitch);
  rows = Math.floor(targetHeight / cellPitch);
  
  resizeCanvas(cols * cellPitch, rows * cellPitch);
  
  document.getElementById('current-lot-lbl').innerText = "Sotheby's " + substrates[artworkKey].lot;
  metaLot.innerText = substrates[artworkKey].lot;
  
  notesTitle.innerText = substrates[artworkKey].name + " — Substrate Analysis";
  notesBody.innerText = substrates[artworkKey].notes;
  
  // Update structural shadowbox frames in viewport
  const frameWrapper = document.getElementById('art-frame');
  frameWrapper.className = 'art-frame-wrapper frame-' + activeArtwork;
  
  // Set default milestone index and rebuild timeline snapshots
  activeMilestoneIndex = 0; // Default to 'Pristine'
  
  // Clear other environment states to force fresh initialization for the new artwork
  environmentStates = {
    freeport: null,
    penthouse: null,
    museum: null,
    catastrophe: null
  };
  
  renderTimelineSnapshots();
  resetSimulation();
}

function switchLifeCycle(cycleKey) {
  if (activeCycle === cycleKey) return;
  
  // 1. Save current active simulation state
  saveEnvironmentState(activeCycle);
  
  document.getElementById('cycle-freeport').classList.remove('active');
  document.getElementById('cycle-penthouse').classList.remove('active');
  document.getElementById('cycle-museum').classList.remove('active');
  document.getElementById('cycle-catastrophe').classList.remove('active');
  
  document.getElementById('cycle-' + cycleKey).classList.add('active');
  
  activeCycle = cycleKey;
  
  // Translate cycle key to human readable names for UI header HUD
  let cycleNames = {
    freeport: "Geneva Freeport",
    penthouse: "Collector's Penthouse",
    museum: "Museum Vitrine",
    catastrophe: "Transit Catastrophe"
  };
  
  btnPhaseIndicator.innerText = "Situation: " + cycleNames[cycleKey];
  
  metaStatus.innerText = "TRANSITIONING";
  metaStatus.style.color = "var(--accent-blue)";
  
  // 2. Load or initialize new environment state
  loadEnvironmentState(cycleKey);
  
  // 3. Force Legend color sync and rebuild snapshots HUD UI
  updateLegendColors();
  renderTimelineSnapshots();
}

function saveEnvironmentState(cycleKey) {
  if (!cycleKey) return;
  
  environmentStates[cycleKey] = {
    forceGrid: deepCopyGrid(forceGrid),
    simulatedFrames: simulatedFrames,
    artworkSnapshots: artworkSnapshots.map(snap => {
      if (!snap) return null;
      let copy = deepCopyGrid(snap);
      copy.unlocked = snap.unlocked;
      copy.isCapturedFromLive = snap.isCapturedFromLive;
      return copy;
    }),
    activeMilestoneIndex: activeMilestoneIndex,
    isViewingSnapshot: isViewingSnapshot,
    assetStatus: assetStatus,
    assetIntegrity: assetIntegrity,
    isResurrected: isResurrected,
    mechanicalDecay: mechanicalDecay,
    chemicalDecay: chemicalDecay,
    biologicalDecay: biologicalDecay,
    totalDegradation: totalDegradation,
    currentValuation: currentValuation
  };
}

function loadEnvironmentState(cycleKey) {
  if (!cycleKey) return;
  
  let state = environmentStates[cycleKey];
  if (state) {
    forceGrid = deepCopyGrid(state.forceGrid);
    simulatedFrames = state.simulatedFrames;
    artworkSnapshots = state.artworkSnapshots.map(snap => {
      if (!snap) return null;
      let copy = deepCopyGrid(snap);
      copy.unlocked = snap.unlocked;
      copy.isCapturedFromLive = snap.isCapturedFromLive;
      return copy;
    });
    activeMilestoneIndex = state.activeMilestoneIndex;
    isViewingSnapshot = state.isViewingSnapshot;
    assetStatus = state.assetStatus;
    assetIntegrity = state.assetIntegrity;
    isResurrected = state.isResurrected;
    mechanicalDecay = state.mechanicalDecay;
    chemicalDecay = state.chemicalDecay;
    biologicalDecay = state.biologicalDecay;
    totalDegradation = state.totalDegradation;
    currentValuation = state.currentValuation;
  } else {
    initFreshEnvironmentState();
  }
}

function initFreshEnvironmentState() {
  mechanicalDecay = 0.0;
  chemicalDecay = 0.0;
  biologicalDecay = 0.0;
  totalDegradation = 0.0;
  assetIntegrity = 100.0;
  currentValuation = substrates[activeArtwork].startingValuation;
  assetStatus = 'monitoring';
  isResurrected = false;
  isViewingSnapshot = false;
  liveSimulationGrid = null;
  liveSimulatedFrames = 0;
  simulatedFrames = 0;
  
  resetGridToPristine();
  
  artworkSnapshots = [];
  artworkSnapshots[0] = deepCopyGrid(forceGrid);
  artworkSnapshots[0].unlocked = true;
  artworkSnapshots[0].isCapturedFromLive = false;
  
  const list = milestones[activeArtwork][activeCycle];
  for (let idx = 1; idx < list.length; idx++) {
    artworkSnapshots[idx] = deepCopyGrid(forceGrid);
    artworkSnapshots[idx].unlocked = false;
    artworkSnapshots[idx].isCapturedFromLive = false;
  }
  
  activeMilestoneIndex = 0;
  isViewingSnapshot = false;
}

function setRenderMode(mode, targetBtn) {
  renderMode = mode;
  
  // Remove 'active' class from all layer selector tabs
  document.getElementById('btn-visible-mode').classList.remove('active');
  document.getElementById('btn-stress-mode').classList.remove('active');
  document.getElementById('btn-uv-mode').classList.remove('active');
  document.getElementById('btn-sapon-mode').classList.remove('active');
  document.getElementById('btn-bio-mode').classList.remove('active');
  document.getElementById('btn-moisture-mode').classList.remove('active');
  
  // Apply 'active' class to the clicked tab
  targetBtn.classList.add('active');
}

function toggleTimeScale() {
  const btn = document.getElementById('btn-toggle-time');
  if (timeScale === 1) {
    timeScale = 30;
    btn.innerText = "Pause Clock";
    btn.style.color = "var(--accent-red)";
    btn.style.borderColor = "rgba(255, 56, 56, 0.3)";
  } else {
    timeScale = 1;
    btn.innerText = "Accelerate x100";
    btn.style.color = "var(--text-primary)";
    btn.style.borderColor = "var(--border-color)";
  }
}

function getCurrentSimulatedYear() {
  let elapsedYears = 0;
  
  if (activeCycle === 'freeport') {
    elapsedYears = Math.floor(simulatedFrames / 12);
  } else if (activeCycle === 'penthouse') {
    elapsedYears = Math.floor(simulatedFrames / 365);
  } else if (activeCycle === 'museum') {
    elapsedYears = Math.floor(simulatedFrames / 52);
  } else if (activeCycle === 'catastrophe') {
    let totalMinutes = Math.floor(simulatedFrames * 10);
    let totalHours = Math.floor(totalMinutes / 60);
    let days = Math.floor(totalHours / 24);
    elapsedYears = Math.floor(days / 365);
  }
  
  return substrates[activeArtwork].paintedYear + elapsedYears;
}

function getCurrentSimulatedTime() {
  let elapsed = 0;
  if (activeCycle === 'freeport') {
    elapsed = Math.floor(simulatedFrames / 12);
  } else if (activeCycle === 'penthouse') {
    elapsed = Math.floor(simulatedFrames / 365);
  } else if (activeCycle === 'museum') {
    elapsed = Math.floor(simulatedFrames / 52);
  } else if (activeCycle === 'catastrophe') {
    let totalMinutes = Math.floor(simulatedFrames * 10);
    elapsed = Math.floor(totalMinutes / 60); // hours
  }
  return elapsed;
}

function updateTimelineHUD() {
  if (!btnTimelineIndicator) return;
  
  if (assetStatus === 'restoring') {
    btnTimelineIndicator.innerText = "Timeline: SCANNING...";
    btnTimelineIndicator.style.color = "var(--accent-orange)";
    btnTimelineIndicator.style.borderColor = "rgba(255, 127, 80, 0.4)";
    return;
  }
  
  // Advance simulated time frames if not shattered
  if (assetStatus === 'monitoring' && !isViewingSnapshot) {
    simulatedFrames += timeScale;
  }
  
  let timeStr = "";
  if (activeCycle === 'freeport') {
    let totalMonths = Math.floor(simulatedFrames);
    let years = Math.floor(totalMonths / 12);
    let months = totalMonths % 12;
    timeStr = `Timeline: ${years}y, ${months}m (Vault Age)`;
    btnTimelineIndicator.style.color = "#a0a5b5"; // subtle gray for slow vault time
    btnTimelineIndicator.style.borderColor = "rgba(255, 255, 255, 0.1)";
  } 
  else if (activeCycle === 'penthouse') {
    let totalDays = Math.floor(simulatedFrames);
    let years = Math.floor(totalDays / 365);
    let months = Math.floor((totalDays % 365) / 30);
    timeStr = `Timeline: ${years}y, ${months}m (Exposure)`;
    btnTimelineIndicator.style.color = "var(--accent-orange)";
    btnTimelineIndicator.style.borderColor = "rgba(255, 127, 80, 0.3)";
  } 
  else if (activeCycle === 'museum') {
    let totalWeeks = Math.floor(simulatedFrames);
    let years = Math.floor(totalWeeks / 52);
    let weeks = totalWeeks % 52;
    timeStr = `Timeline: ${years}y, ${weeks}w (Vitrine Age)`;
    btnTimelineIndicator.style.color = "var(--accent-blue)";
    btnTimelineIndicator.style.borderColor = "rgba(30, 144, 255, 0.3)";
  } 
  else if (activeCycle === 'catastrophe') {
    let totalMinutes = Math.floor(simulatedFrames * 10);
    let totalHours = Math.floor(totalMinutes / 60);
    let days = Math.floor(totalHours / 24);
    let hours = totalHours % 24;
    timeStr = `Timeline: ${days}d, ${hours}h (Transit Leak)`;
    btnTimelineIndicator.style.color = "var(--accent-red)";
    btnTimelineIndicator.style.borderColor = "rgba(255, 56, 56, 0.3)";
  }
  
  btnTimelineIndicator.innerText = timeStr;
}

function renderTimelineSnapshots() {
  const container = document.getElementById('timeline-snapshots');
  if (!container) return;
  
  container.innerHTML = "";
  const list = milestones[activeArtwork][activeCycle];
  
  list.forEach((m, idx) => {
    // Only display milestones that have been reached/unlocked!
    if (!artworkSnapshots[idx] || !artworkSnapshots[idx].unlocked) {
      return;
    }
    
    const card = document.createElement('div');
    card.className = 'timeline-card';
    if (idx === activeMilestoneIndex && isViewingSnapshot) {
      card.classList.add('active');
    }
    
    let statusText = m.status;
    let isLive = false;
    if (artworkSnapshots[idx] && artworkSnapshots[idx].isCapturedFromLive) {
      statusText = "LIVE SNAPSHOT";
      isLive = true;
    }
    
    card.innerHTML = `
      <div class="timeline-card-header">
        <span class="timeline-card-year">${m.year}</span>
        <span class="timeline-card-status" style="${isLive ? 'background: rgba(46, 204, 113, 0.2); color: var(--accent-green); font-weight: 500;' : ''}">${statusText}</span>
      </div>
      <div class="timeline-card-desc" title="${m.desc}">${m.label}: ${m.desc}</div>
    `;
    
    card.addEventListener('click', () => goToMilestone(idx));
    container.appendChild(card);
  });
  
  // Append a special "Live Simulation" card at the end of the timeline
  const liveCard = document.createElement('div');
  liveCard.className = 'timeline-card live-card';
  if (!isViewingSnapshot) {
    liveCard.classList.add('active');
  }
  
  let currentYear = getCurrentSimulatedYear();
  let startYear = substrates[activeArtwork].paintedYear;
  let elapsedY = currentYear - startYear;
  
  let timeTitle = currentYear;
  let descText = "";
  if (activeCycle === 'freeport') {
    let totalMonths = Math.floor(simulatedFrames);
    let years = Math.floor(totalMonths / 12);
    descText = `Live Feed: Active running simulation at ${years}y elapsed. Click to return and resume.`;
  } else if (activeCycle === 'penthouse') {
    let totalDays = Math.floor(simulatedFrames);
    let years = Math.floor(totalDays / 365);
    descText = `Live Feed: Active running simulation at ${years}y elapsed. Click to return and resume.`;
  } else if (activeCycle === 'museum') {
    let totalWeeks = Math.floor(simulatedFrames);
    let years = Math.floor(totalWeeks / 52);
    descText = `Live Feed: Active running simulation at ${years}y elapsed. Click to return and resume.`;
  } else if (activeCycle === 'catastrophe') {
    let totalMinutes = Math.floor(simulatedFrames * 10);
    let totalHours = Math.floor(totalMinutes / 60);
    let days = Math.floor(totalHours / 24);
    let hours = totalHours % 24;
    timeTitle = `+${totalHours}h`;
    descText = `Live Feed: Active running simulation at ${days}d, ${hours}h elapsed. Click to return and resume.`;
  }
  
  liveCard.innerHTML = `
    <div class="timeline-card-header">
      <span class="timeline-card-year">${timeTitle}</span>
      <span class="timeline-card-status" style="background: rgba(46, 204, 113, 0.2); color: var(--accent-green); font-weight: 600; animation: pulse-live 2s infinite;">LIVE SIM</span>
    </div>
    <div class="timeline-card-desc" title="Return to active real-time entropic degradation simulation state.">${descText}</div>
  `;
  
  liveCard.addEventListener('click', () => returnToLiveSimulation());
  container.appendChild(liveCard);
}

function goToMilestone(index) {
  // If we were just actively running the live simulation, preserve the current grid and frame count!
  if (!isViewingSnapshot) {
    liveSimulationGrid = deepCopyGrid(forceGrid);
    liveSimulatedFrames = simulatedFrames;
  }
  
  isViewingSnapshot = true;
  activeMilestoneIndex = index;
  
  // Pause clock if we select a historical milestone (so it doesn't decay immediately out of it)
  // but if they click "Today" we can let it run!
  const btnToggle = document.getElementById('btn-toggle-time');
  if (index !== 2 && timeScale !== 1) {
    timeScale = 1;
    if (btnToggle) {
      btnToggle.innerText = "Accelerate x100";
      btnToggle.style.color = "var(--text-primary)";
      btnToggle.style.borderColor = "var(--border-color)";
    }
  }
  
  const m = milestones[activeArtwork][activeCycle][index];
  
  // Deep-copy the saved authentic physics snapshot into our active forceGrid!
  if (artworkSnapshots[index]) {
    forceGrid = deepCopyGrid(artworkSnapshots[index]);
  }
  
  // Update timeline simulated frames directly from elapsed native units
  if (activeCycle === 'freeport') {
    simulatedFrames = m.elapsed * 12;
  } else if (activeCycle === 'penthouse') {
    simulatedFrames = m.elapsed * 365;
  } else if (activeCycle === 'museum') {
    simulatedFrames = m.elapsed * 52;
  } else if (activeCycle === 'catastrophe') {
    simulatedFrames = m.elapsed * 6; // 6 frames per hour (1 frame = 10 minutes)
  }
  
  // Sync the diagnostic UI sliders and integrity indicators
  updateAssetMetrics();
  updateTimelineHUD();
  
  // Highlight cards in DOM
  renderTimelineSnapshots();
  
  // Append milestone specific analysis note
  let liveHTML = `<div class='milestone-note' style='margin-top: 10px; padding: 8px; background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 4px; font-size: 0.68rem; line-height: 1.3;'>
    <span style='color: var(--accent-gold); font-family: var(--font-mono); font-weight: 600; display: block; margin-bottom: 2px;'>[Forensic Milestone — ${m.label} (${m.year})]</span>
    <span style='color: var(--text-primary);'>${m.desc}</span>
  </div>`;
  
  notesBody.innerHTML = liveHTML + notesBody.innerHTML;
}

function returnToLiveSimulation() {
  if (!isViewingSnapshot) return; // Already on live
  
  isViewingSnapshot = false;
  activeMilestoneIndex = -1; // -1 represents Live
  
  if (liveSimulationGrid) {
    forceGrid = deepCopyGrid(liveSimulationGrid);
    simulatedFrames = liveSimulatedFrames;
  }
  
  // Refresh timeline snapshots to update active highlight class
  renderTimelineSnapshots();
  
  // Sync the diagnostic UI sliders and integrity indicators
  updateAssetMetrics();
  updateTimelineHUD();
  
  // Append milestone specific analysis note
  let liveHTML = `<div class='milestone-note' style='margin-top: 10px; padding: 8px; background: rgba(46, 204, 113, 0.05); border: 1px solid rgba(46, 204, 113, 0.2); border-radius: 4px; font-size: 0.68rem; line-height: 1.3;'>
    <span style='color: var(--accent-green); font-family: var(--font-mono); font-weight: 600; display: block; margin-bottom: 2px;'>[Live Simulation Feed Reconnected]</span>
    <span style='color: var(--text-primary);'>Resumed active real-time environmental stress calculations on main canvas.</span>
  </div>`;
  
  notesBody.innerHTML = liveHTML + notesBody.innerHTML;
}

function deepCopyGrid(src) {
  let dest = [];
  for (let x = 0; x < src.length; x++) {
    dest[x] = [];
    for (let y = 0; y < src[x].length; y++) {
      let c = src[x][y];
      dest[x][y] = {
        x: c.x, y: c.y,
        mechanicalStress: c.mechanicalStress,
        fractureDensity: c.fractureDensity,
        photolyticBleach: c.photolyticBleach,
        soapMigration: c.soapMigration,
        biologicalCreep: c.biologicalCreep,
        moistureSaturation: c.moistureSaturation,
        energyFlash: c.energyFlash,
        isRestored: c.isRestored,
        materialType: c.materialType,
        isCrown: c.isCrown, isSkull: c.isSkull,
        isBasquiatTeeth: c.isBasquiatTeeth, isBasquiatTongue: c.isBasquiatTongue,
        isBasquiatScribble: c.isBasquiatScribble, isRothkoSeam: c.isRothkoSeam,
        isHirstSpecimen: c.isHirstSpecimen, isKlimtGold: c.isKlimtGold,
        isKlimtSilver: c.isKlimtSilver, isPollockDrip: c.isPollockDrip,
        isMagritteSky: c.isMagritteSky, isMagritteForest: c.isMagritteForest,
        origR: c.origR, origG: c.origG, origB: c.origB,
        stressLimit: c.stressLimit,
        chemSusceptibility: c.chemSusceptibility,
        bioSusceptibility: c.bioSusceptibility,
        tackiness: c.tackiness
      };
    }
  }
  return dest;
}

function resetGridToPristine() {
  forceGrid = [];
  for (let x = 0; x < cols; x++) {
    forceGrid[x] = [];
    for (let y = 0; y < rows; y++) {
      forceGrid[x][y] = createForceCell(x, y);
    }
  }
  configureSubstrateFields();
}

function generatePhysicsSnapshots() {
  artworkSnapshots = [];
  
  // 1. Snapshot 0: Pristine (Zero decay)
  resetGridToPristine();
  artworkSnapshots[0] = deepCopyGrid(forceGrid);
  artworkSnapshots[0].unlocked = true;
  artworkSnapshots[0].isCapturedFromLive = false;
  
  if (activeCycle === 'freeport') {
    // Geneva Freeport: extremely slow decay
    // Snapshot 1: Micro-fatigue
    for (let i = 0; i < 20; i++) updateGenerativeForces(0.50, 20.0, 0.0, 1.0);
    artworkSnapshots[1] = deepCopyGrid(forceGrid);
    artworkSnapshots[1].unlocked = false;
    artworkSnapshots[1].isCapturedFromLive = false;
    
    // Snapshot 2: Active Shear
    for (let i = 0; i < 40; i++) updateGenerativeForces(0.50, 20.0, 0.0, 1.0);
    artworkSnapshots[2] = deepCopyGrid(forceGrid);
    artworkSnapshots[2].unlocked = false;
    artworkSnapshots[2].isCapturedFromLive = false;
    
    // Snapshot 3: Soap Nucleation
    for (let i = 0; i < 60; i++) updateGenerativeForces(0.50, 20.0, 0.0, 1.0);
    artworkSnapshots[3] = deepCopyGrid(forceGrid);
    artworkSnapshots[3].unlocked = false;
    artworkSnapshots[3].isCapturedFromLive = false;
    
    // Snapshot 4: Total Entropy
    for (let i = 0; i < 150; i++) updateGenerativeForces(0.52, 21.0, 0.0, 1.0);
    artworkSnapshots[4] = deepCopyGrid(forceGrid);
    artworkSnapshots[4].unlocked = false;
    artworkSnapshots[4].isCapturedFromLive = false;
    
  } else if (activeCycle === 'penthouse') {
    // Collector's Penthouse: fast UV photolysis and craquelure
    // Snapshot 1: Photo-decay
    for (let i = 0; i < 15; i++) updateGenerativeForces(0.50, 22.0, 1.2, 95.0);
    artworkSnapshots[1] = deepCopyGrid(forceGrid);
    artworkSnapshots[1].unlocked = false;
    artworkSnapshots[1].isCapturedFromLive = false;
    
    // Snapshot 2: Solar Craquelure
    for (let i = 0; i < 35; i++) updateGenerativeForces(0.50, 24.0, 1.5, 95.0);
    artworkSnapshots[2] = deepCopyGrid(forceGrid);
    artworkSnapshots[2].unlocked = false;
    artworkSnapshots[2].isCapturedFromLive = false;
    
    // Snapshot 3: Active Bleaching
    for (let i = 0; i < 50; i++) updateGenerativeForces(0.55, 25.0, 1.8, 95.0);
    artworkSnapshots[3] = deepCopyGrid(forceGrid);
    artworkSnapshots[3].unlocked = false;
    artworkSnapshots[3].isCapturedFromLive = false;
    
    // Snapshot 4: Total Devaluation
    for (let i = 0; i < 160; i++) updateGenerativeForces(0.60, 28.0, 2.5, 120.0);
    artworkSnapshots[4] = deepCopyGrid(forceGrid);
    artworkSnapshots[4].unlocked = false;
    artworkSnapshots[4].isCapturedFromLive = false;
    
  } else if (activeCycle === 'museum') {
    // Museum Vitrine: vibration fatigue cracks
    // Snapshot 1: Vibration Fatigue
    for (let i = 0; i < 18; i++) updateGenerativeForces(0.50, 21.0, 0.0, 12.0);
    artworkSnapshots[1] = deepCopyGrid(forceGrid);
    artworkSnapshots[1].unlocked = false;
    artworkSnapshots[1].isCapturedFromLive = false;
    
    // Snapshot 2: Hairline Networks
    for (let i = 0; i < 40; i++) updateGenerativeForces(0.50, 21.0, 0.0, 12.0);
    artworkSnapshots[2] = deepCopyGrid(forceGrid);
    artworkSnapshots[2].unlocked = false;
    artworkSnapshots[2].isCapturedFromLive = false;
    
    // Snapshot 3: Delamination
    for (let i = 0; i < 80; i++) updateGenerativeForces(0.50, 21.0, 0.0, 12.0);
    artworkSnapshots[3] = deepCopyGrid(forceGrid);
    artworkSnapshots[3].unlocked = false;
    artworkSnapshots[3].isCapturedFromLive = false;
    
    // Snapshot 4: Brittle Collapse
    for (let i = 0; i < 180; i++) updateGenerativeForces(0.52, 21.0, 0.0, 15.0);
    artworkSnapshots[4] = deepCopyGrid(forceGrid);
    artworkSnapshots[4].unlocked = false;
    artworkSnapshots[4].isCapturedFromLive = false;
    
  } else if (activeCycle === 'catastrophe') {
    // Transit Catastrophe: explosive heat, humidity leak, biological rot
    // Snapshot 1: Thermal Shock
    for (let i = 0; i < 10; i++) updateGenerativeForces(0.60, 35.0, 1.0, 100.0);
    artworkSnapshots[1] = deepCopyGrid(forceGrid);
    artworkSnapshots[1].unlocked = false;
    artworkSnapshots[1].isCapturedFromLive = false;
    
    // Snapshot 2: Explosive Craquelure
    for (let i = 0; i < 25; i++) updateGenerativeForces(0.85, 40.0, 2.0, 150.0);
    artworkSnapshots[2] = deepCopyGrid(forceGrid);
    artworkSnapshots[2].unlocked = false;
    artworkSnapshots[2].isCapturedFromLive = false;
    
    // Snapshot 3: Biological Outbreak
    for (let i = 0; i < 50; i++) updateGenerativeForces(0.95, 42.0, 3.5, 180.0);
    artworkSnapshots[3] = deepCopyGrid(forceGrid);
    artworkSnapshots[3].unlocked = false;
    artworkSnapshots[3].isCapturedFromLive = false;
    
    // Snapshot 4: Total Collapse
    for (let i = 0; i < 120; i++) updateGenerativeForces(0.98, 42.0, 3.5, 180.0);
    artworkSnapshots[4] = deepCopyGrid(forceGrid);
    artworkSnapshots[4].unlocked = false;
    artworkSnapshots[4].isCapturedFromLive = false;
  }
  
  // Restore active grid to Pristine (Milestone 0) as default starting state
  forceGrid = deepCopyGrid(artworkSnapshots[0]);
  activeMilestoneIndex = 0;
}
