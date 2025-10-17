const navbar = '#navbarTogglerDemo01';
const searchField = '[data-testid="pesquisar"]';
const productTable = ':nth-child(1) > .row';
const btnHome = '[data-testid="home"]'
const btnLista = '[data-testid="lista-de-compras"]'
const btnCarrinho = '[data-testid="carrinho"]'
const btnLogout = '[data-testid="logout"]'
const btnsearch = '[data-testid="botaoPesquisar"]'
const msgNoProduct = '#root > div > div > div.container-fluid'
const productItem = ' div > section'

function validateElement(element){
    const choose = {
        'navbar': navbar,
        'buscador': searchField,
        'tabela': productTable
    }[element]
    cy.get(choose).should('be.visible');
}
export { validateElement }

export const clickBtn = (button) =>{
    const btn ={
        'Home': btnHome,
        'Lista': btnLista,
        'Carrinho': btnCarrinho,
        'Logout': btnLogout,
        'Pesquisar': btnsearch,
    }[button]
    cy.get(btn).click()
}

export const searchProduct = () =>{
    cy.get(searchField).type('Logitech')
    clickBtn('Pesquisar')
    cy.get(productItem).should('be.visible')
}