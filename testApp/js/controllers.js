angular.module('app.controllers', [])
  
.controller('buildingsCtrl', ['$scope', '$stateParams', 'buildingService', '$ionicModal', '$q', '$rootScope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService, $ionicModal, $q, $rootScope, $state) {
    
    $scope.buildings = buildingService.buildings;
    
    $scope.data = {
        'title' : '',
        'goal' : '',
        'duration' : '',
        'address' : '', 
        'owner' : '', 
        'description' : '', 
        'image' : ''
    }
  
    $scope.modal = $ionicModal.fromTemplate(
    "<ion-modal-view>" + 
        "<ion-header-bar class='bar-balanced'>" +
            "<h1 class='title'>Add a Building</h1>" +
            '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
        "</ion-header-bar>" +
        "<ion-content class='padding'>" +
            '<label class="item item-input"><input type="text" ng-model="data.title" placeholder="Title"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.goal" placeholder="Goal"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.duration" placeholder="Duration"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.address" placeholder="Address"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.owner" placeholder="Owner"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.description" placeholder="Description"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.image" placeholder="Image Name"></label>' +

            "<button ng-click='addItem()' class='button button-balanced button-block'>Submit</button>" + 
        "</ion-content>" +
    "</ion-modal-view",{
        scope: $scope, 
        animation : 'slide-in-up'
    }) 
        
    $scope.showModal = function(){
        $scope.modal.show()
    }
    $scope.closeModal = function(){
        $scope.data.title = '';
        $scope.data.goal = '';
        $scope.data.duration = '';
        $scope.data.address = '';
        $scope.data.owner = '';
        $scope.data.description = '';
        $scope.data.image = '';
        $scope.modal.hide();
    }
    $scope.addItem = function(){
        buildingService.addItem($scope.data.title, $scope.data.goal, $scope.data.duration, $scope.data.address, $scope.data.owner, $scope.data.description, $scope.data.image);
        $scope.closeModal()
        
    }
    
}])
   
.controller('personalCtrl', ['$scope', '$stateParams', '$ionicUser', '$ionicAuth', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $ionicAuth, $state) {
    
    $scope.userData = $ionicUser.details;
    console.log($scope.userData.ID)
    $scope.logout = function(){
        $ionicAuth.logout();
        $state.go('login');
    }

}])
      
.controller('buildingInfoCtrl', ['$scope', '$stateParams', 'buildingService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService) {
    
    $scope.id = $stateParams.id;
    console.log($scope.id)
    $scope.building = buildingService.getBuilding($scope.id)
    $scope.building.then(function(snapshot){
        $scope.title = snapshot.val().title;
        $scope.address = snapshot.val().address;
        $scope.owner = snapshot.val().owner;
        $scope.goal = snapshot.val().goal;
        $scope.description = snapshot.val().description;
        $scope.duration = snapshot.val().duration;
        $scope.campaign = snapshot.val().campaign;
        $scope.image = snapshot.val().image;
        $scope.campaignVal = $scope.campaign == "NA" ? false : true;
        $scope.getImage();
    })

    $scope.getImage = function(){
        var promise = buildingService.getURL($scope.image);
        promise.then(function(val){
            console.log("Success");
            console.log(val);
            $scope.imgSrc = val
            //$scope.imgSrc = $scope.imgSrc.replace(/[\[\"\]]/g, "");
        })
        promise.catch(function(val){
            console.log("fail")   
        })
    }
}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicAuth, $ionicUser, $state) {
 

    $scope.data = {
        'email': '',
        'password': ''
    }

     $scope.error = '';
     
    if ($ionicAuth.isAuthenticated()) {
        $state.go('tabsController.personal'); 
    }
     
    $scope.login = function(){
        $scope.error = '';
     $ionicAuth.login('basic', $scope.data).then(function(){
            $state.go('tabsController.personal');
     }, function(){
            $scope.error = 'Error logging in.';
     })
    }
 
}
])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state',  
function ($scope, $stateParams, $ionicAuth, $ionicUser, $state) {
     
    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';

    $scope.signup = function(){
        
        $scope.error = '';

        $ionicAuth.signup($scope.data).then(function() {
            // `$ionicUser` is now registered
            $ionicAuth.login('basic', $scope.data).then(function(){
              $state.go('tabsController.personal');
            });
        }, function(err) {
            console.log("error")
            var error_lookup = {
                'required_email': 'Missing email field',
                'required_password': 'Missing password field',
                'conflict_email': 'A user has already signed up with that email',
                'conflict_username': 'A user has already signed up with that username',
                'invalid_email': 'The email did not pass validation'
            }    
        
            $scope.error = error_lookup[err.details[0]];
        });
    }

}
])
 