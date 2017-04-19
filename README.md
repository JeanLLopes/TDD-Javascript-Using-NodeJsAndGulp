<section id="div_conteudo">
<h3>TDD Contínuo: responsividade</h3>

<p>Praticar TDD Contínuo significa que você verá o resultado da execução
dos testes do seu projeto sem precisar sair do ambiente de desenvolvimento e
executar um comando específico. O comando será executado automaticamente assim
que você salvar o arquivo que estiver editando. Configure seu ambiente usando
as ferramentas descritas neste artigo e perceba a diferença em sua
produtividade.</p>

<p>O <strong>Node.js</strong> é um ambiente de execução JavaScript
que roda diretamente sobre o sistema operacional, <a href="http://www.devmedia.com.br/construindo-um-servidor-web-com-node-js/32023" target="_blank">geralmente em servidores</a>. Ele
permite executar o código JavaScript fora do navegador, ampliando a abrangência
da linguagem.</p>

<p>O <strong>NPM (Node Package Manager)</strong> é o gerenciador de
pacotes do Node. Ele facilita o download e a instalação de bibliotecas e
ferramentas de terceiros. É similar ao <a href="http://www.devmedia.com.br/gerenciando-dependencias-em-projetos-net-com-a-extensao-nuget/28196" target="_blank">NuGet (.NET)</a>, ao <a href="http://www.devmedia.com.br/curso/curso-de-maven-framework/419" target="_blank">Maven (Java)</a> e ao
RubyGems (<a href="http://www.devmedia.com.br/introducao-ao-framework-ruby-on-rails/31285" target="_blank">Ruby</a>).</p>

<p>Já o <a href="http://www.devmedia.com.br/testes-com-jasmine-melhore-a-qualidade-do-javascript/26957" target="_blank"><strong>Jasmine</strong></a> é um framework para
execução de testes automatizados que pode ser usado em qualquer ambiente
JavaScript, seja dentro ou fora do navegador. Ele permite especificar o
comportamento esperado de um sistema da mesma maneira que a ferramenta rspec
(Ruby).</p>

<p>O <strong>Gulp</strong> é uma ferramenta de
automação de construção de projetos, assim como Make (C), Ant e Maven (Java) e
Rake (Ruby). O Gulp possibilita escrever scripts para executar tarefas comuns
no mundo JavaScript, como ofuscar e minificar arquivos, converter de <a href="http://www.devmedia.com.br/sass-css-pre-processado-na-pratica/32022" target="_blank">SASS/LESS</a>
para CSS e converter de <a href="http://www.devmedia.com.br/grunt-js-criando-um-sistema-escolar-com-grunt-e-coffeescript/32189" target="_blank">CoffeeScript</a> para JavaScript. No contexto do TDD Contínuo,
o Gulp é útil para observar o sistema de arquivos e disparar a execução dos
testes quando ocorrerem mudanças em arquivos existentes</p>

<p>O <strong>gulp-jasmine</strong> é um plugin que
permite iniciar o Jasmine a partir do Gulp. Geralmente, o Jasmine é usado em
conjunto com o navegador e neste artigo ele rodará sobre o Node em uma janela
de terminal.</p>

<p>Já o <strong>Browserify</strong> é um gestor de
módulos para JavaScript que permite usar no navegador o mesmo padrão de
definição e exportação de módulos adotado pelo Node. Isso possibilita rodar, no navegador, o código escrito originalmente para o Node, sem nenhuma modificação.</p>

<h3>Exemplo 1: criando um
projeto do zero</h3>

<p>Nesta seção será criado um projeto JavaScript do zero que irá demonstrar
a configuração das ferramentas utilizadas para praticar o TDD Contínuo.</p>

<p>Vamos começar abrindo uma janela de terminal e executando os comandos
descritos para instalar o Node.js e NPM, de acordo com os tipos de sistemas operacionais.</p>

<p>No Ubuntu ou derivados, use o seguinte código:</p>

<p></p><div class="div_listagem"><pre> sudo apt-get install nodejs-legacy
 # se nodejs-legacy não estiver disponível, troque por nodejs
 sudo apt-get install npm
 </pre></div><p></p>
