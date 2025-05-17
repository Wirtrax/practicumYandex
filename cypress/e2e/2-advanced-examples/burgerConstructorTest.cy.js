/// <reference types="cypress" />

describe('Burger Constructor', () => {
    beforeEach(() => {
        // Мокаем API запросы
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

        // Мокаем запрос пользователя, так как видим 403 ошибки
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

        // Устанавливаем тестовые куки
        cy.setCookie('accessToken', 'test-token');

        cy.visit('http://localhost:5173');
        cy.wait('@getIngredients');
        cy.wait('@getUser');
    });

    it('should display empty constructor initially', () => {
        cy.get('[data-testid="constructor-drop-target"]').should('exist');
        cy.get('[data-testid="constructor-bun-top"]').should('not.exist');
        cy.get('[data-testid="constructor-bun-bottom"]').should('not.exist');
        cy.get('[data-testid^="constructor-ingredient"]').should('not.exist');
    });

    it('should allow dragging and dropping ingredients', () => {
        // Ждем появления ингредиентов
        cy.get('[data-testid^="ingredient-item"]').should('have.length.gt', 0);

        // Находим булку (первую в списке с типом bun)
        cy.get('[data-testid^="ingredient-item"]').first().as('bun');

        // Перетаскиваем булку
        cy.get('@bun').trigger('dragstart');
        cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

        // Проверяем что булка добавилась
        cy.get('[data-testid="constructor-bun-top"]').should('exist');
        cy.get('[data-testid="constructor-bun-bottom"]').should('exist');

        // Находим основной ингредиент (первый не булка)
        cy.get('[data-type^="main"]').as('mainIngredient');

        // Перетаскиваем основной ингредиент
        cy.get('@mainIngredient').trigger('dragstart');
        cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

        // Проверяем что ингредиент добавился
        cy.get('[data-testid^="constructor-ingredient"]').should('have.length', 1);
    });

    it('should calculate total price correctly', () => {
        // Ждем появления ингредиентов
        cy.get('[data-testid^="ingredient-item"]').should('have.length.gt', 0);

        // Добавляем булку
        cy.get('[data-testid^="ingredient-item"]').first().trigger('dragstart');
        cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

        // Добавляем основной ингредиент
        cy.get('[data-testid^="ingredient-item"]').not('[data-type="bun"]').first().trigger('dragstart');
        cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

        // Получаем цены из фикстур и вычисляем ожидаемую сумму
        cy.fixture('ingredients.json').then((ingredients) => {
            const bunPrice = ingredients.data.find(i => i.type === 'bun').price * 2;
            const mainPrice = ingredients.data.find(i => i.type !== 'bun').price;
            const expectedTotal = bunPrice + mainPrice;

            cy.get('[data-testid="total-price"]').should('contain', expectedTotal);
        });
    });

    it('should open ingredient modal when clicking on ingredient', () => {
        // Проверяем что модального окна изначально нет
        cy.get('[data-testid="modal-container"]').should('not.exist');

        // Кликаем на первый ингредиент
        cy.get('[data-testid^="ingredient-item"]').first().click();

        // Проверяем что модальное окно открылось
        cy.get('[data-testid="modal-container"]', { timeout: 10000 })
            .should('exist')
            .and('be.visible');

        // Проверяем содержимое модального окна
        cy.get('[data-testid="modal-container"]').within(() => {
            cy.get('[data-testid="ingredient-details-name"]').should('exist');
            cy.get('[data-testid="ingredient-details-image"]').should('exist');
            cy.get('[data-testid="ingredient-details-calories"]').should('exist');
            cy.get('[data-testid="ingredient-details-protein"]').should('exist');
            cy.get('[data-testid="ingredient-details-fat"]').should('exist');
            cy.get('[data-testid="ingredient-details-carbohydrates"]').should('exist');
        });
    });

    it('should close ingredient modal when clicking close button', () => {
        // Открываем модальное окно
        cy.get('[data-testid^="ingredient-item"]').first().click();
        cy.get('[data-testid="modal-container"]').should('exist');

        // Закрываем через кнопку
        cy.get('[data-testid="modal-close-button"]').click();
        cy.get('[data-testid="modal-container"]').should('not.exist');
    });

    it('should close ingredient modal when clicking overlay', () => {
        // Открываем модальное окно
        cy.get('[data-testid^="ingredient-item"]').first().click();
        cy.get('[data-testid="modal-container"]').should('exist');

        // Закрываем через оверлей
        cy.get('[data-testid="modal-overlay"]').click({ force: true });
        cy.get('[data-testid="modal-container"]').should('not.exist');
    });

    it('should close ingredient modal when pressing ESC', () => {
        // Открываем модальное окно
        cy.get('[data-testid^="ingredient-item"]').first().click();
        cy.get('[data-testid="modal-container"]').should('exist');

        // Закрываем через ESC
        cy.get('body').type('{esc}');
        cy.get('[data-testid="modal-container"]').should('not.exist');
    });


    it('should show loader while order is processing', () => {
        // Задерживаем ответ API для тестирования лоадера
        cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
            delay: 1000,
            fixture: 'order.json',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).as('createOrderDelayed');

        // Создаем тестовый заказ
        cy.get('[data-testid^="ingredient-item"]').first().trigger('dragstart');
        cy.get('[data-testid="constructor-drop-target"]').trigger('drop');
        cy.get('[data-testid="order-button"]').click();

        // Проверяем что лоадер отображается
        cy.get('[data-testid="loader"]').should('exist');
        cy.get('[data-testid="order-button"]').should('contain', 'Создание заказа...');

        // Дожидаемся завершения
        cy.wait('@createOrderDelayed');
        cy.get('[data-testid="loader"]').should('not.exist');
    });
});