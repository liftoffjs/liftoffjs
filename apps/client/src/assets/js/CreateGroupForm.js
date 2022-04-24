customElements.define(
  'lo-create-group-form',
  class CreateGroupFormComponent extends HTMLElement {
    formId = 'create-group-form';
    formAction = '/api/group';
    formFields = {
      name: 'name',
    };
    headers = {};
    onSuccess = response => {
      if (response) {
        location.reload();
      }
    };

    constructor() {
      super();

      const form = this.#createForm();

      Array.from(this.children).forEach(child => {
        if (child.id !== this.formId) {
          form.appendChild(child);
        }
      });
    }

    #createForm() {
      const form = document.createElement('form');
      form.id = this.formId;

      form.onsubmit = ev => {
        ev.preventDefault();

        const allHeaders = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        Object.keys(this.headers).forEach(header => {
          allHeaders[header] = this.headers[header]();
        });

        const body = {};
        Object.keys(this.formFields).forEach(bodyKey => {
          body[bodyKey] = this.querySelector(`input[name='${this.formFields[bodyKey]}']`).value;
        });

        fetch(this.formAction, {
          method: 'POST',
          headers: allHeaders,
          body: JSON.stringify(body),
          credentials: 'include',
        })
          .then(response => response.json())
          .then(json => this.onSuccess(json));
      };

      return this.appendChild(form);
    }
  }
);
