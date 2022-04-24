customElements.define(
  'lo-invite-user-group-form',
  class InviteUserGroupFormComponent extends HTMLElement {
    formId = 'invite-user-group-form';
    formFields = {
      usernameOrEmail: 'usernameOrEmail',
      admin: 'admin',
    };
    headers = {};
    overrideFormAction = url => {
      const groupId = parseInt(this.getAttribute('group-id'), 10);
      return `/api/group/${groupId}/invite`;
    };
    overrideInit = init => {
      const body = JSON.parse(init.body);
      init.body = JSON.stringify({
        usernameOrEmail: body.usernameOrEmail,
        role: body.admin === true ? 'admin' : 'user',
      });
    };
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
        Object.keys(this.headers || {}).forEach(header => {
          allHeaders[header] = this.headers[header]();
        });

        const body = {};
        Object.keys(this.formFields).forEach(bodyKey => {
          const element = this.querySelector(`input[name='${this.formFields[bodyKey]}']`);
          if (element.type === 'checkbox') {
            body[bodyKey] = element.checked;
          } else {
            body[bodyKey] = element.value;
          }
        });

        const init = {
          method: 'POST',
          headers: allHeaders,
          body: JSON.stringify(body),
          credentials: 'include',
        };
        if (this.overrideInit) {
          this.overrideInit(init);
        }

        let formAction = this.formAction;
        if (this.overrideFormAction) {
          formAction = this.overrideFormAction(formAction);
        }

        fetch(formAction, init)
          .then(response => response.json())
          .then(json => this.onSuccess(json));
      };

      return this.appendChild(form);
    }
  }
);
