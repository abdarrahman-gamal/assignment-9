let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

function saveContacts() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// نافذة المودال
function openAddContactModal() {
    const modalElement = document.getElementById('contactModal');
    const form = document.getElementById('contactForm');
    const modalTitle = document.getElementById('contactModalLabel');
    const avatarPreview = document.getElementById('avatarPreview');

    form.reset();
    document.getElementById('contactId').value = '';
    avatarPreview.innerHTML = '';
    if (modalTitle) modalTitle.textContent = 'Add Contact';

    modalElement.classList.remove('d-none');
    modalElement.classList.add('d-flex');
}

function closeAddContactModal() {
    const modalElement = document.getElementById('contactModal');
    modalElement.classList.remove('d-flex');
    modalElement.classList.add('d-none');
}

document.getElementById('closeModalBtn')?.addEventListener('click', closeAddContactModal);
document.getElementById('cancelModalBtn')?.addEventListener('click', closeAddContactModal);

// التنبيهات
function fail(missing) {
    Swal.fire({
        title: `Missing ${missing}`,
        text: `Please enter a valid ${missing} for the contact!`,
        icon: 'error'
    });
}

// معاينة الصورة
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');

avatarInput?.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        avatarPreview.innerHTML = `<img src="${event.target.result}" alt="Avatar" class="w-100 h-100 object-fit-cover">`;
    };
    reader.readAsDataURL(file);
});

function getAvatarHtml(contact, sizeClass) {
    if (contact.avatar) {
        return `<img src="${contact.avatar}" alt="${contact.name}" class="${sizeClass} rounded-3 object-fit-cover">`;
    }
    const colorNum = (contact.id % 8) + 1;
    return `
        <div class="${sizeClass} rounded-3 grad-avatar-${colorNum} d-flex align-items-center justify-content-center text-inverse small fw-semibold">
            ${(contact.name || '').charAt(0).toUpperCase()}
        </div>
    `;
}

// حفظ النموذج
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const contactId = document.getElementById('contactId').value;
    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const address = document.getElementById('contactAddress').value.trim();
    const group = document.getElementById('contactGroup').value;
    const notes = document.getElementById('contactNotes').value.trim();
    const isFavorite = document.getElementById('contactFavorite').checked;
    const isEmergency = document.getElementById('contactEmergency').checked;

    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]{2,50}$/;
    const phoneClean = phone.replace(/[\s-]/g, '');
    const phoneRegex = /^(01[0125]\d{8}|(?:\+20|0020)1[0125]\d{8})$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !nameRegex.test(name)) return fail('Name');
    if (!phone || !phoneRegex.test(phoneClean)) return fail('Phone');
    if (email && !emailRegex.test(email)) return fail('Email');
    if (address && (address.length < 2 || address.length > 100)) return fail('Address');
    if (!group) return fail('Group');
    if (notes.length > 500) return fail('Notes');

    const contactData = {
        name,
        phone: phoneClean,
        email,
        address,
        group,
        notes,
        isFavorite,
        isEmergency,
        avatar: avatarPreview.querySelector('img')?.src || ''
    };

    if (contactId) {
        const id = Number(contactId);
        const index = contacts.findIndex(c => c.id === id);
        if (index > -1) contacts[index] = { ...contactData, id };
    } else {
        contacts.push({ ...contactData, id: Date.now() });
    }

    saveContacts();
    renderContacts();
    closeAddContactModal();
});

