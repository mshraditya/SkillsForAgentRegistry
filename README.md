# Skills Registry

A distinctive, production-grade web platform for discovering and browsing AI agent skills. Built with an industrial-editorial aesthetic featuring curated capabilities from the [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) repository.

## Key Features

- **Real-time search** across 700+ agent skills by name, description, and tags
- **Category filtering** by Frontend, Backend, AI & Agents, Security, Automation, DevOps, Data, Testing, Mobile, Marketing, and Development
- **Direct skill downloads** — Click to download any SKILL.md file
- **Keyboard shortcuts** — Press `/` to focus search, `Esc` to close modals
- **Responsive design** — Seamless experience on desktop and mobile
- **Industrial-editorial aesthetic** — Terminal-inspired with Space Mono typography and electric cyan accents

![Skills Registry Screenshot](Screenshot%202026-02-10%20at%202.10.41%20AM.png)

---

## Tech Stack

- **Language**: JavaScript (ES6+)
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (no frameworks)
- **Typography**: Space Mono (display) × DM Sans (body)
- **Data**: JSON file generated from SKILL.md frontmatter
- **Deployment**: Static files (no backend required)
- **Local Dev**: Python HTTP server or any static file server

---

## Prerequisites

- **Node.js** 16 or higher (for skill data generation)
- **Python 3** (for local development server) or any static file server
- Modern web browser

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/SkillsForAI.git
cd SkillsForAI
```

### 2. View Locally

Using Python:

```bash
python3 -m http.server 8080
```

Using Node.js:

```bash
npx serve
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

### 3. Explore Skills

- **Search**: Type in the search bar or press `/` to focus
- **Filter**: Click category tags to filter by skill type
- **Download**: Click the download icon on any skill card to get the SKILL.md file
- **Learn More**: Click "About" or "Thanks" buttons in the header

---

## Project Structure

```
├── index.html              # Main HTML structure
├── styles.css              # All styles and design system
├── script.js               # Search, filtering, and interaction logic
├── skills-data.json        # Generated skill metadata (701 skills)
├── skills/                 # Source skill directories
│   ├── frontend-design/
│   │   └── SKILL.md
│   ├── autonomous-agents/
│   │   └── SKILL.md
│   └── ...
└── README.md               # This file
```

---

## Architecture

### Data Flow

```
User Action → JavaScript Event → Filter/Search Logic → Render Skills → Display Results
                                                           ↓
                                            skills-data.json (701 skills)
```

### Key Components

**HTML Structure** (`index.html`)
- Semantic markup with accessibility attributes
- Modal overlays for About and Special Thanks
- Category filter buttons with data attributes
- Empty state for no results

**Styling** (`styles.css`)
- CSS custom properties for design tokens
- Industrial-editorial aesthetic with intentional asymmetry
- Responsive grid layout with mobile-first approach
- Smooth animations with cubic-bezier easing
- Dark theme with `#0a0a0a` background and `#00ffaa` accent

**Interaction Logic** (`script.js`)
- Dynamic skill loading from JSON
- Real-time search with case-insensitive matching
- Category filtering with active state management
- Modal open/close with keyboard support
- Skill card rendering with download functionality

### Skills Data Structure

Each skill in `skills-data.json`:

```json
{
  "name": "frontend-design",
  "category": "Frontend",
  "description": "Create distinctive, production-grade frontend interfaces...",
  "tags": ["UI", "Design Systems", "CSS"],
  "categorySlug": "frontend"
}
```

---

## Available Scripts

### Regenerate Skills Data

When you add new skills to the `/skills` directory, regenerate `skills-data.json`:

