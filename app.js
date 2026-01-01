/* ========================================
   SPICE FINDER - MAIN APPLICATION
   Mobile-first PWA for tracking spices
   ======================================== */

// ========== FIREBASE CONFIGURATION ==========
// IMPORTANT: Replace this with your actual Firebase configuration
// Get this from Firebase Console > Project Settings > Your apps > Firebase SDK snippet
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAzuPfcA0Lz6qGJ9_QG-WxcdCm6xgJ4qM",
  authDomain: "spice-finder.firebaseapp.com",
  databaseURL: "https://spice-finder-default-rtdb.firebaseio.com",
  projectId: "spice-finder",
  storageBucket: "spice-finder.firebasestorage.app",
  messagingSenderId: "852857163920",
  appId: "1:852857163920:web:8cdddffd8e50bff0658815"
};

// Initialize Firebase
let database;
let spicesRef;

try {
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    spicesRef = database.ref('spices');
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase:', error);
    alert('Error connecting to database. Please check your Firebase configuration.');
}

// ========== STATE MANAGEMENT ==========
let allSpices = [];
let filteredSpices = [];
let currentFilter = 'all';
let searchQuery = '';
let editingSpiceId = null;
let deferredPrompt = null;

// ========== DOM ELEMENTS ==========
const elements = {
    // Search
    searchInput: document.getElementById('searchInput'),
    clearSearch: document.getElementById('clearSearch'),

    // Filters
    filterBtns: document.querySelectorAll('.filter-btn'),
    refillFilterBtn: document.getElementById('refillFilterBtn'),

    // Spices display
    spicesContainer: document.getElementById('spicesContainer'),
    spiceCount: document.getElementById('spiceCount'),

    // Add button
    addSpiceBtn: document.getElementById('addSpiceBtn'),

    // Modal
    spiceModal: document.getElementById('spiceModal'),
    modalTitle: document.getElementById('modalTitle'),
    spiceForm: document.getElementById('spiceForm'),
    spiceId: document.getElementById('spiceId'),
    spiceName: document.getElementById('spiceName'),
    spiceLocation: document.getElementById('spiceLocation'),
    spiceNotes: document.getElementById('spiceNotes'),
    spiceRefill: document.getElementById('spiceRefill'),
    saveBtn: document.getElementById('saveBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    deleteBtn: document.getElementById('deleteBtn'),
    closeModal: document.querySelector('.close-modal'),

    // Delete confirmation
    deleteModal: document.getElementById('deleteModal'),
    deleteSpiceName: document.getElementById('deleteSpiceName'),
    confirmDeleteBtn: document.getElementById('confirmDeleteBtn'),
    cancelDeleteBtn: document.getElementById('cancelDeleteBtn'),

    // Install prompt
    installPrompt: document.getElementById('installPrompt'),
    installBtn: document.getElementById('installBtn'),
    dismissInstall: document.getElementById('dismissInstall')
};

// ========== FIREBASE DATA LISTENERS ==========

// Listen for changes to spices data
spicesRef.on('value', (snapshot) => {
    const data = snapshot.val();
    allSpices = [];

    if (data) {
        // Convert Firebase object to array
        Object.keys(data).forEach(key => {
            allSpices.push({
                id: key,
                ...data[key]
            });
        });

        // Sort alphabetically by name
        allSpices.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    }

    // Apply current filters and search
    applyFiltersAndSearch();
});

// ========== SEARCH FUNCTIONALITY ==========

elements.searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();

    // Show/hide clear button
    elements.clearSearch.style.display = searchQuery ? 'flex' : 'none';

    applyFiltersAndSearch();
});

elements.clearSearch.addEventListener('click', () => {
    elements.searchInput.value = '';
    searchQuery = '';
    elements.clearSearch.style.display = 'none';
    applyFiltersAndSearch();
    elements.searchInput.focus();
});

// ========== FILTER FUNCTIONALITY ==========

elements.filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        elements.filterBtns.forEach(b => b.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');

        // Update current filter
        currentFilter = btn.dataset.filter;

        // Apply filters
        applyFiltersAndSearch();
    });
});

