import {doLogin} from '../../page-object/login.js'
import * as hp from '../../page-object/homepage.js'

describe('Validate the HomePage', () => {
    beforeEach(() => {
        cy.request('GET', 'https://front.serverest.dev/login')
        .then((r) => {
            expect(r.status).to.eq(200)
        })
        cy.visit('https://front.serverest.dev/login')
        doLogin('andreluiz217@gmail.com', 'Test1234')
    });

    it('Add a product to cart', () => {
        hp.searchProduct()
    });
});