customElements.define(
  'lo-user-group-role-form',
  class UserGroupRoleFormComponent extends HTMLElement {
    formId = 'user-group-role-form';
    onSuccess = response => {
      if (response) {
        location.reload();
      }
    };
    overrideInit = init => {
      const userId = parseInt(this.getAttribute('user-id'), 10);
      const groupId = parseInt(this.getAttribute('group-id'), 10);
      let role = this.getAttribute('role');

      if (!role?.length) {
        init.method = 'DELETE';
        role = 'user'; // TODO: hacky workaround since endpoint requires a role enum value
      }

      init.body = JSON.stringify({
        userId,
        groupId,
        role,
      });
    };

    overrideFormAction = url => {
      const groupId = parseInt(this.getAttribute('group-id'), 10);
      return `/api/group/${groupId}/users`;
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
        Object.keys(this.formFields || {}).forEach(bodyKey => {
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
