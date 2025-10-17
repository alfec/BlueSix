Cypress.Commands.add('requestsFor', (options) => {
  const defaultOpt = {
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  }
  return cy.request({ ...defaultOpt, ...options });
})

Cypress.Commands.add('createsDeafultUser', () => {
  const password = 'teste';
  cy.createEmail().then((email) => {
    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: JSON.stringify({
        nome: 'Test',
        email,
        password,
        administrador: 'false'
      }),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
      expect(response.body).to.have.property('message')
      expect(response.body).to.have.property('_id')
      Cypress.env('defaultEmail', email);
      Cypress.env('defaultPassword', password);
      const _id = response.body._id
      Cypress.env('_id', _id);
      cy.wrap(_id).as('UserId')
    });
  });
});

Cypress.Commands.add('createEmail', () => {
  const x = Math.floor(Math.random() * 10000);
  return `test_${x}@qa.com.br`;;
});