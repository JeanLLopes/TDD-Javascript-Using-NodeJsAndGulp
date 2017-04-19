var Arvore = require('../prod/Arvore');

describe('Arvore', function() {
    it('Deve possuir 5 Frutos', function() {
        expect(new Arvore().obterFrutos().length).toBe(5)
    })
})