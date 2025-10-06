const nameField = '[data-testid="nome"]';
const emailField = '[data-testid="email"]';
const passwordField = '[data-testid="password"]';
const checkBox = '[data-testid="checkbox"]';
const btnCadastrar = '[data-testid="cadastrar"]';
const linkEntrar = '[data-testid="entrar"]';
const cadastro = '.font-robot';
const msgAlert = '.alert';

export const create = (name, password)=>{
    cy.get(nameField).type(name)
    cy.get(emailField).type(name+x+'@test.com');
    cy.get(passwordField).type(password);
    cy.get(btnCadastrar).click();
    validateElement('Sucesso');
}

function validateElement(element){
    const validate = {
        'cadastro': cadastro,
        'Entrar': linkEntrar,
        'Sucesso': msgAlert
    }[element]
    cy.get(validate, {timeout: 3000}).should('be.visible');
}
export { validateElement }


const x = Math.floor(Math.random() * 100);
