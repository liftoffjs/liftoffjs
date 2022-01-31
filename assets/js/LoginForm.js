class LoginFormComponent extends HTMLElement {
  constructor() {
    super();

    const form = this.#createForm();

    Array.from(this.children).forEach((child) => {
      if (child.id !== 'login-form') {
        form.appendChild(child);
      }
    });
  }

  #createForm() {
    const form = document.createElement('form');

    form.id = 'login-form';

    form.onsubmit = (ev) => {
      ev.preventDefault();
      fetch('/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Set-Cookie': this.getAttribute('set-cookie'),
        },
        body: JSON.stringify({
          username: this.querySelector("input[name='username']").value,
          password: this.querySelector("input[name='password']").value,
        }),
        credentials: 'include',
      })
        .then((response) => response.json())
        .then((json) => {
          console.log({ json });
        });
    };
    return this.appendChild(form);
  }
}

customElements.define('lo-login-form', LoginFormComponent);
