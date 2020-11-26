function initOptionsCreator(config) {
    const saveButtons = document.querySelectorAll(`.optionscreator-save[data-uuid="${config.uuid}"]`);
    const forms = document.querySelectorAll(`.optionscreator-form[data-uuid="${config.uuid}"]`);

    for (const saveButton of saveButtons) {
        saveButton.onclick = saveButtonOnClick;
    }

    for (const form of forms) {
        form.onsubmit = (e) => {
            e.preventDefault()
        };
    }

    function saveButtonOnClick() {
        const uuid = config.uuid
        const button = this;

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
        const url = section.getAttribute('data-url');
        const form = document.querySelector(`.optionscreator-form[data-uuid="${uuid}"]`);

        if(form === null)
            throw new Error(`Form for UUID: ${uuid} not found`);

        return axios.post(url, new FormData(form));
    }

    function responseCallback(response) {
        let jsonData = response.data;

        let inputs = document.querySelectorAll(`.optionscreator[data-uuid="${config.uuid}"] .optionscreator-input-section select`);

        for (const input of inputs) {
            let newOption = document.createElement("option");
            newOption.text = jsonData[config.successTextKey];
            newOption.value = jsonData[config.successValueKey];

            input.appendChild(newOption);
            input.value = newOption.value;

            let modal = document.getElementById(`optionscreator_modal_${config.uuid}`);
            $(modal).modal('hide');

            showSuccessMessage(config.successText);
        }
    }

    function errorCallback(e, ) {
        console.error(e);
        showErrorMessage(config.errorText)
    }

    function runLoading(button) {
        button.setAttribute('disabled', true);
        button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ' + config.loadingText;
    }

    function stopLoading(button) {
        button.removeAttribute('disabled');
        button.innerHTML = '<i class="fas fa-save"></i> ' + config.saveButtonTitle;
    }

    function clearMessages() {
        hideSuccessMessage();
        hideErrorMessage();
    }

    function showSuccessMessage(message = '') {
        const elements = document.querySelectorAll(`.optionscreator-success[data-uuid="${config.uuid}"]`);

        for (const element of elements) {
            element.classList.remove('d-none');
            element.innerHTML = message;
        }
    }

    function hideSuccessMessage() {
        const elements = document.querySelectorAll(`.optionscreator-success[data-uuid="${config.uuid}"]`);

        for (const element of elements) {
            element.classList.add('d-none');
        }
    }

    function showErrorMessage(message = '') {
        const elements = document.querySelectorAll(`.optionscreator-danger[data-uuid="${config.uuid}"]`);

        for (const element of elements) {
            element.classList.remove('d-none');
            element.innerHTML = message;
        }
    }

    function hideErrorMessage() {
        const elements = document.querySelectorAll(`.optionscreator-danger[data-uuid="${config.uuid}"]`);

        for (const element of elements) {
            element.classList.add('d-none');
        }
    }
}
