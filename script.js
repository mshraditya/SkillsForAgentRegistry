// Theme management
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Load skills data dynamically
let skills = [];

// Fetch skills from generated data
async function loadSkills() {
    try {
        const response = await fetch('skills-data.json');
        skills = await response.json();
        // Update count
        const metaCount = document.querySelector('.meta-count');
        if (metaCount) {
            metaCount.textContent = skills.length;
        }
        renderSkills(skills);
    } catch (error) {
        console.error('Failed to load skills:', error);
        // Fallback to empty array
        skills = [];
        renderSkills(skills);
    }
}

const searchInput = document.getElementById('searchInput');
const skillsGrid = document.getElementById('skillsGrid');
const emptyState = document.getElementById('emptyState');
const filterTags = document.querySelectorAll('.filter-tag');

let currentFilter = 'all';

function renderSkills(skillsToRender) {
    if (skillsToRender.length === 0) {
        skillsGrid.style.display = 'none';
        emptyState.classList.add('visible');
        return;
    }
    
    skillsGrid.style.display = 'grid';
    emptyState.classList.remove('visible');
    
    skillsGrid.innerHTML = skillsToRender.map(skill => `
        <div class="skill-card">
            <div class="skill-header">
                <div>
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-category">${skill.category}</div>
                </div>
                <button class="skill-download" aria-label="Download skill" title="Download skill">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                </button>
            </div>
            <p class="skill-description">${skill.description}</p>
            <div class="skill-tags">
                ${skill.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    // Add download handlers
    document.querySelectorAll('.skill-download').forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            downloadSkill(skillsToRender[index]);
        });
    });
}

function filterSkills() {
    const searchTerm = searchInput.value.toLowerCase();
    
    let filtered = skills.filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchTerm) ||
                             skill.description.toLowerCase().includes(searchTerm) ||
                             skill.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        const matchesCategory = currentFilter === 'all' || skill.categorySlug === currentFilter;
        
        return matchesSearch && matchesCategory;
    });
    
    renderSkills(filtered);
}

function downloadSkill(skill) {
    // Download the actual SKILL.md file
    const skillFolder = skill.name.toLowerCase().replace(/\s+/g, '-');
    const skillPath = `skills/${skillFolder}/SKILL.md`;
    
    // Create a temporary link and trigger download
    const link = document.createElement('a');
    link.href = skillPath;
    link.download = `${skill.name}.md`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('Downloaded skill:', skill.name, 'from', skillPath);
}

// Event listeners
searchInput.addEventListener('input', filterSkills);

filterTags.forEach(tag => {
    tag.addEventListener('click', (e) => {
        filterTags.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.category;
        filterSkills();
    });
});

// Modal functionality
const howToBtn = document.getElementById('howToBtn');
const aboutBtn = document.getElementById('aboutBtn');
const thanksBtn = document.getElementById('thanksBtn');
const howToModal = document.getElementById('howToModal');
const aboutModal = document.getElementById('aboutModal');
const thanksModal = document.getElementById('thanksModal');
const modalCloses = document.querySelectorAll('.modal-close');

function openModal(modal) {
    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('visible');
    document.body.style.overflow = '';
}

howToBtn.addEventListener('click', () => openModal(howToModal));
aboutBtn.addEventListener('click', () => openModal(aboutModal));
thanksBtn.addEventListener('click', () => openModal(thanksModal));

modalCloses.forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        closeModal(modal);
    });
});

// Close modal on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
    
    // Close modal on Escape
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.visible').forEach(modal => {
            closeModal(modal);
        });
    }
});

// Load skills on page load
loadSkills();
