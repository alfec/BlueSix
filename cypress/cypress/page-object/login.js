import {validateElement} from './homepage';
const emailField = '[data-testid="email"]';
const passwordField = '[data-testid="senha"]';
const btnEntrar = '[data-testid="entrar"]';
const linkCadastro = '[data-testid="cadastrar"]';
const msgError = '.alert';

export const doLogin = (email, password)=>{
    cy.get(emailField).type(email);
    cy.get(passwordField).type(password);
    cy.get(btnEntrar).click();

    validateElement('buscador');
}

export const clickCadastrar = () =>{
    cy.get(linkCadastro).click();
}

export const wrongLogin = (email, password) => {
    cy.get(emailField).type(email);
    cy.get(passwordField).type(password);
    cy.get(btnEntrar).click();
    cy.get(msgError, {timeout: 3000}).should('be.visible');
}