// بناء الواجهة
function renderContacts() {
    const favorites = contacts.filter(c => c.isFavorite);
    const emergencies = contacts.filter(c => c.isEmergency);
    const searchValue = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();

    const filteredContacts = contacts.filter(c => {
        const nameMatch = (c.name || '').toLowerCase().includes(searchValue);
        const phoneMatch = String(c.phone || '').includes(searchValue);
        const emailMatch = (c.email || '').toLowerCase().includes(searchValue);
        return nameMatch || phoneMatch || emailMatch;
    });

    // القائمة الجانبية: المفضلة
    document.getElementById('favoritesList').innerHTML = favorites.map(contact => `
        <div class="sidebar-contact-item sidebar-favorite-item d-flex align-items-center gap-3 p-2 bg-card-muted rounded-3 mb-2">
            <div class="flex-shrink-0">${getAvatarHtml(contact, 'w-10 h-10')}</div>
            <div class="flex-grow-1 min-w-0">
                <h4 class="fw-medium text-primary small text-truncate mb-0">${contact.name}</h4>
                <p class="text-muted fs-12 text-truncate mb-0">${contact.phone}</p>
            </div>
            <a href="tel:${contact.phone}" class="sidebar-contact-call sidebar-favorite-call flex-shrink-0 w-8 h-8 bg-call text-call rounded-3 d-flex align-items-center justify-content-center" title="Call">
                <i class="fa-solid fa-phone fs-10"></i>
            </a>
        </div>
    `).join('');

    // القائمة الجانبية: الطوارئ
    document.getElementById('emergencyList').innerHTML = emergencies.map(contact => `
        <div class="sidebar-contact-item sidebar-emergency-item d-flex align-items-center gap-3 p-2 bg-card-muted rounded-3 mb-2">
            <div class="flex-shrink-0">${getAvatarHtml(contact, 'w-10 h-10')}</div>
            <div class="flex-grow-1 min-w-0">
                <h4 class="fw-medium text-primary small text-truncate mb-0">${contact.name}</h4>
                <p class="text-muted fs-12 text-truncate mb-0">${contact.phone}</p>
            </div>
            <a href="tel:${contact.phone}" class="sidebar-contact-call sidebar-emergency-call flex-shrink-0 w-8 h-8 bg-emergency text-emergency-icon rounded-3 d-flex align-items-center justify-content-center" title="Call">
                <i class="fa-solid fa-phone fs-10"></i>
            </a>
        </div>
    `).join('');

    // العدادات
    document.getElementById('totalCount').textContent = contacts.length;
    document.getElementById('favoriteCount').textContent = favorites.length;
    document.getElementById('emergencyCount').textContent = emergencies.length;
    document.getElementById('contactsCountText').textContent = `Manage and organize your ${contacts.length} contacts`;

    // قائمة المجموعات المدعومة في CSS
    const validGroups = [
        'family', 'friends', 'work', 'colleagues', 'business',
        'school', 'gym', 'neighbors', 'other',
        'cyan', 'rose', 'lime', 'fuchsia', 'sky', 'violet'
    ];

    document.getElementById('contactsList').innerHTML = filteredContacts.map(contact => {
        const groupName = (contact.group || '').toLowerCase();
        const groupClass = validGroups.includes(groupName) ? `badge-group--${groupName}` : 'badge-group--other';

        // 1. بادج النجمة على الصورة
        const favoriteAvatarBadge = contact.isFavorite
            ? `<div class="position-absolute top-0 start-100 translate-middle bg-favorite-icon w-5 h-5 rounded-circle d-flex align-items-center justify-content-center border border-card" title="Favorite">
                   <i class="fa-solid fa-star text-inverse fs-8"></i>
               </div>`
            : '';

        // 2. بادج القلب على الصورة
        const emergencyAvatarBadge = contact.isEmergency
            ? `<div class="position-absolute top-100 start-100 translate-middle bg-emergency-icon w-5 h-5 rounded-circle d-flex align-items-center justify-content-center border border-card" title="Emergency">
                   <i class="fa-solid fa-heart-pulse text-inverse fs-8"></i>
               </div>`
            : '';

        // 3. بادج شريط المفضلة (باستخدام كلاسات الـ CSS الحقيقية: bg-favorite, text-favorite, border-favorite)
        const favoriteGroupBadge = contact.isFavorite
            ? `<span class="badge-group bg-favorite text-favorite border-favorite">
                   <i class="fa-solid fa-star"></i>
                   Favorite
               </span>`
            : '';

        // 4. بادج شريط الطوارئ (باستخدام badge-group--rose المعرف في الـ CSS)
        const emergencyGroupBadge = contact.isEmergency
            ? `<span class="badge-group badge-group--rose">
                   <i class="fa-solid fa-heart-pulse"></i>
                   Emergency
               </span>`
            : '';

        return `
        <div class="col">
            <div class="bg-card border border-subtle rounded-4 shadow-card-hover overflow-hidden h-100 d-flex flex-column">
                <div class="p-4 pb-3 flex-grow-1">
                    <div class="d-flex align-items-start gap-3">
                        <div class="position-relative flex-shrink-0">
                            ${getAvatarHtml(contact, 'w-14 h-14')}
                            ${favoriteAvatarBadge}
                            ${emergencyAvatarBadge}
                        </div>
                        <div class="flex-grow-1 min-w-0 pt-1">
                            <h3 class="fw-semibold text-primary fs-6 text-truncate mb-0">${contact.name}</h3>
                            <div class="d-flex align-items-center gap-2 mt-1">
                                <div class="w-6 h-6 rounded-2 bg-call d-flex align-items-center justify-content-center flex-shrink-0">
                                    <i class="fa-solid fa-phone text-call fs-9"></i>
                                </div>
                                <span class="text-muted small text-truncate">${contact.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-3 d-flex flex-column gap-2">
                        <div class="d-flex align-items-center gap-2">
                            <div class="w-7 h-7 rounded-3 bg-email d-flex align-items-center justify-content-center flex-shrink-0">
                                <i class="fa-solid fa-envelope text-email fs-10"></i>
                            </div>
                            <span class="text-body small text-truncate">${contact.email || '-'}</span>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <div class="w-7 h-7 rounded-3 bg-address d-flex align-items-center justify-content-center flex-shrink-0">
                                <i class="fa-solid fa-location-dot text-address fs-10"></i>
                            </div>
                            <span class="text-body small text-truncate">${contact.address || '-'}</span>
                        </div>
                    </div>

                    <!-- شريط المجموعات والمفضلة والطوارئ -->
                    <div class="d-flex flex-wrap gap-1 mt-3">
                        <span class="badge-group ${groupClass}">${contact.group}</span>
                        ${favoriteGroupBadge}
                        ${emergencyGroupBadge}
                    </div>
                </div>

                <div class="border-top border-subtle bg-card-muted px-4 py-2 mt-auto d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center gap-1">
                        <a href="tel:${contact.phone}" class="w-9 h-9 bg-call text-call rounded-3 d-flex align-items-center justify-content-center" title="Call">
                            <i class="fa-solid fa-phone fs-10"></i>
                        </a>
                        <button type="button" onclick="emailContact('${contact.email}')" class="w-9 h-9 bg-email text-email rounded-3 d-flex align-items-center justify-content-center p-0 border-0" title="Email">
                            <i class="fa-solid fa-envelope fs-10"></i>
                        </button>
                    </div>

                    <div class="d-flex align-items-center gap-1">
                        <button type="button" onclick="toggleFavorite(${contact.id})" class="btn w-9 h-9 ${contact.isFavorite ? 'bg-favorite text-favorite border-favorite border' : 'bg-input text-muted'} rounded-3 d-flex align-items-center justify-content-center p-0" title="Favorite">
                            <i class="${contact.isFavorite ? 'fa-solid' : 'fa-regular'} fa-star"></i>
                        </button>
                        <button type="button" onclick="toggleEmergency(${contact.id})" class="btn w-9 h-9 ${contact.isEmergency ? 'bg-emergency text-emergency-icon border-emergency border' : 'bg-input text-muted'} rounded-3 d-flex align-items-center justify-content-center p-0" title="Emergency">
                            <i class="${contact.isEmergency ? 'fa-solid fa-heart-pulse' : 'fa-regular fa-heart'}"></i>
                        </button>
                        <button type="button" onclick="editContact(${contact.id})" class="w-9 h-9 bg-input text-muted rounded-3 border-0 d-flex align-items-center justify-content-center p-0" title="Edit">
                            <i class="fa-solid fa-pen fs-10"></i>
                        </button>
                        <button type="button" onclick="deleteContact(${contact.id})" class="w-9 h-9 bg-input text-muted rounded-3 border-0 d-flex align-items-center justify-content-center p-0" title="Delete">
                            <i class="fa-solid fa-trash fs-10"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// الدوال المربوطة بالـ HTML
function toggleContactProperty(id, key) {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;
    contact[key] = !contact[key];
    saveContacts();
    renderContacts();
}

function toggleFavorite(id) {
    toggleContactProperty(id, 'isFavorite');
}

function toggleEmergency(id) {
    toggleContactProperty(id, 'isEmergency');
}

function deleteContact(id) {
    contacts = contacts.filter(c => c.id !== id);
    saveContacts();
    renderContacts();
}

function editContact(id) {
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    document.getElementById('contactId').value = contact.id;
    document.getElementById('contactName').value = contact.name || '';
    document.getElementById('contactPhone').value = contact.phone || '';
    document.getElementById('contactEmail').value = contact.email || '';
    document.getElementById('contactAddress').value = contact.address || '';
    document.getElementById('contactGroup').value = contact.group || '';
    document.getElementById('contactNotes').value = contact.notes || '';
    document.getElementById('contactFavorite').checked = Boolean(contact.isFavorite);
    document.getElementById('contactEmergency').checked = Boolean(contact.isEmergency);

    const modalTitle = document.getElementById('contactModalLabel');
    if (modalTitle) modalTitle.textContent = 'Edit Contact';

    avatarPreview.innerHTML = contact.avatar
        ? `<img src="${contact.avatar}" alt="Avatar" class="w-100 h-100 object-fit-cover">`
        : '';

    const modalElement = document.getElementById('contactModal');
    modalElement.classList.remove('d-none');
    modalElement.classList.add('d-flex');
}

function emailContact(email) {
    if (!email) {
        Swal.fire({
            title: 'No Email',
            text: 'This contact does not have an email address.',
            icon: 'info'
        });
        return;
    }
    window.location.href = `mailto:${email}`;
}

// الربط والتهيئة
document.getElementById('searchInput')?.addEventListener('input', renderContacts);
renderContacts();