// ========== APPLY FILTERS AND SEARCH ==========

function applyFiltersAndSearch() {
    filteredSpices = allSpices.filter(spice => {
        // Apply search filter
        const matchesSearch = searchQuery === '' ||
            spice.name.toLowerCase().includes(searchQuery);

        // Apply location/refill filter
        let matchesFilter = true;
        if (currentFilter === 'Island' || currentFilter === 'Stove') {
            matchesFilter = spice.location === currentFilter;
        } else if (currentFilter === 'refill') {
            matchesFilter = spice.refill === true;
        }

        return matchesSearch && matchesFilter;
    });

    renderSpices();
}

// ========== RENDER SPICES ==========

function renderSpices() {
    const container = elements.spicesContainer;

    // Update count
    const totalCount = allSpices.length;
    const filteredCount = filteredSpices.length;
    const countText = filteredCount === totalCount
        ? `${totalCount} spices`
        : `${filteredCount} of ${totalCount} spices`;
    elements.spiceCount.textContent = countText;

    // Clear container
    container.innerHTML = '';

    // Show message if no spices
    if (filteredSpices.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';

        if (allSpices.length === 0) {
            noResults.innerHTML = `
                <h3>No spices yet!</h3>
                <p>Click "Add New Spice" to get started.</p>
            `;
        } else {
            noResults.innerHTML = `
                <h3>No spices found</h3>
                <p>Try a different search or filter.</p>
            `;
        }

        container.appendChild(noResults);
        return;
    }

    // Render each spice card
    filteredSpices.forEach(spice => {
        const card = createSpiceCard(spice);
        container.appendChild(card);
    });
}

// ========== CREATE SPICE CARD ==========

function createSpiceCard(spice) {
    const card = document.createElement('div');
    card.className = 'spice-card';
    card.dataset.id = spice.id;

    // Location badge
    const locationClass = spice.location.toLowerCase();
    const locationBadge = `<div class="location-badge ${locationClass}">${spice.location}</div>`;

    // Refill badge (if needed)
    const refillBadge = spice.refill
        ? '<span class="refill-badge">Needs Refill</span>'
        : '';

    // Notes (if present)
    const notesHTML = spice.notes
        ? `<div class="spice-notes">Notes: ${escapeHtml(spice.notes)}</div>`
        : '';

    card.innerHTML = `
        ${locationBadge}
        <div class="spice-card-header">
            <div class="spice-name">${escapeHtml(spice.name)}</div>
            ${refillBadge}
        </div>
        ${notesHTML}
    `;

    // Click to edit
    card.addEventListener('click', () => {
        openEditModal(spice);
    });

    return card;
}

// ========== MODAL FUNCTIONS ==========

// Open modal to add new spice
elements.addSpiceBtn.addEventListener('click', () => {
    openAddModal();
});

function openAddModal() {
    editingSpiceId = null;
    elements.modalTitle.textContent = 'Add New Spice';
    elements.spiceForm.reset();
    elements.deleteBtn.style.display = 'none';
    showModal(elements.spiceModal);
    elements.spiceName.focus();
}

// Open modal to edit existing spice
function openEditModal(spice) {
    editingSpiceId = spice.id;
    elements.modalTitle.textContent = 'Edit Spice';

    // Populate form
    elements.spiceId.value = spice.id;
    elements.spiceName.value = spice.name;
    elements.spiceLocation.value = spice.location;
    elements.spiceNotes.value = spice.notes || '';
    elements.spiceRefill.checked = spice.refill || false;

    elements.deleteBtn.style.display = 'block';
    showModal(elements.spiceModal);
    elements.spiceName.focus();
}

