class ForgotPasswordFormComponent extends HTMLElement {
  constructor() {
    super();

    const form = this.#createForm();

    Array.from(this.children).forEach(child => {
      if (child.id !== 'forgot-password-form') {
        form.appendChild(child);
      }
    });
  }

  #createForm() {
    const form = document.createElement('form');

    form.id = 'forgot-password-form';

    form.onsubmit = ev => {
      ev.preventDefault();
      fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: this.querySelector("input[name='token']").value,
          username: this.querySelector("input[name='username']").value,
          password: this.querySelector("input[name='password']").value,
        }),
        credentials: 'include',
      })
        .then(response => response.json())
        .then(json => {
          if (json) {
            location.href = this.getAttribute('redirect-to');
          }
        });
    };
    return this.appendChild(form);
  }
}

customElements.define('lo-forgot-password-form', ForgotPasswordFormComponent);
