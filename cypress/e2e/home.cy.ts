// https://on.cypress.io/api

describe('Home and Structure Tests', () => {
  it('renders the core site components correctly', () => {
    cy.visit('/')

    cy.contains('h1', 'feelyourprotocol.org')

    cy.get('nav').get('a').contains('Fusaka')

    cy.get('footer').get('a').contains('Imprint')
  })

  it('displays the key components of the home page', () => {
    cy.visit('/')

    cy.get('main').contains('h3', 'Hello. You have found it!')
  })
})