```bash
node -e "
const fs = require('fs');
const path = require('path');

const skillsDir = './skills';
const skills = [];

const categorizeSkill = (name, description) => {
  const lower = (name + ' ' + description).toLowerCase();
  
  if (lower.match(/frontend|ui|ux|design|react|angular|vue|tailwind|css|html/)) return { category: 'Frontend', slug: 'frontend' };
  if (lower.match(/backend|api|server|database|postgres|sql|redis|cache/)) return { category: 'Backend', slug: 'backend' };
  if (lower.match(/agent|ai|llm|langchain|autonomous|multi-agent|prompt/)) return { category: 'AI & Agents', slug: 'ai' };
  if (lower.match(/security|pentest|vulnerability|auth|penetration|exploit|hacking/)) return { category: 'Security', slug: 'security' };
  if (lower.match(/automat|workflow|cicd|ci\/cd|pipeline|deploy/)) return { category: 'Automation', slug: 'automation' };
  if (lower.match(/data|analytics|visualization|metrics|dashboard/)) return { category: 'Data & Analytics', slug: 'data' };
  if (lower.match(/mobile|ios|android|flutter|react-native/)) return { category: 'Mobile', slug: 'mobile' };
  if (lower.match(/devops|docker|kubernetes|k8s|terraform|cloud|aws|azure|gcp/)) return { category: 'DevOps', slug: 'devops' };
  if (lower.match(/test|tdd|qa|quality/)) return { category: 'Testing', slug: 'testing' };
  if (lower.match(/content|seo|marketing|copywriting/)) return { category: 'Marketing', slug: 'marketing' };
  
  return { category: 'Development', slug: 'development' };
};

const dirs = fs.readdirSync(skillsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

for (const dir of dirs) {
  const skillPath = path.join(skillsDir, dir, 'SKILL.md');
  
  if (fs.existsSync(skillPath)) {
    try {
      const content = fs.readFileSync(skillPath, 'utf8');
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const nameMatch = frontmatter.match(/name:\s*(.+)/);
        const descMatch = frontmatter.match(/description:\s*(.+)/);
        
        if (nameMatch && descMatch) {
          const name = nameMatch[1].trim();
          const description = descMatch[1].trim();
          const { category, slug } = categorizeSkill(name, description);
          
          const tags = [];
          if (description.match(/frontend|ui|design/i)) tags.push('UI');
          if (description.match(/react/i)) tags.push('React');
          if (description.match(/api/i)) tags.push('API');
          if (description.match(/security|auth/i)) tags.push('Security');
          if (description.match(/agent|ai/i)) tags.push('AI');
          if (description.match(/automat/i)) tags.push('Automation');
          if (description.match(/test/i)) tags.push('Testing');
          if (description.match(/backend/i)) tags.push('Backend');
          if (description.match(/database|sql/i)) tags.push('Database');
          if (description.match(/cloud|aws|azure/i)) tags.push('Cloud');
          
          if (tags.length === 0) tags.push(category);
          
          skills.push({
            name,
            category,
            description,
            tags: tags.slice(0, 3),
            categorySlug: slug
          });
        }
      }
    } catch (err) {
      // Skip files that can't be read
    }
  }
}

fs.writeFileSync('skills-data.json', JSON.stringify(skills, null, 2));
console.log(\`Generated skills-data.json with \${skills.length} skills\`);
"
```

### Start Development Server

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve

# Using PHP
php -S localhost:8080
```

---

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0a0a0a` | Deep charcoal background |
| `--color-surface` | `#1a1a1a` | Card backgrounds |
| `--color-surface-elevated` | `#242424` | Hover states |
| `--color-text-primary` | `#fafafa` | Primary text |
| `--color-text-secondary` | `#a0a0a0` | Descriptions, labels |
| `--color-text-tertiary` | `#606060` | Subtle text |
| `--color-accent` | `#00ffaa` | Electric cyan highlights |
| `--color-border` | `#2a2a2a` | Dividers, card borders |

### Typography

| Font | Usage | Rationale |
|------|-------|-----------|
| **Space Mono** | Headings, code, filters | Monospace for technical authority |
| **DM Sans** | Body text, descriptions | Clean readability without generic feel |

### Spacing

8px base unit with CSS calc multiplication:
- `calc(var(--spacing-unit) * 2)` = 16px
- `calc(var(--spacing-unit) * 4)` = 32px
- etc.

### Motion

- **Entrance**: `slideIn` animation (0.6s cubic-bezier)
- **Hover states**: 0.2-0.3s transitions
- **Modal**: `modalSlide` with scale (0.4s cubic-bezier)

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `/` | Focus search input |
| `Esc` | Close modal |
| `↑` `↓` | Navigate results (future) |
| `Enter` | Download selected skill (future) |

---

## Deployment

### Static Hosting (Recommended)

Deploy to any static hosting platform:

