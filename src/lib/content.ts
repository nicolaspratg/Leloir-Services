// src/lib/content.ts
// Single source of truth for the LEFIP services site.
// To add or edit a service, edit THIS file — never the page templates.
// Adding an assay object makes its L2 page, sitemap entry and form option appear automatically.

export type Area = {
  slug: string;
  code: string; // brand name, e.g. "BioAnalytix"
  name: string; // descriptive name
  tagline: string;
  description: string; // L1 intro
  sectors: string[];
  accent: string; // hex
  process?: ProcessStage[]; // only MAbFactory
};

export type ProcessStage = {
  n: number;
  module: string;
  description: string;
  weeks: string;
};

export type Assay = {
  slug: string;
  areaSlug: string;
  name: string;
  principle: string; // Principio
  useCase: string; // ¿Para qué sirve?
  equipment?: string; // Equipamiento
  sample?: string; // Requerimientos de muestra
  output: string; // Output / Entregable
  standards?: string; // Normas y referencias
  turnaround?: string; // Tiempo de respuesta
};

export const areas: Area[] = [
  {
    slug: "bioanalytix",
    code: "BioAnalytix",
    name: "Análisis Biofísico de Biomoléculas",
    tagline: "Caracterización integral de proteínas, péptidos y anticuerpos.",
    description:
      "BioAnalytix reúne las técnicas biofísicas y espectroscópicas del laboratorio para la caracterización integral de proteínas, péptidos, anticuerpos y otros biofármacos. Cada análisis produce datos cuantitativos sobre identidad, estructura, tamaño, estabilidad y pureza molecular, acompañados de un informe técnico interpretado.",
    sectors: ["Farmacéutica", "Biofarmacéutica", "Biotech", "Diagnóstico", "Académico"],
    accent: "#0E7C7B",
  },
  {
    slug: "reganalytics",
    code: "RegAnalytics",
    name: "Desarrollo Analítico Regulatorio",
    tagline: "Soporte analítico trazable para desarrollo y registro de biofármacos.",
    description:
      "RegAnalytics ofrece el soporte analítico estructurado que requieren los procesos de desarrollo y registro de biofármacos. Desde la validación de métodos bajo ICH Q2(R2) hasta estudios de estabilidad y análisis de impurezas, cada proyecto se diseña con orientación regulatoria explícita y produce documentación trazable compatible con expedientes ANMAT y FDA.",
    sectors: ["Farmacéutica", "Biofarmacéutica", "Biotech / Startups", "Fabricantes de APIs"],
    accent: "#1B3A5B",
  },
  {
    slug: "mabfactory",
    code: "MAbFactory",
    name: "Anticuerpos Monoclonales Murinos",
    tagline: "Servicio completo de hibridomas: de la inmunización a la IgG purificada.",
    description:
      "MAbFactory ofrece el servicio completo de generación de anticuerpos monoclonales murinos, desde la inmunización hasta la entrega de clones estabilizados e IgG purificada. El servicio se extiende a etapas de caracterización, conjugación y producción a escala, atendiendo tanto necesidades de investigación como aplicaciones diagnósticas.",
    sectors: ["Diagnóstico in vitro", "Farmacéutica", "Biotech / I+D", "Laboratorios académicos"],
    accent: "#E07A3F",
    process: [
      {
        n: 1,
        module: "Inmunización",
        description:
          "Protocolo en ratones BALB/c, antígeno + adyuvante, refuerzos, control de título sérico por ELISA.",
        weeks: "4–6",
      },
      {
        n: 2,
        module: "Fusión celular",
        description: "Fusión esplén-mieloma (SP2/0), selección en medio HAT, expansión de hibridomas.",
        weeks: "2–3",
      },
      {
        n: 3,
        module: "Screening primario",
        description: "ELISA de sobrenadante sobre antígeno, selección de pozos positivos.",
        weeks: "1–2",
      },
      {
        n: 4,
        module: "Clonación por dilución límite",
        description: "Subclonación de hibridomas positivos, ≥2 rondas, selección de clones estables.",
        weeks: "3–4",
      },
      {
        n: 5,
        module: "Caracterización del clon",
        description:
          "Isótipo, afinidad aparente (ELISA), especificidad (Western blot, ELISA competitivo).",
        weeks: "2",
      },
      {
        n: 6,
        module: "Producción y purificación",
        description:
          "Expansión en ascitis o biorreactor, purificación IgG por Proteína A/G, rendimiento ≥5 mg.",
        weeks: "2–3",
      },
      {
        n: 7,
        module: "Control de calidad final",
        description: "SDS-PAGE, MALDI-TOF (masa de cadenas), SEC (pureza), concentración (UV-Vis).",
        weeks: "1",
      },
    ],
  },
  {
    slug: "spectroid",
    code: "SpectroID",
    name: "Servicios MALDI-TOF Multi-Sector",
    tagline:
      "El poder del MALDI-TOF para clínica, alimentos, agro y síntesis. Resultados en horas.",
    description:
      "SpectroID ofrece el poder analítico del MALDI-TOF (Bruker microflex) para una amplia variedad de aplicaciones más allá del sector farmacéutico: identificación microbiana en hospitales, control de calidad en alimentos y bebidas, caracterización de extractos biológicos en agroindustria, y verificación de síntesis química. Resultados en horas, no en días. Nota técnica: el Bruker microflex opera en modo lineal (~0.5–20 kDa típico; hasta ~500 kDa con optimización de matriz). No incluye módulo MS/MS; para secuenciación por MS/MS el laboratorio puede derivar la muestra e informar alternativas.",
    sectors: ["Diagnóstico clínico", "Alimentos y bebidas", "Agroindustria", "Biotech / Síntesis"],
    accent: "#5B4B8A",
  },
];

