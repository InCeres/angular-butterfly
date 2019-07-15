# Angular Butterfly

Módulo AngularJS para saber se o cliente está com uma versão antiga da plataforma.

## Instalação:
   
    $ bower install angular-butterfly --save

Para adicionar no AngularJS, adicione a dependência ao seu app:

    var seuApp = angular.module(
      'seuApp', [
        'butterfly'
      ]
    );

## Uso:

O módulo expõe a `butterflyDirective` que verifica se o arquivo html onde ela é chamada está na versão mais recente.
Deve ser passado a url do backend e o @@version do projeto para a diretiva.
Obs.: A version deve ser adicionada às variáveis de ambiente 

Exemplo de uso:

    <butterfly-directive url="{{url}}" version="{{@@version}}"/>