function showModal(modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal handlers
elements.closeModal.addEventListener('click', () => {
    hideModal(elements.spiceModal);
});

elements.cancelBtn.addEventListener('click', () => {
    hideModal(elements.spiceModal);
});

// Click outside modal to close
elements.spiceModal.addEventListener('click', (e) => {
    if (e.target === elements.spiceModal) {
        hideModal(elements.spiceModal);
    }
});

elements.deleteModal.addEventListener('click', (e) => {
    if (e.target === elements.deleteModal) {
        hideModal(elements.deleteModal);
    }
});

// ========== SAVE SPICE (ADD/EDIT) ==========

elements.spiceForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const spiceData = {
        name: elements.spiceName.value.trim(),
        location: elements.spiceLocation.value,
        notes: elements.spiceNotes.value.trim(),
        refill: elements.spiceRefill.checked
    };

    // Validate
    if (!spiceData.name || !spiceData.location) {
        alert('Please fill in all required fields');
        return;
    }

    // Disable save button during operation
    elements.saveBtn.disabled = true;
    elements.saveBtn.textContent = 'Saving...';

    try {
        if (editingSpiceId) {
            // Update existing spice
            await spicesRef.child(editingSpiceId).update(spiceData);
        } else {
            // Add new spice
            await spicesRef.push(spiceData);
        }

        hideModal(elements.spiceModal);
        elements.spiceForm.reset();
    } catch (error) {
        console.error('Error saving spice:', error);
        alert('Error saving spice. Please try again.');
    } finally {
        elements.saveBtn.disabled = false;
        elements.saveBtn.textContent = 'Save';
    }
});

// ========== DELETE SPICE ==========

elements.deleteBtn.addEventListener('click', () => {
    const spiceName = elements.spiceName.value;
    elements.deleteSpiceName.textContent = spiceName;
    hideModal(elements.spiceModal);
    showModal(elements.deleteModal);
});

elements.cancelDeleteBtn.addEventListener('click', () => {
    hideModal(elements.deleteModal);
    showModal(elements.spiceModal);
});

elements.confirmDeleteBtn.addEventListener('click', async () => {
    if (!editingSpiceId) return;

    elements.confirmDeleteBtn.disabled = true;
    elements.confirmDeleteBtn.textContent = 'Deleting...';

    try {
        await spicesRef.child(editingSpiceId).remove();
        hideModal(elements.deleteModal);
        editingSpiceId = null;
    } catch (error) {
        console.error('Error deleting spice:', error);
        alert('Error deleting spice. Please try again.');
    } finally {
        elements.confirmDeleteBtn.disabled = false;
        elements.confirmDeleteBtn.textContent = 'Delete';
    }
});

// ========== PWA INSTALL PROMPT ==========

// Capture the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default prompt
    e.preventDefault();

    // Save the event for later use
    deferredPrompt = e;

    // Show custom install prompt
    elements.installPrompt.style.display = 'block';
});

// Handle install button click
elements.installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for user response
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User response: ${outcome}`);

    // Clear the prompt
    deferredPrompt = null;
    elements.installPrompt.style.display = 'none';
});

// Handle dismiss button
elements.dismissInstall.addEventListener('click', () => {
    elements.installPrompt.style.display = 'none';
    // Don't clear deferredPrompt in case user changes mind
});

// Detect if app is already installed
window.addEventListener('appinstalled', () => {
    console.log('PWA installed successfully');
    elements.installPrompt.style.display = 'none';
    deferredPrompt = null;
});

// ========== SERVICE WORKER REGISTRATION ==========

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// ========== UTILITY FUNCTIONS ==========

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========== KEYBOARD SHORTCUTS ==========

document.addEventListener('keydown', (e) => {
    // ESC key to close modals
    if (e.key === 'Escape') {
        if (elements.spiceModal.classList.contains('show')) {
            hideModal(elements.spiceModal);
        }
        if (elements.deleteModal.classList.contains('show')) {
            hideModal(elements.deleteModal);
        }
    }

    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        elements.searchInput.focus();
        elements.searchInput.select();
    }

    // Ctrl/Cmd + N to add new spice
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openAddModal();
    }
});

// ========== INITIALIZATION ==========

console.log('Spice Finder PWA initialized');
console.log('Press Ctrl+K to search, Ctrl+N to add new spice');

// Show initial loading state
elements.spicesContainer.innerHTML = '<div class="loading">Loading spices...</div>';
