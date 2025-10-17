import  * as login from '../../page-object/login.js'
import * as createUser from '../../page-object/createUser.js'

const password = 'teste1234';
const email = 'test@qaTest.com.br';

describe('Login', () => {
  beforeEach(() => {
    cy.request('GET', 'https://front.serverest.dev/login')
      .then((r) => {
          expect(r.status).to.eq(200)
    })
    cy.visit('https://front.serverest.dev/login')
  });

  it('Create new user', () =>{
    login.clickCadastrar();
    createUser.validateElement('cadastro')
    createUser.create('Test', email, password)
  });

  it('Do a login with the correct user and password', () => {
    login.doLogin(email, password)
  });

  it('Do a login with wrong credentials should see an error message', ()=>{
    login.wrongLogin('andreluiz21@gmail.com', 'Test12');
  });

})