import {doLogin, clickCadastrar} from '../../page-object/login.js'
import * as hp from '../../page-object/homepage.js'
import * as createUser from '../../page-object/createUser.js'

const email = 'test@testqa.com.br';
const senha = 'teste1234';
before(function () {
    cy.intercept('POST', '**/usuarios').as('createUser');
    cy.visit('https://front.serverest.dev/login');
    clickCadastrar();
    createUser.create('Test', email, senha)
    cy.wait('@createUser').then((intercept) => {
      expect(intercept.response.statusCode).to.be.oneOf([200, 201]);
      const userId = intercept.response.body._id;
      expect(userId).to.exist;
      Cypress.env('userId', userId);
    });
});

describe('Validate the HomePage', function () {
  beforeEach(function () {
    cy.request('GET', 'https://front.serverest.dev/login')
    .then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.visit('https://front.serverest.dev/login');
    doLogin(email, senha);
  });

  it('Add a product to cart', function () {
    hp.searchProduct();
  });
});

after(function () {
  cy.requestsFor({
    method: 'DELETE',
    url: `/usuarios/${Cypress.env('userId')}`,
    failOnStatusCode: false
  }).then((response) => {
    expect(response.body).to.have.property('message');
    expect(response.status).to.eq(200);
  });
});
