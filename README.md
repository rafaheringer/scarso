SCARSO DEVELOPMENT
==================

Rotina de criação do projeto
----------------------------

0.	Instale o [Node.js](http://nodejs.org) em sua máquina (Para isso já deve ter o Ruby e o GIT instalados)
1.	Instale o [Node Express](http://expressjs.com/) globalmente para utilizar em todos os projetos: 'npm install -g express'
2.	O projeto foi criado com o esqueleto padrão do Express. Usado: 'express --sessions --force'
3.	Instale o aplicativo e suas dependências rodando 'npm install' na pasta
4.	Instalado o [Grunt](http://gruntjs.com/) Client para obter a interface de build: 'npm install -g grunt-cli'

Dicas
-----

+	O CSS está rodando em SASS + COMPASS. Basta executar 'compass watch' na raíz do projeto para escutar as alterações.
+	O GRUNT está sendo usado como Build Server. Para executar, digite apenas 'grunt' no terminal
+	O Require.js está sendo utilizado tanto no server quanto no client. Fazer bom uso.

O que tenho dúvidas?
--------------------

+	Como fazer o grunt rodar automaticamente ao levantar o servidor? Isso é possível?

História
--------

### Por que EJS como template engine

Foram várias pesquisas e testes para chegar em um template engine aceitável. 
Não queria algo que ficase muito distante no HTML padrão. 
Não sou a favor de linguagem que reiventam a roda como o Coffee Script, principalmente para projetos colaborativos. 
Esses pré-processadores ou templates exigem uma nova curva de aprendizado sobre o projeto, o que acaba sendo custoso para aprendizes.
Também pesquisei por templates que tivessem uma boa velocidade de evolução e com o mínimo necessário: loop, if, partials...

[HAML](https://github.com/haml/haml/), [Jade](https://github.com/visionmedia/jade) e [dom.js](https://github.com/andreasgal/dom.js) foram descartados por motivo simples: se distanciam de mais da syntax padrão do html.
[Underscore.js](https://github.com/documentcloud/underscore/) e [doT.js](https://github.com/olado/doT) foram descartados por não achar boa a documentação e pelo nível de complexidade dos templates.

Sobraram 3 opções:
+	[EJS](https://github.com/visionmedia/ejs)
+	[Mustache](https://github.com/janl/mustache.js)
+	[Handlebars](https://github.com/wycats/handlebars.js/)

O fato do Mustache ser logic-less me trouxe uma preocupação pelo mesmo motivo que não escolhi o HAML: nível de aprendizado. Veja:

*Loop simples com Mustache:*
```html
<!-- Data: {name: "Foo", items: ["Banana", "Apple", "Orange"]} -->
{{name}}:
<ul>
  {{#items}}
    <li>{{.}}</li>
  {{/items}}
</ul>
```

*Loop simples com EJS:*
```
<!-- Data: {name: "Foo", items: ["Banana", "Apple", "Orange"]} -->
<%= name %>
<ul>
<% for(var i=0; i<items.length; i++) {%>
	<li><%= items[i] %></li>
<% } %>
</ul>
```

Em EJS o código não fica tão limpo quanto em Mustache, mas a lógica está explícita e qualquer interação dentro do loop será menos complicada de ser feita. Então passei a testar o Handlebar que é um superset para o Mustache. Para uma lista um pouco mais completa, eu teria:

*Loop de objetos e interação com Handlebar:*
```html
<!-- Data(removed "Idiot" in server-side or Helper): 
	{name: "Foo", 
	items: [
		{"type": "Fruit", "name": "Banana"}, 
		{"type": "Color", "name": "Orange"}
	]} 
-->
<ul>
	{{#items}}
		<li>{{@index}} - {{name}} is a {{type}}</li>
	{{/items}}
</ul>
```

*Loop de objetos e interação com EJS:*
```
<!-- Data: 
	{name: "Foo", 
	items: [
		{"type": "Fruit", "name": "Banana"}, 
		{"type": "Color", "name": "Orange"}, 
		{"type": "Idiot", "name": "Human"}
	]} 
-->
<ul>
<% for(var i=0; i<items.length; i++) { var item = items[i]; %>
	<% if(item.name != "Human") { %>
		<li><%= i %> - <%= item.name %> is a <%= item.type %></li>
	<% } %>
<% } %>
</ul>
```

Foi gasto um bom tempo para pesquisar e aprendar sobre como fazer um loop e acessar o contador, enquanto o código com EJS foi feio em poucos segundos.
Além disso, ficou claro que alguns tipos de aplicações não serão bem aproveitados com logic-less. Criar helpers para tratar os mesmos dados de forma diferente torna-se custoso para a manutenção e aprendizado.

Os testes você pode econtrar em: _devtests/TemplateEngines

Referências
-----------

+	[Node.js Express Guide](http://expressjs.com/guide.html)
+	[Gettting started with Express in Node.js](http://quickleft.com/blog/getting-started-with-express-in-node)
+	[Exemplos em Node Express](https://github.com/visionmedia/express/tree/master/examples)
+	[Zurb Foundation Framework](http://foundation.zurb.com/index.php)
+	[Require.js on Node](http://requirejs.org/docs/node.html)
+	[Template Engine Chooser](http://garann.github.com/template-chooser/)
