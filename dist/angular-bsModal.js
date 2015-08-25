angular.module('angular-bsModal', [])
.provider('bsModal', function() {
    'use strict';
    
    var dflt = {
          title       : 'bsModal',
          width       : '600px',
          close       : true,
          confirmText : 'OK!',
          template    : undefined,
          description : undefined,
          background  : '#FFFFFF',
          footer      : true
        },
        aliases = [],
        modal   = [
            '<div class="modal fade">',
              '<div class="modal-dialog">',
                '<div class="modal-content">',
                  '<div class="modal-header">',
                    '<button type="button" class="close modal-close" data-dismiss="modal" aria-label="Close">',
                      '<span aria-hidden="true">&times;</span>',
                    '</button>',
                    '<h4 class="modal-title"> </h4>',
                  '</div>',
                  '<div class="modal-body">',
                    '<div class="modal-description" ng-show="!hasModalTemplate">{{ text }}</div>',
                    '<div class="modal-template" ng-include="modalTemplate" ng-if="hasModalTemplate"></div>',       
                  '</div>',
                  '<div class="modal-footer">',
                    '<button type="button" class="btn btn-default modal-close" data-dismiss="modal">Anuluj</button>',
                    '<button type="button" class="btn btn-primary modal-confirm"> </button>',
                  '</div>',
                '</div>',
              '</div>',
            '</div>'].join('');
            
    return { 
      setDefault  : function(options) {
        dflt.title       = options.title;
        dflt.template    = options.template;
        dflt.width       = options.width;
        dflt.description = options.description;
        dflt.footer      = options.footer;         
      },
      createAlias : function(name, options) {
        aliases.push({
          name    : name,
          options : options
        });         
      },
      close : function() {
        angular.element('.modal').modal('hide');  
      },   
      $get : ['$rootScope', '$compile', function($rootScope, $compile) {        
         return {
          show  : function(options) {
            angular.element('.modal').remove();
            
            $compile(angular.element(modal).appendTo('body'))($rootScope);
              
            angular.element('.modal-title').text(options['title'] || dflt['title']);
      
            if('width' in options) {
                angular.element('.modal-dialog').css('width', dflt['width']);
                angular.element('.modal-dialog').css('width', options['width']);
            } else {
                angular.element('.modal-dialog').css('width', dflt['width']);
            }
        
            if('template' in options || dflt.template !== undefined) { 
              if('description' in options) {
                $rootScope.hasModalTemplate = false;
                angular.element('.modal-description').html([
                  '<p class="text-center">',
                  options['description'],
                  '</p>'
                ].join('')); 
              } else {
                $rootScope.hasModalTemplate = true;           
                $rootScope.modalTemplate = 'template' in options ? options['template'] : dflt.template;                 
              }               
            } else { 
                $rootScope.hasModalTemplate = false;
                angular.element('.modal-description').html('');
                angular.element('.modal-description').html([
                    '<p class="text-center">',
                    options['description'] || dflt.description,
                    '</p>'
                ].join(''));   
            }
           
            if('close' in options || !dflt.close) {
                if(!options['close']) {
                    angular.element('.modal-close').remove();
                    angular.element('.modal').modal({ 
                        keyboard: false,
                        backdrop: 'static' })   
                } else {
                    angular.element('.modal').modal();  
                }           
            } else {
                angular.element('.modal').modal();  
            }
            
            if('confirmText' in options) {
                angular.element('.modal-confirm').text(options['confirmText']);
                angular.element('.modal-confirm').off('click').on('click', options['confirm']);
            } else {
                angular.element('.modal-confirm').text(dflt.confirmText); 
            };
            
            if('background' in options) {
              angular.element('.modal-body').css('background', options['background']);
            } else {
              angular.element('.modal-body').css('background', dflt.background);  
            };
            
            //if(options['footer'] || !dflt.footer) {
            //  angular.element('.modal-footer').remove();
            //}            
          },          
          close : function() {
            angular.element('.modal').modal('hide');  
          },
          showAs : function(name) {
            var name = name,
                alias = aliases.filter(function(obj) {
                  return obj.name === name;
                })[0];
                         
            if(alias) {
              this.show(alias.options);
            } else {
              console.error('bsModal error - alias: "' + name + '" does not exist');
            }
          }
        }; 
      }]};          
})