<p>Em outros sistemas operacionais, acesse a página do Node (vide seção <strong>Links</strong>), baixe e instale a versão
adequada. O NPM será instalado juntamente com o Node.</p><p>
Para verificar se a instalação foi bem sucedida, execute estes comandos a
seguir e verifique se aparecem os números das versões instaladas:</p>

<p></p><div class="div_listagem"><pre>node -v
npm -v</pre></div><p></p>
<p>Para instalar o pacote Gulp globalmente, use o código a seguir:</p>

<p></p><div class="div_listagem"><pre>sudo npm install gulp -g</pre></div><p></p>

<p>Se estiver no Windows, omita a palavra sudo.</p>

<p>Agora precisamos criar um diretório chamado exemplo1 para o novo projeto e
acessá-lo. Em qualquer sistema operacional, use os seguintes comandos para
isso:</p>

<p></p><div class="div_listagem"><pre>  mkdir exemplo1
  cd exemplo1</pre></div><p></p>
<p>Em seguida, inicie um novo projeto usando o NPM por meio do comando a seguir:</p>

<p></p><div class="div_listagem"><pre>npm init</pre></div><p></p>

<p>Esse comando cria um arquivo package.json, que é similar ao pom.xml do
Maven (Java). Ele descreve os dados básicos do seu projeto e também as
dependências de pacotes externos.</p>

<p>Será solicitado o preenchimento de vários dados, como o nome do projeto,
versão, descrição e licença, mas para a finalidade deste artigo não é
necessário preencher nenhum desses dados. Você pode simplesmente pressionar
Enter em todas as perguntas para usar todos os valores padrão.</p><p>
Instale os pacotes gulp e gulp-jasmine localmente usando o comando a seguir:</p>

<p></p><div class="div_listagem"><pre>npm install gulp gulp-jasmine --save-dev</pre></div><p></p>

<p>Esse comando<strong> </strong>instala as
ferramentas gulp e gulp-jasmine localmente, ou seja, somente no projeto atual,
em um diretório chamado node_modules. A parte <strong>--save-dev</strong> instrui o npm a
atualizar o arquivo package.json, acrescentando gulp e gulp-jasmine como
dependências do projeto em tempo de desenvolvimento. Isso permite baixar e
instalar novamente as dependências em qualquer momento no futuro apenas
executando o comando npm install. Isso é útil caso não deseje adicionar as
dependências ao controle de versão. Se você usa Git, por exemplo, pode
adicionar node_modules ao arquivo .gitignore, evitando versionar as
dependências externas.</p>

<p>É necessário criar um arquivo de configuração do Gulp na raiz do projeto. Para
isso, crie a pasta src com a seguinte sequência de comandos:</p>

<p></p><div class="div_listagem"><pre>mkdir src
cd src
mkdir spec
mmkdir prod
cd ..</pre></div><p></p>

<h3>Criação do gulpfile</h3>

<p>O arquivo que configura a execução do Gulp é chamado de gulpfile, por
isso, na raiz do projeto, crie um arquivo gulpfile.js com o conteúdo mostrado
na <strong>Listagem 1</strong>.</p>

<p><strong>Listagem 1</strong>. Conteúdo do arquivo <strong>exemplo1/gulpfile.js</strong></p>

<p></p><div class="div_listagem"><pre>  var gulp = require('gulp');
  var jasmine = require('gulp-jasmine');
   
  var caminhoCodigoFonte = 'src/**/*.js';
   
  gulp.task('testar', function() {
              gulp.src(caminhoCodigoFonte)
                          .pipe(jasmine());
  });
   
  gulp.task('tdd-continuo', ['testar'], function() {
              gulp.watch(caminhoCodigoFonte, ['testar']);
  });
   
  process.on('uncaughtException', function(e) {
              console.error(e.stack);
  });</pre></div><p></p>

<p>Esse arquivo define duas tarefas para o gulp:</p>

