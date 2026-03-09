import { useState, useEffect, useRef, useCallback } from "react";

// ─── PALETTE ─────────────────────────────────────────────────────────
const C = {
  bg: "#ffffff",
  bgWarm: "#f7f7f7",
  surface: "#fafafa",
  surfaceAlt: "#f7f7f7",
  ink: "#1a1a1a",
  inkSoft: "#3d3d3d",
  inkMuted: "#767676",
  inkFaint: "#a3a3a3",
  border: "#e8e8e8",
  borderLight: "#f0f0f0",
  green: "#1a7a5c",
  greenBg: "#e8f5ef",
  greenBorder: "#b8dfc9",
  blue: "#2563a8",
  blueBg: "#eaf1fb",
  blueBorder: "#b4cde8",
  orange: "#c4590a",
  orangeBg: "#fef3e8",
  orangeBorder: "#f0c9a0",
  purple: "#6d3ab5",
  purpleBg: "#f3eefa",
  purpleBorder: "#c9b3e8",
  coral: "#d04a3c",
  coralBg: "#fdeeed",
  accent: "#1a7a5c",
};

const FONTS = {
  display: "'DM Sans', sans-serif",
  body: "'DM Sans', sans-serif",
  mono: "'IBM Plex Mono', monospace",
};

// ─── LEVELS ──────────────────────────────────────────────────────────
const LEVELS = [
  {
    id: "ny",
    label: "Ny til IFC",
    subtitle: "Jeg hører om dette for første gang",
    icon: "🌱",
    roles: "Student · Håndverker · Ny prosjektdeltaker",
    color: C.green,
    colorBg: C.greenBg,
    colorBorder: C.greenBorder,
  },
  {
    id: "bruker",
    label: "Bruker IFC i prosjekter",
    subtitle: "Jeg jobber med modeller, men vil forstå mer",
    icon: "🔧",
    roles: "Prosjekterende · Rådgiver · Modellerer",
    color: C.blue,
    colorBg: C.blueBg,
    colorBorder: C.blueBorder,
  },
  {
    id: "bestiller",
    label: "Bestiller og kvalitetssikrer",
    subtitle: "Jeg stiller krav og kontrollerer leveranser",
    icon: "📋",
    roles: "Byggherre · BIM-koordinator · Forvalter",
    color: C.purple,
    colorBg: C.purpleBg,
    colorBorder: C.purpleBorder,
  },
];

// ─── CONTENT DATA (per level) ────────────────────────────────────────

