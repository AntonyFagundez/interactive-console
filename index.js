let countHistory = 0;
let historyIds = [];
let userLang = navigator.language || navigator.userLanguage;

const isSpanish = () => {
  return userLang.startsWith('es');
};
const TAGS = {
  NET: "<a class='netcore' href='https://dotnet.microsoft.com/'>.NetCore</a>",
  REACT: "<a class='reactjs' href='https://reactjs.org/'>React Js</a>",
  LINKEDIN:
    "<a class='linkedin' href='https://www.linkedin.com/in/antony-fagundez/'>LinkedIn</a>",
  GITHUB: "<a class='text' href='https://github.com/AntonyFagundez'>GitHub</a>",
};
function pushLine(text, severity = 'info', withAdornment = true) {
  if (!text) return;
  let container = document.getElementById('label');

  let className =
    severity === 'error'
      ? 'text error'
      : severity === 'warning'
      ? 'text warning'
      : 'text';

  let adorment = withAdornment
    ? '<span class="text"> antonyfagundez /&gt; </span>'
    : '&nbsp;&nbsp;';

  container.insertAdjacentHTML(
    'beforebegin',
    `<div id="line-${countHistory}">
     ${adorment}    <label class="${className}" >${text}</label>
     </div>
     `
  );
  historyIds.push(`line-${countHistory}`);
}

function pushMultiLine(...args) {
  args.forEach((line) => pushInfoLine(line));
}

function pushInfoLine(text) {
  return pushLine(text, 'info', false);
}

function handleKeyPress(e) {
  let key = e.keyCode || e.which;
  if (key == 13) {
    let text = e.target.value;
    pushLine(text);
    if (text !== '' && !getCommand(text)) {
      if (isSpanish()) {
        pushLine('Error: No existe el comando: ' + text, 'error');
      } else {
        pushLine('Error: The command ' + text + ' does not exist', 'error');
      }
    }
    clearInput();
    focus();
  }
}
function openInNewTab(url) {
  window.open(url, '_blank').focus();
}

function clearInput() {
  let input = document.getElementById('input');
  input.value = '';
}

function focus() {
  let input = document.getElementById('input');
  input.focus();
}

const commands = {
  about: () => {
    let lines = [];
    if (isSpanish()) {
      lines = [
        'Mi nombre es Antony Fagundez',
        `Soy desarrollador de software con experiencia en ${TAGS.NET} y ${TAGS.REACT}`,
        'Con especial interés acerca de las tecnologías de frontend',
      ];
    } else {
      lines = [
        'My name is Antony Fagundez',
        `I'm a Software developer with experience in ${TAGS.NET} y ${TAGS.REACT}`,
        'with special interest in frontend technologies',
      ];
    }
    pushMultiLine(...lines);
  },
  cls: clear,
  clear: clear,
  exp: () => {
    let lines = [];
    if (isSpanish()) {
      lines = [
        'Actualmente cuento con casi 2 años de experiencia como desarrollador',
        'He participado en equipos de innovación para la empresa en la que estoy como para clientes',
        'He podido destacar por mi empeño y esfuerzo en estar a la vanguardia en las tecnologías',
        'cómo también tomar la responsabilidad y referencia acerca de ReactJs en mi equipo actual.',
        'He participado en proyectos con Google Maps como en proyectos de administración de Reportes,',
        'dichos proyectos han sido Tanto cloud (Azure) como onPremise',
        `Todo con el stack: ${TAGS.NET}/${TAGS.REACT}`,
      ];
    } else {
      lines = [
        'I currently have almost 2 years of experience as a developer',
        'I have participated in innovation teams for the company where I am and for clients',
        'I have been able to stand out for my determination and effort to be at the forefront of technologies',
        'as well as taking responsibility and referral about ReactJs on my current team',
        'I have participated in projects with Google Maps as well as in Report administration projects',
        'These projects have been both cloud (Azure) and onPremise',
        `Everything with the stack: ${TAGS.NET}/${TAGS.REACT}`,
      ];
    }
    pushMultiLine(...lines);
  },
  contact: () => {
    let text = isSpanish()
      ? `Puedes encontrame en ${TAGS.LINKEDIN} o ver este u otros proyectos en: ${TAGS.GITHUB}`
      : `You can find me on  ${TAGS.LINKEDIN} or see this or other projects on ${TAGS.GITHUB}`;

    pushInfoLine(text);
  },
  educ: () => {
    let lines = [];
    if (isSpanish()) {
      lines = [
        'Estudié en el programa de formación de Codo a Codo. (Java)',
        'Hice una capacitación del Gobierno de la ciudad como fullStack en UTN Medrano. (Laravel, Node, React)',
        'Hice una capacitación en Azure Fundamentals',
        'Y actualmente estoy estudiando la tecnicatura en programación en la UTN Avellaneda',
      ];
    } else {
      lines = [
        'I studied in the Codo a Codo training program. (Java)',
        'I did a City Government training as a fullStack at UTN Medrano. (Laravel, Node, React)',
        'I did a training on Azure Fundamentals',
        'And I am currently studying the technical degree in programming at the UTN Avellaneda',
      ];
    }
    pushMultiLine(...lines);
  },
  '--see github': () => {
    openInNewTab('https://github.com/AntonyFagundez');
  },
  '--see linkedin': () => {
    openInNewTab('https://www.linkedin.com/in/antony-fagundez/');
  },
  'change-language': () => {
    if (isSpanish()) {
      userLang = 'en';
      replaceAll('en');
    } else {
      userLang = 'es';
      replaceAll('es');
    }
  },
};

function getCommand(text) {
  let success = false;
  let textToValid = text.toLowerCase();
  if (commands.hasOwnProperty(textToValid)) {
    commands[textToValid]();
    success = true;
  }

  return success;
}

function clear() {
  historyIds.forEach((x) => {
    let el = document.getElementById(x);
    el.remove();
  });

  historyIds = [];
}