<p></p><ul><li>testar: essa tarefa executa os testes uma vez e termina;</li><li>tdd-continuo: essa tarefa executa os testes uma vez e depois observa o
sistema de arquivos e re-executa os testes automaticamente a cada modificação.
O trecho process.on('uncaughtException') instrui o Node.js a, ao invés de
encerrar o programa na ocorrência de exceções, apenas escrevê-las na tela. Isso
é útil para manter o Gulp rodando mesmo em caso de erros de compilação. Essa
solução é aceitável nesse caso porque o Node está sendo usado apenas como
ferramenta auxiliar de desenvolvimento. Para hospedar uma aplicação no Node em
produção, esse tipo de solução não deve ser usada.</li></ul><p></p>



<h3>Código-fonte do
projeto</h3>

<p>Uma vez criada a estrutura do projeto, serão escritos os arquivos
JavaScript. Para este exemplo, imagine uma classe representando uma árvore, que
deva oferecer cinco frutos. Primeiramente, será escrita uma especificação para
árvores. Em seguida, a classe Arvore será implementada. Isso será feito em
passos bem curtos, com verificação contínua para ver se o código está correto.
Em uma linguagem dinâmica e interpretada como o JavaScript, isso faz uma grande
diferença: não se tem à disposição um compilador capaz de apontar muitos erros
de programação, como é o caso do Java ou <a href="http://www.devmedia.com.br/cursos/net" target="_blank">C#</a>. Assim, o teste automatizado passa
a ser o detector desses erros.</p>

<p>O código de especificação (ou seja, de teste) será colocado em src/spec
e o código de produção (ou seja, aquele que implementa funcionalidade) em
src/prod. Abra um editor de texto e crie os arquivos ArvoreSpec.js e Arvore.js,
presentes nas <strong>Listagens 2</strong> e <strong>3</strong>, respectivamente.</p>

<p><strong>Listagem 2</strong>. Conteúdo do arquivo exemplo1/src/spec/ArvoreSpec.js</p>

<p></p><div class="div_listagem"><pre>  var Arvore = require('../prod/Arvore');
   
  describe('Arvore', function() {
              it('deve possuir 5 frutos', function() {
                          expect(new Arvore().obterFrutos().length).toBe(5);
              });
  });</pre></div><p></p>

<p><strong>Listagem 3</strong>. Conteúdo do arquivo exemplo1/src/prod/Arvore.js</p>

<p></p><div class="div_listagem"><pre>  function Arvore() {
  }
  module.exports = Arvore;</pre></div><p></p>

<p>O arquivo ArvoreSpec.js contém a especificação da classe Arvore,
enquanto que o arquivo Arvore.js define uma classe Arvore, ainda sem nenhuma
propriedade ou método. A última linha contendo o trecho module.exports diz ao
Node.js que aquele módulo exporta a classe Arvore. Em um projeto Node, cada
arquivo JavaScript representa um módulo e cada módulo deve exportar para os
outros aquilo que ele quer tornar visível. No caso, o arquivo Arvore.js exporta
a classe Arvore e o arquivo ArvoreSpec.js, ao fazer a chamada
require('../prod/Arvore'), obtém a classe Arvore.</p>

<h3>Execução do Gulp</h3>

<p>Agora, já existe uma especificação para a classe Arvore e um esboço de
sua implementação. Em um terminal, no diretório raiz do projeto, execute este
comando:</p>

<p></p><div class="div_listagem"><pre>gulp tdd-continuo</pre></div><p></p>

<p>O único teste existente no projeto será executado e o resultado deverá
ser: </p>

<p></p><div class="div_listagem"><pre>TypeError: Object #&lt;Arvore&gt; has no method 'obterFrutos'</pre></div> <p></p>

<p>O Gulp continuará em execução, aguardando alterações no sistema de
arquivos para tornar a executar os testes.</p>

<p>O próximo passo é implementar o método obterFrutos() na classe Arvore. O
objetivo final é que o construtor da árvore crie um vetor de frutos e
armazene-o como propriedade do objeto.</p>

<h3>TDD Contínuo em ação</h3>