const CONTENT = {
  // ── SECTION 1: What is IFC ──
  whatIsIfc: {
    ny: {
      title: "IFC – et felles språk for bygg",
      lead: "Tenk deg at alle fagfolk på en byggeplass snakker forskjellige språk. Arkitekten bruker ett program, rørleggeren et annet, og elektrikeren et tredje. IFC er det felles språket som gjør at alle kan forstå hverandre.",
      blocks: [
        {
          type: "analogy",
          title: "En enkel forklaring",
          content: "IFC er som en universell oversettelsesfil for bygningsinformasjon. Når arkitekten tegner en dør i sitt program, kan rørleggeren åpne den samme filen og se den døren – med riktig størrelse, plassering og egenskaper – selv om de bruker helt forskjellig programvare.",
        },
        {
          type: "keypoint",
          title: "Tre ting å huske",
          items: [
            { label: "Åpent", desc: "Ingen eier IFC. Alle programvarer kan bruke det." },
            { label: "Standardisert", desc: "En ISO-standard (NS-EN ISO 16739-1) som brukes over hele verden." },
            { label: "Livsløp", desc: "Informasjonen følger bygget fra tegning til drift og vedlikehold." },
          ],
        },
        {
          type: "why",
          title: "Hvorfor angår dette deg?",
          content: "Når du får en modell eller tegning fra et prosjekt, er det sannsynlig at den er laget med IFC. Å vite hva IFC er, gjør det lettere å forstå hva du ser, og å stille spørsmål når noe mangler.",
        },
        {
          type: "domains",
          title: "IFC dekker flere fagområder",
          items: [
            { icon: "🏗️", label: "Bygg", desc: "Vegger, dører, vinduer, dekker, tak" },
            { icon: "🔧", label: "VVS", desc: "Rør, kanaler, ventiler, pumper" },
            { icon: "⚡", label: "Elektro", desc: "Kabler, brytere, tavler, belysning" },
            { icon: "🛣️", label: "Infrastruktur", desc: "Veger, broer, jernbane, tunneler" },
          ],
          footer: "Alle fagene bruker det samme «språket» – IFC sørger for at informasjonen kan deles på tvers.",
        },
      ],
    },
    bruker: {
      title: "IFC som informasjonsmodell",
      lead: "IFC er mer enn et filformat – det er en strukturert informasjonsmodell som definerer hvordan digital bygningsinformasjon skal organiseres, utveksles og tolkes på tvers av programvarer og fag.",
      blocks: [
        {
          type: "technical",
          title: "Kjernen i IFC",
          content: "IFC (Industry Foundation Classes) er en internasjonal, åpen standard (ISO 16739-1) for strukturering og utveksling av digital informasjon om byggverk og infrastruktur. Standarden utvikles av buildingSMART International.",
        },
        {
          type: "keypoint",
          title: "Tre typer informasjon",
          items: [
            { label: "Objekter", desc: "Hva noe er – en dør, et rør, en kabel. Fysiske og ikke-fysiske." },
            { label: "Egenskaper", desc: "Hva objektet har – materialer, ytelse, klassifikasjon, tekniske verdier." },
            { label: "Relasjoner", desc: "Hvordan objekter henger sammen – plassering, systemtilhørighet, avgrensning." },
          ],
        },
        {
          type: "practice",
          title: "I praksis",
          content: "Programvarenes interne datamodeller er utviklet for ulike formål. IFC er derfor ikke implementert likt overalt. Kvaliteten på import og eksport varierer – og det er nettopp derfor det er viktig å forstå strukturen bak.",
        },
      ],
      ifcRoot: {
        title: "IfcRoot – grunnmuren i IFC",
        lead: "Alt i IFC arver fra IfcRoot. Den deler seg i tre hovedgrener som dekker alt standarden trenger.",
        branches: [
          { name: "IfcObjectDefinition", desc: "Alt som «finnes» – fysiske og ikke-fysiske objekter", color: "#1a7a5c", icon: "📦", children: ["IfcWall, IfcDoor, IfcPipe…", "IfcSpace, IfcZone, IfcSystem…"] },
          { name: "IfcPropertyDefinition", desc: "Alt som beskriver – egenskapssett og typedefinisjoner", color: "#2563a8", icon: "📋", children: ["IfcPropertySet (Pset_*)", "IfcTypeObject"] },
          { name: "IfcRelationship", desc: "Alt som kobler sammen – relasjoner mellom objekter", color: "#6d3ab5", icon: "🔗", children: ["IfcRelContainedIn…", "IfcRelAssociates…", "IfcRelDefines…"] },
        ],
        note: "Huskeregel: Arv handler om hvordan IFC er bygget opp. Relasjoner handler om hvordan modellen er satt sammen.",
      },
      physicalVsNon: {
        title: "Fysiske vs. ikke-fysiske objekter",
        physical: { label: "Fysiske objekter", desc: "Ting du kan ta på – vegger, dører, rør, kabler. Arver fra IfcElement. Har geometri og plassering.", examples: "IfcWall · IfcDoor · IfcPipeSegment · IfcCableSegment" },
        nonPhysical: { label: "Ikke-fysiske objekter", desc: "Konsepter og organiseringsenheter – rom, soner, systemer, grupper. Har ingen egen geometri, men strukturerer modellen.", examples: "IfcSpace · IfcZone · IfcSystem · IfcGroup" },
      },
      domains: {
        title: "Domener – IFC på tvers av fag",
        lead: "IFC er strukturert i domener, men entiteter kan brukes på tvers. Et IfcPipeSegment kan tilhøre både VVS-domenet og et brannslokkingssystem.",
        items: [
          { icon: "🏗️", domain: "Bygg", entities: "IfcWall, IfcSlab, IfcDoor, IfcWindow, IfcStair" },
          { icon: "🔧", domain: "VVS", entities: "IfcPipeSegment, IfcDuctSegment, IfcPump, IfcValve" },
          { icon: "⚡", domain: "Elektro", entities: "IfcCableSegment, IfcSwitchingDevice, IfcOutlet" },
          { icon: "🛣️", domain: "Infrastruktur", entities: "IfcRoad, IfcBridge, IfcRailway, IfcAlignment" },
        ],
      },
      dataTypes: {
        title: "Definerte datatyper",
        content: "IFC bruker definerte datatyper for entydig tolkning. IfcPositiveLengthMeasure betyr «en lengde som alltid er positiv», IfcThermodynamicTemperatureMeasure betyr «temperatur i Kelvin». Dette sikrer at en tallverdi alltid tolkes likt – uavhengig av programvare.",
      },
    },
    bestiller: {
      title: "IFC som strategisk verktøy",
      lead: "IFC sikrer eierskap til informasjon, reduserer leverandørlåsing, og gir kontroll over data gjennom hele byggverkets livsløp. For bestillere og forvaltere er IFC et grunnlag for bedre beslutninger og langsiktig verdiskaping.",
      blocks: [
        {
          type: "strategic",
          title: "Hvorfor stille krav om IFC?",
          content: "Når informasjon leveres i åpne standarder kan du bytte verktøy, leverandør eller system uten å miste tilgang til informasjonen. Det er kompetansen og de beste ideene som vinner frem – ikke den dominerende plattformen. IFC bidrar til bedre beslutningsgrunnlag, mindre informasjonstap og økt mulighet for digitalisering.",
        },
        {
          type: "keypoint",
          title: "Verdien for bestillere",
          items: [
            { label: "Kontroll", desc: "Eierskap til egne data uavhengig av programvare og leverandør." },
            { label: "Kvalitet", desc: "Maskinlesbare krav (IDS) muliggjør automatisert kontroll av leveranser." },
            { label: "Livsløp", desc: "Informasjonen kan gjenbrukes i forvaltning, ombygging og avvikling." },
          ],
        },
        {
          type: "warning",
          title: "Vanlig fallgruve",
          content: "Mange prosjekter stiller krav om «IFC-leveranse» uten å spesifisere versjon, MVD, egenskapskrav eller kontrollmekanismer. Resultatet blir IFC-filer som teknisk sett er korrekte, men som ikke inneholder informasjonen som trengs.",
        },
      ],
    },
  },

  // ── SECTION 2: Structure ──
  structure: {
    ny: {
      title: "Hvordan informasjonen er organisert",
      lead: "En IFC-modell er ikke bare en 3D-tegning. Alt er organisert i en tydelig struktur – omtrent som mapper i et arkivskap.",
      intro: "Tenk på en bygning. Den ligger på en tomt, som er del av et prosjekt. Inne i bygningen finnes etasjer, og i etasjene finnes rom. Denne strukturen – fra det store til det lille – er ryggraden i IFC.",
      hierarchy: [
        { label: "Prosjekt", entity: "IfcProject", desc: "Alt starter her – det overordnede prosjektet", depth: 0 },
        { label: "Tomt", entity: "IfcSite", desc: "Området bygget står på", depth: 1 },
        { label: "Bygning", entity: "IfcBuilding", desc: "Selve bygningen", depth: 2 },
        { label: "Etasje", entity: "IfcBuildingStorey", desc: "Hver etasje i bygget", depth: 3 },
        { label: "Rom", entity: "IfcSpace", desc: "Hvert enkelt rom", depth: 4 },
      ],
      takeaway: "Hvert fysisk objekt (vegg, dør, rør) plasseres i denne strukturen – slik at man alltid vet hvor det hører hjemme.",
    },
    bruker: {
      title: "Tre strukturer i én modell",
      lead: "Hvert objekt i IFC inngår samtidig i tre ulike strukturer. Å forstå forskjellen mellom dem er nøkkelen til å bruke IFC bevisst.",
      structures: [
        {
          name: "Romlig struktur",
          question: "Hvor hører objektet hjemme?",
          icon: "📍",
          color: C.green,
          colorBg: C.greenBg,
          desc: "Hierarkisk. Ryggraden i modellen. Prosjekt → Tomt → Bygning → Etasje → Rom. Alle fysiske objekter skal plasseres her – én og bare én gang.",
          detail: "For infrastruktur: Prosjekt → Tomt → Anlegg (IfcFacility) → Anleggsdel (IfcFacilityPart).",
        },
        {
          name: "Funksjonell struktur",
          question: "Hvilken sammenheng inngår objektet i?",
          icon: "⚡",
          color: C.blue,
          colorBg: C.blueBg,
          desc: "Nettverksbasert. Systemer, soner og grupper. Et objekt kan inngå i mange funksjoner samtidig – en ventil kan være i ventilasjonssystemet OG brannseksjonen OG en vedlikeholdsgruppe.",
          detail: "Soner (IfcZone) grupperer rom. Systemer grupperer elementer. Ingen egen geometri.",
        },
        {
          name: "Komponentstruktur",
          question: "Hva består objektet av?",
          icon: "🧩",
          color: C.purple,
          colorBg: C.purpleBg,
          desc: "Fysisk oppdeling gjennom aggregering og nesting. En bro består av bruspenn. Et bruspenn består av bjelker. En vegg kan bestå av prefabrikkerte elementer.",
          detail: "Aggregering: selvstendige deler. Nesting: tett integrerte deler som normalt ikke opptrer alene.",
        },
      ],
      inheritanceNote: {
        title: "Arv vs. relasjoner – en viktig distinksjon",
        rule: "Arv handler om hvordan IFC er bygget opp. Relasjoner handler om hvordan modellen er satt sammen.",
        inheritance: "Arv (nedover i klassehierarkiet): IfcRoot → IfcObjectDefinition → IfcElement → IfcWall. Bestemmer hva et objekt er og hvilke egenskaper det kan ha.",
        relations: "Relasjoner (på tvers mellom objekter): Kobler veggen til en etasje, et system, et materiale, en type. Bestemmer hvordan objektet inngår i modellen.",
      },
    },
    bestiller: {
      title: "Strukturkrav og kontroll",
      lead: "Riktig modellstruktur er forutsetningen for at leveranser kan kontrolleres, sammenlignes og brukes videre. Uten klar struktur faller automatisert kvalitetssikring fra hverandre.",
      focus: [
        {
          title: "Romlig nedbrytning – sett krav tidlig",
          content: "Prosjekt, tomt, bygning, etasje og rom skal identifiseres med nummer og navn. Korrekt utfylt romlig nedbrytning gir entydig organisering som hjelper alle parter. Det skal bare gjøres én gang per modell – men feil her forplanter seg overalt.",
          action: "Definer den romlige nedbrytningen i BIM-manualen og kontroller den med IDS.",
        },
        {
          title: "Typeobjekter – konsistens og endringshåndtering",
          content: "IfcTypeObject definerer felles egenskaper som flere forekomster arver. Uten typeobjekter må endringer gjøres på hver enkelt forekomst – det gir inkonsistens og feil.",
          action: "Still krav om bruk av typeobjekter der det er faglig relevant.",
        },
        {
          title: "Relasjoner – ikke fritekst",
          content: "Systemtilhørighet, klassifikasjon og materialkobling skal modelleres som relasjoner i IFC – ikke legges som fritekst i egenskaper. Fritekst kan ikke kontrolleres maskinelt.",
          action: "Bruk IDS til å sjekke at relasjoner er korrekt modellert, ikke bare at verdier finnes.",
        },
      ],
    },
  },

  // ── SECTION 3: Relations ──
  relations: {
    ny: {
      title: "Hvordan ting henger sammen",
      lead: "I en IFC-modell er objektene ikke bare plassert ved siden av hverandre – de er koblet sammen med relasjoner som forteller hvem som hører til hvor, og hva som påvirker hva.",
      intro: "Tenk på en dør. Den sitter i en vegg. Veggen tilhører første etasje. Døren er av en bestemt type og har et bestemt materiale. Alle disse koblingene er relasjoner – usynlige tråder som holder modellen sammen.",
      connections: [
        { from: "🚪 Dør", to: "🧱 Vegg", relation: "sitter i", color: "#1a7a5c" },
        { from: "🧱 Vegg", to: "🏠 Etasje", relation: "tilhører", color: "#2563a8" },
        { from: "🚪 Dør", to: "📦 Dørtype", relation: "er av type", color: "#6d3ab5" },
        { from: "🔧 Rør", to: "⚡ System", relation: "inngår i", color: "#c4590a" },
      ],
      takeaway: "Uten relasjoner er en IFC-modell bare en haug med løse objekter. Relasjonene gir modellen mening og struktur.",
    },
    bruker: {
      title: "Relasjonstyper i IFC",
      lead: "IFC bruker eksplisitte relasjoner for å koble objekter sammen. Å forstå de ulike relasjonstypene er nøkkelen til å lese og modellere riktig.",
      types: [
        {
          name: "Romlig innbygging",
          entity: "IfcRelContainedInSpatialStructure",
          icon: "📍",
          color: "#1a7a5c",
          desc: "Plasserer fysiske objekter i den romlige strukturen. En vegg «bor» i en etasje. Hvert objekt skal plasseres nøyaktig én gang.",
        },
        {
          name: "Aggregering og nesting",
          entity: "IfcRelAggregates / IfcRelNests",
          icon: "🧩",
          color: "#2563a8",
          desc: "Bryter ned sammensatte objekter. En bro aggregeres til bruspenn. Aggregerte deler er selvstendige; nestede deler er tett integrert og opptrer normalt ikke alene.",
        },
        {
          name: "Systemtilhørighet",
          entity: "IfcRelAssignsToGroup",
          icon: "⚡",
          color: "#c4590a",
          desc: "Kobler objekter til systemer, soner og grupper. En ventil kan tilhøre ventilasjonssystemet OG en brannseksjon OG en vedlikeholdsgruppe – samtidig.",
        },
        {
          name: "Materialtilknytning",
          entity: "IfcRelAssociatesMaterial",
          icon: "🧱",
          color: "#6d3ab5",
          desc: "Kobler materiale eller materiallag til objekter. En vegg knyttes til sitt IfcMaterialLayerSet som beskriver alle lagene.",
        },
        {
          name: "Typetilknytning",
          entity: "IfcRelDefinesByType",
          icon: "📦",
          color: "#1a7a5c",
          desc: "Kobler forekomster til typeobjekter. Alle dører av samme type deler felles egenskaper definert på IfcDoorType.",
        },
        {
          name: "Egenskapstilknytning",
          entity: "IfcRelDefinesByProperties",
          icon: "📋",
          color: "#2563a8",
          desc: "Kobler egenskapssett (Pset) og mengdesett (Qto) til objekter. Selve egenskapene ligger i settet, relasjonen knytter settet til objektet.",
        },
        {
          name: "Romavgrensning",
          entity: "IfcRelSpaceBoundary",
          icon: "🔲",
          color: "#c4590a",
          desc: "Definerer hvilke bygningsdeler som avgrenser et rom – vesentlig for termiske beregninger, brannsimulering og energianalyse.",
        },
        {
          name: "Klassifikasjon",
          entity: "IfcRelAssociatesClassification",
          icon: "🏷️",
          color: "#6d3ab5",
          desc: "Kobler klassifikasjonskoder til objekter. Et objekt kan ha flere systemer samtidig (TFM, RDS, prosjektspesifikk).",
        },
      ],
      note: "Alle relasjoner i IFC er egne objekter som arver fra IfcRelationship. De er ikke bare «pekere» – de har GlobalId, navn og kan ha egne egenskaper.",
    },
    bestiller: {
      title: "Krav til relasjoner i leveranser",
      lead: "Relasjoner er like viktige som egenskaper – men vanskeligere å kontrollere. Manglende eller feil relasjoner er en av de vanligste feilkildene i IFC-leveranser.",
      focus: [
        {
          title: "Relasjoner skal modelleres – ikke fritekst",
          content: "Systemtilhørighet, klassifikasjon og materialkobling skal modelleres som relasjoner i IFC. Når informasjonen ligger som fritekst i egenskapsfelt kan den ikke kontrolleres maskinelt, aggregeres eller brukes i automatiserte prosesser.",
          action: "Spesifiser eksplisitt hvilke relasjonstyper som kreves i leveransekrav og BIM-manual.",
        },
        {
          title: "Kontroller med IDS",
          content: "IDS kan sjekke at relasjoner er korrekt modellert – ikke bare at verdier finnes i egenskapsfelt. For eksempel kan du kreve at alle vegger har materialkobling via IfcRelAssociatesMaterial, ikke bare at et felt «Materiale» er utfylt.",
          action: "Lag IDS-regler som sjekker relasjoner, ikke bare egenskapsverdier.",
        },
        {
          title: "Romavgrensning for energi og brann",
          content: "IfcRelSpaceBoundary er avgjørende for termiske analyser og brannsimulering. Uten korrekte romavgrensninger kan energiberegningsverktøy ikke tolke modellen. Dette er et krav som ofte glemmes eller misforstås.",
          action: "Still krav om romavgrensning tidlig dersom energi- eller brannanalyse er relevant.",
        },
        {
          title: "Vanlige mangler",
          items: [
            "Objekter uten romlig plassering (manglende IfcRelContainedInSpatialStructure)",
            "Systemtilhørighet lagt som fritekst i stedet for IfcRelAssignsToGroup",
            "Materialer angitt som tekststreng, ikke via IfcRelAssociatesMaterial",
            "Klassifikasjon kun i egenskapssett, ikke via IfcRelAssociatesClassification",
          ],
        },
      ],
    },
  },

  // ── SECTION 4: Properties & Classification ──
  properties: {
    ny: {
      title: "Egenskaper – informasjonen bak 3D",
      lead: "En IFC-modell er mye mer enn det du ser i 3D. Hvert objekt kan ha masse informasjon knyttet til seg.",
      content: "Tenk på en dør i modellen. Den ser kanskje ut som et enkelt rektangel i 3D, men bak den ligger informasjon som: brannklasse, lydklasse, produsent, farge, høyde, bredde, og mye mer. Denne informasjonen er organisert i egenskapssett – som små «informasjonskort» for hvert objekt.",
      examples: [
        { obj: "🚪 Dør", props: "Brannklasse · Lydklasse · Høyde · Bredde · Produsent" },
        { obj: "🧱 Vegg", props: "U-verdi · Materiallag · Tykkelse · Brannmotstand" },
        { obj: "🔧 Rør", props: "Dimensjon · Materiale · Trykklasse · System" },
      ],
    },
    bruker: {
      title: "Attributter, egenskaper og klassifikasjon",
      lead: "Å vite hvor informasjonen bor i IFC – og hva som er forskjellen på attributter, Pset, Qto og klassifikasjon – er avgjørende for å modellere og eksportere riktig.",
      sections: [
        {
          title: "Attributter vs. egenskaper",
          content: "Attributter er del av selve entiteten (f.eks. Name, ObjectType, GlobalId). Egenskaper er fleksible og samlet i egenskapssett (Pset). Ikke all informasjon ligger i Pset – noe er attributter direkte på objektet.",
        },
        {
          title: "Standardiserte Pset og Qto",
          content: "IFC har ferdigdefinerte egenskapssett med prefiks Pset_ (egenskaper) og Qto_ (mengder). Disse har faste navn, datatyper og betydning. Bruk alltid standardiserte sett der de finnes – ikke lag egne for informasjon som allerede er definert.",
        },
        {
          title: "Typeobjekt vs. forekomst",
          content: "Egenskaper som er felles for en type bør legges på typeobjektet (IfcTypeObject), ikke på hver enkelt forekomst. Endring på typen oppdaterer alle forekomster. Typeobjekter er ikke del av den romlige strukturen.",
        },
        {
          title: "Klassifikasjon",
          content: "IFC har egen mekanisme via IfcClassification og IfcClassificationReference. Bruk denne – ikke legg klassifikasjonskoder som fritekst. Et objekt kan ha flere klassifikasjonssystemer samtidig (f.eks. TFM, RDS, prosjektspesifikk).",
        },
        {
          title: "bSDD – dataordbok for IFC",
          content: "buildingSMART Data Dictionary (bSDD) er en nettbasert ordbok over begreper, egenskaper og klassifikasjoner. Når du oppretter egendefinerte egenskaper kan du koble dem til offisielle definisjoner i bSDD – slik at andre kan forstå og gjenbruke dem. bSDD sikrer at «brannmotstand» betyr det samme for alle, uansett programvare eller land.",
        },
      ],
    },
    bestiller: {
      title: "Krav til egenskaper og egendefinerte sett",
      lead: "Riktige egenskapskrav er fundamentet for kontroll, verdioverføring og forvaltning. Her skilles det mellom standardiserte og egendefinerte egenskaper – og reglene for begge.",
      sections: [
        {
          title: "Bruk standardiserte egenskaper først",
          content: "Egendefinerte egenskaper skal ikke opprettes for informasjon som allerede finnes i IFC eller NS 8360-1:2023/G1:2025. Kontroller alltid mot disse før nye egenskaper defineres.",
        },
        {
          title: "Regler for egendefinerte egenskapssett",
          content: "Prefiks: Landekode + organisasjon (f.eks. NOBSN for buildingSMART Norge). Navn: Beskrivende, på engelsk, CamelCase. Eksempel: NOBSN_ProductIdentifiers.NOBB. Prefiks og navn skilles med underscore, egenskapssett og egenskap med punktum.",
        },
        {
          title: "Ikke dupliser – tilpass visningen",
          content: "Et vanlig problem er at prosjekter kopierer standardiserte egenskaper inn i egne prosjektspesifikke sett «for enkelhets skyld». Dette bryter med standarden og gjør langsiktig gjenbruk vanskelig. Løsningen: bevar standardisert struktur i modellen, bruk programvare med tilpassede visninger for ulike brukergrupper.",
        },
        {
          title: "Qto ≠ kalkulasjonsgrunnlag",
          content: "Base quantities i IFC følger standardens definisjoner for bruttoareal, nettoareal, volum osv. Prosjektets kalkulasjonsgrunnlag kan ha andre avgrensninger, avrundingsregler eller kontraktsmessige definisjoner. Vær tydelig på forskjellen.",
        },
        {
          title: "bSDD – koble egendefinerte egenskaper til offisielle definisjoner",
          content: "Alle egendefinerte egenskaper bør kobles til buildingSMART Data Dictionary (bSDD). Dette sikrer at egenskapene har entydige definisjoner som kan forstås på tvers av prosjekter, organisasjoner og land. bSDD er tilgjengelig via nettleser og API.",
          action: "Krev at egendefinerte egenskaper er registrert i eller koblet til bSDD der det er relevant.",
        },
      ],
    },
  },

  // ── SECTION 5: Materials ──
  materials: {
    ny: {
      title: "Materialer – hva ting er laget av",
      lead: "Bak hvert objekt i en IFC-modell kan det ligge informasjon om materialer. En vegg er ikke bare en form – den har materiallag som betong, isolasjon og gips.",
      content: "Tenk på en yttervegg. Den ser kanskje ut som én ting i 3D, men i virkeligheten er den bygget opp av flere lag – hvert lag med sitt materiale og sin tykkelse. IFC kan beskrive dette i detalj.",
      layers: [
        { name: "Gips", thickness: "13 mm", color: "#e8e8e8" },
        { name: "Bindingsverk + isolasjon", thickness: "200 mm", color: "#f5deb3" },
        { name: "Vindsperre", thickness: "3 mm", color: "#b4cde8" },
        { name: "Luftspalte", thickness: "25 mm", color: "#fafafa" },
        { name: "Utvendig kledning", thickness: "22 mm", color: "#c9a87c" },
      ],
      takeaway: "Materialinformasjon er viktig for energiberegninger, brannvurderinger og miljøanalyser (LCA).",
    },
    bruker: {
      title: "Materialstruktur i IFC",
      lead: "IFC har et hierarki for materialbeskrivelse – fra enkelt materiale til komplett lagoppbygging med plassering.",
      levels: [
        {
          name: "IfcMaterial",
          desc: "Enkelt materiale – f.eks. «Betong C30/37». Det grunnleggende byggeblokksteinet.",
          icon: "⬜",
          color: "#1a7a5c",
        },
        {
          name: "IfcMaterialLayer",
          desc: "Ett lag med materiale og tykkelse – f.eks. «150 mm betong». Peker til et IfcMaterial.",
          icon: "📏",
          color: "#2563a8",
        },
        {
          name: "IfcMaterialLayerSet",
          desc: "En ordnet stabel av lag – hele veggens oppbygning fra innside til utside. Rekkefølgen betyr noe.",
          icon: "📚",
          color: "#6d3ab5",
        },
        {
          name: "IfcMaterialLayerSetUsage",
          desc: "Hvordan stabelen plasseres på objektet – offset fra akselinje og retning (innover/utover). Knytter lagsettet til den fysiske veggen.",
          icon: "📐",
          color: "#c4590a",
        },
      ],
      note: "Materialer knyttes til objekter via relasjonen IfcRelAssociatesMaterial – ikke som egenskaper. Dette muliggjør maskinell lesing og konsistenssjekk.",
    },
    bestiller: {
      title: "Krav til materialinformasjon",
      lead: "Materialdata i IFC er grunnlaget for energianalyse, LCA og brannprosjektering. Manglende eller feil materialinformasjon er et av de vanligste problemene.",
      focus: [
        {
          title: "Krev strukturert materialinformasjon",
          content: "Materialer skal modelleres via IfcMaterial og tilknyttes objekter gjennom relasjoner – ikke som fritekst i egenskapsfelt. Bare strukturert materialinfo kan brukes i beregninger.",
          action: "Definer materialinnhold som leveransekrav og kontroller med IDS.",
        },
        {
          title: "Lagoppbygging for sammensatte konstruksjoner",
          content: "For vegger, dekker og tak bør IfcMaterialLayerSet brukes med korrekte tykkelser og rekkefølge. Dette er nødvendig for U-verdi-beregninger og brannvurderinger.",
          action: "Krev materiallagoppbygging for alle bærende og klimaskillende konstruksjoner.",
        },
        {
          title: "Konsistent navngiving",
          content: "Materialnavnene i modellen bør følge prosjektets materialbibliotek. Ulike skrivemåter av samme materiale (f.eks. «betong», «Betong», «BETONG C30/37») gjør aggregering og kontroll umulig.",
          action: "Definer materialkatalog i BIM-manualen og kontroller navngiving maskinelt.",
        },
      ],
    },
  },

  // ── SECTION 6: Geometry ──
  geometry: {
    ny: {
      title: "Hvordan formen beskrives",
      lead: "Når du ser et 3D-objekt i en IFC-modell, er det ikke bare «en tegning» – formen er beskrevet med matematikk på ulike måter.",
      content: "Den enkleste måten å beskrive f.eks. en vegg er å ta et rektangel og «dra» det langs en linje – som å presse leire gjennom en form. Dette kalles Swept Solids. For mer komplekse former brukes andre metoder – men for de fleste brukere er det viktigste å vite at IFC-geometri er designet for å se lik ut uavhengig av hvilket program du åpner det i.",
      types: [
        { name: "Swept Solids", desc: "Enkel form dratt langs en linje. Mest brukt for vegger, dekker, søyler.", icon: "▮" },
        { name: "B-Rep / Mesh", desc: "Overflater som «pakker inn» et volum. For komplekse former.", icon: "◇" },
      ],
    },
    bruker: {
      title: "Geometriske representasjoner",
      lead: "IFC støtter flere geometrityper. Valget mellom dem påvirker filstørrelse, redigerbarhet, mengdeuttak og kompatibilitet mellom programvarer.",
      types: [
        {
          name: "Swept Solids",
          pro: "Kompakt, entydig, god for mengdeuttak og regelbaserte kontroller.",
          con: "Begrenset for komplekse former, skrå detaljer og fri geometri.",
          use: "Vegger, dekker, søyler, bjelker – enkle, regelmessige bygningsdeler.",
          color: C.green,
        },
        {
          name: "CSG (Constructive Solid Geometry)",
          pro: "Strukturert beskrivelse av komplekse former via boolean-operasjoner.",
          con: "Krevende å implementere konsistent. Kan gi avvik mellom programmer.",
          use: "Objekter med utsparinger og sammensetninger.",
          color: C.blue,
        },
        {
          name: "B-Rep (Boundary Representation)",
          pro: "Kan beskrive nesten enhver form. Stabil visning og kollisjonskontroll.",
          con: "Låst geometri – dårlig for redigering og nøyaktige mengder.",
          use: "Komplekse, detaljerte komponenter og frie geometrier.",
          color: C.purple,
        },
        {
          name: "Triangulert mesh",
          pro: "Robust, forutsigbar visning. God for koordinering.",
          con: "Ingen parametrisk info. Kan gi store filer.",
          use: "Koordinering, visuell kontroll, kollisjonskontroll.",
          color: C.orange,
        },
      ],
      note: "I praksis inneholder IFC-filer ofte en kombinasjon: Swept Solids for enkle deler, triangulert B-Rep for komplekse. Reference View prioriterer robust og entydig geometri fremfor redigerbarhet.",
    },
    bestiller: {
      title: "Geometrikrav i leveranser",
      lead: "For de fleste formål er det viktigere at geometrien er robust og entydig enn at den er redigerbar. Men krav må være eksplisitte.",
      content: "Noen programvarer eksporterer alt som triangulert mesh selv om enklere representasjoner er mulig. Resultatet: unødvendig tunge filer, mindre presise mengdeuttak, og geometri som er låst for videre bruk. Krav til geometrisk representasjon bør avklares tidlig. Testeksport bør gjøres før full produksjon.",
      actions: [
        "Spesifiser krav til geometrisk representasjon i prosjektets BIM-manual",
        "Krev testeksport tidlig – før full produksjon starter",
        "Avklar behov for redigerbar geometri eksplisitt dersom det er nødvendig",
        "Vær bevisst på at Reference View er designet for koordinering, ikke redigering",
      ],
    },
  },

  // ── SECTION 7: Infrastructure & Georeferencing ──
  infrastructure: {
    ny: {
      title: "IFC for veger, broer og jernbane",
      lead: "IFC handlet opprinnelig bare om bygninger. Med IFC 4.3 støttes også infrastruktur – veger, jernbane, broer og tunneler.",
      content: "Tenk deg at du bygger en ny vei. Den har en bestemt trasé med svinger og stigninger, den krysser kanskje en elv med en bro, og den må kobles til eksisterende terreng. IFC kan nå beskrive alt dette – ikke bare bygningene langs veien.",
      items: [
        { icon: "🛣️", label: "Veger og jernbane", desc: "Trasé, profil, overbygning og elementer langs linjen." },
        { icon: "🌉", label: "Broer og tunneler", desc: "Bærekonstruksjoner, bruspenn, tunnelprofiler." },
        { icon: "🏔️", label: "Terreng", desc: "Eksisterende terreng kan beskrives som IfcGeographicElement." },
        { icon: "📍", label: "Koordinater", desc: "IFC kan koble modellen til virkelige koordinater på jordoverflaten." },
      ],
    },
    bruker: {
      title: "Infrastruktur, terreng og georeferering",
      lead: "IFC 4.3 introduserte nye konsepter for lineær infrastruktur og terrengmodellering, samt forbedret støtte for georeferering.",
      sections: [
        {
          title: "IfcAlignment – linjeføring",
          icon: "📐",
          color: "#1a7a5c",
          content: "IfcAlignment beskriver traseen til en vei, jernbane eller ledning gjennom tre komponenter: horisontal geometri (kurvatur i plan), vertikal profil (stigninger og fall) og eventuell skjevstilling (cant). Sammen definerer de en 3D-kurve som andre objekter plasseres relativt til.",
        },
        {
          title: "IfcReferent – profilnummer og referansepunkter",
          icon: "📍",
          color: "#2563a8",
          content: "IfcReferent markerer bestemte punkter langs en alignment – typisk kilometermerker, stikningspunkter eller referansepunkter for surveydata. Koblingen mellom alignments og referenter gjør det mulig å angi posisjoner som «km 12+345».",
        },
        {
          title: "IfcGeographicElement – terreng",
          icon: "🏔️",
          color: "#6d3ab5",
          content: "Eksisterende terreng modelleres som IfcGeographicElement, typisk med triangulert geometri (TIN). Dette gir grunnlag for masseberegninger, grunnforhold og landskapstilpasning.",
        },
        {
          title: "Georeferering – fra lokal til global",
          icon: "🌍",
          color: "#c4590a",
          content: "IfcMapConversion transformerer modellens lokale koordinater til et globalt koordinatsystem. IfcProjectedCRS definerer hvilket kartprojeksjonssystem som brukes (f.eks. EUREF89 UTM sone 32). IFC 4.3 støtter også store koordinatverdier, som er nødvendig for infrastrukturprosjekter.",
        },
      ],
    },
    bestiller: {
      title: "Krav til infrastruktur og georeferering",
      lead: "For infrastrukturprosjekter og prosjekter med flere modeller er riktig georeferering kritisk. Feil her gir koordinatforskyvninger som forplanter seg gjennom hele prosjektet.",
      focus: [
        {
          title: "Krev korrekt georeferering",
          content: "Alle IFC-modeller skal ha korrekt IfcMapConversion og IfcProjectedCRS. Spesifiser geodetisk datum (f.eks. EUREF89), projeksjon (f.eks. UTM sone 32) og eventuell lokal forskyvning. Feil georeferering er et av de vanligste problemene i koordinerte modeller.",
          action: "Definer koordinatsystem i BIM-manualen og kontroller georeferering i første leveranse.",
        },
        {
          title: "Store koordinatverdier",
          content: "Infrastrukturprosjekter har ofte koordinater med store tallverdier som kan gi presisjonsproblemer i programvare. IFC 4.3 håndterer dette bedre, men det bør testes tidlig. Noen prosjekter bruker en lokal forskyvning for å redusere tallverdiene.",
          action: "Test koordinathåndtering med faktiske prosjektkoordinater før produksjonsstart.",
        },
        {
          title: "Terreng og grunnforhold",
          content: "Eksisterende terreng (IfcGeographicElement) bør leveres som egen modell eller i en dedikert del av modellen. Terrenget er grunnlaget for masseberegninger og landskapsplanlegging.",
          action: "Still krav om terrengmodell i IFC der dette er relevant for prosjektet.",
        },
      ],
    },
  },

  // ── SECTION 8: Versions & Tools ──
  versions: {
    ny: {
      title: "IFC finnes i flere versjoner",
      lead: "Som all programvare utvikles IFC over tid. Det er nyttig å vite hvilke versjoner som finnes.",
      versions: [
        { v: "IFC 2x3", status: "Eldre", desc: "Brukt i mange år, finnes fortsatt i mange prosjekter.", color: C.inkMuted },
        { v: "IFC 4", status: "Standard", desc: "Mest brukt i dag. Bedre støtte for geometri og egenskaper.", color: C.blue },
        { v: "IFC 4.3", status: "Nyest", desc: "Støtter veg, jernbane, broer og annen infrastruktur.", color: C.green },
        { v: "IFC 5", status: "Fremtid", desc: "Ny arkitektur. JSON-basert. Enklere å implementere.", color: C.purple },
      ],
      numberingNote: {
        title: "Hvorfor heter det IFC 4 og ikke IFC 2x4?",
        content: "De tidlige versjonene hadde kompliserte nummer: IFC 1.0, 1.5, 2.0, 2x, 2x2, 2x3. Da neste versjon skulle slippes, forenklet buildingSMART nummereringen. IFC 2x4 ble til IFC 4 – rett og slett versjon nummer fire. Neste hovedversjon blir IFC 5 (ikke IFC 3). Punktversjoner som 4.1, 4.2 og 4.3 er tillegg til IFC 4.",
      },
    },
    bruker: {
      title: "Versjoner, MVD og verktøy",
      lead: "Riktig versjon og riktig MVD (Model View Definition) er avgjørende for at utveksling fungerer.",
      content: [
        {
          title: "MVD – avgrenset utveksling",
          text: "En MVD definerer hvilke objekttyper, relasjoner og egenskaper som skal brukes for et bestemt formål. Reference View er mest brukt – designet for koordinering, kollisjonskontroll og visuell samordning. Design Transfer View var mer ambisiøs, men viste seg vanskelig i praksis.",
        },
        {
          title: "Sertifisering ≠ full støtte",
          text: "Sertifisering gjelder mot en spesifikk visning og versjon. To programmer kan begge være IFC-sertifiserte, men for ulike ting. Sertifisering er en indikasjon, ikke en garanti for full funksjonell likhet.",
        },
        {
          title: "IDS og BCF",
          text: "IDS (Information Delivery Specification) beskriver krav til IFC-leveranser maskinlesbart. BCF (BIM Collaboration Format) kommuniserer avvik og kommentarer. Sammen gir de en effektiv kontroll-og-oppfølgingsflyt.",
        },
      ],
    },
    bestiller: {
      title: "Kravstilling, kontroll og sertifisering",
      lead: "Tydelige krav, aktiv kontroll og realistiske forventninger til programvarestøtte er det som skiller vellykkede IFC-prosjekter fra de som feiler.",
      tools: [
        {
          name: "IDS",
          full: "Information Delivery Specification",
          desc: "Maskintolkbare krav til IFC-leveranser. Spesifiserer objekttyper, egenskaper, relasjoner og verdier. Muliggjør automatisk kontroll.",
          action: "Lag IDS-filer for alle sentrale leveransekrav og bruk dem aktivt i kontroll.",
        },
        {
          name: "BCF",
          full: "BIM Collaboration Format",
          desc: "Åpen standard for kommunikasjon av avvik og kommentarer. Kan kobles til IDS-kontroller for strukturert oppfølging.",
          action: "Bruk BCF for å kommunisere funn – unngå å sende hele modeller frem og tilbake.",
        },
        {
          name: "IFC Validation Service",
          full: "buildingSMART International",
          desc: "Tester IFC-filer mot formelle krav i standarden. Særlig nyttig for IFC4.3 der sertifisering fortsatt er under utvikling.",
          action: "Krev at leverandører validerer IFC-filer før levering.",
        },
      ],
    },
  },
  // ── SECTION 9: Practical Considerations ──
  practical: {
    ny: {
      title: "Praktiske tips for hverdagen",
      lead: "Du trenger ikke kunne alt om IFC for å bruke det. Her er noen enkle tips som gjør hverdagen lettere.",
      tips: [
        { icon: "📋", title: "Spør om versjon", desc: "Når du får en IFC-fil, sjekk hvilken versjon den er i (IFC 2x3 eller IFC 4). Det påvirker hva programmet ditt kan vise." },
        { icon: "🔍", title: "Test at filen åpner seg", desc: "Åpne filen i en gratis IFC-viser (som BIMcollab ZOOM eller Solibri Anywhere) for å sjekke at alt ser riktig ut." },
        { icon: "🗂️", title: "Sjekk strukturen", desc: "Se om modellen har riktige etasjer og rom. Hvis den romlige strukturen mangler, er det vanskelig å finne frem." },
        { icon: "❓", title: "Vit hvem du kan spørre", desc: "BIM-koordinatoren i prosjektet kan hjelpe hvis noe ser feil ut eller mangler. Ikke nøl med å spørre." },
        { icon: "💾", title: "Behold originalfilen", desc: "Ikke gjør endringer i den originale IFC-filen. Lag en kopi hvis du vil eksperimentere." },
      ],
    },
    bruker: {
      title: "Praktiske avveininger ved bruk av IFC",
      lead: "Avstanden mellom teori og praksis er reell. Her er de vanligste utfordringene – og hva du kan gjøre med dem.",
      issues: [
        {
          title: "Prosjektspesifikke vs. standardiserte egenskaper",
          icon: "⚖️",
          color: C.blue,
          content: "Det er en grunnleggende spenning mellom å bruke IFCs standardiserte egenskapssett (Pset_*) og prosjektspesifikke behov. Mange prosjekter lager egne egenskapssett for å dekke spesifikke behov – men dette undergraver interoperabiliteten. Løsningen er å bruke standardiserte sett der de finnes, og følge bSDD-konvensjoner for det som må tilpasses.",
        },
        {
          title: "Fritekst-problematikken",
          icon: "✏️",
          color: C.orange,
          content: "Når informasjon som burde vært strukturert (klassifikasjon, materialer, systemtilhørighet) legges som fritekst, blir den umulig å kontrollere maskinelt. «Brannklasse EI60» i et tekstfelt kan ikke valideres – det kan like gjerne stå «EI 60», «EI-60» eller «Brannkl. 60min». Bruk IFCs egne mekanismer for klassifikasjon, materialer og relasjoner.",
        },
        {
          title: "Mangelfull romstruktur",
          icon: "🏗️",
          color: C.purple,
          content: "En overraskende andel IFC-filer mangler korrekt romlig nedbrytning – etasjer uten rom, objekter plassert på feil etasje, eller flat struktur uten hierarki. Dette gjør det umulig å filtrere, aggregere eller kontrollere per etasje/rom. Romstrukturen bør kvalitetssikres tidlig.",
        },
        {
          title: "Eksportproblemer",
          icon: "📤",
          color: C.green,
          content: "Kvaliteten på IFC-eksport varierer mellom programvarer. Vanlige problemer: unødvendig tessellering (alt blir mesh), tapte egenskaper, feil materialtilknytning, og manglende relasjoner. Testeksport tidlig i prosjektet avdekker problemer før de blir kostbare.",
        },
        {
          title: "Feil georeferering",
          icon: "🌍",
          color: C.coral,
          content: "Når flere modeller skal koordineres er riktig georeferering kritisk. Vanlige feil: feil koordinatsystem, manglende IfcMapConversion, eller store tallverdier som gir presisjonsfeil. Resultatet er modeller som «flyr» til feil sted. Avklar koordinatsystem ved prosjektstart.",
        },
      ],
    },
    bestiller: {
      title: "Kvalitetssikring og vanlige fallgruver",
      lead: "De mest vellykkede IFC-prosjektene har tydelige krav, tidlig testing og systematisk kontroll. Her er de viktigste lærdommene fra praksis.",
      workflow: {
        title: "Anbefalt kvalitetssikringsflyt",
        steps: [
          { step: "1", label: "Definer krav", desc: "BIM-manual med romlig nedbrytning, egenskapskrav, koordinatsystem og MVD." },
          { step: "2", label: "Lag IDS", desc: "Oversett kravene til maskinlesbare IDS-filer for automatisert kontroll." },
          { step: "3", label: "Testeksport", desc: "Krev testleveranse tidlig. Avdekk eksportproblemer før full produksjon." },
          { step: "4", label: "Valider", desc: "Bruk IFC Validation Service og IDS-kontroll på alle leveranser." },
          { step: "5", label: "Følg opp", desc: "Kommuniser funn via BCF. Unngå å sende modeller frem og tilbake." },
        ],
      },
      pitfalls: [
        {
          title: "Vage krav gir dårlige leveranser",
          content: "«Levér i IFC» er ikke et krav. Spesifiser versjon (IFC 4), MVD (Reference View), egenskapskrav (via IDS), romlig nedbrytning og koordinatsystem. Jo tydeligere kravene er, jo bedre blir leveransene.",
        },
        {
          title: "Prosjektspesifikke sett dupliserer standarden",
          content: "Et vanlig problem er at prosjekter kopierer standardegenskaper inn i egne sett «for enkelhets skyld». Dette bryter med standarden, gjør kontroll vanskeligere og hindrer langsiktig gjenbruk. Bevar standardisert struktur – tilpass visningen i programvare, ikke i modellen.",
        },
        {
          title: "Romstruktur kontrolleres for sent",
          content: "Mangelfull romlig nedbrytning – etasjer uten rom, objekter på feil etasje, flat struktur – er et av de vanligste problemene. Feil i romstrukturen forplanter seg overalt: feil mengdeuttak, feil romprogram, feil per-etasje-rapporter. Kontroller dette ved første leveranse.",
        },
        {
          title: "Georeferering sjekkes aldri",
          content: "Feil georeferering oppdages ofte først når modeller skal samordnes – og da er det sent. Spesifiser koordinatsystem og kontrollpunkt i BIM-manualen. Sjekk IfcMapConversion og IfcProjectedCRS i første leveranse.",
        },
        {
          title: "Sertifisering overselges",
          content: "Programvaresertifisering gjelder mot en spesifikk MVD og IFC-versjon. At et program er «IFC-sertifisert» betyr ikke at det støtter alt. Spør om sertifisering for den spesifikke versjonen og MVD-en prosjektet bruker.",
        },
      ],
    },
  },
};

