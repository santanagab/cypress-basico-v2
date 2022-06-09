/// <reference types = "Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('Verifica o título da aplicação', function() {
        cy.title()
            .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preenche os campos obrigatórios e envia formulário', () => {
        cy.get('#firstName')
            .should('be.visible')
            .type('Benedito')
        cy.get('#lastName')
            .should('be.visible')
            .type('Beleléu')
        cy.get('#email')
            .should('be.visible')
            .type('ditobeleleu@email.com')
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor.', { delay: 0 })
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.success')
            .should('be.visible')

    });

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName')
            .should('be.visible')
            .type('Benedito')
        cy.get('#lastName')
            .should('be.visible')
            .type('Beleléu')
        cy.get('#email')
            .should('be.visible')
            .type('ditobeleleuemail.com')
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor.')
        cy.get('button[type="submit"]')
            .should('be.visible')
            .click()
        cy.get('.error')
            .should('be.visible')
    });

    it('Testando campo telefónico preenchido com valor não numérico', () => {
        cy.get('#phone')
            .type('abcdefgh')
            .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName')
            .should('be.visible')
            .type('Benedito')
        cy.get('#lastName')
            .should('be.visible')
            .type('Beleléu')
        cy.get('#email')
            .should('be.visible')
            .type('ditobeleleu@email.com')
        cy.get('#phone-checkbox')
            .click()
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor.')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Benedito')
            .should('have.value', 'Benedito')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Beleléu')
            .should('have.value', 'Beleléu')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('ditobeleleu@email.com')
            .should('have.value', 'ditobeleleu@email.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('139913131322')
            .should('have.value', '139913131322')
            .clear()
            .should('have.value', '')
    });
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });
    it('envia o formulário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success')
            .should('be.visible')

    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')

    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário 2.0', () => {
        cy.get('#firstName')
            .should('be.visible')
            .type('Benedito')
        cy.get('#lastName')
            .should('be.visible')
            .type('Beleléu')
        cy.get('#email')
            .should('be.visible')
            .type('ditobeleleu@email.com')
        cy.get('#phone-checkbox')
            .check()
        cy.get('#open-text-area')
            .should('be.visible')
            .type('Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor.')
        cy.contains('button', 'Enviar')
            .click()
        cy.get('.error')
            .should('be.visible')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });
    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
    });
    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
            .should('be.visible')
    });
})