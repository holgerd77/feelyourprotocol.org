// https://on.cypress.io/api

describe('Home and Structure Tests', () => {
  it('renders header and footer correctly', () => {
    cy.visit('/')

    cy.contains('h1', 'feelyourprotocol')
    cy.get('nav').get('a').contains('Fusaka')
    cy.get('footer').get('a').contains('Imprint')
  })

  it('menu items work correctly', () => {
    cy.visit('/')
    cy.get('nav').get('a').contains('Fusaka').click()
    cy.url().should('include', '/fusaka')

    cy.get('header').find('nav').find('select').select('EIP-7883')
    cy.url().should('include', '/eip-7883')

    cy.get('footer').find('a').contains('Imprint').click()
    cy.url().should('include', '/imprint')
  })

  it('home page renders correctly', () => {
    cy.visit('/')

    cy.get('main').get('div').contains("Let's have a dance.")
    cy.get('main').get('div').contains('Ethereum')
    cy.get('main').get('div').contains('For the Community.')

    cy.get('#latest-navi').find('li').its('length').should('be.gte', 1)
  })

  it('imprint page renders correctly', () => {
    cy.visit('/imprint')
    cy.contains('li', 'Midjourney')
    cy.contains('h3', 'CONTACT 👋')
  })
})
