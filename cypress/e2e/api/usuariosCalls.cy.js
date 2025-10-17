before(() => {
    cy.createsDeafultUser()
});
describe('Tests for Usuarios calls', () => {  
    describe('Tests scenarios for the POST call', () => { 
        it('Given we want a new user When we create it Them we should succeed', () =>{
            cy.createEmail().then((email) => {
                const password = 'teste';
                cy.request({
                    method: 'POST',
                    url: 'https://serverest.dev/usuarios',
                    body: JSON.stringify({
                        nome: 'Test',
                        email,
                        password,
                        administrador: 'false'
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    failOnStatusCode: false,
                    }).then((response) => {
                        cy.log(JSON.stringify(response))
                        console.log(JSON.stringify(response))
                        expect(response.status).to.be.oneOf([200, 201]);
                        expect(response.body).to.have.property('message')
                        expect(response.body).to.have.property('_id')
                });
            });
        });

        it('Given we try to create a user When we miss the Name then we should not succeed on creating the user', () =>{
            cy.requestsFor({
                method: 'POST',
                url: '/usuarios',
                body: {
                    email: "test@test.com",
                    password: "teste",
                    administrador: "false"
                },
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 401])
                expect(response.body).to.have.property('nome')
            });
        });

        it('Given we try to create a user without Administrador then we should not succeed', () =>{
            cy.requestsFor({
                method: 'POST',
                url: '/usuarios',
                body: {
                    nome: "Test",
                    email: "test@test.com",
                    password: "teste",
                },
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 401])
                expect(response.body).to.have.property('administrador')
            });
        });

        it('Given we try to create a user without Password then we should not succeed', () =>{
            cy.requestsFor({
                method: 'POST',
                url: '/usuarios',
                body: {
                    nome: "Test",
                    email: "test@test.com",
                    administrador: "false"
                },
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 401])
                expect(response.body).to.have.property('password')
            });
        });

        it('Given we try to create a user without Email then we should not succeed', () =>{
            cy.requestsFor({
                method: 'POST',
                url: '/usuarios',
                body: {
                    nome: "Test",
                    password: "teste",
                    administrador: "false"
                },
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 401]) 
                expect(response.body).to.have.property('email')
            });
        });
        
        it('Given we try to create a user with Empty body then we should not succeed', () =>{
            cy.requestsFor({
                method: 'POST',
                url: '/usuarios',
                body: {
                },
            }).then((response) => {
                expect(response.status).to.be.oneOf([400, 401])
                expect(response.body).to.have.property('email')
                expect(response.body).to.have.property('password')
                expect(response.body).to.have.property('nome')
                expect(response.body).to.have.property('administrador')
            });
        });

    });

    describe('Tests scenarios for the GET call', () => { 
        it('Given we create a user with the correct data then we should succeed', () =>{
            cy.requestsFor({
                method: 'GET',
                url: `/usuarios?_id=${Cypress.env('_id')}`
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 201])
                expect(response.body.usuarios[0]).to.have.property('nome')
                expect(response.body.usuarios[0]).to.have.property('email')
                expect(response.body.usuarios[0]).to.have.property('password')
                expect(response.body.usuarios[0]).to.have.property('administrador')
                expect(response.body.usuarios[0]).to.have.property('_id')
            });
            
        });

        it('Given we want to know all user When we call GET without the ids then we should see all users in the response', () =>{
            cy.requestsFor({
                method: 'GET',
                url: '/usuarios'
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 201])
                expect(response.body.usuarios).to.be.an('array').and.not.be.empty;
            });
            
        });
        
        it('Given a wrong data for a user When try to call it then we should see no data', () =>{
            cy.requestsFor({
                method: 'GET',
                url: '/usuarios?_id=test1234'
            }).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body.usuarios).to.be.an('array').and.be.empty;
            });
        });

    });

    describe('Test scenario for the simple DELETE call', () => {
        it('Given we have an already created user When we delete it then we should suceed', () => {
            cy.requestsFor({
                method: 'DELETE',
                url: `/usuarios/${Cypress.env('_id')}`
            }).then((response) => {
                expect(response.body).to.have.property('message')
                expect(response.status).to.eq(200)
            });
        });
    });
});