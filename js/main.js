function openAddContactModal() {

    Swal.fire({

        title: 'Add New Contact',

        width: '500px',
        padding: '0',

        showCloseButton: true,
        showCancelButton: true,
        reverseButtons: true,

        confirmButtonText:
            '<i class="fa-solid fa-check me-2"></i>Save Contact',

        cancelButtonText:
            'Cancel',

        buttonsStyling: false,

        focusConfirm: false,

        /* لون طبقة الخلفية من نظام الألوان الخاص بك */
        backdrop: 'var(--color-surface-overlay)',


        customClass: {
            popup: 'contact-swal-popup bg-card rounded-4 shadow-modal border-0 overflow-hidden text-start',
            title: 'text-black fs-5 fw-bold text-start m-0 w-100 px-4 py-3 border-bottom border-subtle',
            closeButton: 'text-muted shadow-none me-2 mt-2',
            htmlContainer: 'm-0 p-4 text-start',
            actions: 'd-flex w-100 gap-3 px-4 pb-4 pt-0 m-0',
            confirmButton:
                'btn grad-brand-btn text-inverse border-0 rounded-3 py-2 flex-grow-1 fw-semibold shadow-glow-brand d-flex justify-content-center align-items-center',
            cancelButton:
                'btn bg-input text-secondary border-0 rounded-3 py-2 flex-grow-1 fw-semibold'
        },


        html: `

            <!-- =========================================
                 Avatar
            ========================================== -->
            <div
                class="d-flex flex-column align-items-center mb-4">

                <div
                    id="avatarPreview"
                    class="rounded-circle grad-avatar-1 d-flex justify-content-center align-items-center shadow-subtle mb-3 overflow-hidden w-20 h-20">

                    <i class="fa-solid fa-user text-inverse fs-1"></i>

                </div>


                <label
                    class="btn btn-sm bg-input border-subtle text-secondary shadow-subtle rounded-3 px-3 py-2 d-flex align-items-center gap-2">

                    <i class="fa-solid fa-camera"></i>

                    <span>
                        Change Photo
                    </span>

                    <input
                        type="file"
                        id="avatarInput"
                        class="d-none"
                        accept="image/*">

                </label>


                <input
                    type="hidden"
                    id="avatarPath"
                    value="">

            </div>


            <!-- =========================================
                 Form Fields
            ========================================== -->
            <div class="row g-3">


                <!-- Name -->
                <div class="col-12">

                    <label
                        class="form-label text-secondary small fw-semibold mb-1">

                        Full Name
                        <span class="text-emergency">*</span>

                    </label>


                    <input
                        type="text"
                        id="contactName"
                        class="form-control bg-input border-input py-2 text-black shadow-none"
                        placeholder="Enter full name">


                    <p
                        id="contactNameError"
                        class="d-none text-emergency small mt-1 mb-0">

                        Name should contain only letters and spaces
                        (2-50 characters)

                    </p>

                </div>


                <!-- Phone -->
                <div class="col-12">

                    <label
                        class="form-label text-secondary small fw-semibold mb-1">

                        Phone Number
                        <span class="text-emergency">*</span>

                    </label>


                    <input
                        type="text"
                        id="contactPhone"
                        class="form-control bg-input border-input py-2 text-black shadow-none"
                        placeholder="e.g., 01012345678">


                    <p
                        id="contactPhoneError"
                        class="d-none text-emergency small mt-1 mb-0">

                        Please enter a valid Egyptian phone number

                    </p>

                </div>


                <!-- Email -->
                <div class="col-12">

                    <label
                        class="form-label text-secondary small fw-semibold mb-1">

                        Email Address

                    </label>


                    <input
                        type="email"
                        id="contactEmail"
                        class="form-control bg-input border-input py-2 text-black shadow-none"
                        placeholder="name@example.com">


                    <p
                        id="contactEmailError"
                        class="d-none text-emergency small mt-1 mb-0">

                        Please enter a valid email address

                    </p>

                </div>


                <!-- Address -->
                <div class="col-12">

                    <label
                        class="form-label text-secondary small fw-semibold mb-1">

                        Address

                    </label>


                    <input
                        type="text"
                        id="contactAddress"
                        class="form-control bg-input border-input py-2 text-black shadow-none"
                        placeholder="Enter address">

                </div>


                <!-- Group -->
                <div class="col-12">

                    <label
                        class="form-label text-secondary small fw-semibold mb-1">

                        Group

                    </label>


                    <select
                        id="contactGroup"
                        class="form-select bg-input border-input py-2 text-black shadow-none">

                        <option value="" disabled selected>
                            Select a group
                        </option>

                        <option value="family">
                            Family
                        </option>

                        <option value="friends">
                            Friends
                        </option>

                        <option value="work">
                            Work
                        </option>

                        <option value="school">
                            School
                        </option>

                        <option value="other">
                            Other
                        </option>

                    </select>

                </div>


                <!-- Notes -->
                <div class="col-12">

                    <label
                        class="form-label text-secondary small fw-semibold mb-1">

                        Notes

                    </label>


                    <textarea
                        id="contactNotes"
                        class="form-control bg-input border-input py-2 text-black shadow-none resize-none"
                        rows="2"
                        placeholder="Add notes about this contact"></textarea>

                </div>


            </div>


            <!-- =========================================
                 Checkboxes
            ========================================== -->
            <div
                class="d-flex flex-wrap gap-4 mt-4 mb-2 px-1">


                <!-- Favorite -->
                <div
                    class="form-check d-flex align-items-center gap-2 m-0 p-0">

                    <input
                        class="form-check-input border-input m-0 shadow-none"
                        type="checkbox"
                        id="contactFavorite">


                    <label
                        class="form-check-label text-secondary small fw-medium d-flex align-items-center gap-1"
                        for="contactFavorite">

                        <i class="fa-solid fa-star text-favorite"></i>

                        Favorite

                    </label>

                </div>


                <!-- Emergency -->
                <div
                    class="form-check d-flex align-items-center gap-2 m-0 p-0">

                    <input
                        class="form-check-input border-input m-0 shadow-none"
                        type="checkbox"
                        id="contactEmergency">


                    <label
                        class="form-check-label text-secondary small fw-medium d-flex align-items-center gap-1"
                        for="contactEmergency">

                        <i class="fa-solid fa-heart-pulse text-emergency-icon"></i>

                        Emergency

                    </label>

                </div>


            </div>


            <input
                type="hidden"
                id="contactId"
                value="">

        `,


        /* =========================================
           After Modal Opens
        ========================================== */
        didOpen: () => {
            const popup = Swal.getPopup();
            if (!popup) {return;}
            /* Background Blur */
            const container = Swal.getContainer();
            if (container) {container.classList.add('swal-backdrop-blur');}
            /* Avatar Preview */
            const avatarInput = popup.querySelector('#avatarInput');
            const avatarPreview = popup.querySelector('#avatarPreview');
            if (avatarInput && avatarPreview) {
                avatarInput.addEventListener('change',
                    function () {
                        const file = this.files[0]; 
                        if (!file) {return;}
                        const reader = new FileReader();
                        reader.onload =
                            function (event) {
                                avatarPreview.innerHTML = `
                                    <img
                                        src="${event.target.result}"
                                        alt="Avatar"
                                        class="w-100 h-100 object-fit-cover">

                                `;

                            };
                        reader.readAsDataURL(file);
                    }
                );

            }

        },


        /* =========================================
           Before Confirm
        ========================================== */
        preConfirm: () => {

            const popup = Swal.getPopup();

            if (!popup) {
                return false;
            }


            const name =
                popup.querySelector('#contactName')
                    .value
                    .trim();


            const phone =
                popup.querySelector('#contactPhone')
                    .value
                    .trim();


            const email =
                popup.querySelector('#contactEmail')
                    .value
                    .trim();


            const address =
                popup.querySelector('#contactAddress')
                    .value
                    .trim();


            const group =
                popup.querySelector('#contactGroup')
                    .value;


            const notes =
                popup.querySelector('#contactNotes')
                    .value
                    .trim();


            const isFavorite =
                popup.querySelector('#contactFavorite')
                    .checked;


            const isEmergency =
                popup.querySelector('#contactEmergency')
                    .checked;


            /* Required Fields */

            if (!name || !phone) {

                Swal.showValidationMessage(
                    'Please fill in the required fields (Name & Phone)'
                );

                return false;

            }


            return {

                name,
                phone,
                email,
                address,
                group,
                notes,
                isFavorite,
                isEmergency

            };

        }

    }).then((result) => {

        if (result.isConfirmed) {

            console.log(
                'Saved Data:',
                result.value
            );

            // saveContact(result.value);

        }

    });

}