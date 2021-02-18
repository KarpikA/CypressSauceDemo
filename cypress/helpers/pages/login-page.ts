// TODO add data-test attributes to all elements
export const loginLogo = () => cy.get('.login_logo');
export const userNameInput = () => cy.get('[data-test="username"]');
export const userPasswordInput = () => cy.get('[data-test="password"]');
export const loginButton = () => cy.get('#login-button[type="submit"]');
export const loginCredentials = () => cy.contains('Accepted usernames are:');
export const passwordCredentials = () => cy.contains('Password for all users:')
export const errorHeader = () => cy.get('[data-test="error"]');