**Vercel**
```bash
npm i -g vercel
vercel
```

**Netlify**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**
1. Push to GitHub repository
2. Go to Settings → Pages
3. Set source to `main` branch
4. Site will be live at `https://yourusername.github.io/SkillsForAI`

**Cloudflare Pages**
1. Connect GitHub repository
2. Build command: (none)
3. Output directory: `/`
4. Deploy

### Custom Domain

Add a `CNAME` file with your domain:
```
skills.yourdomain.com
```

Update DNS records to point to your hosting provider.

---

## Customization

### Change Color Scheme

Edit CSS variables in `styles.css`:

```css
:root {
    --color-bg: #0a0a0a;          /* Your background */
    --color-accent: #00ffaa;       /* Your accent color */
    /* ... */
}
```

### Add New Categories

1. Update `categorizeSkill()` function in the regeneration script
2. Add filter button in `index.html`:
   ```html
   <button class="filter-tag" data-category="your-slug">Your Category</button>
   ```
3. Regenerate `skills-data.json`

### Modify Typography

Change Google Fonts import in `index.html` and update CSS variables:
```css
:root {
    --font-display: 'Your Display Font', monospace;
    --font-body: 'Your Body Font', sans-serif;
}
```

---

## Troubleshooting

### Skills Not Loading

**Issue**: `skills-data.json` returns 404 or CORS error

**Solution**:
- Ensure you're running a local server (not opening `file://` directly)
- Check browser console for errors
- Verify `skills-data.json` exists in root directory

### Search Not Working

**Issue**: Typing doesn't filter results

**Solution**:
- Check browser console for JavaScript errors
- Ensure `script.js` is loaded after DOM elements
- Clear browser cache and reload

### Download Not Working

**Issue**: Clicking download icon does nothing

**Solution**:
- Check that skill folder names match the skill name (lowercase, hyphenated)
- Verify SKILL.md exists in `skills/skill-name/` directory
- Check browser's download settings

### Styling Issues

**Issue**: Fonts not loading or styles broken

**Solution**:
```bash
# Hard refresh in browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R

# Check network tab for failed font requests
# Verify Google Fonts CDN is accessible
```

---

## Contributing

This is a showcase platform for the [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) repository. To contribute skills:

1. Visit the [original skills repository](https://github.com/sickn33/antigravity-awesome-skills)
2. Follow their contribution guidelines
3. Once merged, regenerate `skills-data.json` in this project

To contribute to the platform itself:

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Design Philosophy

### Differentiation Principles

This platform avoids generic UI by:
- Using **Space Mono** monospace for commanding presence instead of Inter/Roboto
- Creating an **asymmetric header** with statistics positioned editorially
- Implementing **terminal-inspired search** with keyboard shortcuts
- Using **top accent line animation** on hover instead of generic shadows
- Choosing a **dark industrial palette** (`#0a0a0a`) with electric cyan accents instead of purple gradients
- Employing **structural typography** with massive search input size
- Designing **outlined category filters** instead of filled pills

### Aesthetic Direction

**Industrial Editorial** — Technical authority meets refined presentation. Terminal-inspired with intentional asymmetry and structural typography. Every design decision serves the aesthetic thesis: a platform that feels like a technical archive, not a generic marketplace.

Follows the `frontend-design` skill principles:
- Intentional aesthetic direction (not defaults)
- Visual memorability (accent animations, monospace typography)
- Cohesive restraint (every element serves the aesthetic)
- Production-ready code (clean, accessible, performant)

---

## Acknowledgments

### Skills Source

All 701 skills are sourced from the incredible [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) repository by [@sickn33](https://github.com/sickn33). This archive wouldn't exist without their dedication to documenting operational patterns and agent capabilities.

### Design & Development

- **Design System**: Follows `frontend-design` skill principles
- **Typography**: Space Mono × DM Sans from Google Fonts
- **Inspiration**: Technical documentation, design system libraries, and terminal interfaces

---

## License

This platform interface is MIT licensed. Individual skills in the `/skills` directory retain their original licenses as specified in each SKILL.md file.

---

## Support

For issues with the platform:
- Open an issue in this repository

For issues with specific skills:
- Visit [antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills/issues)

---

**Built with intentional design. No generic templates. Production-ready code.**