<p>Praticar TDD Contínuo implica em visualizar simultaneamente o código e a
execução dos testes. Para isso, deixe visíveis a janela do seu editor de texto
e a janela do terminal, uma ao lado da outra. Se estiver no Windows ou no Linux
Mint, você pode fazer isso da seguinte maneira: clique na janela do editor e
pressione TeclaWindows + SetaEsquerda; clique na janela do terminal e pressione
TeclaWindows + SetaDireita. As janelas serão arranjadas lado-a-lado de maneira
conveniente.</p>

<p>Modifique o arquivo Arvore.js para ficar conforme a <strong>Listagem 4</strong>.</p>

<p><strong>Listagem 4</strong>. Código de <strong>Arvore.js </strong>após primeira modificação</p>

<p></p><div class="div_listagem"><pre>  function Arvore() {
  }
   
  Arvore.prototype.obterFrutos = function() {
              return new Array(5);
  };
  module.exports = Arvore;</pre></div><p></p>

<p>Ao salvar o arquivo no editor de texto, observe no terminal que o teste
é executado automaticamente, agora com sucesso. Você deverá ver a mensagem
"1 spec, 0 failures”, como mostra a <strong>Figura 1</strong>.</p>

<img class="imagem_artigo" src="http://arquivo.devmedia.com.br/artigos/Andre_Valenti/image1.png" alt="Ambiente de desenvolvimento com TDD Contínuo">

<p><strong>Figura 1</strong>. Ambiente de desenvolvimento com TDD
Contínuo</p>

<p>Pensando em TDD, apenas usamos implementação falsa, porque o método
ainda não faz o trabalho completo: ele apenas cria um novo vetor temporário e o
retorna. O teste passa, mas ainda falta armazenar o vetor numa propriedade do
objeto. Vamos transformar essa implementação falsa em uma verdadeira.</p>

<p>Preencha o construtor da classe Arvore com esta linha de código e salve
o arquivo:</p>

<p></p><div class="div_listagem"><pre>this._frutos = new Array(5);</pre></div><p></p>

<p>O teste deverá ser executado novamente e deverá
continuar passando. Troque a linha <em>return
new Array(5);</em> por esta e salve o arquivo:</p>

<p></p><div class="div_listagem"><pre>return this.frutos;</pre></div><p></p>

<p>O teste agora deverá falhar, pois falta o caractere '_' antes da palavra
frutos. Corrija o erro trocando por this._frutos, salve o arquivo e veja o
teste passar novamente.</p>

<p>Repare na facilidade para perceber o erro de digitação, no exato momento
e local em que ocorreu. Isso permite trabalhar no projeto avaliando
continuamente o resultado de cada modificação.</p>

<h3>Exemplo 2: adaptação
de um projeto web</h3>

<p>Agora veremos como adaptar um projeto web usando Jasmine para rodar no
Node.</p>

<p>Uma diferença importante entre o Node e o navegador é o mecanismo de
gestão de módulos. No Node atribui-se um valor a module.exports para exportar o
conteúdo de um módulo e chama-se require('./meu-modulo') para importá-lo. Só
será visível de fora do módulo aquilo que for atribuído a module.exports. Já em
projetos web, a exportação geralmente é feita no escopo global e a importação é
feita com elementos &lt;script&gt; nas páginas HTML. Isso traz vários
problemas:</p>

<p></p><ul><li>Poluição do escopo global;</li><li>Dependências entre os módulos ficam implícitas;</li><li>Tendência a forte acoplamento;</li><li>Necessidade de alterar o HTML a cada módulo criado, renomeado, movido ou
removido;</li><li>Impossibilidade de rodar o código no Node.js.</li></ul><p></p>









<p>A solução para esses problemas é a adoção de um mecanismo eficiente de
gestão de módulos. A versão mais nova do JavaScript (ECMAScript 6) traz uma
solução nativa. Enquanto não for viável adotá-la por questões de
compatibilidade, pode-se usar uma das muitas ferramentas existentes para essa
finalidade. Entre as mais conhecidas estão RequireJS, Almond e Browserify. A
escolhida para ser usada no artigo foi esta última, principalmente pela sua
simplicidade de uso.</p>

