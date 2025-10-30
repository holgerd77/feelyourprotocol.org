describe('EIP-7823 Component Tests', () => {
  it('checks if the precompile component works', () => {
    cy.visit('/fusaka')
    cy.contains('h1', 'feelyourprotocol')
    cy.contains('h3', 'ModExp')
    /*const bytesExpected =
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '0000000000000000000000000000000000000000000000000000000000000001' +
      '030302'
    cy.get('textarea', { timeout: 10000 }).should('have.value', bytesExpected)*/
  })
})
