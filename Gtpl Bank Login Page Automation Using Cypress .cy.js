/// Gtpl Bank Project

//  Valid Login

describe('Valid Login', () => {
  before(function () { cy.log('Start Valid Login Tests') });

  beforeEach(() => {
    cy.visit('https://demo.guru99.com/V1/')
  })

  it('Registered user should log in successfully', () => {
    cy.get('[name="uid"]')
      .type('mngr664178')
    cy.get('[name="password"]')
      .type('tUqYtAj')
    cy.get('[name="btnLogin"]')
      .click()
    
  })

  // it('Should verify password masking', () => {
  //   cy.get('[name="password"]')
  //     .should('be.visible')
  //     .should('have.attr', 'type', 'password')
  // })

  // it('Should login using Enter key', () => {
  //   cy.get('[name="uid"]').type('mngr664178')
  //   cy.get('[name="password"]').type('tUqYtAj{enter}')
  // })

  it('Should login after correcting invalid credentials', () => {
    cy.get('[name="uid"]').type('wrongUser')
    cy.get('[name="password"]').type('wrongPass')
    cy.get('[name="btnLogin"]').click()

    cy.get('[name="uid"]').clear().type('mngr664178')
    cy.get('[name="password"]').clear().type('tUqYtAj')
    cy.get('[name="btnLogin"]').click()
  })

  it('Should verify username field accepts valid input', () => {
    cy.get('[name="uid"]')
      .should('be.visible')
      .type('mngr664178')
      .should('have.value', 'mngr664178')
  })

  it('Should verify password field accepts valid input', () => {
    cy.get('[name="password"]')
      .should('be.visible')
      .type('tUqYtAj')
      .should('have.value', 'tUqYtAj')
  })

  it('Should verify login page loads successfully', () => {
    cy.get('[name="uid"]').should('be.visible')
    cy.get('[name="password"]').should('be.visible')
    cy.get('[name="btnLogin"]').should('be.visible')
  })

   it('Should verify trimming of leading and trailing spaces in username', () => {

    let button;
    cy.get('[name="uid"]').type('  mngr664178  ')
    cy.get('[name="password"]').type('tUqYtAj')
    cy.get('[name="btnLogin"]').then(($btn) => {
      button = $btn;
    }).click()

  })
})


// Invalid Login
describe('Invalid Login', () => {
  before(function () { cy.log('Start Invalid Login Tests') });

  beforeEach(() => {
    cy.visit('https://demo.guru99.com/V1/')
  })

  it('Should reject an invalid username', () => {
    cy.get('[name="uid"]')
      .should('be.visible')
      .type('mngr664ddd178')
    cy.get('[name="password"]').type('tUqYtAj')
    cy.get('[name="btnLogin"]')
      .should('be.visible')
      .click()
  })

  it('Should reject an incorrect password', () => {
    cy.get('[name="uid"]')
      .should('be.visible')
      .type('mngr664178')
    cy.get('[name="password"]').type('tUqYddtAjsss')
    cy.get('[name="btnLogin"]')
      .should('be.visible')
      .click()
  })

  it('Should fail when both credentials are incorrect', () => {
    cy.get('[name="uid"]')
      .should('be.visible')
      .type('mngr6ddd64178')
    cy.get('[name="password"]')
      .should('be.visible')
      .type('tUqYtAddddj')
    cy.get('[name="btnLogin"]')
      .should('be.visible')
      .click()
  })

  it('Should display error messages when both fields are empty', () => {
    cy.get('[name="uid"]')
      .should('be.visible')
      .type('')
    cy.get('[name="password"]')
      .should('be.visible')
      .type('')
    cy.get('[name="btnLogin"]')
      .should('be.visible')
      .click()
  })

  it('Should show error and block login when username field is empty', () => {
    cy.get('[name="uid"]').as('UserName')
      .should('be.visible')
      .type('')
    cy.get('[name="password"]').as('Password')
      .type('tUqYtAj')
    cy.get('[name="btnLogin"]').click()

    cy.url().then((url) => {
      if (url.includes('Managerhomepage')) {
        cy.log('Login successful!')
      } else {
        cy.log('Login failed!')
      }
    })
  })

  it('Should show error and block login when password field is empty', () => {
    cy.get('[name="uid"]').type('mngr664178')
    cy.get('[name="password"]')
      .should('be.visible')
      .type('')
    cy.get('[name="btnLogin"]').click()
  })

  it('Should verify login is case-sensitive for password', () => {
    cy.get('[name="uid"]').type('mngr664178')
    cy.get('[name="password"]').type('TUQYTAJ') // uppercase version of valid password
    cy.get('[name="btnLogin"]').click()
  })
})
