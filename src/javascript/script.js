/* PUXANDO DADOS */
const container = document.querySelector('#container');
const cadastroBtn = document.querySelector('.cadastro-btn');
const loginBtn = document.querySelector('.login-btn');

/* FUNÇÕES DOS BOTÕES DE SUBMIT */
cadastroBtn.addEventListener('click', ()=>{
    container.classList.add('active');
});

loginBtn.addEventListener('click', ()=>{
    container.classList.remove('active');
});


const inputs = document.querySelectorAll(".input-box input");

inputs.forEach(input => {
    input.addEventListener("input", function () {
        if (this.value.trim() !== "") {
            this.classList.add("has-value");
        } else {
            this.classList.remove("has-value");
        }
    });
});

/* ALTERAÇÃO DO ÍCONE E MODO LIGHT/DARK */
const modos = document.querySelectorAll('.modo');

modos.forEach(modo => {
    modo.addEventListener('click', () => {

        const body = document.body;

        body.classList.toggle('dark');

        if (body.classList.contains('dark')) {
            modo.classList.remove('fa-moon');
            modo.classList.add('fa-sun');
        } else {
            modo.classList.add('fa-moon');
            modo.classList.remove('fa-sun');
        }

    });
});

/* FUNÇÕES DE ABRIR/FECHAR MODAL */

function openModal() {
  document.getElementById("successModalLogin").classList.add("active");
}

function closeModal() {
  document.getElementById("successModalLogin").classList.remove("active");
}

function openModal2() {
  document.getElementById("successModalCad").classList.add("active");
}

function closeModal2() {
  document.getElementById("successModalCad").classList.remove("active");
}

/* Modal de erro p/dispositivos c/- de 830 height */ 
function openModal3() {
  const smallHeight = window.matchMedia("(max-height: 830px)").matches;

  if (smallHeight) {
    document.getElementById("errorModal").classList.add("active");
  }
}

function closeModal3() {
  document.getElementById("errorModal").classList.remove("active");
}

/* FORMULÁRIO LOGIN */

const formLogin = document.querySelector('#form-login');

formLogin.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = [
        { id: 'nome', label: 'Nome', validator: nameIsValid },
        { id: 'senha', label: 'Senha', validator: passwordIsSecure }
    ];

    const errorIcon = '';
    let formIsValid = true; 

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        const inputBox = input.closest('.input-box');
        const inputValue = input.value;

        const errorSpan = inputBox.querySelector('.error');
        errorSpan.innerHTML = '';

        inputBox.classList.remove('invalid');
        inputBox.classList.add('valid');

        const fieldValidator = field.validator(inputValue);

        // Se tiver errado tira a classe valid adiciona a invalid e mostra o error span
        if (!fieldValidator.isValid) {
            formIsValid = false; 
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`;
            inputBox.classList.add('invalid');
            inputBox.classList.remove('valid');
        }
    });

    /* Caso esteja certo abre o modal de sucesso de login*/
    if (formIsValid) {
        openModal();
    } 
    /* Caso não seja válido abre o modal de erro */
    else {
        openModal3(); 
    }
});


/* FORMULÁRIO CADASTRO */
const formCadastro = document.querySelector('#form-cadastro');

formCadastro.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = [
        { id: 'nomecad', label: 'Nome', validator: nameIsValid },
        { id: 'email', label: 'E-mail', validator: emailIsValid },
        { id: 'senhacad', label: 'Senha', validator: passwordIsSecure }
    ];

    const errorIcon = '';
    let formIsValid = true;

    fields.forEach(function (field) {
        const input = document.getElementById(field.id);
        const inputBox = input.closest('.input-box');
        const inputValue = input.value;

        const errorSpan = inputBox.querySelector('.error');
        errorSpan.innerHTML = '';

        inputBox.classList.remove('invalid');
        inputBox.classList.add('valid');

        const fieldValidator = field.validator(inputValue);

        // Se tiver errado tira a classe valid adiciona a invalid e mostra o error span
        if (!fieldValidator.isValid) {
            formIsValid = false;
            errorSpan.innerHTML = `${errorIcon} ${fieldValidator.errorMessage}`;
            inputBox.classList.add('invalid');
            inputBox.classList.remove('valid');
        }
    });

    /* Caso esteja certo abre o modal de sucesso de cadastro*/
    if (formIsValid) {
        openModal2();
    }
    /* Caso não seja válido abre o modal de erro */
    else {
        openModal3(); 
    }
});

/* VALIDAÇÃO DE DADOS */

function isEmpty(value) {
    return value === '';
}

/* Validação Nome */
function nameIsValid(value) {
    // Validação correta
    const validator = {
        isValid: true,
        errorMessage: null
    };

    // Se o campo estiver vazio
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Campo obrigatório!';
        return validator;
    }

    // Acima de 3 caracteres
    const min = 3;
    if (value.length < min){
        validator.isValid = false;
        validator.errorMessage = `Nome precisa de mais que 3 caracteres!`
        return validator;
    }

    // Só pode ter letras
    const regex = /^[a-zA-Z]/;
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Nome não pode conter somente números!'
    }

    return validator;
}

/* Validação Senha */
function passwordIsSecure(value) {
    // Validação correta
    const validator = {
        isValid: true,
        errorMessage: null
    }

    // Se o campo estiver vazio
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Campo obrigatório!';
        return validator;
    }

    // A senha deve possuir 8 caracteres, 1 letra minúscula, 1 letra maiúscula e 1 número
    const regex = new RegExp("^(?=.{8,})");

    if (!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = `Senha precisa de pelo menos 8 caracteres!`;
        return validator;
    }

    const regex2 = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    if (!regex2.test(value)) {
        validator.isValid = false;
        validator.errorMessage = `Coloque pelo menos 1 número, 1 letra maiúscula e minúscula!`;
        return validator;
    }

    return validator;
}

/* Validação Email */
function emailIsValid(value) {
    // Validação correta
    const validator = {
        isValid: true,
        errorMessage: null
    }

    // Se o campo estiver vazio
    if (isEmpty(value)) {
        validator.isValid = false;
        validator.errorMessage = 'Campo obrigatório!';
        return validator;
    }

    // O email precisa estar dentro das normas
    const regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    if (!regex.test(value)) {
        validator.isValid = false;
        validator.errorMessage = 'O e-mail precisa ser válido!';
        return validator;
    }

    return validator;
}