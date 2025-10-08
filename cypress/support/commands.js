Cypress.Commands.add('requestsFor', (options) => {
  const defaultOpt = {
    failOnStatusCode: false,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    }
  }
  return cy.request({ ...defaultOpt, ...options })
})