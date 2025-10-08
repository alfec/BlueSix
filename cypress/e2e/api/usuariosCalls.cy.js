import createEmail from '../../page-object/createUser'
describe('Tests for Usuarios calls', () => {  
    describe('Tests scenarios for the POST call', () => { 
        it('Given have user data When we create a user this data then we should succeed', () =>{
            cy.requestsFor({
                method: 'POST',
                url: '/usuarios',
                body: {
                    nome: "Test",
                    email: createEmail(),
                    password: "teste",
                    administrador: "false"
                },
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 201])
                expect(response.body).to.have.property('message')
                expect(response.body).to.have.property('_id')
                //expect(response.duration).to.be.lessThan(??) Necessario saber qual o valor aceitavel do tempo de resposta

                const _id = response.body._id
                cy.wrap(_id).as('UserId')
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
                method: 'POST',
                url: '/usuarios',
                body: {
                    nome: "Test",
                    email: "test12345@test.com",
                    password: "teste",
                    administrador: "false"
                },
            }).then((response) => {
                expect(response.status).to.be.oneOf([200, 201])
                expect(response.body).to.have.property('message')
                expect(response.body).to.have.property('_id')

                const _id = response.body._id
                cy.wrap(_id).as('UserId')
            });
        });

        it('Given we try to create a user without Name then we should not succeed', () =>{
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

    });

    describe('Test scenario for the simple DELETE call', () => {
        it('Given we have an already created user When we delete it then we should suceed', () => {
            cy.requestsFor('DELETE', `/usuarios/${_id}`)
        });
    });
});