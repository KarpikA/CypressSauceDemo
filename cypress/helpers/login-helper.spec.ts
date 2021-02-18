import * as UserData from './data/user-data';
import * as Elements from './pages/login-page';

// it should be done by back-end side not front-end. Also it doesn't make sense to repeat same assertions in other tests. But due to the described test cases this solution makes most sense for me
export const loginUser = (username = UserData.users[0], password = UserData.password) => {
    Elements.userNameInput().type(username);
    Elements.userNameInput().should('have.attr', 'value', username);
    Elements.userPasswordInput().type(password);
    Elements.userNameInput().should('have.attr', 'value', username);
    Elements.loginButton().should('be.enabled'); //kind sensless because it's enabled for a whole time. If it shouldn't be enabled for empty userName/password we have a bug here.
    Elements.loginButton().click();

    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
    cy.window()
        .its("sessionStorage")
        .invoke("getItem", "session-username")
        .should("exist")
        .and('eq', username);
}
