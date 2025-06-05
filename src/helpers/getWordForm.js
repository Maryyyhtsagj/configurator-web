export const WORD_FORMS = {
  person: ['человек', 'человека', 'человек'],
  component: ['компонент', 'компонента', 'компонентов'],
  configuration: ['конфигурация', 'конфигурации', 'конфигураций'],
};

function getWordForm(count, wordForms) {
  const stringCount = count.toString();
  if (stringCount.includes('.')) {
    return wordForms[2];
  }
  if (stringCount.length > 1 && stringCount[stringCount.length - 2] === '1') {
    return wordForms[2];
  }

  if (count % 10 === 1) {
    return wordForms[0];
  } if ([2, 3, 4].includes(count % 10)) {
    return wordForms[1];
  }
  return wordForms[2];
}

export default getWordForm;
