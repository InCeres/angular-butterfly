# Angular Butterfly

Módulo AngularJS para saber se o cliente está com uma versão antiga da plataforma.

## Instalação:
   
    $ bower install angular-butterfly --save

**As instruções abaixo devem ser seguidas para integrar a diretiva com seu projeto.**

No app.js, siga os passos abaixo:
- Para adicionar no AngularJS, adicione a dependência ao seu app:

        var seuApp = angular.module(
          'seuApp', [
            'butterfly'
          ]
        );

- Na seção 'constant', adicione 'version' no appConfig:

        seuApp.constant('appConfig', {
          version: '@@version',
        });

- Na seção 'run', adicione as seguintes propriedades ao $rootScope:

        $rootScope.versionUrl = 'http://url-da-sua-api/versions/app';
        $rootScope.isAppUpdated = true;

  A propriedade 'versionUrl' é necessária pois é ela que será passada para a diretiva. Já a propriedade 'isAppUpdated' é necessária pois é ela que será modificada pela biblioteca caso a versão esteja desatualizada.

No Gruntfile.js, faça as seguintes alterações:
- Dentro de concat -> componentes -> src, adicione o arquivo minificado da biblioteca:

        concat: {
          componentes: {
            src: [
              "src/lib/angular-butterfly/dist/angular-butterfly.min.js"
            ]
          }
        }
        
- Dentro de replace -> \<ambiente\> -> options -> patterns e replace -> \<ambiente\> -> files, insira o match 'version' a ser substituído, e os locais de seus respectivos arquivos:
  Obs.: É necessário que isso seja aplicado em todos os ambientes:

        replace: {
          dev: {
            options: {
              patterns: [
                {
                  match: 'version',
                  replacement: '<%= grunt.file.readJSON("config/development.json").version %>'
                }
              ]
            },
            files: [
              {expand: true, flatten: true, src: ['www/templates/*.html'], dest: 'www/templates/'},
              {expand: true, flatten: true, src: ['www/templates/include/*.html'], dest: 'www/templates/include/'},
            ]
          },
          staging: {
            options: {
              patterns: [
                {
                  match: 'version',
                  replacement: '<%= grunt.file.readJSON("config/staging.json").version %>'
                }
              ]
            },
            files: [
              {expand: true, flatten: true, src: ['www/templates/*.html'], dest: 'www/templates/'},
              {expand: true, flatten: true, src: ['www/templates/include/*.html'], dest: 'www/templates/include/'}
            ]
          }
          ...
        } 

## Uso:

O módulo expõe a diretiva `versionVerifier` que verifica se o arquivo HTML onde ela é chamada está na versão mais recente.
Deve ser passado a url do backend e o @@version do projeto para a diretiva. 

Exemplo de uso:

    <version-verifier url="{{versionUrl}}" version="{{@@version}}"/>