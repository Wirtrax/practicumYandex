const testUrl = 'http://localhost:5173';

// Селекторы конструктора
const CONSTRUCTOR_DROP_TARGET = '[data-testid="constructor-drop-target"]';
const CONSTRUCTOR_BUN_TOP = '[data-testid="constructor-bun-top"]';
const CONSTRUCTOR_BUN_BOTTOM = '[data-testid="constructor-bun-bottom"]';
const CONSTRUCTOR_INGREDIENT = '[data-testid^="constructor-ingredient"]';

// Селекторы ингредиентов
const INGREDIENT_ITEM = '[data-testid^="ingredient-item"]';
const MAIN_INGREDIENT = '[data-type^="main"]';

// Селекторы модального окна
const MODAL_CONTAINER = '[data-testid="modal-container"]';
const MODAL_CLOSE_BUTTON = '[data-testid="modal-close-button"]';
const MODAL_OVERLAY = '[data-testid="modal-overlay"]';

// Селекторы деталей ингредиента
const INGREDIENT_DETAILS_NAME = '[data-testid="ingredient-details-name"]';
const INGREDIENT_DETAILS_IMAGE = '[data-testid="ingredient-details-image"]';
const INGREDIENT_DETAILS_CALORIES = '[data-testid="ingredient-details-calories"]';
const INGREDIENT_DETAILS_PROTEIN = '[data-testid="ingredient-details-protein"]';
const INGREDIENT_DETAILS_FAT = '[data-testid="ingredient-details-fat"]';
const INGREDIENT_DETAILS_CARBOHYDRATES = '[data-testid="ingredient-details-carbohydrates"]';

// Другие селекторы
const TOTAL_PRICE = '[data-testid="total-price"]';
const ORDER_BUTTON = '[data-testid="order-button"]';
const LOADER = '[data-testid="loader"]';

describe('Burger Constructor', () => {
    beforeEach(() => {
        cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
            fixture: 'ingredients.json',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).as('getIngredients');

        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
            fixture: 'order.json',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).as('createOrder');

        cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
            statusCode: 200,
            body: {
                success: true,
                user: {
                    email: "test@example.com",
                    name: "Test User",
                    password: '1212'
                }
            },
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).as('getUser');

        cy.setCookie('accessToken', 'test-token');

        cy.visit(testUrl);
        cy.wait('@getIngredients');
        cy.wait('@getUser');
    });

    it('should display empty constructor initially', () => {
        cy.get(CONSTRUCTOR_DROP_TARGET).should('exist');
        cy.get(CONSTRUCTOR_BUN_TOP).should('not.exist');
        cy.get(CONSTRUCTOR_BUN_BOTTOM).should('not.exist');
        cy.get(CONSTRUCTOR_INGREDIENT).should('not.exist');
    });

    it('should allow dragging and dropping ingredients', () => {
        // Ждем появления ингредиентов
        cy.get(INGREDIENT_ITEM).should('have.length.gt', 0);

        // Находим булку 
        cy.get(INGREDIENT_ITEM).first().as('bun');

        // Перетаскиваем булку
        cy.get('@bun').trigger('dragstart');
        cy.get(CONSTRUCTOR_DROP_TARGET).trigger('drop');

        // Проверяем что булка добавилась
        cy.get(CONSTRUCTOR_BUN_TOP).should('exist');
        cy.get(CONSTRUCTOR_BUN_BOTTOM).should('exist');

        // Находим основной ингредиент 
        cy.get(MAIN_INGREDIENT).as('mainIngredient');

        // Перетаскиваем основной ингредиент
        cy.get('@mainIngredient').trigger('dragstart');
        cy.get(CONSTRUCTOR_DROP_TARGET).trigger('drop');

        // Проверяем что ингредиент добавился
        cy.get(CONSTRUCTOR_INGREDIENT).should('have.length', 1);
    });

    it('should calculate total price correctly', () => {
        // Ждем появления ингредиентов
        cy.get(INGREDIENT_ITEM).should('have.length.gt', 0);

        // Добавляем булку
        cy.get(INGREDIENT_ITEM).first().trigger('dragstart');
        cy.get(CONSTRUCTOR_DROP_TARGET).trigger('drop');

        // Добавляем основной ингредиент
        cy.get(INGREDIENT_ITEM).not('[data-type="bun"]').first().trigger('dragstart');
        cy.get(CONSTRUCTOR_DROP_TARGET).trigger('drop');

        // Получаем цены 
        cy.fixture('ingredients.json').then((ingredients) => {
            const bunPrice = ingredients.data.find(i => i.type === 'bun').price * 2;
            const mainPrice = ingredients.data.find(i => i.type !== 'bun').price;
            const expectedTotal = bunPrice + mainPrice;

            cy.get(TOTAL_PRICE).should('contain', expectedTotal);
        });
    });

    it('should open ingredient modal when clicking on ingredient', () => {
        // Проверяем что модального окна изначально нет
        cy.get(MODAL_CONTAINER).should('not.exist');

        // Кликаем на первый ингредиент
        cy.get(INGREDIENT_ITEM).first().click();

        // Проверяем что модальное окно открылось
        cy.get(MODAL_CONTAINER, { timeout: 10000 })
            .should('exist')
            .and('be.visible');

        // Проверяем содержимое модального окна
        cy.get(MODAL_CONTAINER).within(() => {
            cy.get(INGREDIENT_DETAILS_NAME).should('exist');
            cy.get(INGREDIENT_DETAILS_IMAGE).should('exist');
            cy.get(INGREDIENT_DETAILS_CALORIES).should('exist');
            cy.get(INGREDIENT_DETAILS_PROTEIN).should('exist');
            cy.get(INGREDIENT_DETAILS_FAT).should('exist');
            cy.get(INGREDIENT_DETAILS_CARBOHYDRATES).should('exist');
        });
    });

    it('should close ingredient modal when clicking close button', () => {
        // Открываем модальное окно
        cy.get(INGREDIENT_ITEM).first().click();
        cy.get(MODAL_CONTAINER).should('exist');

        // Закрываем через кнопку
        cy.get(MODAL_CLOSE_BUTTON).click();
        cy.get(MODAL_CONTAINER).should('not.exist');
    });

    it('should close ingredient modal when clicking overlay', () => {
        // Открываем модальное окно
        cy.get(INGREDIENT_ITEM).first().click();
        cy.get(MODAL_CONTAINER).should('exist');

        // Закрываем через оверлей
        cy.get(MODAL_OVERLAY).click({ force: true });
        cy.get(MODAL_CONTAINER).should('not.exist');
    });

    it('should close ingredient modal when pressing ESC', () => {
        // Открываем модальное окно
        cy.get(INGREDIENT_ITEM).first().click();
        cy.get(MODAL_CONTAINER).should('exist');

        // Закрываем через ESC
        cy.get('body').type('{esc}');
        cy.get(MODAL_CONTAINER).should('not.exist');
    });

    it('should show loader while order is processing', () => {
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
            delay: 1000,
            fixture: 'order.json',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).as('createOrderDelayed');

        // Создаем тестовый заказ
        cy.get(INGREDIENT_ITEM).first().trigger('dragstart');
        cy.get(CONSTRUCTOR_DROP_TARGET).trigger('drop');
        cy.get(ORDER_BUTTON).click();

        // Проверяем что лоадер отображается
        cy.get(LOADER).should('exist');
        cy.get(ORDER_BUTTON).should('contain', 'Создание заказа...');

        // Дожидаемся завершения
        cy.wait('@createOrderDelayed');
        cy.get(LOADER).should('not.exist');
    });
});