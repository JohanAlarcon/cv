// src/cv/CvDocument.jsx
import { useEffect, useCallback } from 'react';
import './print.css';

import {
  profile,
  contact,
  socials,
  experience,
  education,
  languages,
  technicalSkillsPrint,
  softSkills,
  projects,
  achievements,
  credentials,
  pdfUrl,
  pdfFileName,
} from '../data/cv';

/**
 * Hoja de vida imprimible (ruta `?cv=1`).
 *
 * Técnica de generación: **print-first** — el usuario obtiene el PDF con
 * Ctrl/Cmd+P → "Guardar como PDF", y `npm run pdf` reproduce exactamente la
 * misma salida con Puppeteer para regenerar el archivo estático.
 *
 * Frente a html2canvas / html2pdf (lo que usaba el proyecto), esto conserva el
 * texto como texto: el PDF pesa ~10× menos, se puede buscar y copiar, y los
 * filtros ATS de las convocatorias públicas pueden leerlo. html2canvas produce
 * una imagen: un ATS lo lee como una página en blanco.
 */
export default function CvDocument({ autoPrint = false }) {
  const print = useCallback(() => window.print(), []);

  useEffect(() => {
    document.title = `Hoja de vida — ${profile.name}`;
  }, []);

  useEffect(() => {
    if (!autoPrint) return undefined;
    // Esperamos a que las fuentes estén listas: si no, el layout se mide con
    // las métricas de la fuente de reserva y los saltos de página bailan.
    let cancelled = false;
    const ready = document.fonts?.ready ?? Promise.resolve();
    ready.then(() => {
      if (!cancelled) window.setTimeout(() => window.print(), 120);
    });
    return () => {
      cancelled = true;
    };
  }, [autoPrint]);

  return (
    <div className="cv-root">
      {/* ── Acciones (no se imprimen) ─────────────────────────────── */}
      <div className="cv-toolbar">
        <a className="cv-btn" href={window.location.pathname}>
          ← Volver al portafolio
        </a>
        <div className="cv-toolbar__spacer" />
        <a className="cv-btn" href={pdfUrl} download={pdfFileName}>
          PDF publicado
        </a>
        <button type="button" className="cv-btn cv-btn--primary" onClick={print}>
          Imprimir / Guardar como PDF
        </button>
      </div>

      <p className="cv-hint">
        Consejo: en el diálogo de impresión elige <strong>Guardar como PDF</strong>, tamaño{' '}
        <strong>A4</strong>, márgenes <strong>predeterminados</strong> y activa{' '}
        <strong>Gráficos de fondo</strong>. El texto se mantiene seleccionable, así que los
        sistemas de selección automática (ATS) pueden leerlo.
      </p>

      {/* ── Hoja ──────────────────────────────────────────────────── */}
      <article className="cv-page">
        <header className="cv-header">
          <div className="cv-header__text">
            <h1 className="cv-name">{profile.name}</h1>
            <p className="cv-role">
              {profile.role} · Desarrollador de Software
            </p>
            <p className="cv-summary">{profile.summaryPrint}</p>
          </div>
          <img className="cv-photo" src={profile.photo} alt={profile.name} />
        </header>

        <div className="cv-contactbar">
          <span>{contact.location}</span>
          <span>
            <a href={contact.phoneHref}>{contact.phone}</a>
          </span>
          <span>
            <a href={contact.emailHref}>{contact.email}</a>
          </span>
          {socials.map((s) => (
            <span key={s.id}>
              <span className="cv-key">{s.label}:</span>{' '}
              <a href={s.href}>{s.handle}</a>
            </span>
          ))}
          <span>
            <a href={contact.siteHref}>{contact.site}</a>
          </span>
        </div>

        <div className="cv-body">
          {/* ── Columna principal ───────────────────────────────── */}
          <main>
            <section className="cv-section">
              <h2 className="cv-section__title">Experiencia profesional</h2>
              {experience.map((job) => (
                <div className="cv-entry" key={job.id}>
                  <div className="cv-entry__head">
                    <h3 className="cv-entry__role">{job.role}</h3>
                    <span className="cv-entry__period">{job.period}</span>
                  </div>
                  <p className="cv-entry__org">{job.company}</p>
                  <p className="cv-entry__meta">
                    {job.context} · {job.location}
                  </p>
                  <ul className="cv-list">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <p className="cv-stack">{job.stack.join(' · ')}</p>
                </div>
              ))}
            </section>

            <section className="cv-section">
              <h2 className="cv-section__title">Proyectos destacados</h2>
              {projects.map((p) => (
                <div className="cv-project" key={p.id}>
                  <div className="cv-project__head">
                    <h3 className="cv-project__title">
                      {p.title} — <span style={{ fontWeight: 400 }}>{p.subtitle}</span>
                    </h3>
                    {p.link && (
                      <a className="cv-project__link" href={p.link}>
                        {p.linkLabel}
                      </a>
                    )}
                  </div>
                  <p className="cv-project__desc">{p.descriptionPrint ?? p.description}</p>
                  <p className="cv-stack">{p.tags.join(' · ')}</p>
                </div>
              ))}
            </section>
          </main>

          {/* ── Barra lateral ───────────────────────────────────── */}
          <aside>
            <section className="cv-section">
              <h2 className="cv-section__title">Competencias técnicas</h2>
              {technicalSkillsPrint.map((group) => (
                <div className="cv-skillgroup" key={group.label}>
                  <p className="cv-skillgroup__label">{group.label}</p>
                  <p className="cv-skillgroup__value">{group.value}</p>
                </div>
              ))}
            </section>

            <section className="cv-section">
              <h2 className="cv-section__title">Educación</h2>
              {education.map((e) => (
                <div className="cv-entry" key={e.id}>
                  <div className="cv-entry__head">
                    <h3 className="cv-entry__role" style={{ fontSize: '9.6pt' }}>
                      {e.degree}
                    </h3>
                  </div>
                  <p className="cv-entry__org">{e.institution}</p>
                  <p className="cv-entry__meta">
                    {e.period} · {e.location}
                  </p>
                </div>
              ))}

              {/* Requisito habilitante en convocatorias públicas. */}
              {credentials.map((c) => (
                <p className="cv-credential" key={c.id}>
                  <strong>{c.label}:</strong> {c.value}
                  <span className="cv-credential__issuer">COPNIA</span>
                </p>
              ))}
            </section>

            <section className="cv-section">
              <h2 className="cv-section__title">Idiomas</h2>
              {languages.map((l) => (
                <p className="cv-lang" key={l.name}>
                  <strong>{l.name}</strong>
                  <span>{l.level}</span>
                </p>
              ))}
            </section>

            <section className="cv-section">
              <h2 className="cv-section__title">Habilidades blandas</h2>
              {/* En línea, no como etiquetas: ocupa menos alto y un ATS lo lee mejor. */}
              <p className="cv-skillgroup__value">{softSkills.map((s) => s.name).join(' · ')}</p>
            </section>

            <section className="cv-section">
              <h2 className="cv-section__title">Reconocimientos</h2>
              {achievements.map((a) => (
                <div className="cv-achievement" key={a.title}>
                  <p className="cv-achievement__title">{a.title}</p>
                  <p className="cv-achievement__desc">{a.descriptionPrint ?? a.description}</p>
                </div>
              ))}
            </section>
          </aside>
        </div>

        <footer className="cv-foot">
          <span>{profile.name}</span>
          <span>{contact.site}</span>
        </footer>
      </article>
    </div>
  );
}
