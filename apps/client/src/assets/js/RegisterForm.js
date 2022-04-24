customElements.define(
  'lo-register-form',
  class RegisterFormComponent extends HTMLElement {
    formId = 'register-form';
    formAction = '/api/auth/register';
    formFields = {
      username: 'username',
      email: 'email',
      password: 'password',
    };
    headers = {
      'Set-Cookie': () => this.getAttribute('set-cookie'),
    };
    onSuccess = response => {
      if (response.access_token) {
        location.href = this.getAttribute('redirect-to');
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