// ─── COMPONENTS ──────────────────────────────────────────────────────

function LevelSelector({ selected, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 680, margin: "0 auto", width: "100%" }}>
      {LEVELS.map((lvl) => {
        const active = selected === lvl.id;
        return (
          <button
            key={lvl.id}
            onClick={() => onSelect(lvl.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              padding: "22px 26px",
              borderRadius: 14,
              border: `2px solid ${active ? lvl.color : C.border}`,
              background: active ? lvl.colorBg : C.surface,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: active ? "scale(1.02)" : "scale(1)",
              boxShadow: active ? `0 4px 24px ${lvl.color}18` : "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <span style={{
              fontSize: 32,
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              background: active ? `${lvl.color}15` : C.bgWarm,
              flexShrink: 0,
              transition: "all 0.3s",
            }}>{lvl.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: FONTS.display,
                fontSize: 19,
                fontWeight: 700,
                color: active ? lvl.color : C.ink,
                marginBottom: 3,
              }}>{lvl.label}</div>
              <div style={{
                fontFamily: FONTS.body,
                fontSize: 14,
                color: C.inkMuted,
                marginBottom: 4,
              }}>{lvl.subtitle}</div>
              <div style={{
                fontFamily: FONTS.mono,
                fontSize: 11,
                color: C.inkFaint,
                letterSpacing: 0.3,
              }}>{lvl.roles}</div>
            </div>
            <span style={{
              fontSize: 18,
              color: lvl.color,
              flexShrink: 0,
              opacity: 0.5,
              transition: "all 0.3s",
            }}>→</span>
          </button>
        );
      })}
    </div>
  );
}

