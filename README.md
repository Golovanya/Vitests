<h1>Тестовое задание в команду ОРД VK</h1>

<h3>Описание:</h3>
<p>
  В приложении существует форма редактирования контрагента. Контрагент может
  быть отечественным или иностранным (булевое поле isForeigh), физическим лицом
  или юридическим (булевое поле isJuridical), а также имеет строковые поля title
  (название/имя) и tin (ИНН). На сервере данные представляются в другом виде.
  Для отечественных контрагентов ИНН должен быть указан в поле tin, для
  иностранных — в поле foreign_tin. Имя физического лица должно быть указано в
  поле name, название юридического лица — в поле company_title. Поле тип должно
  содержать один из вариантов: "juridical", "physical", "foreign_juridical" или
  "foreign_physical". При этом все поля должны присутствовать в объекте.
  Незаполненные поля должны иметь значение null. Валидация полей происходит до
  конвертации, так что можем предполагать, что в функцию приходят точно валидные
  данные.
</p>
<h3>Необходимо:</h3>
<p>
  Составить unit-тесты для библиотеки Jest или Vitest, которые покрывали бы как
  можно больше разных случаев. Желательно - все случаи преобразования.
</p>
<h3>Исходная функция:</h3>

```javascript
const formFormToServer = (personInForm) => ({
    type: [
      personInForm.isForeign ? null : "foreign",
      personInForm.isJuridical ? "juridical" : "physical",
    ]
      .filter(Boolean)
      .join("_"),
    tin: personInForm.isForeigh ? null : personInForm.tin,
    name: personInForm.isJuridical ? null : personInForm.title,
    foreign_tin: personInForm.isForeign ? personInForm.tin : null,
    company_title: personInForm.isJuridical ? personInForm.title : null,
  });
```

<h2>Ход решения</h2>
<p>Задание решал, используя инструмент Vitest. Написал тесты на все базовые случаи, а также на уязвимость к XSS атакам. Для написания тестов использовался метод describe.each(), этот метод используется если у вас есть более одного теста, зависящего от одних и тех же данных. Тестовые случаи в отдельном файле ./TestCases.js</p>
<p>Для генерации отчетов и интерпретации  результатов используется удобный визуальный интерфейс Vitest UI, после запуска тестов будет доступна веб-страница с отчетами</p>

<p>При тесте функции все тесты упали:</p>
<img src="./images/firstfunctionreport.png">
<br>
<p>В результате были выявлены следующие баги:</p>

```javascript
const formFormToServer = (personInForm) => ({
    type: [
      personInForm.isForeign ? null : "foreign", // ошибка: null и "foreign" необходимо поменять местами
      personInForm.isJuridical ? "juridical" : "physical",
    ]
      .filter(Boolean)
      .join("_"),
    tin: personInForm.isForeigh ? null : personInForm.tin, // ошибка: isForeigh на конце h вместо n
    name: personInForm.isJuridical ? null : personInForm.title,    
    foreign_tin: personInForm.isForeign ? personInForm.tin : null,
    company_title: personInForm.isJuridical ? personInForm.title : null,
  });
  // а также
  // если поле не заполнено или пустая строка, значение не будет null
  // если недобросовестный пользователь будет пытаться вставить скрипт в поле, функция отработает
```
<p>После падения тестов, отредактировал функцию, чтобы она работала корректно:</p>

```javascript
const fixedFunction = (personInForm) => {
  if (personInForm.title && personInForm.tin){
   if (personInForm.title.includes("<script>") && personInForm.tin.includes("<script>")){
    return false
   }  // проверка наличия тега Script }
  }
  return {type: [
    personInForm.isForeign ?"foreign"  : null, // поменял местами null и foreign 
    personInForm.isJuridical ? "juridical" : "physical",
  ]
    .filter(Boolean)
    .join("_"),
  tin: personInForm.isForeign ? null : personInForm.tin,  // исправил окончание
  name: personInForm.isJuridical ? null : personInForm.title,
  foreign_tin: personInForm.isForeign ? (personInForm.tin ? personInForm.tin : null) : null , //  если приходит пустая строка или undefind возвращается null
  company_title: personInForm.isJuridical ? (personInForm.title? personInForm.title : null) : null,} //  если приходит пустая строка или undefind возвращается null
} 
```

<b>Для запуска тестов необходимо</b>
+ клонировать репозиторий
+ установить зависимости npm install
+ запустить тесты npm run test
+ посмотреть результаты на http://localhost:51204/__vitest__/ (тесты запускаются и для старой и для исправленной функции)


