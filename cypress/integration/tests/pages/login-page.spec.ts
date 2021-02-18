import * as UserData from '../../../helpers/data/user-data';
import * as LoginHelper from '../../../helpers/login-helper.spec';
import * as Elements from '../../../helpers/pages/login-page';
import { viewports } from '../../../helpers/viewports';

describe('Login page tests', () => {

    const pageUrl = 'https://www.saucedemo.com/index.html';

    beforeEach(() => {
        cy.visit(pageUrl);
    });

    viewports.forEach(viewport => {
        it(`[${viewport}] should validate page content`, () => {
            cy.viewport(viewport);
            cy.url().should('eq', pageUrl);
            Elements.loginLogo().should('be.visible');
            Elements.userNameInput().should('be.visible').and('have.attr', 'placeholder', 'Username');
            Elements.userPasswordInput().should('be.visible').and('have.attr', 'placeholder', 'Password');
            Elements.loginButton().should('be.visible').and('have.attr', 'value', 'LOGIN');
            Elements.loginCredentials().should('be.visible');
            UserData.users.forEach(user => {
                /* alternative approach is just to use id=login_credentials but both aren't so good. Getting element by contains is a little bit more in line with cypress docs,
                but referencing to parent is not. We are dependent on DOM structure.*/
                Elements.loginCredentials().parent().should('contain', user);
            });
            Elements.passwordCredentials().should('be.visible');
            Elements.passwordCredentials().parent().should('contain', UserData.password);
        });

        it(`[${viewport}] should sumbit empty form and show error`, () => {
            Elements.loginButton().click();
            Elements.errorHeader().should('be.visible');
            Elements.errorHeader().find('button').should('be.visible');
            Elements.errorHeader().should('have.text', 'Epic sadface: Username is required');
        });

        it(`[${viewport}] should sumbit valid form and let user in`, () => {
            LoginHelper.loginUser();
        });
    });
});