<h3>Projeto tocador de
música</h3>

<p>Quando a ferramenta Jasmine é baixada a partir do site oficial (ver
seção <strong>Links</strong>), o pacote zip inclui um pequeno projeto de exemplo. Esse
projeto simula um aplicativo tocador de música. Existem testes para a classe
Player (no arquivo PlayerSpec.js) e existem duas classes de produção (Player e
Song). A estrutura de arquivos e diretórios é mostrada na <strong>Listagem 5</strong>.</p>

<p><strong>Listagem 5</strong>. Estrutura de arquivos e diretórios do exemplo 2</p>

<p></p><div class="div_listagem"><pre>  exemplo2/
              lib/
                          jasmine-2.2.0/*
              spec/
                          PlayerSpec.js
                          SpecHelper.js
              src/
                          Player.js
                          Song.js
              MIT.LICENSE
              SpecRunner.html</pre></div><p></p>

<p>SpecRunner.html é a página que carrega os módulos e executa os testes.
Ao abrir esse arquivo no navegador, os testes rodam normalmente, conforme
mostrado na <strong>Figura 2</strong>. Porém, se você tentar executar o módulo PlayerSpec
no Node, verá que o módulo Player não terá sido carregado. É necessário
modificar os módulos do projeto para ficarem compatíveis com o Node. E, para
que eles continuem sendo compatíveis com o navegador, deve-se usar o
Browserify.</p>

<img class="imagem_artigo" src="http://arquivo.devmedia.com.br/artigos/Andre_Valenti/image2.png" alt="Execução dos testes no navegador">

<p><strong>Figura 2</strong>. Execução dos testes no navegador</p>

<p>Os comandos a seguir irão configurar o projeto de exemplo para rodar tanto
no navegador quanto no Node, permitindo praticar TDD Contínuo, como no Exemplo
1.</p>

<p>Para instalar o Browserify use um terminal e execute:</p>

<p></p><div class="div_listagem"><pre>sudo npm install -g browserify</pre></div><p></p>

<p>Se estiver no Windows, omita a palavra sudo.</p><p>
Baixe o zip do Jasmine a partir do endereço https://github.com/jasmine/jasmine/blob/master/dist/jasmine-standalone-2.2.0.zip?raw=true e extraia-o em um diretório exemplo2.
Se estiver usando Linux, execute no terminal:</p>

<p></p><div class="div_listagem"><pre>wget https://github.com/jasmine/jasmine/blob/master/dist/jasmine-standalone-2.2.0.zip?raw=true -O jasmine-standalone-2.2.0.zip
unzip jasmine-standalone-2.2.0.zip -d exemplo2
cd exemplo2</pre></div><p></p>

<p>Altere o código-fonte para usar o estilo do Node de gestão de módulos. Abra
src/Player.js num editor de texto e acrescente esta linha ao final do mesmo arquivo:</p>

<p></p><div class="div_listagem"><pre>module.exports = Player;</pre></div><p></p>

<p>Faça o mesmo com src/Song.js. Acrescente esta linha ao final do arquivo:</p>

<p></p><div class="div_listagem"><pre>module.exports = Song;</pre></div><p></p>

<p>No módulo spec/PlayerSpec.js, acrescente estas linhas no <u>início</u>
do arquivo:</p>

<p></p><div class="div_listagem"><pre>  var Player = require('../src/Player');
  var Song = require('../src/Song');
  </pre></div><p></p>

<p>Crie um diretório bin
na raiz do projeto, onde será gerado um script único contendo todos os módulos.
Em seguida, na raiz do projeto, execute o comando browserify. Ainda no
diretório raiz do projeto, execute:</p>

<p></p><div class="div_listagem"><pre>browserify spec/SpecHelper.js spec/PlayerSpec.js -o bin/browserify-bundle.js</pre></div><p></p>
<p>Altere SpecRunner.html para incluir o script único, assim, remova este trecho:</p>

<p></p><div class="div_listagem"><pre>  &lt;!-- include source files here... --&gt;
  &lt;script src="src/Player.js"&gt;&lt;/script&gt;
  &lt;script src="src/Song.js"&gt;&lt;/script&gt;
   
  &lt;!-- include spec files here... --&gt;
  &lt;script src="spec/SpecHelper.js"&gt;&lt;/script&gt;
  &lt;script src="spec/PlayerSpec.js"&gt;&lt;/script&gt;
  </pre></div><p></p>
<p>e acrescente este trecho no lugar:</p>

<p></p><div class="div_listagem"><pre>&lt;script src="bin/browserify-bundle.js"&gt;&lt;/script&gt;</pre></div><p></p>
<p>Teste o projeto no navegador, abrindo no navegador a página SpecRunner.html e
veja que os testes devem ocorrer normalmente.</p>
<h3>Configurando e
rodando o Gulp</h3>

<p>Agora, para praticar
o TDD Contínuo basta fazer como no exemplo anterior. No diretório raiz do
projeto execute o seguinte comando:</p>

<p></p><div class="div_listagem"><pre>npm init     # responda vazio a todas as perguntas
npm install gulp gulp-jasmine --save-dev</pre></div><p></p>
<p>Crie um gulpfile.js, com o conteúdo mostrado na <strong>Listagem 6</strong>.</p>

<p><strong>Listagem 6</strong>. Conteúdo
do arquivo <strong>exemplo2/gulpfile.js</strong></p>

<p></p><div class="div_listagem"><pre>  var gulp = require('gulp');
  var jasmine = require('gulp-jasmine');
   
  var caminhoCodigoFonte = '**/*.js';
  var caminhoSpecs = 'spec/*.js';
   
  gulp.task('testar', function() {
              gulp.src(caminhoSpecs)
                          .pipe(jasmine());
  });
   
  gulp.task('tdd-continuo', ['testar'], function() {
              gulp.watch(caminhoCodigoFonte, ['testar']);
  });
   
  process.on('uncaughtException', function(e) {
              console.error(e.stack);
  });</pre></div><p></p>

