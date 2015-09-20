(function() {
  angular.module('Demo', ['angular-bsModal'])
    .controller('firstExample', firstExample)
    .controller('secondExample', secondExample)
    .controller('thirdExample', thirdExample)
    .controller('templateExample', templateExample);
  
  function firstExample($scope, bsModal) {    
    $scope.showFirstExample = function() {
      bsModal.show({
        title       : 'First Modal Example',
        description : 'This is descripton in first modal example. Do You agreed?',
        confirmText : 'Yes!',
        confirm     : function() {
          bsModal.close();
        }     
      });
    };      
  };
  
  function secondExample($scope, bsModal) {    
    $scope.showSecondExample = function() {
      bsModal.show({
        title       : 'Second Modal Example',
        description : 'This modal has no close button :)',
        confirmText : 'Yes!',
        close       : false,
        confirm     : function() {
          bsModal.close();
        }    
      });
    };      
  };
  
  function thirdExample($scope, bsModal) {    
    $scope.showThirdExample = function() {
      bsModal.show({
        title       : 'Change the width and background',
        description : 'Modal with 90% width and pink backgorund',
        width       : '90%',
        background  : '#ff80ab',
        confirmText : 'Cool',
        confirm     : function() {
          bsModal.close();
        }    
      });
    };      
  };
  
  function templateExample($scope, bsModal) {    
    $scope.showTemplateExample = function() {
      bsModal.show({
        title       : 'Modal with template',
        template    : '../demo/modal_template/tmp.html',
        controller  : 'modalController',
        confirmText : 'Ok',
        confirm     : function() {
          bsModal.close();
        }    
      });
    };      
  };      
})();

// with provider
(function() {
  angular.module('DemoProvider', ['angular-bsModal'])
    .config(['bsModalProvider', function(bsModalProvider) {
      // set the provider
      bsModalProvider.setDefault({
        title       : 'Default title',
        description : 'This is default description',
        width       : '20%'
      });
      
      bsModalProvider.createAlias('sessionExpired', {
        title       : 'Session expired!',
        description : 'Your session has expired. Please login again',
        width       : '20%',
        close       : false,
        confirmText : 'Go to login page',
        confirm     : function() {
          bsModalProvider.close();
        }
      }) 
    }])
    .controller('defaultController', defaultController)
    .controller('aliasController', aliasController)
  
  // and now in the controller  
  function defaultController($scope, bsModal) {
    $scope.showModal = function() {
      bsModal.show({
        confirmText : 'Ok!',
        confirm     : function() {
          bsModal.close();
        } 
      });      
    };
  };
  
  function aliasController($scope, bsModal) {
    $scope.showAliasModal = function() {
      bsModal.showAs('sessionExpired');  
    };
    
    $scope.showAliasModalWithDescription = function() {
      bsModal.showAs('sessionExpired', {
        description : 'Description from controller'
      });  
    };  
  };
  
  // bootrstraping angular module because is not possible add second module via HTML
  angular.bootstrap(document.getElementById('demo-provider'), ['DemoProvider'] )
})()

