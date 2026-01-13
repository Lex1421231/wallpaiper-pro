// Wallpapers data with categories
const wallpapers = [
    // Nature category
    { id: 701, title: 'Пустыня', category: 'nature', resolution: '1920x1080', url: '/src/img/gallery/nature/701.jpg' },
    { id: 702, title: 'Горы', category: 'nature', resolution: '1920x1200', url: '/src/img/gallery/nature/702.jpg' },
    { id: 703, title: 'Горы', category: 'nature', resolution: '1920x1200', url: '/src/img/gallery/nature/703.jpg' },
    { id: 704, title: 'Горы', category: 'nature', resolution: '1920x1200', url: '/src/img/gallery/nature/704.jpg' },
    { id: 705, title: 'Горы', category: 'nature', resolution: '1920x1200', url: '/src/img/gallery/nature/705.jpg' },
    { id: 706, title: 'Горы', category: 'nature', resolution: '1920x1200', url: '/src/img/gallery/nature/706.jpg' },
    
    // City category
    { id: 101, title: 'Город на закате', category: 'city', resolution: '1920x1200', url: '/src/img/gallery/city/101.jpg' },
    { id: 102, title: 'Мост', category: 'city', resolution: '1920x1200', url: '/src/img/gallery/city/102.jpg' },
    { id: 103, title: 'Урбан Пейзаж', category: 'city', resolution: '1920x1200', url: '/src/img/gallery/city/103.jpg' },
    { id: 104, title: 'Метрополис', category: 'city', resolution: '1920x1200', url: '/src/img/gallery/city/104.jpg' },
    
    // Space category
    { id: 201, title: 'Космонавт', category: 'space', resolution: '1920x1200', url: '/src/img/gallery/space/201.jpg' },
    { id: 202, title: 'Туманность', category: 'space', resolution: '1920x1200', url: '/src/img/gallery/space/202.jpg' },
    { id: 203, title: 'Планета на закате', category: 'space', resolution: '1920x1200', url: '/src/img/gallery/space/203.jpg' },
    { id: 204, title: 'Звёздное небо', category: 'space', resolution: '1920x1200', url: '/src/img/gallery/space/204.jpg' },
    
    // Abstract category
    { id: 301, title: 'Абстрактная Форма', category: 'abstract', resolution: '1920x1200', url: '/src/img/gallery/abstract/301.jpg' },
    { id: 302, title: 'Геометрические Фигуры', category: 'abstract', resolution: '1920x1200', url: '/src/img/gallery/abstract/302.jpg' },
    { id: 303, title: 'Цветовая Абстракция', category: 'abstract', resolution: '1920x1200', url: '/src/img/gallery/abstract/303.jpg' },
    { id: 304, title: 'Волны Света', category: 'abstract', resolution: '1920x1200', url: '/src/img/gallery/abstract/304.jpg' },
    
    // Tech category
    { id: 401, title: 'Цифровой Мир', category: 'tech', resolution: '1920x1200', url: '/src/img/gallery/tech/401.jpg' },
    { id: 402, title: 'Киберпространство', category: 'tech', resolution: '1920x1200', url: '/src/img/gallery/tech/402.jpg' },
    { id: 403, title: 'Сеть Данных', category: 'tech', resolution: '1920x1200', url: '/src/img/gallery/tech/403.jpg' },
    { id: 404, title: 'Цифровая Матрица', category: 'tech', resolution: '1920x1200', url: '/src/img/gallery/tech/404.jpg' },
    
    // Animals category
    { id: 501, title: 'Чёрная кошка', category: 'animals', resolution: '1920x1200', url: '/src/img/gallery/animals/501.jpg' },
    { id: 502, title: 'Енот', category: 'animals', resolution: '1920x1200', url: '/src/img/gallery/animals/502.jpg' },
    { id: 503, title: 'Лев', category: 'animals', resolution: '1920x1200', url: '/src/img/gallery/animals/503.jpg' },
    { id: 504, title: 'Лошади на закате', category: 'animals', resolution: '1920x1200', url: '/src/img/gallery/animals/504.jpg' },
    
    // Phone category
    { id: 601, title: 'Ростения', category: 'Phone', resolution: '800x1280', url: '/src/img/gallery/Phone/601.jpg' },
    { id: 602, title: 'BMW', category: 'Phone', resolution: '800x1280', url: '/src/img/gallery/Phone/602.jpg' },
    { id: 603, title: 'Осений лист', category: 'Phone', resolution: '800x1280', url: '/src/img/gallery/Phone/603.jpg' },
    { id: 604, title: 'Капля воды', category: 'Phone', resolution: '800x1280', url: '/src/img/gallery/Phone/604.jpg' },
    { id: 604, title: 'Горы', category: 'Phone', resolution: '736x1632', url: '/src/img/gallery/Phone/605.jpg' },
    { id: 604, title: 'Лес', category: 'Phone', resolution: '704x1432', url: '/src/img/gallery/Phone/606.jpg' }
    
    
];

