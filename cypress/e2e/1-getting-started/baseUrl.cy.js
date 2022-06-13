/*
    https://docs.cypress.io/guides/guides/environment-variables#Option-2-cypress-env-json

    We've got a buggo! According to the docs...
    "You can create your own cypress.env.json file that Cypress will automatically check. Values in here will overwrite conflicting environment variables in your Cypress configuration."

    However these tests demonstrate that 
*/

context('base url', () => {
    it('has conflicting values for baseUrl', () => {
        const env = Cypress.env() // set in cypress.env.json
        const config = Cypress.config() // set in cypress.config.js

        expect(env).to.have.property('baseUrl', 'https://google.com/')
        expect(config).to.have.property('baseUrl', 'https://example.cypress.io/')
    })
  
    it('baseUrl in cypress.env.json overrides cypress.config.js with cy.visit', () => {
      cy.visit('/')
      cy.url().should('equal', Cypress.env().baseUrl)
    })
  
    it('baseUrl in cypress.env.json overrides cypress.config.js with cy.request', () => {
        cy.request('/').should((response) => {
        expect(response.status).to.equal(200)
        expect(response.allRequestResponses[0]).to.have.property('Request URL', Cypress.env().baseUrl)
      })
    })
  })