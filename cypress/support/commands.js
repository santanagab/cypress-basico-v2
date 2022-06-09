Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Benedito')
    cy.get('#lastName').type('Beleléu')
    cy.get('#email').type('ditobeleleu@email.com')
    cy.get('#open-text-area').type('Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor.')
    cy.contains('button', 'Enviar').click()
})