export const assays: Assay[] = [
  // ---------- BioAnalytix ----------
  {
    slug: "uv-vis",
    areaSlug: "bioanalytix",
    name: "UV-Vis: Determinación de concentración proteica",
    principle:
      "Cuantificación absoluta por absorbancia a 280 nm usando el coeficiente de extinción molar.",
    useCase:
      "Control de calidad de lotes, formulaciones, preparación de muestras para otros ensayos.",
    equipment: "Espectrofotómetro UV-Vis.",
    sample: "10–50 µg de proteína en solución; indicar secuencia o ε molar si está disponible.",
    output: "Concentración (mg/mL) + espectro 240–320 nm + informe.",
  },
  {
    slug: "dicroismo-circular",
    areaSlug: "bioanalytix",
    name: "Dicroísmo Circular (CD): estructura secundaria y terciaria",
    principle:
      "Medición de elipticidad molar en UV lejano (190–250 nm) y cercano (250–320 nm). Estima α-hélice, lámina-β y estructura desordenada; evalúa plegamiento vs. desnaturalización. CD térmico determina Tm (estabilidad).",
    useCase: "Caracterización de biofármacos, comparabilidad de lotes, estudios de estabilidad.",
    sample: "0.1–0.5 mg/mL, ≥0.3 mL, tampón compatible (sin absorción en UV lejano).",
    output: "Espectros de CD + Tm + informe con interpretación de estructura secundaria.",
  },
  {
    slug: "fluorescencia-intrinseca",
    areaSlug: "bioanalytix",
    name: "Fluorescencia intrínseca: plegamiento y desnaturalización",
    principle:
      "Emisión de triptófanos intrínsecos (exc. 280 nm, em. 300–400 nm). Sensible al entorno hidrofóbico: el desplazamiento del pico indica exposición de residuos (desnaturalización).",
    useCase:
      "Control de integridad conformacional, screening de estabilidad en condiciones de formulación.",
    sample: "0.05–0.5 mg/mL, ≥0.5 mL.",
    output: "Espectros de emisión + λmax + informe.",
  },
  {
    slug: "dls",
    areaSlug: "bioanalytix",
    name: "Dispersión Dinámica de Luz (DLS): tamaño y polidispersidad",
    principle:
      "Determina radio hidrodinámico (Rh) y distribución de tamaños en solución. Rango 1 nm – varios µm. No incluye potencial zeta.",
    useCase:
      "Control de agregación, caracterización de nanopartículas, VLPs, liposomas, proteínas en formulación.",
    equipment: "DynaPro NanoStar II (Wyatt Technology).",
    sample:
      "20–100 µL, 0.1–5 mg/mL para proteínas; concentraciones variables para nanopartículas inorgánicas.",
    output: "Distribución de tamaños (Rh, %PD, kurtosis) + informe técnico DYNAMICS.",
  },
  {
    slug: "rmn-1h",
    areaSlug: "bioanalytix",
    name: "RMN 1H: autenticidad e identidad estructural",
    principle:
      "RMN en Bruker 600 MHz. Nivel 1: espectro 1H 1D con supresión de agua (identidad por huella digital frente a referencia; precedente regulatorio FDA/Novo Nordisk para semaglutide). Nivel 2: 1H 1D + HSQC + COSY (modificaciones no naturales como Aib, cadenas lipídicas, conjugados; sujeto a verificación de criosonda).",
    useCase:
      "Control de identidad de APIs peptídicos, certificación de estructura, soporte a registro ANMAT/FDA.",
    equipment: "Bruker 600 MHz NMR.",
    sample: "≥1 mg en D2O o tampón deuterado.",
    output: "Espectros procesados + comparación con referencia + informe.",
    standards: "Precedente FDA (semaglutide).",
  },
  {
    slug: "sec",
    areaSlug: "bioanalytix",
    name: "SEC: pureza y estado de asociación",
    principle:
      "Separación por tamaño molecular en columna de exclusión. Determina pureza cromatográfica (monómero vs. oligómeros vs. agregados) y estado de asociación. Acoplable a dispersión de luz (SEC-MALS) para masa absoluta.",
    useCase: "Control de calidad de proteínas recombinantes, anticuerpos y biofármacos.",
    sample: "50–200 µg en tampón compatible.",
    output: "Cromatograma con % de pico principal + informe.",
  },
  {
    slug: "sds-page",
    areaSlug: "bioanalytix",
    name: "Geles SDS-PAGE / identificación de bandas",
    principle:
      "Electroforesis desnaturalizante en poliacrilamida: pureza, MW aparente, integridad. Combinable con MALDI-TOF para identificar bandas (protein-in-gel).",
    useCase: "Control de expresión y purificación, perfil de impurezas.",
    sample: "5–20 µg por banda.",
    output: "Imagen de gel densitometrado + informe.",
  },

  // ---------- RegAnalytics ----------
  {
    slug: "validacion-metodo",
    areaSlug: "reganalytics",
    name: "Validación de método analítico — ICH Q2(R2) / FDA",
    principle:
      "Paquete completo para métodos de caracterización (MALDI-TOF, NMR, DLS, CD, SEC). Parámetros ICH Q2(R2): especificidad, linealidad, rango, exactitud, precisión, LOD, LOQ, robustez. Incluye protocolo, ejecución, análisis estadístico e informe.",
    useCase:
      "Soporte a expedientes de registro y auditorías de calidad. Ej. MALDI-TOF semaglutide: ~120 determinaciones / 7 parámetros.",
    output: "Protocolo + data bruta + análisis estadístico + informe de validación completo.",
    standards: "ICH Q2(R2), FDA.",
    turnaround: "6–8 semanas (alcance dependiente).",
  },
  {
    slug: "comparabilidad",
    areaSlug: "reganalytics",
    name: "Comparabilidad de producto (pre/post cambios de proceso)",
    principle:
      "Estudio comparativo entre lotes de referencia y prueba, o antes/después de cambios de manufactura. Panel: identidad (masa, RMN), pureza (SEC, SDS-PAGE), función, estructura (CD, fluorescencia). Diseñado según ICH Q5E.",
    useCase: "Cambios de escala, de proveedor de materia prima, de formulación.",
    output: "Informe de comparabilidad con conclusiones explícitas.",
    standards: "ICH Q5E.",
  },
  {
    slug: "estabilidad",
    areaSlug: "reganalytics",
    name: "Estudios de estabilidad analítica",
    principle:
      "Monitoreo del perfil biofísico en el tiempo o bajo estrés (temperatura, ciclos de congelación, pH extremos, luz). Panel: integridad (MALDI/SEC), plegamiento (CD/fluorescencia), agregación (DLS).",
    useCase: "Desarrollo de formulación, shelf-life, caracterización de producto degradado.",
    output: "Tabla de datos por tiempo/condición + curvas de estabilidad + informe.",
  },
  {
    slug: "impurezas",
    areaSlug: "reganalytics",
    name: "Análisis de impurezas en biofármacos",
    principle:
      "Caracterización y cuantificación de impurezas de proceso (HCPs por SDS-PAGE + MALDI) y de producto (agregados por DLS/SEC, fragmentos por MALDI/SDS-PAGE, formas mal plegadas por CD/fluorescencia).",
    useCase: "Soporte a dossier de registro, control de lotes de liberación.",
    output: "Perfil de impurezas cuantitativo + informe regulatorio.",
  },
  {
    slug: "identidad-rmn",
    areaSlug: "reganalytics",
    name: "Desarrollo y calificación de método de identidad por RMN",
    principle:
      "Método de identidad específico para un péptido o proteína terapéutica por RMN 1H: adquisición del estándar de referencia, definición de regiones diagnósticas, criterios de aceptación, redacción del procedimiento.",
    useCase:
      "Calificación de identidad de APIs, anclada en precedentes FDA (Novo Nordisk / semaglutide).",
    output: "Método analítico documentado + informe de calificación.",
    standards: "Precedente FDA (semaglutide).",
  },

  // ---------- MAbFactory (módulos independientes) ----------
  {
    slug: "policlonales",
    areaSlug: "mabfactory",
    name: "Anticuerpos policlonales (ratón o conejo)",
    principle:
      "Protocolo de inmunización sin fusión. Obtención de suero hiperinmune y, opcionalmente, purificación de IgG poli por Proteína A.",
    useCase: "Investigación, producción rápida de reactivos.",
    output: "Suero ± IgG purificada + título por ELISA.",
    turnaround: "8–10 semanas.",
  },
  {
    slug: "purificacion-igg",
    areaSlug: "mabfactory",
    name: "Purificación de IgG a escala (>10 mg)",
    principle:
      "Cromatografía de afinidad (Proteína A o G) a partir de ascitis, sobrenadante de cultivo o suero. Control por SDS-PAGE + UV.",
    useCase: "Provisión de IgG purificada a escala para diagnóstico e I+D.",
    output: "IgG purificada, concentración, pureza.",
  },
  {
    slug: "caracterizacion-mabs",
    areaSlug: "mabfactory",
    name: "Caracterización biofísica de MAbs (estabilidad y afinidad)",
    principle:
      "Panel: Tm (CD térmico o fluorescencia), tamaño e integridad (SEC, DLS), masa de cadenas reducidas (MALDI-TOF), pureza (SDS-PAGE).",
    useCase: "Caracterización de lote, comparabilidad, estabilidad en formulación.",
    output: "Informe de caracterización biofísica.",
  },
  {
    slug: "conjugacion",
    areaSlug: "mabfactory",
    name: "Marcación y conjugación de MAbs",
    principle:
      "Conjugación con fluoróforos (FITC, Alexa, PE), biotina, enzimas (HRP, AP) o PEG. Caracterización de la relación de sustitución (DOL).",
    useCase: "Inmunoensayos, citometría, diagnóstico.",
    output: "MAb conjugado + DOL + informe.",
  },
  {
    slug: "catalogo",
    areaSlug: "mabfactory",
    name: "Venta de MAbs de catálogo (LEFIP-209 y otros)",
    principle:
      "Anticuerpos monoclonales producidos y validados en el laboratorio, disponibles como reactivos.",
    useCase: "Catálogo disponible a solicitud. Presentación: bulk o alícuotas.",
    output: "Anticuerpo de catálogo + ficha de validación.",
    turnaround: "1–2 semanas.",
  },

  // ---------- SpectroID ----------
  {
    slug: "biotyping",
    areaSlug: "spectroid",
    name: "Identificación de microorganismos (Biotyping)",
    principle:
      "Identificación taxonómica de bacterias y levaduras por perfil proteico (Bruker MBT Library). Resultados en minutos desde cultivo puro.",
    useCase:
      "Microbiología clínica, control de calidad en alimentos, verificación de cepas industriales, bioinsumos agrícolas.",
    equipment: "Bruker microflex (MALDI-TOF).",
    sample:
      "Cultivo puro o colonia en placa (preparable según protocolo LEFIP, o recibida inactivada con ácido fórmico para envío seguro).",
    output: "Score ID MALDI + identificación a nivel de especie/género + informe.",
  },
  {
    slug: "resistencia-antimicrobiana",
    areaSlug: "spectroid",
    name: "Detección de resistencia antimicrobiana",
    principle:
      "Detección de perfiles proteicos asociados a β-lactamasas (KPC, ESBL) en enterobacterias y no fermentadores. Complemento al biotyping.",
    useCase: "Alertas de resistencia en contexto hospitalario.",
    sample: "Cultivo puro de cepa clínica (protocolo de inactivación disponible).",
    output: "Resultado cualitativo de presencia/ausencia de marcadores + informe.",
  },
  {
    slug: "masa-molecular",
    areaSlug: "spectroid",
    name: "Verificación de masa molecular de proteínas y péptidos",
    principle:
      "Masa molecular intacta por MALDI-TOF. Rango óptimo 500 Da – 20 kDa; para >20 kDa, análisis de cadenas reducidas. Exactitud típica ±0.1% (masa monoisotópica).",
    useCase: "Control de identidad de APIs biológicos, péptidos sintéticos, proteínas recombinantes.",
    equipment: "Bruker microflex (MALDI-TOF).",
    sample: "1–10 µg en solución acuosa libre de detergentes y sales en exceso.",
    output: "Espectro de masa + masa molecular asignada + informe.",
  },
  {
    slug: "protein-in-gel",
    areaSlug: "spectroid",
    name: "Identificación de bandas de geles (Protein-in-gel)",
    principle:
      "Identificación de proteínas desde bandas SDS-PAGE por digestión enzimática in-gel y MALDI-TOF de péptidos (peptide mass fingerprinting).",
    useCase: "Proteínas de expresión desconocida, contaminantes, subunidades de complejos.",
    sample: "Banda de gel teñida con Coomassie o plata (provista por el cliente).",
    output: "Lista de péptidos detectados + identificación por base de datos + informe.",
  },
  {
    slug: "extractos",
    areaSlug: "spectroid",
    name: "Análisis de extractos y mezclas complejas",
    principle:
      "MALDI-TOF de extractos biológicos o mezclas para identificar componentes de masa conocida (péptidos, proteínas pequeñas, metabolitos, polisacáridos, polímeros).",
    useCase:
      "QC de extractos de fermentación, verificación de productos naturales, matrices de alimentos. Requiere discusión previa del alcance.",
    output: "Espectro anotado + informe.",
  },
  {
    slug: "puentes-disulfuro",
    areaSlug: "spectroid",
    name: "Conectividad de puentes disulfuro",
    principle:
      "Determinación de la pauta de puentes S-S por comparación de masas en condiciones reducidas y no reducidas.",
    useCase: "Péptidos cíclicos o con modificaciones oxidativas, biofármacos con disulfuros críticos.",
    sample: "≥10 µg de proteína/péptido purificado.",
    output: "Masas reducida y no reducida + asignación de puentes + informe.",
  },
  {
    slug: "diagnostico-clinico",
    areaSlug: "spectroid",
    name: "Aplicaciones en diagnóstico clínico (plasma, suero)",
    principle:
      "Perfiles proteicos de bajo peso molecular en plasma o suero para investigación de biomarcadores. Protocolo de preparación disponible (depleción de albúmina, fraccionamiento).",
    useCase: "Proyectos de investigación clínica, validación de biomarcadores.",
    output: "Espectros procesados + lista de masas + informe.",
  },
];

export const getArea = (slug: string) => areas.find((a) => a.slug === slug);
export const getAssaysByArea = (slug: string) =>
  assays.filter((a) => a.areaSlug === slug);
export const getAssay = (areaSlug: string, assaySlug: string) =>
  assays.find((a) => a.areaSlug === areaSlug && a.slug === assaySlug);
