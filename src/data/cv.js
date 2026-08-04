// src/data/cv.js
// ─────────────────────────────────────────────────────────────────────────────
// Fuente única de verdad del CV.
// La web y el documento imprimible (?cv=1) consumen exactamente estos datos,
// de modo que nunca vuelvan a divergir.
// ─────────────────────────────────────────────────────────────────────────────

const asset = (file) => `${process.env.PUBLIC_URL}/${file}`;

// Inicio de la carrera profesional (SIANDSI, abril de 2019).
// Los años de experiencia se calculan solos: así el CV no se queda desfasado
// cada enero, que es el error más común en las hojas de vida.
const CAREER_START = new Date(2019, 3, 1);
export const yearsOfExperience = Math.floor(
  (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
);

export const profile = {
  name: 'Johan Darío Alarcón Ayala',
  shortName: 'Johan Alarcón',
  initials: 'JA',
  role: 'Ingeniero de Sistemas',
  headline: 'Desarrollador de Software · Laravel · React',
  available: true,
  availabilityLabel: 'Disponible para nuevos proyectos',
  photo: asset('perfil.jpg'),

  // Frase corta para el hero y las metaetiquetas.
  tagline:
    'Diseño y construyo aplicaciones web y sistemas empresariales de extremo a extremo, ' +
    'con arquitecturas limpias, mantenibles y orientadas a resultados de negocio.',

  // Perfil completo (web).
  summary:
    `Desarrollador de Software con ${yearsOfExperience} años de experiencia en el ciclo de vida completo de aplicaciones web ` +
    'y sistemas empresariales, tanto en el sector público como en el privado. Especializado en el ecosistema ' +
    'PHP / Laravel y en la construcción de interfaces con JavaScript / React. Trabajo con foco en ' +
    'arquitecturas limpias y escalables, calidad de código, documentación de procesos y entrega continua de valor.',

  // Versión condensada (PDF / ATS).
  summaryPrint:
    `Ingeniero de Sistemas con ${yearsOfExperience} años de experiencia en el ciclo de vida completo de aplicaciones web y ` +
    'sistemas empresariales, en el sector público y privado. Especializado en PHP / Laravel, JavaScript / React ' +
    'y MySQL. Experiencia en levantamiento de requisitos, diseño de bases de datos, documentación bajo ' +
    'estándares institucionales, capacitación a usuarios y soporte en producción.',
};

// Ejes de trabajo destacados en el perfil.
export const focusAreas = [
  {
    id: 'web',
    title: 'Desarrollo web',
    description:
      'Aplicaciones full-stack de extremo a extremo: del levantamiento de requisitos al despliegue y el soporte.',
  },
  {
    id: 'db',
    title: 'Bases de datos',
    description:
      'Modelado relacional, integridad de datos y optimización de consultas sobre MySQL en sistemas en producción.',
  },
  {
    id: 'arch',
    title: 'Arquitectura de software',
    description:
      'Separación de responsabilidades, código mantenible y decisiones técnicas pensadas para escalar.',
  },
  {
    id: 'agile',
    title: 'Metodologías ágiles',
    description:
      'Trabajo iterativo bajo Scrum, documentación de procesos y entregas continuas con trazabilidad.',
  },
];

export const contact = {
  location: 'Ibagué, Tolima, Colombia',
  phone: '+57 317 682 4754',
  phoneHref: 'tel:+573176824754',
  email: 'johandarioalarcon@gmail.com',
  emailHref: 'mailto:johandarioalarcon@gmail.com',
  site: 'johanalarcon.github.io/cv',
  siteHref: 'https://johanalarcon.github.io/cv',
};

export const socials = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/johan-alarcon',
    href: 'https://linkedin.com/in/johan-alarcon-2864812b7/',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'JohanAlarcon',
    href: 'https://github.com/JohanAlarcon',
  },
];

