function initOptionsCreator(config) {
    const saveButtons = document.querySelectorAll(`.optionscreator-save[data-uuid="${config.uuid}"]`);
    const forms = document.querySelectorAll(`.optionscreator-form[data-uuid="${config.uuid}"]`);

    for (const saveButton of saveButtons) {
        saveButton.onclick = (e) => {
            e.preventDefault();
            saveButtonOnClick(e.target);
        };
    }

    for (const form of forms) {
        form.onsubmit = (e) => {
            e.preventDefault();
        };
    }

    function saveButtonOnClick(button) {
        const uuid = config.uuid

        button.dispatchEvent(new Event('optionscreator.on.saveButtonClick'));

        clearMessages();

        runLoading(button);

        setTimeout(() => {
            Promise.resolve(storeCall(uuid))
                .then((response) => {
                    responseCallback(response, uuid)
                })
                .catch((e) => {
                    errorCallback(e, uuid)
                })
                .finally(() => {stopLoading(button)});
        }, 1000);

    }

    function storeCall(uuid) {
        const section = document.querySelector(`.optionscreator[data-uuid="${uuid}"]`);

        if(section === null)
            return Promise.reject(`Options Creator section with UUID: ${uuid} not found!`);

        const url = section.getAttribute('data-url');

        if(url === null)
            return Promise.reject(`URL for UUID: ${uuid} cannot be empty`);

        const form = document.querySelector(`.optionscreator-form[data-uuid="${uuid}"]`);

        if(form === null)
            return Promise.reject(`Form for UUID: ${uuid} not found`);

        const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');

        let isAnyError = false;

        for(let input of inputs) {
            let parent = input.closest('.bootstrap-select');

            if(input.value === '') {
                input.classList.add('is-invalid');

                if(parent !== null)
                    parent.classList.add('is-invalid');
            }
            else {
                input.classList.remove('is-invalid');

                if(parent !== null)
                    parent.classList.remove('is-invalid');
                isAnyError = true;
            }
        }

        if(isAnyError) {
            return Promise.reject(`Complete the form ${uuid} correctly!`)
        }
        else {
            return axios.post(url, new FormData(form));
        }
    }

    function responseCallback(response) {
        let jsonData = response.data;

        let input = document.querySelector(`.optionscreator[data-uuid="${config.uuid}"] .optionscreator-input-section select`);

        let newOption = document.createElement("option");
        newOption.text = jsonData[config.successTextKey];
        newOption.value = jsonData[config.successValueKey];

        input.dispatchEvent(new Event('optionscreator.before.success'));

        input.appendChild(newOption);
        input.value = newOption.value;

        input.dispatchEvent(new Event('optionscreator.after.success'));

        let modal = document.getElementById(`optionscreator_modal_${config.uuid}`);
        $(modal).modal('hide');

        showSuccessMessage(config.successText);

    }

    function errorCallback(e, ) {
        document.dispatchEvent(new Event('optionscreator.before.error'));
        console.error(e);
        showErrorMessage(config.errorText)
        document.dispatchEvent(new Event('optionscreator.after.error'));
    }

    function runLoading(button) {
        document.dispatchEvent(new Event('optionscreator.before.runLoading'));
        button.setAttribute('disabled', true);
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ' + config.loadingText;
        document.dispatchEvent(new Event('optionscreator.after.runLoading'));
    }

    function stopLoading(button) {
        document.dispatchEvent(new Event('optionscreator.before.stopLoading'));
        button.removeAttribute('disabled');
        button.innerHTML = '<i class="fas fa-save"></i> ' + config.saveButtonTitle;
        document.dispatchEvent(new Event('optionscreator.after.stopLoading'));
    }

    function clearMessages() {
        hideSuccessMessage();
        hideErrorMessage();
    }

    function showSuccessMessage(message = '') {
        const element = document.querySelector(`.optionscreator-success[data-uuid="${config.uuid}"]`);
        element.classList.remove('d-none');
        element.innerHTML = message;
    }

    function hideSuccessMessage() {
        const element = document.querySelector(`.optionscreator-success[data-uuid="${config.uuid}"]`);
        element.classList.add('d-none');
    }

    function showErrorMessage(message = '') {
        const element = document.querySelector(`.optionscreator-danger[data-uuid="${config.uuid}"]`);
        element.classList.remove('d-none');
        element.innerHTML = message;
    }

    function hideErrorMessage() {
        const element = document.querySelector(`.optionscreator-danger[data-uuid="${config.uuid}"]`);
        element.classList.add('d-none');
    }
}
