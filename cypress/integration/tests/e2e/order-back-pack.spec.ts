import * as AppData from '../../../helpers/data/app-data';
import * as LoginHelper from '../../../helpers/login-helper.spec';
import { viewports } from '../../../helpers/viewports';


describe('Ordering items flow tests', () => {

    const backPackTitleText = 'Sauce Labs Backpack';
    const cartKey = 'cart-contents';
    const pageUrl = 'https://www.saucedemo.com/index.html'; // I would go direct to https://www.saucedemo.com/inventory.html with logged user.
    const cartUrl = '/cart.html';
    const checkoutStepOneUrl = '/checkout-step-one.html';
    const checkoutStepTwoUrl = '/checkout-step-two.html';
    const checkoutCompleteUrl = '/checkout-complete.html';

    const itemTitleLink = (text: string) => cy.contains(text);
    const itemButton = (text: string) => itemTitleLink(text).parentsUntil('.inventory_list').find('button');
    const firstNameInput = () => cy.get('[data-test="firstName"]');
    const lastNameInput = () => cy.get('[data-test="lastName"]')
    const postalCodeInput = () => cy.get('[data-test="postalCode"]')
    const checkoutButton = () => cy.contains('CHECKOUT');
    const continueButton = () => cy.get('[type="submit"]');
    const finishButton = () => cy.contains('FINISH');
    const completeText = () => cy.contains('THANK YOU FOR YOUR ORDER');


    beforeEach(() => {
        cy.visit(pageUrl);
    });

    viewports.forEach(viewport => {
        it(`[${viewport}] should add back pack and go through checkout`, () => {
            cy.viewport(viewport);
            LoginHelper.loginUser();

            // this is needed to make work test after rerun
            window.sessionStorage.removeItem(cartKey);

            itemTitleLink(backPackTitleText).should('be.visible');
            itemButton(backPackTitleText)
                .should('be.visible')
                .and('have.text', 'ADD TO CART')
                .click();
            itemButton(backPackTitleText).should('have.text', 'REMOVE');

            cy.visit(AppData.root + cartUrl)
            itemTitleLink(backPackTitleText).should('be.visible');
            itemTitleLink(backPackTitleText)
                .parentsUntil('.cart_item')
                .contains('29.99')
                .should('be.visible');
            checkoutButton().click();
            cy.url().should('eq', AppData.root + checkoutStepOneUrl);

            firstNameInput().should('be.visible').and('have.attr', 'placeholder', 'First Name');
            lastNameInput().should('be.visible').and('have.attr', 'placeholder', 'Last Name');
            postalCodeInput().should('be.visible').and('have.attr', 'placeholder', 'Zip/Postal Code');
            firstNameInput().type('fist'); //I believe it should be first but I'm following instructions :D you must let me know if it was typo or you just checking me
            lastNameInput().type('last');
            postalCodeInput().type('000');
            continueButton().click();
            cy.url().should('eq', AppData.root + checkoutStepTwoUrl);

            finishButton().should('be.visible').click();
            cy.url().should('eq', AppData.root + checkoutCompleteUrl);
            completeText().should('be.visible');
        });
    });
});
