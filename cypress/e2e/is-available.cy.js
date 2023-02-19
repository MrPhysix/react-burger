import '@4tw/cypress-drag-drop';

const url = 'http://localhost:3000';

describe('service is available', () => {
  // drag in to the constructor
  Cypress.Commands.add('dragIngredients', (ingredients) => {
    ingredients.forEach((item) => cy.get(item).drag('@constructor'));
  });

  // auth
  Cypress.Commands.add('auth', (login, password) => {
    cy.clearLocalStorage();
    cy.clearCookies();

    cy.get('@login-button').click();
    // cy.visit(`${url}/login`);

    cy.get('[data-cy="email"]').as('email');
    cy.get('[data-cy="password"]').as('password');

    cy.get('@email').type(login);
    cy.get('@password').type(password);

    cy.get('button').contains('Войти').click();
    cy.wait(300);
    cy.get('@constructor-button').click();
  });

  // start alias
  Cypress.Commands.add('aliasCheck', () => {
    cy.contains('Конструктор')
      .as('constructor-button');
    cy.contains('Личный кабинет')
      .as('login-button');
    cy.contains('Соберите бургер');
    cy.contains('Добавьте ингредиенты');
  });

  beforeEach(() => {
    cy.visit(url);
    cy.aliasCheck();
    cy.auth('pashashalaev777@gmail.com', 'pashashalaev777@gmail.com');

    //
    cy.get('[data-cy="ingredients-list"]').as('list');
    cy.get('[data-cy="constructor-target"]').as('constructor');
    cy.get('[data-cy="ingredient-card"]').as('ingredient');
    // cy.get('[data-cy="order-modal]').as('order-modal');

    cy.get('@ingredient')
      .contains('Краторная булка N-200i')
      .as('bun');
    cy.get('@ingredient')
      .contains('Хрустящие минеральные кольца')
      .as('ingredient1');
    cy.get('@ingredient')
      .contains('Сыр с астероидной плесенью')
      .as('ingredient2');
    cy.get('@ingredient')
      .contains('Соус Spicy-X')
      .as('ingredient3');
  });

  it('should have some ingredient', () => {
    cy.get('@list').should('be.not.empty');
    cy.get('@list').should('have.length.above', 0);
  });

  it('handle modal with correct ingredient info', () => {
    cy.get('@bun').click();
    cy.contains('Краторная булка N-200i');
    cy.contains('420');
    cy.get('[data-cy="close-button"]').as('close');
    cy.wait(300);
    cy.get('@close').click();
  });

  it('should drag ingredient to the constructor', () => {
    cy.dragIngredients(['@bun', '@ingredient1', '@ingredient2', '@ingredient3']);
  });

  it('should be draggable ingredients inside constructor', () => {
    cy.dragIngredients(['@bun', '@ingredient1', '@ingredient2', '@ingredient3']);
    cy.get('[data-cy="constructor-element"]').as('element');

    cy.get('@element')
      .contains('Краторная булка N-200i')
      .as('bun');
    cy.get('@element')
      .contains('Хрустящие минеральные кольца')
      .as('element1');
    cy.get('@element')
      .contains('Сыр с астероидной плесенью')
      .as('element2');
    cy.get('@element')
      .contains('Соус Spicy-X')
      .as('element3');

    cy.get('@element2').drag('@element1');
    cy.get('@element3').drag('@element2');
  });

  it('should remove ingredient in constructor', () => {
    cy.dragIngredients(['@bun', '@ingredient1', '@ingredient2', '@ingredient3']);
    cy.get('[data-cy="constructor-element"]').as('element');

    cy.get('span')
      .contains('Соус Spicy-X')
      .parent()
      .find('svg')
      .last()
      .click();

    cy.get('@element').eq(4).should('not.exist');
  });

  it('should make an order', () => {
    cy.dragIngredients(['@bun', '@ingredient1', '@ingredient2', '@ingredient3']);
    cy.get('button').contains('Оформить заказ').click();
    cy.wait(20000);
    cy.contains('идентификатор заказа');
    cy.contains('Ваш заказ начали готовить');
    cy.wait(300);
    cy.get('[data-cy="close-button"]').as('close');
    cy.get('@close').click();
  });

  after(() => {
    cy.aliasCheck();
  });
});
