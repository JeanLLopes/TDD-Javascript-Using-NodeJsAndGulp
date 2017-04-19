function Arvore() {

}

Arvore.prototype.obterFrutos = function() {
    this._frutos = new Array(5);
    return this._frutos
}

module.exports = Arvore;