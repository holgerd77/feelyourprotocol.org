describe('EIP-7823 Component Tests', () => {
  let bytesLengthsExpected =
    '0000000000000000000000000000000000000000000000000000000000000001' +
    '0000000000000000000000000000000000000000000000000000000000000001' +
    '0000000000000000000000000000000000000000000000000000000000000001'
  const bytesValuesExpected = '030302'
  let bytesExpected = bytesLengthsExpected + bytesValuesExpected

  it('precompile component initializes correctly', () => {
    cy.visit('/eip-7883-modexp-gas-cost-increase')

    cy.contains('h1', 'feelyourprotocol')
    cy.contains('h3', 'ModExp')

    cy.get('#eip-7883-precompile-c textarea', { timeout: 10000 }).should(
      'have.value',
      bytesExpected,
    )
    cy.get('#eip-7883-precompile-c input').eq(0).should('have.value', '03')
    cy.get('#eip-7883-precompile-c input').eq(1).should('have.value', '03')
    cy.get('#eip-7883-precompile-c input').eq(2).should('have.value', '02')

    cy.get('.pre-hardfork').find('p').eq(0).should('include.text', '200 Gas')
    cy.get('.post-hardfork').find('p').eq(0).should('include.text', '500 Gas')
  })

  it('precompile component functionality', () => {
    cy.visit('/eip-7883-modexp-gas-cost-increase')

    bytesExpected = bytesLengthsExpected + '040402'
    cy.get('#eip-7883-precompile-c').within(() => {
      cy.get('input').eq(0).clear()
      cy.get('input').eq(1).clear()
      cy.get('input').eq(2).clear()
      cy.get('input').eq(0).type('04')
      cy.get('input').eq(1).type('04')
      cy.get('input').eq(2).type('02')
    })
    cy.get('textarea').should('have.value', bytesExpected)

    bytesLengthsExpected =
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000002' +
      '0000000000000000000000000000000000000000000000000000000000000002'
    bytesExpected = bytesLengthsExpected + '040404040202'
    cy.get('#eip-7883-precompile-c').within(() => {
      cy.get('input').eq(0).type('04')
      cy.get('input').eq(1).type('04')
      cy.get('input').eq(2).type('02')
    })
    cy.get('textarea').should('have.value', bytesExpected)

    cy.get('#eip-7883-precompile-c').within(() => {
      cy.get('input').eq(0).type('040404040404040404040404040404040404040404')
      cy.get('input').eq(1).type('040404040404040404040404040404040404040404')
      cy.get('input').eq(2).type('02')

      cy.get('.pre-hardfork').find('p').eq(0).should('include.text', '534 Gas')
      cy.get('.post-hardfork').find('p').eq(0).should('include.text', '2848 Gas')
    })
  })
})