// Category names mapping
const categoryNames = {
    'all': 'Все',
    'nature': 'Природа',
    'city': 'Города',
    'space': 'Космос',
    'abstract': 'Абстракция',
    'tech': 'Технологии',
    'animals': 'Животные',
    'Phone': 'Для телефона'
};

const ITEMS_PER_PAGE = 20;

// Current state
let currentFilter = 'all';
let currentView = 'grid';
let currentPage = 1;

// DOM elements
const gallery = document.getElementById('gallery');
const loading = document.getElementById('loading');
const pagination = document.getElementById('pagination');
const filterButtons = document.querySelectorAll('.filter-btn');
const categorySelect = document.getElementById('category-select');
const viewButtons = document.querySelectorAll('.view-btn');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalClose = document.getElementById('modalClose');
const downloadBtn = document.getElementById('downloadBtn');
const setBtn = document.getElementById('setBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateFilterCounts();
    // Initialize mobile dropdown
    if (categorySelect) {
        categorySelect.value = currentFilter;
    }
    renderGallery();
    setupEventListeners();
});

// Update filter counts
function updateFilterCounts() {
    filterButtons.forEach(btn => {
        const category = btn.dataset.category;
        let count = 0;
        
        if (category === 'all') {
            count = wallpapers.length;
        } else {
            count = wallpapers.filter(w => w.category === category).length;
        }
        
        const countElement = btn.querySelector('.filter-count');
        if (countElement) {
            countElement.textContent = count;
        }
    });
}

// Render gallery
function renderGallery() {
    gallery.innerHTML = '';
    
    // Show loading
    loading.classList.add('active');
    
    // Filter wallpapers
    const filtered = currentFilter === 'all' 
        ? wallpapers 
        : wallpapers.filter(w => w.category === currentFilter);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        loading.classList.remove('active');
        
        if (filtered.length === 0) {
            gallery.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem; color: var(--text-secondary);">Обои в этой категории не найдены</p>';
            hidePagination();
            return;
        }
        
        const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
        if (currentPage > totalPages) {
            currentPage = Math.max(totalPages, 1);
        }

        const shouldPaginate = filtered.length > ITEMS_PER_PAGE;
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const paginatedWallpapers = shouldPaginate
            ? filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)
            : filtered;

        // Apply view class
        if (currentView === 'list') {
            gallery.classList.add('list-view');
        } else {
            gallery.classList.remove('list-view');
        }
        
        // Render wallpapers
        paginatedWallpapers.forEach(wallpaper => {
            const item = createWallpaperItem(wallpaper);
            gallery.appendChild(item);
        });

        renderPagination(totalPages, filtered.length);
    }, 300);
}

