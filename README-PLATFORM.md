# Skills Registry Platform

A distinctive, production-grade frontend for browsing and discovering AI agent skills.

## Features

- **Search & Filter**: Real-time search across all skill names, descriptions, and tags
- **Category Filtering**: Browse by Frontend, Backend, AI & Agents, Security, Automation, DevOps, Data, Testing, Mobile, Marketing, and Development
- **Direct Download**: Click to download any skill's SKILL.md file
- **Keyboard Shortcuts**: Press `/` to focus search
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Industrial Editorial Aesthetic**: Clean, terminal-inspired design with Space Mono and DM Sans typography

## Files

```
├── index.html          # Main HTML structure
├── styles.css          # All styles and design system
├── script.js           # Search, filtering, and interaction logic
└── skills-data.json    # Generated skill data from /skills directory
```

## Live Count

Currently indexing **${SKILL_COUNT}** skills from your repository.

## Usage

### View Locally

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx serve

# Then open http://localhost:8080
```

### Update Skills Data

When you add new skills to the `/skills` directory, regenerate the data:

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

## Design System

### Colors
- Background: `#0a0a0a` (deep charcoal)
- Surface: `#1a1a1a`
- Accent: `#00ffaa` (electric cyan)
- Text: `#fafafa` (off-white)

### Typography
- Display: Space Mono (monospace)
- Body: DM Sans

### Aesthetic Direction
**Industrial Editorial** — Technical authority meets refined presentation. Terminal-inspired with intentional asymmetry and structural typography.

## Differentiation

This avoids generic UI by:
- Using Space Mono monospace for commanding presence instead of Inter/Roboto
- Creating an asymmetric header with statistics positioned editorially
- Implementing a terminal-inspired search with keyboard shortcuts
- Top accent line animation on hover instead of generic shadows
- Dark industrial palette with electric cyan accents instead of purple gradients
- Structural typography with massive search input size

---

Built with the `frontend-design` skill principles: intentional aesthetics, production-ready code, memorable interfaces.
