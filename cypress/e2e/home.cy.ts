// https://on.cypress.io/api

describe('Home and Structure Tests', () => {
  it('renders the core site components correctly', () => {
    cy.visit('/')

    cy.contains('h1', 'feelyourprotocol')

    cy.get('nav').get('a').contains('Fusaka')

    cy.get('footer').get('a').contains('Imprint')
  })
})