// Create wallpaper item
function createWallpaperItem(wallpaper) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.id = wallpaper.id;
    
    const img = document.createElement('img');
    img.src = wallpaper.url;
    img.alt = wallpaper.title;
    img.loading = 'lazy';
    
    const resolution = document.createElement('div');
    resolution.className = 'gallery-item-resolution';
    resolution.textContent = wallpaper.resolution;
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-item-overlay';
    
    const title = document.createElement('div');
    title.className = 'gallery-item-title';
    title.textContent = wallpaper.title;
    
    const category = document.createElement('div');
    category.className = 'gallery-item-category';
    category.textContent = categoryNames[wallpaper.category];
    
    overlay.appendChild(title);
    overlay.appendChild(category);
    
    item.appendChild(img);
    item.appendChild(resolution);
    item.appendChild(overlay);
    
    // Add click handler
    item.addEventListener('click', () => openModal(wallpaper));
    
    return item;
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update filter
            currentFilter = btn.dataset.category;
            currentPage = 1;
            
            // Sync mobile dropdown
            if (categorySelect) {
                categorySelect.value = currentFilter;
            }
            
            renderGallery();
        });
    });

    // Mobile category dropdown
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            currentFilter = categorySelect.value;
            currentPage = 1;
            
            // Sync desktop buttons
            filterButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === currentFilter);
            });
            
            renderGallery();
        });
    }
    
    // View buttons
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentView = btn.dataset.view;
            renderGallery();
        });
    });
    
    // Modal close
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Download button
    downloadBtn.addEventListener('click', () => {
        const wallpaper = getCurrentModalWallpaper();
        if (wallpaper) {
            downloadWallpaper(wallpaper);
        }
    });
    
    // Set as wallpaper button
    if (setBtn) {
        setBtn.addEventListener('click', () => {
            const wallpaper = getCurrentModalWallpaper();
            if (wallpaper) {
                setAsWallpaper(wallpaper);
            }
        });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Open modal
function openModal(wallpaper) {
    modalImage.src = wallpaper.url;
    modalImage.alt = wallpaper.title;
    modalTitle.textContent = wallpaper.title;
    modalCategory.textContent = `Категория: ${categoryNames[wallpaper.category]} | Разрешение: ${wallpaper.resolution}`;
    modal.dataset.id = wallpaper.id;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Get current modal wallpaper
function getCurrentModalWallpaper() {
    const id = parseInt(modal.dataset.id);
    return wallpapers.find(w => w.id === id);
}

// Download wallpaper
function downloadWallpaper(wallpaper) {
    const link = document.createElement('a');
    link.href = wallpaper.url;
    link.download = `${wallpaper.title.replace(/\s+/g, '_')}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show feedback
    showNotification('Обои загружаются...');
}

// Set as wallpaper (desktop functionality)
function setAsWallpaper(wallpaper) {
    // For web browsers, we can only download
    // For actual wallpaper setting, you'd need a desktop app
    downloadWallpaper(wallpaper);
    showNotification('Используйте скачанное изображение для установки обоев');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--surface);
        border: 1px solid var(--primary);
        color: var(--primary);
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Pagination helpers
function renderPagination(totalPages, totalItems) {
    if (!pagination) return;

    if (totalItems <= ITEMS_PER_PAGE || totalPages <= 1) {
        hidePagination();
        return;
    }

    pagination.classList.remove('pagination-hidden');
    pagination.innerHTML = '';

    const info = document.createElement('div');
    info.className = 'pagination-info';
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
    info.textContent = `Показано ${start}–${end} из ${totalItems}`;
    pagination.appendChild(info);

    const controls = document.createElement('div');
    controls.className = 'pagination-controls';

    controls.appendChild(createNavButton('Назад', currentPage === 1, () => changePage(currentPage - 1, totalPages)));

    getPageNumbers(totalPages).forEach(page => {
        if (page === 'ellipsis') {
            const span = document.createElement('span');
            span.className = 'pagination-ellipsis';
            span.textContent = '...';
            controls.appendChild(span);
        } else {
            const button = document.createElement('button');
            button.className = 'pagination-btn';
            button.textContent = page;
            if (page === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => changePage(page, totalPages));
            controls.appendChild(button);
        }
    });

    controls.appendChild(createNavButton('Вперёд', currentPage === totalPages, () => changePage(currentPage + 1, totalPages)));

    pagination.appendChild(controls);
}

function hidePagination() {
    if (!pagination) return;
    pagination.classList.add('pagination-hidden');
    pagination.innerHTML = '';
}

function createNavButton(label, disabled, handler) {
    const button = document.createElement('button');
    button.className = 'pagination-btn';
    button.textContent = label;
    button.disabled = disabled;
    if (!disabled) {
        button.addEventListener('click', handler);
    }
    return button;
}

function changePage(page, totalPages) {
    if (page === currentPage || page < 1 || page > totalPages) return;
    currentPage = page;
    renderGallery();
    scrollToGalleryStart();
}

function getPageNumbers(totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
        start = 2;
        end = 4;
    } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
    }

    if (start > 2) {
        pages.push('ellipsis');
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }

    if (end < totalPages - 1) {
        pages.push('ellipsis');
    }

    pages.push(totalPages);
    return pages;
}

function scrollToGalleryStart() {
    if (!gallery) return;
    gallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