function SectionDivider({ number, color }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      margin: "64px 0 40px",
      opacity: 0.5,
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        border: `2px solid ${color || C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONTS.mono,
        fontSize: 14,
        fontWeight: 700,
        color: color || C.inkMuted,
      }}>{number}</div>
      <div style={{ flex: 1, height: 1, background: C.border }} />
    </div>
  );
}

function ContentCard({ children, accent, style: extraStyle }) {
  return (
    <div style={{
      background: C.surface,
      borderRadius: 14,
      border: `1px solid ${C.border}`,
      padding: "20px 18px",
      marginBottom: 16,
      borderLeft: accent ? `4px solid ${accent}` : undefined,
      overflow: "hidden",
      ...extraStyle,
    }}>{children}</div>
  );
}

function Tag({ color, children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 6,
      background: `${color}15`,
      color: color,
      fontSize: 11,
      fontWeight: 700,
      fontFamily: FONTS.mono,
      letterSpacing: 0.5,
      textTransform: "uppercase",
    }}>{children}</span>
  );
}

// ─── SECTION RENDERERS ───────────────────────────────────────────────

function RenderWhatIsIfc({ data, level, levelColor }) {
  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>

      {data.blocks?.map((block, i) => {
        if (block.type === "domains") {
          return (
            <ContentCard key={i}>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: C.ink, margin: "0 0 16px", fontWeight: 700 }}>{block.title}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {block.items.map((item, j) => (
                  <div key={j} style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: C.bgWarm,
                    border: `1px solid ${C.borderLight}`,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    animation: `slideRight 0.4s ease ${j * 0.08}s both`,
                  }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: C.ink }}>{item.label}</div>
                      <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.inkMuted, marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              {block.footer && <p style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, marginTop: 12, fontStyle: "italic", textAlign: "center" }}>{block.footer}</p>}
            </ContentCard>
          );
        }
        if (block.type === "analogy" || block.type === "technical" || block.type === "strategic" || block.type === "why" || block.type === "practice" || block.type === "warning") {
          const accentMap = { warning: C.orange, strategic: C.purple, analogy: C.green, technical: C.blue, why: C.green, practice: C.blue };
          const tagMap = { warning: "OBS", strategic: "Strategi", analogy: "Forklaring", technical: "Teknisk", why: "Relevans", practice: "I praksis" };
          return (
            <ContentCard key={i} accent={accentMap[block.type]}>
              <Tag color={accentMap[block.type]}>{tagMap[block.type]}</Tag>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: C.ink, margin: "12px 0 8px", fontWeight: 700 }}>{block.title}</h3>
              <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{block.content}</p>
            </ContentCard>
          );
        }
        if (block.type === "keypoint") {
          return (
            <ContentCard key={i}>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: C.ink, margin: "0 0 16px", fontWeight: 700 }}>{block.title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {block.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: 99,
                      background: levelColor,
                      marginTop: 7,
                      flexShrink: 0,
                    }} />
                    <div>
                      <span style={{ fontFamily: FONTS.body, fontWeight: 700, color: C.ink, fontSize: 15 }}>{item.label} – </span>
                      <span style={{ fontFamily: FONTS.body, color: C.inkSoft, fontSize: 15, lineHeight: 1.6 }}>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ContentCard>
          );
        }
        return null;
      })}

      {/* IfcRoot tree for bruker */}
      {data.ifcRoot && (
        <div style={{ marginTop: 24 }}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 20, color: C.ink, margin: "0 0 6px", fontWeight: 800 }}>{data.ifcRoot.title}</h3>
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.6, margin: "0 0 16px" }}>{data.ifcRoot.lead}</p>
          <ContentCard>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <span style={{
                display: "inline-block", padding: "8px 20px", borderRadius: 10,
                background: C.ink, color: "white", fontFamily: FONTS.mono, fontSize: 14, fontWeight: 700,
              }}>IfcRoot</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {data.ifcRoot.branches.map((b, i) => (
                <div key={i} style={{
                  padding: "14px 16px", borderRadius: 12,
                  background: `${b.color}10`, border: `2px solid ${b.color}30`,
                  animation: `slideRight 0.4s ease ${i * 0.1}s both`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 18 }}>{b.icon}</span>
                    <span style={{ fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: b.color, wordBreak: "break-all" }}>{b.name}</span>
                  </div>
                  <p style={{ fontFamily: FONTS.body, fontSize: 13, color: C.inkSoft, lineHeight: 1.5, margin: "0 0 8px" }}>{b.desc}</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {b.children.map((c, j) => (
                      <span key={j} style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.inkFaint }}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 8, background: C.orangeBg, border: `1px solid ${C.orangeBorder}` }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.orange, fontWeight: 700 }}>HUSKEREGEL </span>
              <span style={{ fontFamily: FONTS.body, fontSize: 14, color: C.orange }}>{data.ifcRoot.note}</span>
            </div>
          </ContentCard>
        </div>
      )}

      {/* Physical vs non-physical for bruker */}
      {data.physicalVsNon && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: C.ink, margin: "0 0 14px", fontWeight: 700 }}>{data.physicalVsNon.title}</h3>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[data.physicalVsNon.physical, data.physicalVsNon.nonPhysical].map((item, i) => (
              <ContentCard key={i} accent={i === 0 ? C.green : C.blue} style={{ flex: 1, minWidth: 240 }}>
                <Tag color={i === 0 ? C.green : C.blue}>{item.label}</Tag>
                <p style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkSoft, lineHeight: 1.6, margin: "10px 0 8px" }}>{item.desc}</p>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.inkFaint }}>{item.examples}</div>
              </ContentCard>
            ))}
          </div>
        </div>
      )}

      {/* Domains for bruker */}
      {data.domains && level === "bruker" && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: C.ink, margin: "0 0 6px", fontWeight: 700 }}>{data.domains.title}</h3>
          <p style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, lineHeight: 1.6, margin: "0 0 14px" }}>{data.domains.lead}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
            {data.domains.items.map((d, i) => (
              <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: C.bgWarm, border: `1px solid ${C.borderLight}` }}>
                <span style={{ fontSize: 18, marginRight: 8 }}>{d.icon}</span>
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: C.ink }}>{d.domain}</span>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.inkFaint, marginTop: 4 }}>{d.entities}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data types for bruker */}
      {data.dataTypes && (
        <ContentCard accent={C.blue} style={{ marginTop: 20 }}>
          <Tag color={C.blue}>Teknisk</Tag>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "10px 0 8px", fontWeight: 700 }}>{data.dataTypes.title}</h3>
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{data.dataTypes.content}</p>
        </ContentCard>
      )}
    </div>
  );
}

function RenderStructure({ data, level, levelColor }) {
  const [activeStruct, setActiveStruct] = useState(0);

  if (level === "ny") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 8px" }}>{data.lead}</p>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, margin: "0 0 28px" }}>{data.intro}</p>
        <ContentCard style={{ padding: "20px 18px", overflow: "hidden" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {data.hierarchy.map((node, i) => (
              <div key={i} style={{
                marginLeft: node.depth * 20,
                display: "flex",
                flexDirection: "column",
                gap: 2,
                animation: `slideRight 0.4s ease ${i * 0.07}s both`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {node.depth > 0 && <div style={{ width: 12, height: 2, background: C.border, flexShrink: 0 }} />}
                  <div style={{
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: C.greenBg,
                    border: `1px solid ${C.greenBorder}`,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}>
                    <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, color: C.green }}>{node.label}</span>
                    <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: C.inkFaint }}>{node.entity}</span>
                  </div>
                </div>
                <div style={{ marginLeft: node.depth > 0 ? 22 : 0, fontFamily: FONTS.body, fontSize: 12, color: C.inkMuted, lineHeight: 1.4 }}>{node.desc}</div>
              </div>
            ))}
          </div>
        </ContentCard>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, marginTop: 16, fontStyle: "italic" }}>{data.takeaway}</p>
      </div>
    );
  }

  if (level === "bruker") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>{data.lead}</p>
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          {data.structures.map((s, i) => (
            <button key={i} onClick={() => setActiveStruct(i)} style={{
              flex: 1,
              minWidth: 170,
              padding: "14px 18px",
              borderRadius: 12,
              border: `2px solid ${activeStruct === i ? s.color : C.border}`,
              background: activeStruct === i ? s.colorBg : C.surface,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.3s",
            }}>
              <span style={{ fontSize: 20, marginRight: 8 }}>{s.icon}</span>
              <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 14, color: activeStruct === i ? s.color : C.inkSoft }}>{s.name}</span>
            </button>
          ))}
        </div>
        {data.structures[activeStruct] && (
          <ContentCard accent={data.structures[activeStruct].color}>
            <Tag color={data.structures[activeStruct].color}>{data.structures[activeStruct].question}</Tag>
            <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: "12px 0 8px" }}>{data.structures[activeStruct].desc}</p>
            <p style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{data.structures[activeStruct].detail}</p>
          </ContentCard>
        )}

        {data.inheritanceNote && (
          <ContentCard accent={C.orange} style={{ marginTop: 20 }}>
            <Tag color={C.orange}>Viktig distinksjon</Tag>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "10px 0 12px", fontWeight: 700 }}>{data.inheritanceNote.title}</h3>
            <div style={{
              padding: "14px 18px", borderRadius: 10, background: C.orangeBg, border: `1px solid ${C.orangeBorder}`,
              fontFamily: FONTS.body, fontSize: 15, fontWeight: 700, color: C.orange, textAlign: "center", marginBottom: 14,
            }}>
              {data.inheritanceNote.rule}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 220, padding: "12px 14px", borderRadius: 10, background: C.greenBg, border: `1px solid ${C.greenBorder}` }}>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 4 }}>ARV (nedover)</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>{data.inheritanceNote.inheritance}</div>
              </div>
              <div style={{ flex: 1, minWidth: 220, padding: "12px 14px", borderRadius: 10, background: C.blueBg, border: `1px solid ${C.blueBorder}` }}>
                <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.blue, fontWeight: 700, marginBottom: 4 }}>RELASJONER (på tvers)</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>{data.inheritanceNote.relations}</div>
              </div>
            </div>
          </ContentCard>
        )}
      </div>
    );
  }

  // bestiller
  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>
      {data.focus.map((f, i) => (
        <ContentCard key={i} accent={C.purple}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "0 0 8px", fontWeight: 700 }}>{f.title}</h3>
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 12px" }}>{f.content}</p>
          <div style={{
            padding: "10px 14px",
            borderRadius: 8,
            background: C.purpleBg,
            border: `1px solid ${C.purpleBorder}`,
          }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.purple, fontWeight: 700 }}>→ </span>
            <span style={{ fontFamily: FONTS.body, fontSize: 14, color: C.purple }}>{f.action}</span>
          </div>
        </ContentCard>
      ))}
    </div>
  );
}

function RenderProperties({ data, level, levelColor }) {
  if (level === "ny") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 8px" }}>{data.lead}</p>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, margin: "0 0 24px" }}>{data.content}</p>
        {data.examples.map((ex, i) => (
          <ContentCard key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 28 }}>{ex.obj.split(" ")[0]}</span>
              <div>
                <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: C.ink }}>{ex.obj.split(" ").slice(1).join(" ")}</div>
                <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.inkMuted, marginTop: 2 }}>{ex.props}</div>
              </div>
            </div>
          </ContentCard>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>
      {data.sections.map((s, i) => (
        <ContentCard key={i} accent={levelColor}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "0 0 8px", fontWeight: 700 }}>{s.title}</h3>
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{s.content}</p>
          {s.action && (
            <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 8, background: `${levelColor}10`, border: `1px solid ${levelColor}30` }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: levelColor, fontWeight: 700 }}>→ </span>
              <span style={{ fontFamily: FONTS.body, fontSize: 14, color: levelColor }}>{s.action}</span>
            </div>
          )}
        </ContentCard>
      ))}
    </div>
  );
}

function RenderRelations({ data, level, levelColor }) {
  const [activeRel, setActiveRel] = useState(0);

  if (level === "ny") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 8px" }}>{data.lead}</p>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, margin: "0 0 24px" }}>{data.intro}</p>
        <ContentCard>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {data.connections.map((conn, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
                animation: `slideRight 0.4s ease ${i * 0.08}s both`,
              }}>
                <div style={{ padding: "6px 10px", borderRadius: 8, background: C.bgWarm, border: `1px solid ${C.borderLight}`, fontFamily: FONTS.display, fontSize: 13, fontWeight: 700, color: C.ink }}>
                  {conn.from}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{ width: 12, height: 2, background: conn.color }} />
                  <span style={{ fontFamily: FONTS.mono, fontSize: 10, color: conn.color, fontWeight: 700 }}>{conn.relation}</span>
                  <span style={{ color: conn.color, fontSize: 12 }}>→</span>
                </div>
                <div style={{ padding: "6px 10px", borderRadius: 8, background: `${conn.color}10`, border: `1px solid ${conn.color}30`, fontFamily: FONTS.display, fontSize: 13, fontWeight: 700, color: C.ink }}>
                  {conn.to}
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, marginTop: 16, fontStyle: "italic" }}>{data.takeaway}</p>
      </div>
    );
  }

  if (level === "bruker") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>{data.lead}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8, marginBottom: 20 }}>
          {data.types.map((t, i) => (
            <button key={i} onClick={() => setActiveRel(i)} style={{
              padding: "10px 8px", borderRadius: 10,
              border: `2px solid ${activeRel === i ? t.color : C.border}`,
              background: activeRel === i ? `${t.color}10` : C.surface,
              cursor: "pointer", transition: "all 0.3s", textAlign: "center",
            }}>
              <span style={{ fontSize: 18, display: "block", marginBottom: 4 }}>{t.icon}</span>
              <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 11, color: activeRel === i ? t.color : C.inkMuted }}>{t.name}</span>
            </button>
          ))}
        </div>
        {data.types[activeRel] && (() => {
          const r = data.types[activeRel];
          return (
            <ContentCard accent={r.color}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: 0, fontWeight: 700 }}>{r.name}</h3>
              </div>
              <div style={{ padding: "8px 12px", borderRadius: 8, background: `${r.color}08`, marginBottom: 10 }}>
                <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: r.color }}>{r.entity}</span>
              </div>
              <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
            </ContentCard>
          );
        })()}
        <p style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, lineHeight: 1.6, fontStyle: "italic", marginTop: 16 }}>{data.note}</p>
      </div>
    );
  }

  // bestiller
  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>
      {data.focus.map((f, i) => (
        <ContentCard key={i} accent={C.purple}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "0 0 8px", fontWeight: 700 }}>{f.title}</h3>
          {f.content && <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 12px" }}>{f.content}</p>}
          {f.action && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: C.purpleBg, border: `1px solid ${C.purpleBorder}` }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.purple, fontWeight: 700 }}>→ </span>
              <span style={{ fontFamily: FONTS.body, fontSize: 14, color: C.purple }}>{f.action}</span>
            </div>
          )}
          {f.items && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {f.items.map((item, j) => (
                <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: 99, background: C.coral, marginTop: 7, flexShrink: 0 }} />
                  <span style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </ContentCard>
      ))}
    </div>
  );
}

function RenderMaterials({ data, level, levelColor }) {
  if (level === "ny") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 8px" }}>{data.lead}</p>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, margin: "0 0 24px" }}>{data.content}</p>
        <ContentCard>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 16, color: C.ink, margin: "0 0 14px", fontWeight: 700 }}>Yttervegg – lagoppbygging</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
            {data.layers.map((layer, i) => {
              const widthPct = Math.max(parseInt(layer.thickness) / 2.63, 15);
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", background: i % 2 === 0 ? C.bg : C.bgWarm,
                  borderBottom: i < data.layers.length - 1 ? `1px solid ${C.borderLight}` : "none",
                  animation: `slideRight 0.4s ease ${i * 0.06}s both`,
                }}>
                  <div style={{ width: 80, flexShrink: 0 }}>
                    <div style={{ height: 20, borderRadius: 4, background: layer.color, border: `1px solid ${C.border}`, width: `${widthPct}%`, minWidth: 12 }} />
                  </div>
                  <span style={{ fontFamily: FONTS.display, fontWeight: 600, fontSize: 14, color: C.ink, flex: 1 }}>{layer.name}</span>
                  <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: C.inkFaint, flexShrink: 0 }}>{layer.thickness}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, textAlign: "right", fontFamily: FONTS.mono, fontSize: 11, color: C.inkFaint }}>
            Innside ← → Utside
          </div>
        </ContentCard>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, marginTop: 16, fontStyle: "italic" }}>{data.takeaway}</p>
      </div>
    );
  }

  if (level === "bruker") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>{data.lead}</p>
        <ContentCard>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {data.levels.map((lvl, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "16px 0",
                borderBottom: i < data.levels.length - 1 ? `1px solid ${C.borderLight}` : "none",
                animation: `slideRight 0.4s ease ${i * 0.08}s both`,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${lvl.color}12`, border: `2px solid ${lvl.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, flexShrink: 0,
                }}>{lvl.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 13, fontWeight: 700, color: lvl.color }}>{lvl.name}</div>
                  <p style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkSoft, lineHeight: 1.5, margin: "4px 0 0" }}>{lvl.desc}</p>
                </div>
                {i < data.levels.length - 1 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 14, color: C.inkFaint, fontSize: 12, flexShrink: 0 }}>↓</div>
                )}
              </div>
            ))}
          </div>
        </ContentCard>
        <p style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, lineHeight: 1.6, fontStyle: "italic", marginTop: 16 }}>{data.note}</p>
      </div>
    );
  }

  // bestiller
  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>
      {data.focus.map((f, i) => (
        <ContentCard key={i} accent={C.purple}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "0 0 8px", fontWeight: 700 }}>{f.title}</h3>
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 12px" }}>{f.content}</p>
          <div style={{ padding: "10px 14px", borderRadius: 8, background: C.purpleBg, border: `1px solid ${C.purpleBorder}` }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.purple, fontWeight: 700 }}>→ </span>
            <span style={{ fontFamily: FONTS.body, fontSize: 14, color: C.purple }}>{f.action}</span>
          </div>
        </ContentCard>
      ))}
    </div>
  );
}

function RenderInfrastructure({ data, level, levelColor }) {
  if (level === "ny") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 8px" }}>{data.lead}</p>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, margin: "0 0 24px" }}>{data.content}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {data.items.map((item, i) => (
            <ContentCard key={i} style={{ marginBottom: 0 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 15, color: C.ink }}>{item.label}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 13, color: C.inkMuted, marginTop: 2, lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    );
  }

  if (level === "bruker") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>{data.lead}</p>
        {data.sections.map((s, i) => (
          <ContentCard key={i} accent={s.color}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: 0, fontWeight: 700 }}>{s.title}</h3>
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{s.content}</p>
          </ContentCard>
        ))}
      </div>
    );
  }

  // bestiller
  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>
      {data.focus.map((f, i) => (
        <ContentCard key={i} accent={C.purple}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "0 0 8px", fontWeight: 700 }}>{f.title}</h3>
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 12px" }}>{f.content}</p>
          <div style={{ padding: "10px 14px", borderRadius: 8, background: C.purpleBg, border: `1px solid ${C.purpleBorder}` }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.purple, fontWeight: 700 }}>→ </span>
            <span style={{ fontFamily: FONTS.body, fontSize: 14, color: C.purple }}>{f.action}</span>
          </div>
        </ContentCard>
      ))}
    </div>
  );
}

function RenderPractical({ data, level, levelColor }) {
  const [expandedPitfall, setExpandedPitfall] = useState(null);

  if (level === "ny") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>{data.lead}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.tips.map((tip, i) => (
            <ContentCard key={i} style={{ animation: `slideRight 0.4s ease ${i * 0.06}s both` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{tip.icon}</span>
                <div>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 15, color: C.ink }}>{tip.title}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, marginTop: 3, lineHeight: 1.5 }}>{tip.desc}</div>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>
      </div>
    );
  }

  if (level === "bruker") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>{data.lead}</p>
        {data.issues.map((issue, i) => (
          <ContentCard key={i} accent={issue.color}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 20 }}>{issue.icon}</span>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: 0, fontWeight: 700 }}>{issue.title}</h3>
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{issue.content}</p>
          </ContentCard>
        ))}
      </div>
    );
  }

  // bestiller
  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>

      {/* Workflow visualization */}
      {data.workflow && (
        <ContentCard accent={C.purple} style={{ marginBottom: 24 }}>
          <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: C.ink, margin: "0 0 16px", fontWeight: 700 }}>{data.workflow.title}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {data.workflow.steps.map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                padding: "12px 0",
                borderBottom: i < data.workflow.steps.length - 1 ? `1px solid ${C.borderLight}` : "none",
                animation: `slideRight 0.4s ease ${i * 0.08}s both`,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: C.purpleBg, border: `2px solid ${C.purpleBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: FONTS.mono, fontSize: 14, fontWeight: 800, color: C.purple, flexShrink: 0,
                }}>{s.step}</div>
                <div>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 15, color: C.ink }}>{s.label}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, marginTop: 2, lineHeight: 1.4 }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </ContentCard>
      )}

      {/* Expandable pitfalls */}
      <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: C.ink, margin: "0 0 14px", fontWeight: 700 }}>Vanlige fallgruver</h3>
      {data.pitfalls.map((p, i) => (
        <div key={i} style={{ marginBottom: 8 }}>
          <button
            onClick={() => setExpandedPitfall(expandedPitfall === i ? null : i)}
            style={{
              width: "100%", textAlign: "left", cursor: "pointer",
              padding: "14px 18px", borderRadius: expandedPitfall === i ? "12px 12px 0 0" : 12,
              border: `1px solid ${expandedPitfall === i ? C.coralBorder || C.orangeBorder : C.border}`,
              borderBottom: expandedPitfall === i ? "none" : undefined,
              background: expandedPitfall === i ? C.coralBg || C.orangeBg : C.surface,
              display: "flex", alignItems: "center", gap: 12,
              transition: "all 0.25s",
            }}
          >
            <span style={{
              fontFamily: FONTS.mono, fontSize: 14, color: C.coral || C.orange, fontWeight: 700,
              transform: expandedPitfall === i ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.25s", display: "inline-block",
            }}>→</span>
            <span style={{ fontFamily: FONTS.display, fontSize: 15, fontWeight: 700, color: C.ink }}>{p.title}</span>
          </button>
          {expandedPitfall === i && (
            <div style={{
              padding: "14px 18px", borderRadius: "0 0 12px 12px",
              border: `1px solid ${C.orangeBorder}`, borderTop: "none",
              background: C.bg,
            }}>
              <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{p.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RenderGeometry({ data, level, levelColor }) {
  const [activeGeo, setActiveGeo] = useState(0);

  if (level === "ny") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 8px" }}>{data.lead}</p>
        <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, margin: "0 0 24px" }}>{data.content}</p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {data.types.map((t, i) => (
            <ContentCard key={i} style={{ flex: 1, minWidth: 200 }}>
              <span style={{ fontSize: 28, fontFamily: FONTS.mono }}>{t.icon}</span>
              <div style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 16, color: C.ink, marginTop: 8 }}>{t.name}</div>
              <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, marginTop: 4, lineHeight: 1.5 }}>{t.desc}</div>
            </ContentCard>
          ))}
        </div>
      </div>
    );
  }

  if (level === "bruker") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>{data.lead}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10, marginBottom: 20 }}>
          {data.types.map((t, i) => (
            <button key={i} onClick={() => setActiveGeo(i)} style={{
              padding: "14px 12px",
              borderRadius: 12,
              border: `2px solid ${activeGeo === i ? t.color : C.border}`,
              background: activeGeo === i ? `${t.color}10` : C.surface,
              cursor: "pointer",
              fontFamily: FONTS.display,
              fontWeight: 700,
              fontSize: 13,
              color: activeGeo === i ? t.color : C.inkMuted,
              transition: "all 0.3s",
              textAlign: "center",
            }}>{t.name}</button>
          ))}
        </div>
        {data.types[activeGeo] && (() => {
          const g = data.types[activeGeo];
          return (
            <ContentCard accent={g.color}>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 18, color: C.ink, margin: "0 0 16px", fontWeight: 700 }}>{g.name}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 12 }}>
                <div style={{ padding: "12px 14px", borderRadius: 8, background: C.greenBg, border: `1px solid ${C.greenBorder}` }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.green, fontWeight: 700, marginBottom: 4 }}>FORDEL</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>{g.pro}</div>
                </div>
                <div style={{ padding: "12px 14px", borderRadius: 8, background: C.orangeBg, border: `1px solid ${C.orangeBorder}` }}>
                  <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.orange, fontWeight: 700, marginBottom: 4 }}>ULEMPE</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkSoft, lineHeight: 1.5 }}>{g.con}</div>
                </div>
              </div>
              <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted }}>
                <strong style={{ color: C.inkSoft }}>Typisk bruk:</strong> {g.use}
              </div>
            </ContentCard>
          );
        })()}
        <p style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, lineHeight: 1.6, fontStyle: "italic", marginTop: 16 }}>{data.note}</p>
      </div>
    );
  }

  // bestiller
  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 8px" }}>{data.lead}</p>
      <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, lineHeight: 1.7, margin: "0 0 24px" }}>{data.content}</p>
      <ContentCard accent={C.purple}>
        <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "0 0 12px", fontWeight: 700 }}>Anbefalte tiltak</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {data.actions.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 24, height: 24, borderRadius: 8, background: C.purpleBg, border: `1px solid ${C.purpleBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: C.purple }}>{i + 1}</div>
              <span style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.5 }}>{a}</span>
            </div>
          ))}
        </div>
      </ContentCard>
    </div>
  );
}

function RenderVersions({ data, level, levelColor }) {
  if (level === "ny") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 24px" }}>{data.lead}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.versions.map((v, i) => (
            <ContentCard key={i} accent={v.color}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div>
                  <Tag color={v.color}>{v.status}</Tag>
                  <div style={{ fontFamily: FONTS.display, fontWeight: 800, fontSize: 20, color: C.ink, marginTop: 6 }}>{v.v}</div>
                  <div style={{ fontFamily: FONTS.body, fontSize: 14, color: C.inkMuted, marginTop: 2 }}>{v.desc}</div>
                </div>
              </div>
            </ContentCard>
          ))}
        </div>

        {data.numberingNote && (
          <ContentCard accent={C.inkMuted} style={{ marginTop: 20 }}>
            <Tag color={C.blue}>Visste du?</Tag>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "10px 0 8px", fontWeight: 700 }}>{data.numberingNote.title}</h3>
            <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{data.numberingNote.content}</p>
            <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
              {["1.0", "1.5", "2.0", "2x", "2x2", "2x3"].map((v, i) => (
                <span key={i} style={{ padding: "4px 10px", borderRadius: 6, background: C.bgWarm, fontFamily: FONTS.mono, fontSize: 11, color: C.inkFaint }}>{v}</span>
              ))}
              <span style={{ fontFamily: FONTS.body, fontSize: 16, color: C.inkFaint }}>→</span>
              <span style={{ padding: "4px 10px", borderRadius: 6, background: C.blueBg, border: `1px solid ${C.blueBorder}`, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: C.blue }}>4</span>
              <span style={{ padding: "4px 10px", borderRadius: 6, background: C.greenBg, border: `1px solid ${C.greenBorder}`, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: C.green }}>4.3</span>
              <span style={{ fontFamily: FONTS.body, fontSize: 16, color: C.inkFaint }}>→</span>
              <span style={{ padding: "4px 10px", borderRadius: 6, background: C.purpleBg, border: `1px solid ${C.purpleBorder}`, fontFamily: FONTS.mono, fontSize: 11, fontWeight: 700, color: C.purple }}>5</span>
            </div>
          </ContentCard>
        )}
      </div>
    );
  }

  if (level === "bruker") {
    return (
      <div>
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
        <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>
        {data.content.map((c, i) => (
          <ContentCard key={i} accent={C.blue}>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 17, color: C.ink, margin: "0 0 8px", fontWeight: 700 }}>{c.title}</h3>
            <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: 0 }}>{c.text}</p>
          </ContentCard>
        ))}
      </div>
    );
  }

  // bestiller
  return (
    <div>
      <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(24px, 4vw, 32px)", color: C.ink, margin: "0 0 12px", fontWeight: 800, lineHeight: 1.2 }}>{data.title}</h2>
      <p style={{ fontFamily: FONTS.body, fontSize: 17, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 28px" }}>{data.lead}</p>
      {data.tools.map((t, i) => (
        <ContentCard key={i} accent={C.purple} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{
              padding: "6px 14px",
              borderRadius: 8,
              background: C.purpleBg,
              border: `1px solid ${C.purpleBorder}`,
              fontFamily: FONTS.mono,
              fontSize: 14,
              fontWeight: 800,
              color: C.purple,
            }}>{t.name}</div>
            <span style={{ fontFamily: FONTS.body, fontSize: 13, color: C.inkFaint }}>{t.full}</span>
          </div>
          <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkSoft, lineHeight: 1.7, margin: "0 0 12px" }}>{t.desc}</p>
          <div style={{ padding: "10px 14px", borderRadius: 8, background: C.purpleBg, border: `1px solid ${C.purpleBorder}` }}>
            <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: C.purple, fontWeight: 700 }}>ANBEFALING → </span>
            <span style={{ fontFamily: FONTS.body, fontSize: 14, color: C.purple }}>{t.action}</span>
          </div>
        </ContentCard>
      ))}
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────

export default function IFCIntro() {
  const [level, setLevel] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const contentRef = useRef(null);
  const currentLevel = LEVELS.find(l => l.id === level);

  const handleSelect = (id) => {
    setLevel(id);
    setShowContent(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleBack = () => {
    setShowContent(false);
    setLevel(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const nextLevelId = level === "ny" ? "bruker" : level === "bruker" ? "bestiller" : null;
  const nextLevel = nextLevelId ? LEVELS.find(l => l.id === nextLevelId) : null;

  const handleNextLevel = () => {
    if (nextLevelId) {
      setLevel(nextLevelId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const sectionLabels = [
    "Hva er IFC",
    "Struktur",
    "Relasjoner",
    "Egenskaper",
    "Materialer",
    "Geometri",
    "Infrastruktur",
    "Versjoner & verktøy",
    "Praktiske avveininger",
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FONTS.body }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        @keyframes slideRight { from { opacity:0; transform: translateX(-16px); } to { opacity:1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }
        html { scroll-behavior: smooth; }
        @media (max-width: 600px) {
          .level-badge-desktop { display: none !important; }
        }
      `}</style>

      {/* ── HERO / SELECTION ── */}
      {!showContent && (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: 48,
            animation: "fadeUp 0.7s ease both",
          }}>
            <img
              src={import.meta.env.BASE_URL + "logo.png"}
              alt="buildingSMART Norge"
              style={{ height: 40, marginBottom: 20 }}
            />
            <h1 style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(36px, 6vw, 56px)",
              fontWeight: 800,
              color: C.ink,
              lineHeight: 1.1,
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}>
              Innføring i IFC
            </h1>
            <p style={{
              fontFamily: FONTS.body,
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: C.inkMuted,
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.5,
            }}>
              Velg ditt erfaringsnivå – innholdet tilpasses deg
            </p>
          </div>

          <div style={{ animation: "fadeUp 0.7s ease 0.15s both", width: "100%", maxWidth: 680 }}>
            <LevelSelector selected={level} onSelect={handleSelect} />
          </div>
        </div>
      )}

      {/* ── STICKY TOP BAR ── */}
      {showContent && currentLevel && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
          padding: "14px 20px",
          animation: "fadeUp 0.3s ease both",
        }}>
          <div style={{
            maxWidth: 700,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <img
                src={import.meta.env.BASE_URL + "logo.png"}
                alt="buildingSMART Norge"
                style={{ height: 28 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="level-badge-desktop" style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 14px",
                borderRadius: 99,
                background: currentLevel.colorBg,
                border: `1px solid ${currentLevel.colorBorder}`,
              }}>
                <span style={{ fontSize: 14 }}>{currentLevel.icon}</span>
                <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 13, color: currentLevel.color }}>{currentLevel.label}</span>
              </div>
              <button onClick={handleBack} style={{
                padding: "6px 14px",
                borderRadius: 99,
                border: `1px solid ${C.border}`,
                background: C.surface,
                cursor: "pointer",
                fontFamily: FONTS.body,
                fontSize: 13,
                color: C.inkMuted,
                transition: "all 0.2s",
              }}>← Bytt nivå</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTENT ── */}
      {showContent && level && (
        <div ref={contentRef} style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "70px 16px 80px",
          animation: "fadeUp 0.6s ease both",
        }}>
          <SectionDivider number="1" color={currentLevel.color} />
          <RenderWhatIsIfc data={CONTENT.whatIsIfc[level]} level={level} levelColor={currentLevel.color} />

          <SectionDivider number="2" color={currentLevel.color} />
          <RenderStructure data={CONTENT.structure[level]} level={level} levelColor={currentLevel.color} />

          <SectionDivider number="3" color={currentLevel.color} />
          <RenderRelations data={CONTENT.relations[level]} level={level} levelColor={currentLevel.color} />

          <SectionDivider number="4" color={currentLevel.color} />
          <RenderProperties data={CONTENT.properties[level]} level={level} levelColor={currentLevel.color} />

          <SectionDivider number="5" color={currentLevel.color} />
          <RenderMaterials data={CONTENT.materials[level]} level={level} levelColor={currentLevel.color} />

          <SectionDivider number="6" color={currentLevel.color} />
          <RenderGeometry data={CONTENT.geometry[level]} level={level} levelColor={currentLevel.color} />

          <SectionDivider number="7" color={currentLevel.color} />
          <RenderInfrastructure data={CONTENT.infrastructure[level]} level={level} levelColor={currentLevel.color} />

          <SectionDivider number="8" color={currentLevel.color} />
          <RenderVersions data={CONTENT.versions[level]} level={level} levelColor={currentLevel.color} />

          <SectionDivider number="9" color={currentLevel.color} />
          <RenderPractical data={CONTENT.practical[level]} level={level} levelColor={currentLevel.color} />

          <div style={{
            marginTop: 64,
            padding: "32px 28px",
            borderRadius: 16,
            background: C.surface,
            border: `1px solid ${C.border}`,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>📖</div>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 20, color: C.ink, margin: "0 0 8px", fontWeight: 700 }}>Vil du gå dypere?</h3>
            <p style={{ fontFamily: FONTS.body, fontSize: 15, color: C.inkMuted, margin: "0 0 20px", lineHeight: 1.6 }}>
              Denne innføringen er basert på veilederen «IFC for begynnere» fra buildingSMART Norge. For fullstendig innhold og teknisk dokumentasjon, se den offisielle veilederen.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
              {nextLevel && (
                <button onClick={handleNextLevel} style={{
                  padding: "12px 32px",
                  borderRadius: 99,
                  border: "none",
                  background: nextLevel.color,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: FONTS.body,
                  cursor: "pointer",
                  boxShadow: `0 4px 20px ${nextLevel.color}33`,
                  transition: "all 0.3s",
                }}>{nextLevel.icon} Gå til neste nivå – {nextLevel.label}</button>
              )}
              {!nextLevel && (
                <a href="https://www.buildingsmart.no/pofin" target="_blank" rel="noopener noreferrer" style={{
                  display: "inline-block",
                  padding: "12px 32px",
                  borderRadius: 99,
                  border: "none",
                  background: currentLevel.color,
                  color: "white",
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: FONTS.body,
                  cursor: "pointer",
                  textDecoration: "none",
                  boxShadow: `0 4px 20px ${currentLevel.color}33`,
                  transition: "all 0.3s",
                }}>Ta det neste steget med åpenBIM →</a>
              )}
              <button onClick={handleBack} style={{
                padding: "10px 24px",
                borderRadius: 99,
                border: `1px solid ${C.border}`,
                background: "transparent",
                color: C.inkMuted,
                fontSize: 13,
                fontWeight: 600,
                fontFamily: FONTS.body,
                cursor: "pointer",
              }}>Prøv et annet nivå</button>
            </div>
          </div>

          <footer style={{
            textAlign: "center",
            padding: "40px 0 20px",
            fontFamily: FONTS.mono,
            fontSize: 11,
            color: C.inkFaint,
            letterSpacing: 0.5,
          }}>
            Basert på «IFC for begynnere» · buildingSMART Norge · 2026
          </footer>
        </div>
      )}
    </div>
  );
}
