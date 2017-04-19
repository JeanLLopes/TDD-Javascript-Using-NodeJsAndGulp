var gulp = required('gulp');
var jasmine = require('gulp-jasmine');

var caminhoDoCodigoFonte = 'src/**/*.js';

//testar: essa tarefa executa os testes 
//uma vez e termina;
gulp.task('Testar', function() {
    gulp.src(caminhoDoCodigoFonte).pipe(jasmine())
});


//tdd-continuo: essa tarefa executa os testes 
//uma vez e depois observa o sistema de arquivos 
//e re-executa os testes automaticamente a cada 
//modificação
gulp.task('Tdd-Continuo', ['Testar'], function() {
    gulp.watch(caminhoDoCodigoFonte, ['Testar']);
})


// O trecho process.on('uncaughtException') instrui o 
// Node.js a, ao invés de encerrar o programa na 
// ocorrência de exceções, apenas escrevê-las na 
// tela. Isso é útil para manter o Gulp rodando mesmo 
// em caso de erros de compilação. Essa solução é 
// aceitável nesse caso porque o Node está sendo usado 
// apenas como ferramenta auxiliar de desenvolvimento
process.on('uncaughtException', function(e) {
    console.error(e.stack);
    console.error(e.message);
})