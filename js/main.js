/* =========================================================
   Open or close Contact Modal
========================================================= */
function openAddContactModal() {
    const modalElement = document.getElementById('contactModal');
    modalElement.classList.remove('d-none');
    modalElement.classList.add('d-flex');
}

function closeAddContactModal() {
    const modalElement = document.getElementById('contactModal');
    modalElement.classList.remove('d-flex');
    modalElement.classList.add('d-none');
}

// تعديل

document.getElementById('closeModalBtn').addEventListener('click', closeAddContactModal);
document.getElementById('cancelModalBtn').addEventListener('click', closeAddContactModal);


/* =========================================================
   Fail Message
========================================================= */
function fail(missing) {
    Swal.fire({
        title: `Missing ${missing}`,
        text: `Please enter a ${missing} for the contact!`,
        icon: 'error'
    });
}


/* =========================================================
   Avatar Preview
========================================================= */
const avatarInput = document.getElementById('avatarInput');
const avatarPreview = document.getElementById('avatarPreview');

avatarInput.addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        avatarPreview.innerHTML = `
            <img src="${event.target.result}" alt="Avatar" class="w-100 h-100 object-fit-cover">
        `;
    };

    reader.readAsDataURL(file);
});


/* =========================================================
   Contact Form
========================================================= */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (event) {
    // منع الإرسال التقليدي
    event.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const address = document.getElementById('contactAddress').value.trim();
    const group = document.getElementById('contactGroup').value;
    const notes = document.getElementById('contactNotes').value.trim();
    const isFavorite = document.getElementById('contactFavorite').checked;
    const isEmergency = document.getElementById('contactEmergency').checked;

    if (!name) {
        fail('Name');
        return;
    }

    if (!phone) {
        fail('Phone');
        return;
    }

    const contact = {
        name,
        phone,
        email,
        address,
        group,
        notes,
        isFavorite,
        isEmergency
    };

    console.log('Saved Data:', contact);

});