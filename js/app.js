const createHTMLNode = (tag, attrs, inner) => {
    const element = document.createElement(tag);
    attrs.map(attr => {element.setAttribute(attr.name, attr.value.join(' '))});
    inner
        ?
            Array.isArray(inner) ? inner.map(el => element.appendChild(el)):
                element.innerHTML=inner
                :null;
    return element;
};

const getHeader = () => {
    const span = createHTMLNode ('span', [{name: 'class', value:['badge', 'badge-light']}], 'Проверка пароля');
    const h3 = createHTMLNode ('h1', [], [span]);
    const p = createHTMLNode ('p', [], 'login: admin@gmail.com <br/> password: admin');
    const col = createHTMLNode ('div', [{name: 'class', value:['col']}], [h3, p])
    const row = createHTMLNode ('div', [{name: 'class', value:['row']}], [col])
    const container = createHTMLNode ('div', [{name: 'class', value:['container']}], [row])
    const header = createHTMLNode ('header', [], [container]);
    document.getElementById('app').appendChild(header);
};

const getMainSection = () => {
    const formGroup1 = createHTMLNode ('div', [{name: 'class', value:['form-group']}], [
        createHTMLNode ('label', [{name: 'for', value:['emailInput']}], 'Email:'),
        createHTMLNode ('input', [{name: 'type', value:['email']}, {name: 'class', value:['form-control']}, {name: 'id', value:['emailInput']}, {name: 'aria-describedby', value:['emailHelp']}], null),
        createHTMLNode ('div', [{name: 'class', value:['invalid-feedback']}], 'Email не менее 3 символов и @.')
    ]);
    const formGroup2 = createHTMLNode ('div', [{name: 'class', value:['form-group']}], [
        createHTMLNode ('label', [{name: 'for', value:['passwordInput']}], 'Пароль:'),
        createHTMLNode ('div', [{name: 'class', value:['passwordWrapper']}], [
            createHTMLNode ('input', [{name: 'type', value:['password']}, {name: 'class', value:['form-control']}, {name: 'id', value:['passwordInput']}], null),
            createHTMLNode ('button', [{name: 'type', value:['button']}, {name: 'class', value:['eye-btn']}, {name: 'id', value:['seePassword']}], [
                createHTMLNode ('i', [{name: 'class', value:['fas fa-eye-slash']}], null)
            ]),
            createHTMLNode ('div', [{name: 'class', value:['invalid-feedback']}], 'Пароль не менее 5 символов.')
        ])
    ]);
    const subBtn = createHTMLNode ('button', [{name: 'type', value:['submit']}, {name: 'class', value:['btn', 'btn-info']}, {name: 'id', value:['submitBtn']}], 'Submit');
    const resBtn = createHTMLNode ('button', [{name: 'type', value:['reset']}, {name: 'class', value:['btn', 'btn-danger']}], 'Clear form');
    const form = createHTMLNode ('form', [{name: 'id', value:['loginForm']}], [formGroup1, formGroup2, subBtn, resBtn]);
    const divOutp = createHTMLNode ('div', [{name: 'id', value:['output']}], null);
    const col = createHTMLNode ('div', [{name: 'class', value:['col']}], [form ,divOutp])
    const row = createHTMLNode ('div', [{name: 'class', value:['row']}], [col])
    const container = createHTMLNode ('div', [{name: 'class', value:['container']}], [row])
    const main = createHTMLNode ('main', [], [container]);
    document.getElementById('app').appendChild(main);
}

const getFooter = () => {
    const span = createHTMLNode ('span', [], `&#169 dmitrijpedan.github.io, ${new Date().getFullYear()}`);
    const col = createHTMLNode ('div', [{name: 'class', value:['col']}], [span])
    const row = createHTMLNode ('div', [{name: 'class', value:['row']}], [col])
    const container = createHTMLNode ('div', [{name: 'class', value:['container']}], [row])
    const footer = createHTMLNode ('footer', [], [container]);
    document.getElementById('app').appendChild(footer);
};

getHeader();
getMainSection();
getFooter();

const userArray = [
    {name: 'Дмитрий', email: 'test@gmail.com', password: '666666'},
    {name: 'Александр', email: 'alex@gmail.com', password: '666666'},
    {name: 'Владислав', email: 'vlad@gmail.com', password: '666666'},
    {name: 'Анна', email: 'anna@gmail.com', password: '666666'},
    {name: 'Администратор', email: 'admin@gmail.com', password: 'admin'}
]

const getUserMessage = (type, text) => {
    const div = createHTMLNode ('div', [{name: `class`, value:[`alert`, `alert-${type}`]}], `${text}`);
    document.getElementById('output').innerHTML = "";
    document.getElementById('output').appendChild(div);
    (setTimeout(() => {
        document.getElementById('output').innerHTML = "";
    }, 3000));
}

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const submitBtn = document.getElementById('submitBtn');
const seePassword = document.getElementById('seePassword');

const removeSpacesFromString = str => str.split('').filter(el => el !== ' ').join('');

const isPasswordValid = (password) => {
    removeSpacesFromString(password).length >= 5 ? res = true : res = false ;
    return res;
}

const isEmailValid = (email) => {
    let at = email.split('').filter(el => el !== ' ' && el == '@');
    removeSpacesFromString(email).length > 3 && at.length == 1 ? res = true : res = false ;
    return res;
}

emailInput.addEventListener('input', event => {
    event.target.value = removeSpacesFromString(event.target.value);
    if (isEmailValid(event.target.value)) {
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
    } else {
        event.target.classList.add('is-invalid');
        event.target.classList.remove('is-valid');
    }
})

passwordInput.addEventListener('input', event => {
    event.target.value = removeSpacesFromString(event.target.value);
    if (isPasswordValid(event.target.value)) {
        event.target.classList.remove('is-invalid');
        event.target.classList.add('is-valid');
    } else {
        event.target.classList.add('is-invalid');
        event.target.classList.remove('is-valid');
    }
})

seePassword.addEventListener('click', () => {
    let attr = passwordInput.getAttribute('type');
    if (attr === 'password') {
        passwordInput.setAttribute('type', 'text');
        seePassword.innerHTML = "";
        seePassword.appendChild(createHTMLNode ('i', [{name: 'class', value:['fas', 'fa-eye']}], null));
    } else {
        seePassword.innerHTML = "";
        passwordInput.setAttribute('type', 'password');
        seePassword.innerHTML = "";
        seePassword.appendChild(createHTMLNode ('i', [{name: 'class', value:['fas', 'fa-eye-slash']}], null));
    }
})

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    let currentUser = userArray.filter(el => el.email === emailInput.value);
    if (currentUser.length == 1) {
        currentUser[0].password === passwordInput.value ?  getUserMessage('success', `${currentUser[0].name}, добро пожаловать в систему`) : getUserMessage('warning', `${currentUser[0].name}, вы ввели неверный пароль!`) 
    } else {
        getUserMessage('danger', 'Такого пользователя нет в системе');
    }  
})


