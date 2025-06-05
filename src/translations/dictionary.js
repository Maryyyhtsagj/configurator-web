import { LANGUAGES } from '../constants/languages';
import getWordForm, { WORD_FORMS } from '../helpers/getWordForm';

export const DICTIONARY = {
  some: {
    [LANGUAGES.ru.code]: () => '',
    [LANGUAGES.en.code]: () => '',
  },
  cannotCalculate: {
    [LANGUAGES.ru.code]: (count) => `Нельзя проводить калькуляцию пока есть ошибки (${count})`,
    [LANGUAGES.en.code]: (count) => `It is impossible to make calculations while there are errors (${count})`,
  },
  chooseProject: {
    [LANGUAGES.ru.code]: () => 'Выберите проект',
    [LANGUAGES.en.code]: () => 'Choose project',
  },
  configurationName: {
    [LANGUAGES.ru.code]: () => 'Название конфигурации',
    [LANGUAGES.en.code]: () => 'Configuration name',
  },
  project: {
    [LANGUAGES.ru.code]: () => 'Проект',
    [LANGUAGES.en.code]: () => 'Project',
  },
  sureToDelete: {
    [LANGUAGES.ru.code]: (count) => `Вы уверены, что хотите удалить выбранные (${count}) элементы?`,
    [LANGUAGES.en.code]: (count) => `Are you sure you want to delete selected (${count}) items?`,
  },
  sureToDeleteProject: {
    [LANGUAGES.ru.code]: () => 'Вы уверены, что хотите удалить проект?',
    [LANGUAGES.en.code]: () => 'Are you sure you want to delete the project?',
  },
  sureToDeleteConfiguration: {
    [LANGUAGES.ru.code]: () => 'Вы уверены, что хотите удалить конфигурацию?',
    [LANGUAGES.en.code]: () => 'Are you sure you want to delete the configuration?',
  },
  changePageWarning: {
    [LANGUAGES.ru.code]: () => 'При переходе выбранные элементы будут сброшены',
    [LANGUAGES.en.code]: () => 'If you switch, the selected items will be reset',
  },
  configurations: {
    [LANGUAGES.ru.code]: (count) => getWordForm(count, WORD_FORMS.configuration),
    [LANGUAGES.en.code]: (count) => (count === 1 ? 'configuration' : 'configurations'),
  },
  minimum2symbols: {
    [LANGUAGES.ru.code]: () => 'Минимум 2 символа',
    [LANGUAGES.en.code]: () => 'Minimum 2 symbols',
  },
  newProjectName: {
    [LANGUAGES.ru.code]: () => 'Название нового проекта',
    [LANGUAGES.en.code]: () => 'Name of new project',
  },
  newProject: {
    [LANGUAGES.ru.code]: () => 'Новый проект',
    [LANGUAGES.en.code]: () => 'New project',
  },
  anglesMore: {
    [LANGUAGES.ru.code]: (count) => `Ещё ${count}`,
    [LANGUAGES.en.code]: (count) => `${count} more`,
  },
  setAngle: {
    [LANGUAGES.ru.code]: () => 'Введите угол',
    [LANGUAGES.en.code]: () => 'Type angle',
  },
  angleMain: {
    [LANGUAGES.ru.code]: () => '90° (базовый)',
    [LANGUAGES.en.code]: () => '90° (main)',
  },
  chooseAngles: {
    [LANGUAGES.ru.code]: () => 'Выберите углы',
    [LANGUAGES.en.code]: () => 'Choose angles',
  },
  anglesHint: {
    [LANGUAGES.ru.code]: () => 'подсказка подсказка подсказка подсказка подсказка',
    [LANGUAGES.en.code]: () => 'hint hint hint hint hint hint hint hint hint hint ',
  },
  configurationCodeHint: {
    [LANGUAGES.ru.code]: () => 'Введите конфигурацию при помощи короткого текстового скретч-кода, разделяя элементы символом "-" или "/"',
    [LANGUAGES.en.code]: () => 'Enter the configuration using a short text scratch code, separating elements with the "-" or "/" symbol',
  },
  glassHint: {
    [LANGUAGES.ru.code]: () => 'Выберите базовое стекло, которое будет использоваться при создании конфигурации скретч-кодом',
    [LANGUAGES.en.code]: () => 'Select the base glass that will be used when creating a scratch code configuration.',
  },
  searchComponents: {
    [LANGUAGES.ru.code]: () => 'Поиск компонентов...',
    [LANGUAGES.en.code]: () => 'Search components...',
  },
  sureToCleanConfiguration: {
    [LANGUAGES.ru.code]: () => 'Вы уверены, что хотите сбросить конфигурацию?',
    [LANGUAGES.en.code]: () => 'Are you sure you want to reset configuration?',
  },
  maxGasCount: {
    [LANGUAGES.ru.code]: () => 'МАКСИМУМ 2 ГАЗОВЫХ ПРОМЕЖУТКА',
    [LANGUAGES.en.code]: () => 'MAXIMUM 2 GAS LAYERS',
  },
  setRegion: {
    [LANGUAGES.ru.code]: () => 'Введите регион',
    [LANGUAGES.en.code]: () => 'Set region',
  },
  setCityName: {
    [LANGUAGES.ru.code]: () => 'Введите название города',
    [LANGUAGES.en.code]: () => 'Set city name',
  },
  citySearch: {
    [LANGUAGES.ru.code]: () => 'Поиск города...',
    [LANGUAGES.en.code]: () => 'City search...',
  },
  selectCity: {
    [LANGUAGES.ru.code]: () => 'Выберите город',
    [LANGUAGES.en.code]: () => 'Select city',
  },
  anotherCity: {
    [LANGUAGES.ru.code]: () => 'Другой город',
    [LANGUAGES.en.code]: () => 'Another city',
  },
  notePlaceholder: {
    [LANGUAGES.ru.code]: () => 'Введите примечание',
    [LANGUAGES.en.code]: () => 'Enter a note',
  },
  mainGlass: {
    [LANGUAGES.ru.code]: () => 'Базовое стекло',
    [LANGUAGES.en.code]: () => 'Main glass',
  },
  backToConfigurator: {
    [LANGUAGES.ru.code]: () => 'Назад в конфигуратор',
    [LANGUAGES.en.code]: () => 'Back to configurator',
  },
  selectComponents: {
    [LANGUAGES.ru.code]: () => 'Выбрать компоненты',
    [LANGUAGES.en.code]: () => 'Select components',
  },
  invalidHeatTreatment: {
    [LANGUAGES.ru.code]: () => 'Недопустимая термическая обработка',
    [LANGUAGES.en.code]: () => 'Invalid heat treatment',
  },
  invalidWidth: {
    [LANGUAGES.ru.code]: () => 'Недопустимая ширина',
    [LANGUAGES.en.code]: () => 'Invalid width',
  },
  incompatibleCover: {
    [LANGUAGES.ru.code]: () => 'Несовместимое покрытие',
    [LANGUAGES.en.code]: () => 'Incompatible cover',
  },
  missingComponent: {
    [LANGUAGES.ru.code]: () => 'Компонент отсутствует',
    [LANGUAGES.en.code]: () => 'Missing component',
  },
  createNewProject: {
    [LANGUAGES.ru.code]: () => 'Создать новый проект',
    [LANGUAGES.en.code]: () => 'Create a new project',
  },
  showMore: {
    [LANGUAGES.ru.code]: () => 'Показать еще',
    [LANGUAGES.en.code]: () => 'Show more',
  },
  selected: {
    [LANGUAGES.ru.code]: () => 'Выбрано',
    [LANGUAGES.en.code]: () => 'Selected',
  },
  confHistory: {
    [LANGUAGES.ru.code]: () => 'Личный кабинет / История конфигураций',
    [LANGUAGES.en.code]: () => 'Personal account / Configuration history',
  },
  myProjectsSubTitle: {
    [LANGUAGES.ru.code]: () => 'Личный кабинет / Мои проекты',
    [LANGUAGES.en.code]: () => 'Personal account / My projects',
  },
  addToProject: {
    [LANGUAGES.ru.code]: () => 'Добавить в проект',
    [LANGUAGES.en.code]: () => 'Add to project',
  },
  editConfiguration: {
    [LANGUAGES.ru.code]: () => 'Редактировать конфигурацию',
    [LANGUAGES.en.code]: () => 'Edit configuration',
  },
  saveToPdf: {
    [LANGUAGES.ru.code]: () => 'Сохранить в pdf',
    [LANGUAGES.en.code]: () => 'Save as PDF',
  },
  saveToArchive: {
    [LANGUAGES.ru.code]: () => 'Сохранить в архив',
    [LANGUAGES.en.code]: () => 'Save to archive',
  },
  saveToDocx: {
    [LANGUAGES.ru.code]: () => 'Сохранить в docx',
    [LANGUAGES.en.code]: () => 'Save as DOCX',
  },
  sendByEmail: {
    [LANGUAGES.ru.code]: () => 'Отправить по e-mail',
    [LANGUAGES.en.code]: () => 'Send by email',
  },
  note: {
    [LANGUAGES.ru.code]: () => 'Примечание',
    [LANGUAGES.en.code]: () => 'Note',
  },
  clear: {
    [LANGUAGES.ru.code]: () => 'Очистить',
    [LANGUAGES.en.code]: () => 'Clear',
  },
  noteText: {
    [LANGUAGES.ru.code]: () => 'примечание',
    [LANGUAGES.en.code]: () => 'note',
  },
  mainCharacteristics: {
    [LANGUAGES.ru.code]: () => 'Основные характеристики',
    [LANGUAGES.en.code]: () => 'Main Characteristics',
  },
  technicalCharacteristics: {
    [LANGUAGES.ru.code]: () => 'Моделирование технических характеристик стекол',
    [LANGUAGES.en.code]: () => 'Modeling of Glass Technical Characteristics',
  },
  footerDescription: {
    [LANGUAGES.ru.code]: () => 'Гласс Конфигуратор AIG – это инструмент моделирования, предоставляющий возможность расчета и анализа технических характеристик стеклоизделий из стекла производства компании AIG (здесь и далее под компанией AIG понимается ООО "КСЗ", ИНН 5020033028 и АО "БСЗ", ИНН 5246002261). Инструмент помогает пользователю всесторонне оценить показатели описанной в отчёте конфигурации стеклоизделия. Оценка расчетных параметров применима только к стёклам и cтеклоизделиям из стекла производства компании AIG. Выполненный расчет конфигурации может содержать некоторые отклонения и не заменяет собой консультацию специалиста, хотя компания AIG приложила все усилия для проверки надежности этого инструмента моделирования. Пользователь принимает на себя любые риски, связанные с использованием результатов, полученных с помощью Гласс Конфигуратора AIG, и самостоятельно несет ответственность за выбор конфигурации стекла под проект на основе расчета в Гласс Конфигураторе AIG. Результаты расчета характеристик стеклоизделий носят информационный характер и никоим образом не подразумевает приемку какого-либо заказа компанией AIG. Компания AIG не предоставляет какой-либо явной или подразумеваемой гарантии в отношении результатов применения Гласс Конфигуратора AIG. Ни при каких обстоятельствах компания AIG не несет ответственность за прямые, опосредованные, косвенные или случайные убытки, связанные с или возникшие в результате использования инструмента Гласс Конфигуратор AIG.',
    [LANGUAGES.en.code]: () => 'AIG Glass Configurator is a modeling tool that provides the ability to calculate and analyze the technical characteristics of glass products manufactured by AIG (hereinafter, AIG refers to LLC "KSZ", TIN 5020033028 and JSC "BSZ", TIN 5246002261). The tool helps the user comprehensively evaluate the parameters of the glass product configuration described in the report. The evaluation of calculation parameters is applicable only to glass and glass products manufactured by AIG. The configuration calculation may contain some deviations and does not replace a specialist consultation, although AIG has made every effort to verify the reliability of this modeling tool. The user assumes any risks associated with using the results obtained through the AIG Glass Configurator and is solely responsible for selecting the glass configuration for a project based on calculations in the AIG Glass Configurator. The results of glass product characteristics calculations are for informational purposes only and in no way imply acceptance of any order by AIG. AIG does not provide any express or implied warranty regarding the results of using the AIG Glass Configurator. Under no circumstances shall AIG be liable for direct, indirect, consequential, or incidental damages related to or arising from the use of the AIG Glass Configurator tool.',
  },
  components: {
    [LANGUAGES.ru.code]: (count) => getWordForm(count, WORD_FORMS.component),
    [LANGUAGES.en.code]: (count) => (count === 1 ? 'component' : 'components'),
  },
  delete: {
    [LANGUAGES.ru.code]: () => 'Удалить',
    [LANGUAGES.en.code]: () => 'Delete',
  },
  edit: {
    [LANGUAGES.ru.code]: () => 'Изменить',
    [LANGUAGES.en.code]: () => 'Edit',
  },
  add: {
    [LANGUAGES.ru.code]: () => 'Добавить',
    [LANGUAGES.en.code]: () => 'Add',
  },
  emptyListText: {
    [LANGUAGES.ru.code]: () => 'Перетащите компоненты для создания конфигурации',
    [LANGUAGES.en.code]: () => 'Drag components here to create a configuration',
  },
  calculate: {
    [LANGUAGES.ru.code]: () => 'Рассчитать',
    [LANGUAGES.en.code]: () => 'Calculate',
  },
  configure: {
    [LANGUAGES.ru.code]: () => 'Сконфигурировать',
    [LANGUAGES.en.code]: () => 'Configure',
  },
  angleOfInclination: {
    [LANGUAGES.ru.code]: () => 'Угол наклона',
    [LANGUAGES.en.code]: () => 'Angle of inclination',
  },
  glassType: {
    [LANGUAGES.ru.code]: () => 'Тип стекла',
    [LANGUAGES.en.code]: () => 'Glass type',
  },
  setConfiguration: {
    [LANGUAGES.ru.code]: () => 'Введите конфигурацию',
    [LANGUAGES.en.code]: () => 'Set configuration',
  },
  configuratorTemplatesTitle: {
    [LANGUAGES.ru.code]: () => 'Выберите шаблон конфигурации ниже или добавьте компоненты вручную',
    [LANGUAGES.en.code]: () => 'Select a configuration template below or add components manually',
  },
  city: {
    [LANGUAGES.ru.code]: () => 'Город',
    [LANGUAGES.en.code]: () => 'City',
  },
  refreshConfiguration: {
    [LANGUAGES.ru.code]: () => 'Сбросить конфигурацию',
    [LANGUAGES.en.code]: () => 'Refresh configuration',
  },
  emptyText: {
    [LANGUAGES.ru.code]: () => 'Пусто.',
    [LANGUAGES.en.code]: () => 'Empty.',
  },
  watchVideo: {
    [LANGUAGES.ru.code]: () => 'Смотреть видео-инструкцию по работе',
    [LANGUAGES.en.code]: () => 'Watch the video instruction on how to operate',
  },
  configInstructionsTitle: {
    [LANGUAGES.ru.code]: () => 'Инструкция по работе с конфигуратором',
    [LANGUAGES.en.code]: () => 'Instructions for working with the configurator',
  },
  configInstructionsSubTitle: {
    [LANGUAGES.ru.code]: () => 'Главная / Инструкция',
    [LANGUAGES.en.code]: () => 'Home / Instructions',
  },
  configInstructionsDescription: {
    [LANGUAGES.ru.code]: () => 'Создайте первую конфигурацию прямо сейчас: зарегистрируйтесь и перейдите в конфигуратор в режиме обучения.',
    [LANGUAGES.en.code]: () => 'Create your first configuration right now: register and go to the configurator in training mode.',
  },
  restore: {
    [LANGUAGES.ru.code]: () => 'Восстановить',
    [LANGUAGES.en.code]: () => 'Restore',
  },
  passwordFormTitle: {
    [LANGUAGES.ru.code]: () => 'Восстановление пароля',
    [LANGUAGES.en.code]: () => 'Password recovery',
  },
  passwordFormSubTitle: {
    [LANGUAGES.ru.code]: () => 'Главная / Восстановление пароля',
    [LANGUAGES.en.code]: () => 'Home / Password recovery',
  },
  contactFormSubTitle: {
    [LANGUAGES.ru.code]: () => 'Главная / Связаться с нами',
    [LANGUAGES.en.code]: () => 'Home / Contact Us',
  },
  enterPasswordFormTitle: {
    [LANGUAGES.ru.code]: () => 'Введите новый пароль',
    [LANGUAGES.en.code]: () => 'Enter new password',
  },
  agreePrivacyPolicy: {
    [LANGUAGES.ru.code]: () => 'Я согласен с политикой конфиденциальности',
    [LANGUAGES.en.code]: () => 'I agree with the privacy policy',
  },
  authFormTitle: {
    [LANGUAGES.ru.code]: () => 'Авторизация',
    [LANGUAGES.en.code]: () => 'Authorization',
  },
  authFormSubTitle: {
    [LANGUAGES.ru.code]: () => 'Главная / Авторизация',
    [LANGUAGES.en.code]: () => 'Home / Login',
  },
  registerFormSubTitle: {
    [LANGUAGES.ru.code]: () => 'Главная / Регистрация',
    [LANGUAGES.en.code]: () => 'Home / Registration',
  },
  forgotPasswordLink: {
    [LANGUAGES.ru.code]: () => 'Забыли пароль?',
    [LANGUAGES.en.code]: () => 'Forgot password?',
  },
  personalTitle: {
    [LANGUAGES.ru.code]: () => 'Личные данные',
    [LANGUAGES.en.code]: () => 'Personal Data',
  },
  personalSubTitle: {
    [LANGUAGES.ru.code]: () => 'Личный кабинет / Личные данные',
    [LANGUAGES.en.code]: () => 'Personal account / Personal data',
  },
  fullName: {
    [LANGUAGES.ru.code]: () => 'ФИО',
    [LANGUAGES.en.code]: () => 'Full name',
  },
  phone: {
    [LANGUAGES.ru.code]: () => 'Телефон',
    [LANGUAGES.en.code]: () => 'Phone',
  },
  companyName: {
    [LANGUAGES.ru.code]: () => 'Название компании',
    [LANGUAGES.en.code]: () => 'Company name',
  },
  company: {
    [LANGUAGES.ru.code]: () => 'Компания',
    [LANGUAGES.en.code]: () => 'Company',
  },
  position: {
    [LANGUAGES.ru.code]: () => 'Должность',
    [LANGUAGES.en.code]: () => 'Position',
  },
  newPassword: {
    [LANGUAGES.ru.code]: () => 'Новый пароль',
    [LANGUAGES.en.code]: () => 'New password',
  },
  confirmPassword: {
    [LANGUAGES.ru.code]: () => 'Подтверждение пароля ',
    [LANGUAGES.en.code]: () => 'Confirm password',
  },
  passwordInputLabel: {
    [LANGUAGES.ru.code]: () => 'Пароль',
    [LANGUAGES.en.code]: () => 'Password',
  },
  repeatPasswordInputLabel: {
    [LANGUAGES.ru.code]: () => 'Повторите пароль',
    [LANGUAGES.en.code]: () => 'Repeat password',
  },
  confirmNewPassword: {
    [LANGUAGES.ru.code]: () => 'Подтверждение нового пароля',
    [LANGUAGES.en.code]: () => 'Confirm new password',
  },
  saveChanges: {
    [LANGUAGES.ru.code]: () => 'Сохранить изменения',
    [LANGUAGES.en.code]: () => 'Save changes',
  },
  rememberMeCheckbox: {
    [LANGUAGES.ru.code]: () => 'Запомнить',
    [LANGUAGES.en.code]: () => 'Remember',
  },
  privacyTitle: {
    [LANGUAGES.ru.code]: () => 'Политика конфиденциальности',
    [LANGUAGES.en.code]: () => 'Privacy Policy',
  },
  privacySubTitle: {
    [LANGUAGES.ru.code]: () => 'Главная / Политика конфиденциальности',
    [LANGUAGES.en.code]: () => 'Home / Privacy Policy',
  },
  formTitle: {
    [LANGUAGES.ru.code]: () => 'Остались вопросы?',
    [LANGUAGES.en.code]: () => 'Do you have any questions?',
  },
  nameInputLabel: {
    [LANGUAGES.ru.code]: () => 'Ваше имя',
    [LANGUAGES.en.code]: () => 'Your Name',
  },
  emailInputLabel: {
    [LANGUAGES.ru.code]: () => 'E-mail',
    [LANGUAGES.en.code]: () => 'E-mail',
  },
  topicInputLabel: {
    [LANGUAGES.ru.code]: () => 'Тема',
    [LANGUAGES.en.code]: () => 'Topic',
  },
  topicInputPlaceholder: {
    [LANGUAGES.ru.code]: () => 'Выберите тему',
    [LANGUAGES.en.code]: () => 'Select a Topic',
  },
  topicOptions: {
    price: {
      [LANGUAGES.ru.code]: () => 'Уточнить наличие и цены на продукты',
      [LANGUAGES.en.code]: () => 'Check availability and prices of products',
    },
    consultation: {
      [LANGUAGES.ru.code]: () => 'Получить консультацию по проекту',
      [LANGUAGES.en.code]: () => 'Get a consultation on the project',
    },
    order: {
      [LANGUAGES.ru.code]: () => 'Заказать прочностной расчёт стеклоизделий',
      [LANGUAGES.en.code]: () => 'Order strength calculation of glass products',
    },
    repBug: {
      [LANGUAGES.ru.code]: () => 'Сообщить об ошибке',
      [LANGUAGES.en.code]: () => 'Report a bug',
    },
    auth: {
      [LANGUAGES.ru.code]: () => 'Авторихзация и регистрация',
      [LANGUAGES.en.code]: () => 'Login and Registration',
    },
    configurator: {
      [LANGUAGES.ru.code]: () => 'Конфигуратор',
      [LANGUAGES.en.code]: () => 'Configurator',
    },
    partners: {
      [LANGUAGES.ru.code]: () => 'Сотрудничество',
      [LANGUAGES.en.code]: () => 'Cooperation',
    },
    other: {
      [LANGUAGES.ru.code]: () => 'Другой вопрос',
      [LANGUAGES.en.code]: () => 'Other Question',
    },
  },
  requestInputLabel: {
    [LANGUAGES.ru.code]: () => 'Ваш запрос',
    [LANGUAGES.en.code]: () => 'Your Request',
  },
  privacyPolicyCheckbox: {
    [LANGUAGES.ru.code]: () => 'Я ознакомлен с политикой конфиденциальности',
    [LANGUAGES.en.code]: () => 'I have read the privacy policy',
  },
  submitButtonText: {
    [LANGUAGES.ru.code]: () => 'Отправить сообщение',
    [LANGUAGES.en.code]: () => 'Send Message',
  },
  errorMessages: {
    required: {
      [LANGUAGES.ru.code]: () => 'Выбери',
      [LANGUAGES.en.code]: () => 'Please select',
    },
  },
  instructionMainTitle: {
    [LANGUAGES.ru.code]: () => 'Подробная инструкция по работе',
    [LANGUAGES.en.code]: () => 'Detailed work instructions',
  },
  instructionMainDescription: {
    [LANGUAGES.ru.code]: () => 'Посмотрите видео-инструкцию с примерами работы',
    [LANGUAGES.en.code]: () => 'Watch a video instruction with work examples',
  },
  watchVideoInstructionButton: {
    [LANGUAGES.ru.code]: () => 'Смотреть видео-инструкцию',
    [LANGUAGES.en.code]: () => 'Watch video tutorial',
  },
  stepOneTitle: {
    [LANGUAGES.ru.code]: () => 'Создайте конфигурацию',
    [LANGUAGES.en.code]: () => 'Create configuration',
  },
  stepOneDescription: {
    [LANGUAGES.ru.code]: () => 'Задайте конфигурацию с помощью специального скретч-кода или выберите элементы вручную',
    [LANGUAGES.en.code]: () => 'Set the configuration using a special script code or select elements manually',
  },
  stepTwoTitle: {
    [LANGUAGES.ru.code]: () => 'Рассчитайте характеристики стеклоизделий',
    [LANGUAGES.en.code]: () => 'Calculate the characteristics of glass products',
  },
  stepTwoDescription: {
    [LANGUAGES.ru.code]: () => 'После подтверждения всех параметров получите подробный расчет технических характеристик',
    [LANGUAGES.en.code]: () => 'After confirming all parameters, receive a detailed calculation of technical characteristics',
  },
  stepThreeTitle: {
    [LANGUAGES.ru.code]: () => 'Проанализируйте и сохраните результаты расчета',
    [LANGUAGES.en.code]: () => 'Analyze and save calculation results',
  },
  stepThreeDescription: {
    [LANGUAGES.ru.code]: () => 'Выгрузите результаты расчета в формате PDF, перешлите их на e-mail или сохраните в разделе "Мои проекты"',
    [LANGUAGES.en.code]: () => 'Export calculation results in PDF format, forward them via email, or save in the "My Projects" section',
  },
  whatIsTitle: {
    [LANGUAGES.ru.code]: () => 'Что такое конфигуратор?',
    [LANGUAGES.en.code]: () => 'What is the configurator?',
  },
  whatIsDescription1: {
    [LANGUAGES.ru.code]: () => 'Гласс конфигуратор AIG — это онлайн-инструмент, который позволяет быстро и точно рассчитать технические параметры стеклоизделия, а также подобрать конфигурацию, соответствующую концепции проекта и заявленным требованиям.',
    [LANGUAGES.en.code]: () => 'Glass Configurator AIG is an online tool that allows you to quickly and accurately calculate the technical parameters of glass products and select a configuration that matches the project concept and stated requirements.',
  },
  whatIsDescription2: {
    [LANGUAGES.ru.code]: () => 'Задайте необходимую конфигурацию (количество камер, типы и номиналы стёкол, покрытия и газовые промежутки) и получите подробный расчет оптических, энергетических, теплофизических и специальных характеристик стеклоизделия в соответствии с актуальными нормативами РФ.',
    [LANGUAGES.en.code]: () => 'Specify the required configuration (number of chambers, types and denominations of glasses, coatings and gas gaps) and receive a detailed calculation of optical, energy, thermophysical, and special characteristics of the glass product in accordance with current RF standards.',
  },
  whatIsDescription3: {
    [LANGUAGES.ru.code]: () => 'С помощью Гласс конфигуратора AIG Вы сможете получить технические характеристики стеклоизделия в режиме реального времени: создайте несколько конфигураций, проанализируйте данные и выберите идеальное решение под Ваши задачи.',
    [LANGUAGES.en.code]: () => 'With the Glass configurator AIG, you can obtain technical characteristics of glass products in real-time: create multiple configurations, analyze the data, and choose the ideal solution for your needs.',
  },
  moreAboutConfiguratorButton: {
    [LANGUAGES.ru.code]: () => 'Подробнее о конфигураторе',
    [LANGUAGES.en.code]: () => 'More about the configurator',
  },
  homeCreateTitle: {
    [LANGUAGES.ru.code]: () => 'Создайте уникальную конфигурацию стеклоизделия онлайн',
    [LANGUAGES.en.code]: () => 'Create a unique glass product configuration online',
  },
  configuratorFeatureTitle: {
    [LANGUAGES.ru.code]: () => 'Удобный визуальный онлайн-конфигуратор',
    [LANGUAGES.en.code]: () => 'Convenient visual online configurator',
  },
  configuratorFeatureDescription: {
    [LANGUAGES.ru.code]: () => 'соберите композицию стеклоизделия под Ваши требования за несколько шагов',
    [LANGUAGES.en.code]: () => 'assemble a glass product composition to your requirements in just a few steps',
  },
  calculatorFeatureTitle: {
    [LANGUAGES.ru.code]: () => 'Подробный расчет технических характеристик',
    [LANGUAGES.en.code]: () => 'Detailed technical specification calculations',
  },
  calculatorFeatureDescription: {
    [LANGUAGES.ru.code]: () => 'все необходимые характеристики в одном файле',
    [LANGUAGES.en.code]: () => 'all necessary specifications in one file',
  },
  downloadFeatureTitle: {
    [LANGUAGES.ru.code]: () => 'Выгрузка результатов в удобном формате',
    [LANGUAGES.en.code]: () => 'Export results in a convenient format',
  },
  downloadFeatureDescription: {
    [LANGUAGES.ru.code]: () => 'сохраните расчеты в личном кабинете, скачайте в формате pdf или отправьте на e-mail',
    [LANGUAGES.en.code]: () => 'save calculations in your personal account, download in pdf format, or send via email',
  },
  createConfigurationButton: {
    [LANGUAGES.ru.code]: () => 'Создать конфигурацию',
    [LANGUAGES.en.code]: () => 'Create configuration',
  },

  policy1Title: {
    [LANGUAGES.ru.code]: () => '1. Общие положения',
    [LANGUAGES.en.code]: () => '1. General provisions',
  },
  policy1_1: {
    [LANGUAGES.ru.code]: () => '1.1. Настоящая Политика конфиденциальности регулирует обработку и защиту персональных данных пользователей, которые были предоставлены при использовании сайта [название сайта] (далее — Сайт).',
    [LANGUAGES.en.code]: () => '1.1. This Privacy Policy governs the processing and protection of personal data of users that were provided when using the website [website name] (hereinafter referred to as the Website).',
  },
  policy1_2: {
    [LANGUAGES.ru.code]: () => '1.2. Под персональными данными понимается любая информация, которая прямо или косвенно относится к определённому физическому лицу (субъекту персональных данных).',
    [LANGUAGES.en.code]: () => '1.2. Personal data is understood as any information that directly or indirectly relates to a specific individual (personal data subject).',
  },
  policy1_3: {
    [LANGUAGES.ru.code]: () => '1.3. Пользователь, предоставляя свои персональные данные, соглашается с условиями настоящей Политики конфиденциальности.',
    [LANGUAGES.en.code]: () => '1.3. By providing their personal data, the User agrees to the terms of this Privacy Policy.',
  },

  policy2Title: {
    [LANGUAGES.ru.code]: () => '2. Цели обработки персональных данных',
    [LANGUAGES.en.code]: () => '2. Purposes of personal data processing',
  },
  policy2_1: {
    [LANGUAGES.ru.code]: () => '2.1. Обработка персональных данных осуществляется для следующих целей:',
    [LANGUAGES.en.code]: () => '2.1. Personal data processing is carried out for the following purposes:',
  },
  policy2_1_purposes: {
    [LANGUAGES.ru.code]: () => [
      '- Предоставление доступа к функционалу Сайта <br />',
      '- Улучшение качества обслуживания и работы Сайта <br />',
      '- Обработка запросов пользователей и обратной связи <br />',
      '- Направление уведомлений и информационных материалов (при согласии пользователя) <br />',
    ],
    [LANGUAGES.en.code]: () => [
      '- Providing access to the Website functionality <br /> ',
      '- Improving service quality and Website performance <br />',
      '- Processing user requests and feedback <br />',
      '- Sending notifications and informational materials (with user consent) <br />',
    ],
  },

  policy3Title: {
    [LANGUAGES.ru.code]: () => '3. Перечень собираемых данных',
    [LANGUAGES.en.code]: () => '3. List of collected data',
  },
  policy3_1: {
    [LANGUAGES.ru.code]: () => '3.1. При использовании Сайта могут собираться следующие данные:',
    [LANGUAGES.en.code]: () => '3.1. The following data may be collected when using the Website:',
  },
  policy3_1_data: {
    [LANGUAGES.ru.code]: () => [
      '- Личные данные (ФИО, адрес электронной почты, номер телефона)<br />',
      '-Данные, автоматически передаваемые при использовании Сайта (IP-адрес, информация о браузере, файлы cookie)<br />',
    ],
    [LANGUAGES.en.code]: () => [
      '- Personal data (full name, email address, phone number)<br />',
      '- Data automatically transmitted when using the Website (IP address, browser information, cookies)<br />',
    ],
  },

  policy4Title: {
    [LANGUAGES.ru.code]: () => '4. Условия обработки персональных данных',
    [LANGUAGES.en.code]: () => '4. Personal data processing conditions',
  },
  policy4_1: {
    [LANGUAGES.ru.code]: () => '4.1. Обработка персональных данных осуществляется в соответствии с законодательством [ваша страна].',
    [LANGUAGES.en.code]: () => '4.1. Personal data processing is carried out in accordance with the legislation of [your country].',
  },
  policy4_2: {
    [LANGUAGES.ru.code]: () => '4.2. Сайт не передаёт персональные данные пользователей третьим лицам без их согласия, за исключением случаев, предусмотренных законодательством.',
    [LANGUAGES.en.code]: () => '4.2. The Website does not transfer users  personal data to third parties without their consent, except in cases provided for by law.',
  },
  policy4_3: {
    [LANGUAGES.ru.code]: () => '4.3. Пользователь может в любой момент отозвать своё согласие на обработку персональных данных, направив соответствующий запрос администрации Сайта.',
    [LANGUAGES.en.code]: () => '4.3. The User can revoke their consent to personal data processing at any time by sending a corresponding request to the Website administration.',
  },

  policy5Title: {
    [LANGUAGES.ru.code]: () => '5. Меры по защите персональных данных',
    [LANGUAGES.en.code]: () => '5. Personal data protection measures',
  },
  policy5_1: {
    [LANGUAGES.ru.code]: () => '5.1. Администрация Сайта принимает необходимые организационные и технические меры для защиты персональных данных пользователей от неправомерного доступа, утраты, уничтожения, изменения или разглашения.',
    [LANGUAGES.en.code]: () => '5.1. The Website administration takes necessary organizational and technical measures to protect users\' personal data from unauthorized access, loss, destruction, alteration, or disclosure.',
  },

  policy6Title: {
    [LANGUAGES.ru.code]: () => '6. Файлы cookie',
    [LANGUAGES.en.code]: () => '6. Cookies',
  },
  policy6_1: {
    [LANGUAGES.ru.code]: () => '6.1. Сайт использует файлы cookie для обеспечения его корректной работы, улучшения пользовательского опыта и анализа поведения пользователей.',
    [LANGUAGES.en.code]: () => '6.1. The Website uses cookies to ensure its correct operation, improve user experience, and analyze user behavior.',
  },
  policy6_2: {
    [LANGUAGES.ru.code]: () => '6.2. Пользователь может отключить файлы cookie в настройках браузера, однако это может повлиять на функциональность Сайта.',
    [LANGUAGES.en.code]: () => '6.2. The User can disable cookies in their browser settings, however, this may affect the Website\'s functionality.',
  },

  policy7Title: {
    [LANGUAGES.ru.code]: () => '7. Изменения в Политике конфиденциальности',
    [LANGUAGES.en.code]: () => '7. Changes to Privacy Policy',
  },
  policy7_1: {
    [LANGUAGES.ru.code]: () => '7.1. Администрация Сайта оставляет за собой право изменять настоящую Политику конфиденциальности.',
    [LANGUAGES.en.code]: () => '7.1. The Website administration reserves the right to modify this Privacy Policy.',
  },
  policy7_2: {
    [LANGUAGES.ru.code]: () => '7.2. Новая редакция Политики вступает в силу с момента её размещения на Сайте, если иное не предусмотрено новой редакцией.',
    [LANGUAGES.en.code]: () => '7.2. The new version of the Policy becomes effective from the moment of its placement on the Website, unless otherwise provided by the new version.',
  },

  policy8Title: {
    [LANGUAGES.ru.code]: () => '8. Контактная информация',
    [LANGUAGES.en.code]: () => '8. Contact information',
  },
  policy8_1: {
    [LANGUAGES.ru.code]: () => '8.1. По вопросам, связанным с Политикой конфиденциальности, пользователь может обратиться к администрации Сайта по адресу электронной почты: [email@example.com].',
    [LANGUAGES.en.code]: () => '8.1. For questions related to the Privacy Policy, the User can contact the Website administration at the email address: [email@example.com].',
  },

  policy9Title: {
    [LANGUAGES.ru.code]: () => '9. Согласие на обработку данных',
    [LANGUAGES.en.code]: () => '9. Consent to data processing',
  },
  policy9_1: {
    [LANGUAGES.ru.code]: () => '9.1. Продолжая использовать Сайт, пользователь подтверждает своё согласие с условиями настоящей Политики конфиденциальности.',
    [LANGUAGES.en.code]: () => '9.1. By continuing to use the Website, the User confirms their agreement with the terms of this Privacy Policy.',
  },

  empty: {
    [LANGUAGES.ru.code]: () => 'Пусто.',
    [LANGUAGES.en.code]: () => 'Not found.',
  },
  configurationsHistory: {
    [LANGUAGES.ru.code]: () => 'История конфигураций',
    [LANGUAGES.en.code]: () => 'Configurations history',
  },
  logout: {
    [LANGUAGES.ru.code]: () => 'Выйти',
    [LANGUAGES.en.code]: () => 'Logout',
  },
  myProjects: {
    [LANGUAGES.ru.code]: () => 'Мои проекты',
    [LANGUAGES.en.code]: () => 'My projects',
  },
  weInSocials: {
    [LANGUAGES.ru.code]: () => 'Мы в социальных сетях',
    [LANGUAGES.en.code]: () => 'Our social medias',
  },
  toAigWeb: {
    [LANGUAGES.ru.code]: () => 'На сайт AIG',
    [LANGUAGES.en.code]: () => 'To AIG webpage',
  },
  policy1: {
    [LANGUAGES.ru.code]: () => '© AIG 2025 г. Все права защищены',
    [LANGUAGES.en.code]: () => '© AIG 2025 y. All rights are reserved',
  },
  policy2: {
    [LANGUAGES.ru.code]: () => 'Политика конфиденциальности',
    [LANGUAGES.en.code]: () => 'Privacy policy',
  },
  configurator: {
    [LANGUAGES.ru.code]: () => 'Конфигуратор',
    [LANGUAGES.en.code]: () => 'Configurator',
  },
  instructions: {
    [LANGUAGES.ru.code]: () => 'Инструкция',
    [LANGUAGES.en.code]: () => 'Instructions',
  },
  contactUs: {
    [LANGUAGES.ru.code]: () => 'Связаться с нами',
    [LANGUAGES.en.code]: () => 'Contact us',
  },
  personalAccount: {
    [LANGUAGES.ru.code]: () => 'Личный кабинет',
    [LANGUAGES.en.code]: () => 'Account',
  },
  personalData: {
    [LANGUAGES.ru.code]: () => 'Личные данные',
    [LANGUAGES.en.code]: () => 'Personal data',
  },
  aboutConfigurator: {
    [LANGUAGES.ru.code]: () => 'О конфигураторе',
    [LANGUAGES.en.code]: () => 'About configurator',
  },
  registration: {
    [LANGUAGES.ru.code]: () => 'Регистрация',
    [LANGUAGES.en.code]: () => 'Registration',
  },
  register: {
    [LANGUAGES.ru.code]: () => 'Зарегистрироваться',
    [LANGUAGES.en.code]: () => 'Registration',
  },
  toLogin: {
    [LANGUAGES.ru.code]: () => 'Вход',
    [LANGUAGES.en.code]: () => 'Login',
  },
  login: {
    [LANGUAGES.ru.code]: () => 'Войти',
    [LANGUAGES.en.code]: () => 'Login',
  },
};