export const experience = [
  {
    id: 'alcaldia',
    role: 'Desarrollador de Software',
    company: 'Alcaldía de Ibagué',
    context: 'Contrato de prestación de servicios · Secretaría de las TIC',
    period: '2024 — Presente',
    current: true,
    location: 'Ibagué, Colombia',
    summary:
      'Responsable del desarrollo de la Plataforma Integrada de Sistemas del municipio.',
    highlights: [
      'Desarrollo completo de la Plataforma Integrada de Sistemas con Laravel y MySQL, hoy en uso por la ciudadanía de Ibagué.',
      'Diseño y puesta en producción de la plataforma turística Descubre Ibagué.',
      'Documentación de procesos siguiendo los estándares definidos por la Secretaría de las TIC.',
      'Capacitación a usuarios finales y soporte técnico de segundo nivel.',
      'Optimización de procesos internos y automatización de tareas manuales.',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'Vue', 'Docker'],
  },
  {
    id: 'siandsi',
    role: 'Desarrollador de Software',
    company: 'SIANDSI',
    context: 'Software a la medida · Sector privado · Medio tiempo desde 2024',
    period: 'Abr 2019 — 2025',
    location: 'Ibagué, Colombia',
    summary:
      'Construcción de aplicaciones web a la medida para clientes de distintos sectores.',
    highlights: [
      'Desarrollo de aplicaciones web con PHP, Laravel, React y MySQL.',
      'Creación de sitios corporativos con Next.js conectados a MySQL.',
      'Mantenimiento evolutivo y correctivo de aplicaciones en producción.',
      'Participación en proyectos de software a la medida para clientes de diferentes sectores.',
    ],
    stack: ['Laravel', 'React', 'Next.js', 'MySQL', 'Git'],
  },
];

export const education = [
  {
    id: 'ucc',
    degree: 'Ingeniería de Sistemas',
    institution: 'Universidad Cooperativa de Colombia',
    period: '2014 — 2019',
    location: 'Ibagué, Colombia',
    highlights: [
      'Énfasis en desarrollo de software, bases de datos y arquitectura de sistemas.',
    ],
  },
];

export const languages = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Inglés', level: 'Intermedio (B1)' },
];

// Credencial habilitante: en las convocatorias públicas colombianas la
// matrícula del COPNIA es requisito para ejercer como ingeniero.
// Se publica solo el número de matrícula (verificable en el registro público
// del COPNIA); la cédula NO se incluye por tratarse de un dato sensible.
export const credentials = [
  {
    id: 'copnia',
    label: 'Matrícula profesional',
    value: '161122-0574508 TLM',
    issuer: 'COPNIA — Consejo Profesional Nacional de Ingeniería',
    note: 'Ingeniería de Sistemas',
  },
];

// Agrupadas por dominio: se leen más rápido que una lista plana de 12 chips.
export const technicalSkills = [
  {
    id: 'backend',
    label: 'Backend',
    items: [
      { name: 'Laravel', icon: 'laravel' },
      { name: 'PHP', icon: 'php' },
      { name: 'Node.js', icon: 'node' },
      { name: 'Nest.js', icon: 'nest' },
      { name: 'Filament', icon: 'filament' },
      { name: 'Livewire', icon: 'livewire' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      { name: 'React', icon: 'react' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Vue', icon: 'vue' },
      { name: 'Next.js', icon: 'next' },
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'Bootstrap', icon: 'bootstrap' },
      { name: 'MUI', icon: 'mui' },
    ],
  },
  {
    id: 'data',
    label: 'Datos y persistencia',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Modelado relacional', icon: null },
      { name: 'Optimización de consultas', icon: null },
    ],
  },
  {
    id: 'tooling',
    label: 'Herramientas y prácticas',
    items: [
      { name: 'Git / GitHub', icon: 'git' },
      { name: 'Docker', icon: 'docker' },
      { name: 'PHPUnit', icon: null },
      { name: 'Scrum', icon: null },
      { name: 'Postman', icon: 'postman' },
    ],
  },
];

// Versión plana para el PDF (una línea por categoría, formato ATS-friendly).
export const technicalSkillsPrint = technicalSkills.map((group) => ({
  label: group.label,
  value: group.items.map((i) => i.name).join(' · '),
}));

