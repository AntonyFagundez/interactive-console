const spanish = {
  commands: 'Comandos',
  actions: 'Acciones',
  'about me': 'Acerca de mi',
  education: 'Educación',
  experience: 'Experiencia',
  contact: 'Contacto',
  arguments: 'Argumentos',
  'open in another tab': 'Abrir en una nueva pestaña',
  "pd: you can clear the program with 'cls' or 'clear'":
    "PD: puedes limpiar la consola con 'cls' o 'clear'",
  'toggle between english and spanish':
    'Cambiar idioma. Entre Inglés y Español',
};

const english = {
  comandos: 'Commands',
  acciones: 'Actions',
  'acerca de mi': 'About me',
  educación: 'Education',
  experiencia: 'Experience',
  contacto: 'Contact',
  argumentos: 'Arguments',
  'abrir en una nueva pestaña': 'open in another tab',
  "pd: puedes limpiar la consola con 'cls' o 'clear'":
    "PD: you can clear the program with 'cls' or 'clear'",
  'cambiar idioma. entre inglés y español':
    'Toggle between English and Spanish',
};

const replaceText = (el, language) => {
  const key = el.innerText.toLowerCase();
  el.innerText = language[key] || key;
};

function replaceAll(newLanguage = null) {
  const userLang = newLanguage || navigator.language || navigator.userLanguage;
  const elements = document.querySelectorAll('[data-i18n]');

  if (userLang.startsWith('es')) {
    elements.forEach((x) => replaceText(x, spanish));
  } else {
    elements.forEach((x) => replaceText(x, english));
  }
}