<p>Após a criação do
Gulpfile, no terminal, execute, na raiz do projeto:</p>

<p></p><div class="div_listagem"><pre>gulp tdd-continuo</pre></div><p></p>

<p>Com isso, você deverá
ver o mesmo resultado do exemplo anterior: o terminal deve mostrar a execução
dos testes e aguardar por modificações no sistema de arquivos para
re-executá-los.</p>

<p>Este artigo mostrou
como configurar um ambiente de desenvolvimento JavaScript para facilitar a
prática do TDD. Além do que foi mostrado, algumas melhorias são possíveis. Uma
delas é o uso do pacote externo gulp-watch para detectar a criação de novos
arquivos (não somente a modificação dos já existentes). Também é possível usar
o pacote watchify para chamar o Browserify automaticamente a cada alteração,
simplificando a execução frequente de testes no navegador.</p>

<p><strong>Links</strong></p>

<p><strong><a href="https://vimeo.com/36579366" target="_blank">Palestra Inventing on Principle</a></strong>
</p>

<p><strong><a href="http://nodejs.org" target="_blank">Node.js</a></strong>
</p>

<p><strong><a href="http://jasmine.github.io" target="_blank">Framework Jasmine</a></strong>

</p><p><strong><a href="http://gulpjs.com" target="_blank">Gulp</a></strong>

</p><p><strong><a href="https://www.npmjs.com/package/gulp-jasmine" target="_blank">Gulp-Jasmine</a></strong>
</p>

<p><strong><a href="http://browserify.org/" target="_blank">Browserify</a></strong>
</p>

<p><strong><a href="http://shapeshed.com/uncaught-exceptions-in-node" target="_blank">Exceções não tratadas em Node.js</a></strong>
</p>

<p><strong><a href="https://www.npmjs.com/package/gulp-watch" target="_blank">Gulp-Watch</a></strong>
</p>

<p><strong><a href="https://github.com/substack/watchify" target="_blank"> Watchify</a></strong>
</p>
		
	</section>