export const softSkills = [
  { name: 'Resolución de problemas', detail: 'Diagnóstico y solución de incidencias en producción.' },
  { name: 'Comunicación efectiva', detail: 'Interlocución con áreas técnicas y no técnicas.' },
  { name: 'Trabajo en equipo', detail: 'Colaboración en equipos multidisciplinares bajo Scrum.' },
  { name: 'Documentación técnica', detail: 'Procesos bajo estándares institucionales.' },
  { name: 'Capacitación a usuarios', detail: 'Formación y acompañamiento a usuarios finales.' },
  { name: 'Gestión del tiempo', detail: 'Entregas dentro de los plazos comprometidos.' },
  { name: 'Adaptabilidad', detail: 'Cambio de stack y de dominio con rapidez.' },
];

export const projects = [
  {
    id: 'descubre-ibague',
    title: 'Descubre Ibagué',
    subtitle: 'Plataforma oficial de turismo · Alcaldía de Ibagué',
    description:
      'Plataforma pública para la promoción turística de Ibagué: exploración de lugares, eventos y rutas ' +
      'gastronómicas, con panel administrativo completo para la gestión de contenidos.',
    descriptionPrint:
      'Plataforma pública de promoción turística con panel administrativo de contenidos.',
    image: asset('descubre-ibague.png'),
    tags: ['Laravel', 'PHP', 'MySQL', 'Vue'],
    link: 'https://turismo.ibague.gov.co/',
    linkLabel: 'turismo.ibague.gov.co',
    sector: 'Sector público',
  },
  {
    id: 'barbershop',
    title: 'StyleCloud',
    subtitle: 'Sistema de gestión para barberías',
    description:
      'Aplicación web para la gestión integral de barberías: agendamiento de citas, calendario interactivo ' +
      'y panel de control para el seguimiento de ingresos y comisiones. En producción, gestionando la ' +
      'operación diaria de una barbería.',
    descriptionPrint:
      'En producción: agendamiento de citas, calendario y control de ingresos y comisiones.',
    image: asset('barbershop_dashboard.jpg'),
    tags: ['React', 'Nest.js', 'MUI', 'MySQL'],
    link: 'https://stylecloud.online/',
    linkLabel: 'stylecloud.online',
    sector: 'Producto propio',
  },
  {
    id: 'curaduria',
    title: 'Curaduría Cloud',
    subtitle: 'Software especializado para Curadurías Urbanas',
    description:
      'Solución en la nube para la gestión integral de Curadurías Urbanas en Colombia: radicación digital, ' +
      'control de expedientes y cumplimiento de la Ley 388 y el Decreto 1077.',
    descriptionPrint:
      'Radicación digital y control de expedientes bajo la Ley 388 y el Decreto 1077.',
    image: 'https://JohanAlarcon.github.io/landing-page-curaduria/images/hero-bg_2.png',
    tags: ['Laravel', 'Livewire', 'Gestión documental'],
    link: 'https://johanalarcon.github.io/landing-page-curaduria/',
    linkLabel: 'Ver landing',
    sector: 'Sector regulado',
  },
];

export const achievements = [
  {
    title: 'Descubre Ibagué en producción',
    description:
      'Implementación exitosa de la plataforma turística oficial de la Alcaldía de Ibagué, ' +
      'poniendo en valor el potencial turístico de la ciudad.',
    descriptionPrint:
      'Plataforma turística oficial de la Alcaldía de Ibagué, implementada y en producción.',
  },
  {
    title: 'Empleado del Mes — SIANDSI',
    description:
      'Reconocimiento por la entrega de proyectos antes del plazo establecido, ' +
      'manteniendo los estándares de calidad acordados.',
    descriptionPrint:
      'Entrega de proyectos antes del plazo, manteniendo los estándares de calidad.',
  },
];

// Métricas derivadas de los datos anteriores: nada inventado.
export const metrics = [
  { value: `${yearsOfExperience}+`, label: 'Años de experiencia' },
  { value: String(projects.length), label: 'Proyectos destacados' },
  {
    value: `${technicalSkills.reduce((n, g) => n + g.items.length, 0)}+`,
    label: 'Tecnologías',
  },
  { value: '2', label: 'Sectores: público y privado' },
];

export const sections = [
  { id: 'perfil', label: 'Perfil' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'educacion', label: 'Educación' },
  { id: 'skills', label: 'Skills' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'logros', label: 'Logros' },
  { id: 'contacto', label: 'Contacto' },
];

export const pdfFileName = 'Hoja_de_Vida_Johan_Dario_Alarcon.pdf';
export const pdfUrl = asset(pdfFileName);
