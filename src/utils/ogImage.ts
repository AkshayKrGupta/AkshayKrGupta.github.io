import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import type { BlogPost } from './blog';
import { getReadingTime } from './readingTime';
import { site } from '../data/site';

/**
 * Escapes XML/SVG special characters to prevent markup injection
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Smart line-wrapping for SVG text elements
 */
function wrapText(text: string, maxCharsPerLine = 34): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Format publication date into clean readable format (e.g. "May 20, 2026")
 */
function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Locate the local filesystem path of a post's hero image
 */
function resolveHeroImagePath(post: BlogPost): string | null {
  const hero = post.data.heroImage as any;
  if (!hero) return null;

  if (typeof hero === 'string') {
    if (fs.existsSync(hero)) return hero;
    const publicPath = path.join(process.cwd(), 'public', hero.replace(/^\//, ''));
    if (fs.existsSync(publicPath)) return publicPath;
  } else if (typeof hero === 'object' && hero !== null) {
    if (hero.fsPath && fs.existsSync(hero.fsPath)) return hero.fsPath;
    if (hero.src) {
      const cleanSrc = hero.src.replace(/^\/@fs/, '').split('?')[0];
      if (fs.existsSync(cleanSrc)) return cleanSrc;
    }
  }

  // Fallback: check post's content folder
  const postDir = path.join(process.cwd(), 'src/content/blog', post.slug);
  if (fs.existsSync(postDir)) {
    const files = fs.readdirSync(postDir);
    const candidate = files.find((f) => /\.(png|jpe?g|webp)$/i.test(f) && !f.includes('avatar'));
    if (candidate) return path.join(postDir, candidate);
  }

  return null;
}

/**
 * Generates an architectural vector schematic SVG for articles without a hero image
 */
function renderArchitecturalSchematicVector(): string {
  return `
    <g transform="translate(730, 155)">
      <!-- Blueprint Panel Frame -->
      <rect width="395" height="380" rx="14" fill="#0f1626" stroke="#25354e" stroke-width="1.5" />
      <rect x="8" y="8" width="379" height="364" rx="10" fill="none" stroke="#1e293b" stroke-width="1" stroke-dasharray="4 4" />
      
      <!-- Coordinate Reticles -->
      <path d="M 0 14 L 0 0 L 14 0" stroke="#38bdf8" stroke-width="1.5" fill="none"/>
      <path d="M 381 0 L 395 0 L 395 14" stroke="#38bdf8" stroke-width="1.5" fill="none"/>
      <path d="M 0 366 L 0 380 L 14 380" stroke="#38bdf8" stroke-width="1.5" fill="none"/>
      <path d="M 381 380 L 395 380 L 395 366" stroke="#38bdf8" stroke-width="1.5" fill="none"/>

      <!-- Header Schematic Stamp -->
      <text x="24" y="38" fill="#38bdf8" font-family="monospace, Courier New" font-size="11" font-weight="700" letter-spacing="1">SYSTEM ARCHITECTURE // v2.4</text>
      <circle cx="365" cy="34" r="3.5" fill="#10b981" />

      <!-- Interconnect Bus & Nodes -->
      <line x1="197" y1="75" x2="197" y2="320" stroke="#1e293b" stroke-width="2" stroke-dasharray="6 4" />
      <line x1="60" y1="160" x2="335" y2="160" stroke="#1e293b" stroke-width="2" stroke-dasharray="6 4" />
      <line x1="60" y1="260" x2="335" y2="260" stroke="#1e293b" stroke-width="2" stroke-dasharray="6 4" />

      <!-- Diagonal Circuit Traces -->
      <path d="M 197 75 L 85 160 M 197 75 L 310 160" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
      <path d="M 85 160 L 197 260 M 310 160 L 197 260" stroke="#38bdf8" stroke-width="1.5" opacity="0.6" />
      <path d="M 197 260 L 197 325" stroke="#38bdf8" stroke-width="1.5" opacity="0.8" />

      <!-- Primary Gateway Node (Top) -->
      <g transform="translate(142, 60)">
        <rect width="110" height="40" rx="8" fill="#131e33" stroke="#38bdf8" stroke-width="1.5" />
        <text x="55" y="24" fill="#f8fafc" font-family="monospace, Courier New" font-size="11" font-weight="700" text-anchor="middle">API GATEWAY</text>
      </g>

      <!-- Left Worker Node -->
      <g transform="translate(30, 140)">
        <rect width="110" height="40" rx="8" fill="#161f30" stroke="#818cf8" stroke-width="1.5" />
        <text x="55" y="24" fill="#e0e7ff" font-family="monospace, Courier New" font-size="11" font-weight="700" text-anchor="middle">MCP SERVER</text>
      </g>

      <!-- Right Worker Node -->
      <g transform="translate(255, 140)">
        <rect width="110" height="40" rx="8" fill="#161f30" stroke="#818cf8" stroke-width="1.5" />
        <text x="55" y="24" fill="#e0e7ff" font-family="monospace, Courier New" font-size="11" font-weight="700" text-anchor="middle">POLICY ENGINE</text>
      </g>

      <!-- Center Policy Decision Node (Diamond / Rhombus) -->
      <g transform="translate(197, 260)">
        <polygon points="0,-24 44,0 0,24 -44,0" fill="#1e1b4b" stroke="#38bdf8" stroke-width="1.5" />
        <text x="0" y="4" fill="#38bdf8" font-family="monospace, Courier New" font-size="10" font-weight="700" text-anchor="middle">PDP // ABAC</text>
      </g>

      <!-- Bottom Database Store -->
      <g transform="translate(132, 320)">
        <rect width="130" height="38" rx="8" fill="#0f172a" stroke="#10b981" stroke-width="1.5" />
        <text x="65" y="23" fill="#a7f3d0" font-family="monospace, Courier New" font-size="11" font-weight="700" text-anchor="middle">DATA WAREHOUSE</text>
      </g>

      <!-- Data Flow Pulses -->
      <circle cx="197" cy="115" r="3" fill="#38bdf8" />
      <circle cx="140" cy="210" r="3" fill="#818cf8" />
      <circle cx="254" cy="210" r="3" fill="#818cf8" />
      <circle cx="197" cy="300" r="3" fill="#10b981" />
    </g>
  `;
}

/**
 * Generate a 1200x630 Open Graph PNG buffer for a given blog post
 */
export async function generateOgImageForPost(post: BlogPost): Promise<Buffer> {
  const { title, description, pubDate, tags = [] } = post.data;
  const primaryTag = tags.length > 0 ? tags[0].replace(/-/g, ' ').toUpperCase() : 'ARCHITECTURE NOTE';
  const readingTime = getReadingTime(post.body);
  const formattedDate = formatDate(pubDate);

  // Title wrapping (max ~25 characters per line for content column)
  const titleLines = wrapText(title, 25).slice(0, 3);
  if (wrapText(title, 25).length > 3) {
    titleLines[2] = titleLines[2].replace(/\.{0,3}$/, '') + '...';
  }

  // Description wrapping (max ~42 characters per line)
  const descLines = wrapText(description, 42).slice(0, 2);
  if (wrapText(description, 42).length > 2) {
    descLines[1] = descLines[1].replace(/\.{0,3}$/, '') + '...';
  }

  // Tag Pill width computation
  const tagTextWidth = Math.max(120, primaryTag.length * 8.5 + 28);

  // Dynamic Title Positioning & Optical Sizing
  const titleFontSize = titleLines.length >= 3 ? 38 : (titleLines.length === 2 ? 44 : 48);
  const titleLineHeight = titleLines.length >= 3 ? 46 : (titleLines.length === 2 ? 52 : 56);
  const titleStartY = 236;

  // Title tspans
  const titleTspans = titleLines
    .map((line, i) => `<tspan x="72" dy="${i === 0 ? 0 : titleLineHeight}">${escapeXml(line)}</tspan>`)
    .join('');

  // Description tspans
  const descStartY = titleStartY + titleLines.length * titleLineHeight + 18;
  const descTspans = descLines
    .map((line, i) => `<tspan x="72" dy="${i === 0 ? 0 : 28}">${escapeXml(line)}</tspan>`)
    .join('');

  const heroImagePath = resolveHeroImagePath(post);
  const hasHeroImage = !!heroImagePath;

  // Compose Base SVG Canvas
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#0a0d14"/>
          <stop offset="100%" stop-color="#0f1422"/>
        </linearGradient>

        <radialGradient id="glowTop" cx="1060" cy="140" r="500" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.14"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="glowBottom" cx="140" cy="500" r="460" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.10"/>
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
        </radialGradient>

        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#162032" stroke-width="1"/>
          <circle cx="40" cy="40" r="1" fill="#1e293b"/>
        </pattern>
      </defs>

      <!-- Background Layers -->
      <rect width="1200" height="630" fill="url(#bgGrad)"/>
      <rect width="1200" height="630" fill="url(#grid)"/>
      <rect width="1200" height="630" fill="url(#glowTop)"/>
      <rect width="1200" height="630" fill="url(#glowBottom)"/>

      <!-- Technical Inset Frame (1px border) -->
      <rect x="32" y="32" width="1136" height="566" rx="16" fill="none" stroke="#1e293b" stroke-width="1.5"/>

      <!-- Corner Crosshairs -->
      <path d="M 24 32 L 40 32 M 32 24 L 32 40" stroke="#38bdf8" stroke-width="1.5"/>
      <path d="M 1160 32 L 1176 32 M 1168 24 L 1168 40" stroke="#38bdf8" stroke-width="1.5"/>
      <path d="M 24 598 L 40 598 M 32 590 L 32 606" stroke="#38bdf8" stroke-width="1.5"/>
      <path d="M 1160 598 L 1176 598 M 1168 590 L 1168 606" stroke="#38bdf8" stroke-width="1.5"/>

      <!-- Header: Monogram [AG] -->
      <rect x="72" y="64" width="42" height="42" rx="8" fill="#161f30" stroke="#38bdf8" stroke-width="1.5"/>
      <text x="93" y="91" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="bold" text-anchor="middle">AG</text>

      <!-- Author Identity -->
      <text x="128" y="83" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="bold" letter-spacing="1.5">${escapeXml(site.shortName.toUpperCase())}</text>
      <text x="128" y="101" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" letter-spacing="1">${escapeXml(site.jobTitle.toUpperCase())} • AI SYSTEMS</text>

      <!-- Header Right: Domain & Live Signal -->
      <circle cx="985" cy="85" r="4.5" fill="#10b981"/>
      <text x="1000" y="90" fill="#94a3b8" font-family="monospace, Courier New" font-size="15" font-weight="600">akshaykgupta.me</text>

      <!-- Header Separator Line -->
      <line x1="72" y1="126" x2="1128" y2="126" stroke="#1e293b" stroke-width="1"/>

      <!-- Category / Topic Pill -->
      <rect x="72" y="152" width="${tagTextWidth}" height="32" rx="6" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" stroke-width="1"/>
      <text x="${72 + tagTextWidth / 2}" y="173" fill="#38bdf8" font-family="monospace, Courier New" font-size="12" font-weight="700" letter-spacing="1" text-anchor="middle">${escapeXml(primaryTag)}</text>

      <!-- Article Title -->
      <text x="72" y="${titleStartY}" fill="#f8fafc" font-family="system-ui, -apple-system, sans-serif" font-size="${titleFontSize}" font-weight="800" letter-spacing="-0.025em">
        ${titleTspans}
      </text>

      <!-- Article Excerpt / Description -->
      <text x="72" y="${descStartY}" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="21" font-weight="400" letter-spacing="-0.01em">
        ${descTspans}
      </text>

      <!-- Bottom Metadata Bar -->
      <line x1="72" y1="520" x2="680" y2="520" stroke="#1e293b" stroke-width="1"/>
      
      <!-- Date -->
      <text x="72" y="555" fill="#64748b" font-family="monospace, Courier New" font-size="13" font-weight="600">
        ${escapeXml(formattedDate)}
      </text>

      <!-- Reading Time Badge -->
      <rect x="200" y="538" width="105" height="26" rx="5" fill="#161f30" stroke="#25354e" stroke-width="1" />
      <text x="252" y="555" fill="#38bdf8" font-family="monospace, Courier New" font-size="11" font-weight="600" text-anchor="middle">
        ⏱ ${escapeXml(readingTime)}
      </text>

      <!-- Read Article Action Cue -->
      <text x="330" y="555" fill="#38bdf8" font-family="monospace, Courier New" font-size="13" font-weight="700">
        Read Publication →
      </text>

      <!-- Right Visual Component (Only if NO hero image) -->
      ${!hasHeroImage ? renderArchitecturalSchematicVector() : ''}
    </svg>
  `;

  // Render SVG to base PNG buffer
  let canvas = sharp(Buffer.from(svg));

  // If hero image exists, resize, round corners, and composite onto right pane
  if (hasHeroImage && heroImagePath) {
    try {
      const heroWidth = 395;
      const heroHeight = 380;
      const roundedCornerMask = Buffer.from(`
        <svg width="${heroWidth}" height="${heroHeight}">
          <rect width="${heroWidth}" height="${heroHeight}" rx="14" fill="#ffffff" />
        </svg>
      `);

      const croppedHero = await sharp(heroImagePath)
        .resize(heroWidth, heroHeight, {
          fit: 'cover',
          position: 'center',
        })
        .composite([{
          input: roundedCornerMask,
          blend: 'dest-in',
        }])
        .png()
        .toBuffer();

      // Border frame for hero image
      const heroBorderFrame = Buffer.from(`
        <svg width="${heroWidth}" height="${heroHeight}">
          <rect width="${heroWidth}" height="${heroHeight}" rx="14" fill="none" stroke="#334155" stroke-width="2" />
        </svg>
      `);

      const compositeItems = [
        {
          input: croppedHero,
          left: 730,
          top: 155,
        },
        {
          input: heroBorderFrame,
          left: 730,
          top: 155,
        },
      ];

      canvas = canvas.composite(compositeItems);
    } catch (err) {
      console.warn(`Failed to composite hero image for ${post.slug}:`, err);
    }
  }

  return await canvas
    .png({
      quality: 90,
      compressionLevel: 8,
    })
    .toBuffer();
}
