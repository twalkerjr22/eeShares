angular.module('app.controllers', [])
  
.controller('buildingsCtrl', ['$scope', '$stateParams', 'buildingService', '$ionicModal', '$q', '$rootScope', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService, $ionicModal, $q, $rootScope, $state) {

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        $scope.getImage = function(image){
            var promise = buildingService.getURL(image);
            return promise
        }
        
        $scope.doRefresh()
    });
    
    $scope.doRefresh = function() {
        $scope.buildingFB = buildingService.buildings;
        $scope.buildings = []
        $scope.buildingFB.$loaded()
            .then(function(){
            angular.forEach($scope.buildingFB, function(building) {
                if(building.image !== ''){
                    var urlPromise = $scope.getImage(building.image)
                    urlPromise.then(function(val){
                        building.imageURL = val
                        $scope.buildings.push(building)  
                    }).catch(function(val){
                        console.log(val)
                    })
                } else {
                    building.imageURL = ''
                    $scope.buildings.push(building)
                }
            })
            $scope.$broadcast('scroll.refreshComplete');
        })
    };

    $scope.data = {
        'title' : '',
        'address' : '', 
        'owner' : '', 
        'description' : '', 
        'image' : '', 
    }
  
    $scope.modal = $ionicModal.fromTemplate(
    "<ion-modal-view>" + 
        "<ion-header-bar class='bar-balanced'>" +
            "<h1 class='title'>Add a Building</h1>" +
            '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
        "</ion-header-bar>" +
        "<ion-content class='padding'>" +
            '<label class="item item-input"><input type="text" ng-model="data.title" placeholder="Title"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.address" placeholder="Address"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.owner" placeholder="Owner"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.description" placeholder="Description"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.image" placeholder="Image Name. Leave Blank if no image"></label>' +

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
        $scope.data.address = '';
        $scope.data.owner = '';
        $scope.data.description = '';
        $scope.data.image = '';
        $scope.modal.hide();
    }
    $scope.addItem = function(){
        buildingService.addItem($scope.data.title, $scope.data.address, $scope.data.owner, $scope.data.description, $scope.data.image);
        $scope.closeModal()
        
    }
}])
   
.controller('personalCtrl', ['$scope', '$stateParams', '$ionicUser', '$firebaseAuth', '$state', 'userService', 'campaignService',  // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $ionicUser, $firebaseAuth, $state, userService, campaignService) {

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        // handle event
        $scope.empty = true;
        var currentUser = firebase.auth().currentUser;
        if(currentUser != null){
            var user = userService.getUser(currentUser.uid);
            user.then(function(user){
                $scope.name = user.val().name;
                $scope.userData = {
                    name: user.val().name,
                    email: user.val().email,
                    buildings: user.val().buildings
                }    
            }).catch(function(val){
            })
            
            $scope.campaignsFB = userService.getCampaignList(firebase.auth().currentUser.uid);
            $scope.campaigns = []
            $scope.campaignsFB.$loaded()
                .then(function(){
                angular.forEach($scope.campaignsFB, function(campaign) {
                    var promise = campaignService.getCampaign(campaign.campaignID)
                    promise.then(function(val){
                        var item = {
                            'name': val.val().name,
                            'goal': val.val().goal, 
                            'duration': val.val().duration, 
                            'description': val.val().description, 
                            'building': val.val().building,
                            'active' : val.val().active,
                            'id' : campaign.campaignID
                        }
                        $scope.campaigns.push(item)
                        if(item !== {}){
                            $scope.empty = false;
                        }
                    })
                })
                console.log($scope.campaigns.length)
                if($scope.campaigns.length === 0)
                    $scope.empty = true
            })
        }

    });


    $scope.doRefresh = function() {
        $scope.campaignsFB = userService.getCampaignList(firebase.auth().currentUser.uid);
        $scope.campaigns = []
        $scope.campaignsFB.$loaded()
            .then(function(){
            angular.forEach($scope.campaignsFB, function(campaign) {
                var promise = campaignService.getCampaign(campaign.campaignID)
                promise.then(function(val){
                    var item = {
                        'name': val.val().name,
                        'goal': val.val().goal, 
                        'duration': val.val().duration, 
                        'description': val.val().description, 
                        'building': val.val().building,
                        'active' : val.val().active,
                        'id' : campaign.campaignID
                    }
                    $scope.campaigns.push(item)
                    if(item !== {}){
                        $scope.empty = false;
                    }
                })
            })
            if($scope.campaigns.length === 0)
                $scope.empty = true
            $scope.$broadcast('scroll.refreshComplete');
        })
    };


    $scope.logout = function(){
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          $state.go('login')
        }, function(error) {
          // An error happened.
          console.log(error)
        });
    }
}])
      
.controller('buildingInfoCtrl', ['$scope', '$stateParams', 'buildingService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService, $state) {
    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.series = ['Series A'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
    ];

    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    $scope.options = {
        scales: {
        yAxes: [
            {
            id: 'y-axis-1',
            title: "Expenditure",
            type: 'linear',
            display: true,
            position: 'left'
            },
            {
            id: 'y-axis-2',
            type: 'linear',
            display: true,
            position: 'right'
            }
        ]
        }
    };
    $scope.getImage = function(){
        var promise = buildingService.getURL($scope.image);
        promise.then(function(val){
            console.log("Success");
            $scope.imgSrc = val
        })
        promise.catch(function(val){
            console.log("fail")   
        })
    }

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        $scope.id = $stateParams.id;

        $scope.building = buildingService.getBuilding($scope.id)
        $scope.building.then(function(snapshot){
            $scope.title = snapshot.val().title;
            $scope.address = snapshot.val().address;
            $scope.owner = snapshot.val().owner;
            $scope.description = snapshot.val().description;
            $scope.campaign = snapshot.val().campaign;
            $scope.image = snapshot.val().image;
            $scope.monthlyBill = snapshot.val().monthlyBill;
            $scope.campaignVal = $scope.campaign == "NA" ? false : true;
            $scope.getImage();
        })
    });

    $scope.doRefresh = function() {
        $scope.id = $stateParams.id;

        $scope.building = buildingService.getBuilding($scope.id)
        $scope.building.then(function(snapshot){
            $scope.title = snapshot.val().title;
            $scope.address = snapshot.val().address;
            $scope.owner = snapshot.val().owner;
            $scope.description = snapshot.val().description;
            $scope.campaign = snapshot.val().campaign;
            $scope.image = snapshot.val().image;
            $scope.campaignVal = $scope.campaign == "NA" ? false : true;
            $scope.getImage();
        })
        $scope.$broadcast('scroll.refreshComplete');
    };
    
}])
   
.controller('loginCtrl', ['$scope', '$stateParams', '$firebaseAuth', 'firebase', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, firebase, $state) {
 

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        $scope.data = {
            'email': '',
            'password': ''
        }


        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in. 
                $state.go('tabsController.personal')
            } else {
                // No user is signed in.
            }
        });
        
        $scope.login = function(){
            firebase.auth().signInWithEmailAndPassword($scope.data.email, $scope.data.password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                $scope.error = error.message;
                console.log("fail12")
                
            });
        }
    });
 
}])
   
.controller('signupCtrl', ['$scope', '$stateParams', '$ionicAuth', '$ionicUser', '$state', 'userService', '$firebaseAuth', 'firebase',  
function ($scope, $stateParams, $ionicAuth, $ionicUser, $state, userService, $firebaseAuth, firebase) {
     
    var auth = $firebaseAuth()
    
    $scope.data = {
        'name': '',
        'email': '',
        'password': ''
    }
    
    $scope.error='';

    $scope.signup = function(){
        $scope.createUser();
        
    }
    
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      // Create a new user
      auth.$createUserWithEmailAndPassword($scope.data.email, $scope.data.password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
          var userPromise = userService.addUser(firebaseUser.uid, $scope.data.name, $scope.data.email)
            userPromise.then(function(snapshot){
                console.log("Added to DB")
                firebase.auth().signInWithEmailAndPassword($scope.data.email, $scope.data.password).then(function(){
                    $state.go('tabsController.personal')
                })
                .catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    $scope.error = error.message;
                    console.log("fail")
                    
                });
            })
        }).catch(function(error) {
          $scope.error = error;
        });
    };

}
])
   
.controller('addCampaignCtrl', ['$scope', '$stateParams', 'buildingService', 'campaignService', 'userService', '$firebaseAuth', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService, campaignService, userService, $firebaseAuth) {
    
    $scope.buildingID = $stateParams.buildingID;
    $scope.buildingTitle = $stateParams.buildingTitle;

    var user = userService.getUser(firebase.auth().currentUser.uid);
    user.then(function(user){
        $scope.userData = {
            name: user.val().name,
            email: user.val().email,
            buildings: user.val().buildings
        }    
    })

    $scope.campaign = {
        name : '',
        goal : '',
        duration : '',
        description : '',
        key: ''
        //, owner: ''
    }    
    
    $scope.cancel = function(){
        $scope.campaign = {
            name : '', 
            goal : '',
            duration : '',
            description : '',
            key: ''
            //, owner: ''
        } 
    }
    
    $scope.addCampaign = function(){
        var newItemPromise = campaignService.addCampaign($scope.campaign.name, $scope.campaign.goal, $scope.campaign.duration, $scope.campaign.description, $scope.campaign.key, $scope.buildingID, firebase.auth().currentUser.uid)
        newItemPromise.then(function(snapshot){
            var campaignID = snapshot.path.o[1]
            buildingService.addCampaign($scope.buildingID, campaignID)
        })
    }

}])
   
.controller('campaignInfoCtrl', ['$scope', '$stateParams', 'buildingService', 'campaignService', '$ionicModal', '$firebaseAuth', 'userService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService, campaignService, $ionicModal, $firebaseAuth, userService) {
    

    $scope.$on("$ionicView.beforeEnter", function(event, data){


    })

    $scope.id = $stateParams.id;
    $scope.campaign = campaignService.getCampaign($scope.id)
    $scope.joinData = {
        'key': ''
    }
    $scope.campaign.then(function(snapshot){
        $scope.name = snapshot.val().name;
        $scope.goal = snapshot.val().goal;
        //$scope.owner = snapshot.val().owner;
        $scope.duration = snapshot.val().duration;
        $scope.description = snapshot.val().description;
        $scope.key = snapshot.val().key;
        $scope.owner = snapshot.val().owner;
        //$scope.milestone = snapshot.val().milestone;
    })
    $scope.milestone = "$7,000"
    
    var user = userService.getUser(firebase.auth().currentUser.uid);
    user.then(function(user){
        $scope.userData = {
            name: user.val().name,
            email: user.val().email,
            buildings: user.val().buildings
        }    
    })    
    
    $scope.modal = $ionicModal.fromTemplate(
    "<ion-modal-view>" + 
        "<ion-header-bar class='bar-balanced'>" +
            "<h1 class='title'>Add a Task</h1>" +
            '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
        "</ion-header-bar>" +
        "<ion-content class='padding'>" +
            '<label class="item item-input"><input type="text" ng-model="joinData.key" placeholder="Key"></label>' +
            "<button ng-click='closeModal()' class='button button-balanced button-block'>Cancel</button>" + 
            "<button ng-click='join()' class='button button-balanced button-block'>Join</button>" + 
        "</ion-content>" +
    "</ion-modal-view",{
        scope: $scope, 
        animation : 'slide-in-up'
    }) 
        
    $scope.showModal = function(){
        $scope.modal.show()
    }
    $scope.closeModal = function(){
        $scope.joinData.key = '';
        $scope.modal.hide();
    }

    $scope.join = function(){
        if($scope.key.toString() === $scope.joinData.key.toString()){
            console.log("Success")
            userService.addCampaign(firebase.auth().currentUser.uid, $scope.id)
            campaignService.addUser($scope.id, firebase.auth().currentUser.uid)
            $scope.closeModal()
        } else{
            console.log("fail")
            $scope.joinData.key = "INVALID KEY"

        }
    }
}])
   
.controller('campaignCtrl', ['$scope', '$stateParams', 'buildingService', 'campaignService', '$ionicModal', '$firebaseAuth', 'userService', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService, campaignService, $ionicModal, $firebaseAuth, userService, $ionicPopup) {
    
    $scope.$on("$ionicView.beforeEnter", function(event, data){
        $scope.id = $stateParams.id;
        $scope.campaign = campaignService.getCampaign($scope.id)
        $scope.campaign.then(function(snapshot){
            $scope.name = snapshot.val().name;
            $scope.goal = snapshot.val().goal;
            //$scope.owner = snapshot.val().owner;
            $scope.duration = snapshot.val().duration;
            $scope.description = snapshot.val().description;
            $scope.key = snapshot.val().key;
            $scope.owner = snapshot.val().owner;
            $scope.milestone = snapshot.val().milestone;
            $scope.isOwner = false;
            if($scope.owner === firebase.auth().currentUser.uid) 
                $scope.isOwner = true;

        })
        
        var user = userService.getUser(firebase.auth().currentUser.uid);
        user.then(function(user){
            $scope.userData = {
                id: firebase.auth().currentUser.uid,
                name: user.val().name,
                email: user.val().email,
                buildings: user.val().buildings
            }    
        }).then(function(){
            $scope.usersFB = campaignService.getUserList($scope.id);
            $scope.usersFB.$loaded()
                .then(function(){
                angular.forEach($scope.usersFB, function(member) {
                    if(member.userID === $scope.userData.id){
                        $scope.campaignUserID = member.$id
                        $scope.getTasks()
                        return;
                    }
                })
            }).then(function(){
                $scope.userInfoFB = campaignService.getUserInfo($scope.id, $scope.campaignUserID)
                $scope.userInfoFB.$loaded()
                .then(function(item){
                    $scope.daily = item.daily
                    $scope.score = item.score
                })
                .then(function(){
                    if($scope.daily == false){
                        campaignService.setDaily($scope.id, $scope.campaignUserID, $scope.score + 10)
                        $scope.dailyAlert = function() {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Daily Login!',
                                template: 'Added 10 Points to Score!'
                            });
                            
                            alertPopup.then(function(res) {
                            });
                        };
                        $scope.dailyAlert();
                    }
                })
            })
        })
        $scope.data = {
            'title' : '',
            'description' : ''
        }

    })

    $scope.addTask = function(){
        $scope.showModal()
    }
  
    $scope.modal = $ionicModal.fromTemplate(
    "<ion-modal-view>" + 
        "<ion-header-bar class='bar-balanced'>" +
            "<h1 class='title'>Add a Building</h1>" +
            '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
        "</ion-header-bar>" +
        "<ion-content class='padding'>" +
            '<label class="item item-input"><input type="text" ng-model="data.title" placeholder="Title"></label>' +
            '<label class="item item-input"><input type="text" ng-model="data.description" placeholder="Description"></label>' +
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
        //$scope.data.title = '';
        //$scope.data.description = '';
        $scope.modal.hide();
    }
    $scope.addItem = function(){
        angular.forEach($scope.usersFB, function(user) {
            campaignService.addTask($scope.data.title, $scope.data.description, $scope.id, user.$id);
        })
        //campaignService.addTask($scope.data.title, $scope.data.description, $scope.id);
        $scope.closeModal()
        $scope.getTasks()
    }
    
    $scope.getTasks = function(){
        $scope.tasks = campaignService.getTasks($scope.id, $scope.campaignUserID)
    }
    $scope.logTasks = function(){
        var Data = []
        angular.forEach($scope.tasks, function(task) {
            var item = {
                id: task.$id,
                completed: task.completed
            }
            Data.push(item);
        })
        campaignService.updateTasks($scope.id, $scope.campaignUserID, Data);
        $scope.logAlert = function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Tasks Logged!!',
                template: '15 Points will be added for each task at the end of the day!'
            });
            
            alertPopup.then(function(res) {
            });
        };
        $scope.logAlert();
    }

    $scope.doRefresh = function() {
        $scope.id = $stateParams.id;
        $scope.campaign = campaignService.getCampaign($scope.id)
        $scope.campaign.then(function(snapshot){
            $scope.name = snapshot.val().name;
            $scope.goal = snapshot.val().goal;
            //$scope.owner = snapshot.val().owner;
            $scope.duration = snapshot.val().duration;
            $scope.description = snapshot.val().description;
            $scope.key = snapshot.val().key;
            $scope.owner = snapshot.val().owner;
            $scope.milestone = snapshot.val().milestone;
            $scope.isOwner = false;
            if($scope.owner === firebase.auth().currentUser.uid) 
                $scope.isOwner = true;

        })
        
        var user = userService.getUser(firebase.auth().currentUser.uid);
        user.then(function(user){
            $scope.userData = {
                id: firebase.auth().currentUser.uid,
                name: user.val().name,
                email: user.val().email,
                buildings: user.val().buildings
            }    
        }).then(function(){
            $scope.usersFB = campaignService.getUserList($scope.id);
            $scope.usersFB.$loaded()
                .then(function(){
                angular.forEach($scope.usersFB, function(member) {
                    if(member.userID === $scope.userData.id){
                        $scope.campaignUserID = member.$id
                        $scope.getTasks()
                        return;
                    }
                })
            }).then(function(){
                $scope.userInfoFB = campaignService.getUserInfo($scope.id, $scope.campaignUserID)
                $scope.userInfoFB.$loaded()
                .then(function(item){
                    $scope.daily = item.daily
                    $scope.score = item.score
                })
            })
        })
        $scope.data = {
            'title' : '',
            'description' : ''
        }
    };

}])
   
.controller('membersCtrl', ['$scope', '$stateParams', 'campaignService', 'userService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, campaignService, userService, $state) {

    var id = $stateParams.id
    $scope.usersFB = campaignService.getUserList(id);
    $scope.users = []
    $scope.usersFB.$loaded()
        .then(function(){
        angular.forEach($scope.usersFB, function(user) {
            var promise = userService.getUser(user.userID)
            promise.then(function(val){
                var item = {
                    'name': val.val().name,
                    'id' : user.userID, 
                    'score': user.score
                }
                $scope.users.push(item)
            })
        })
        $state.reload
    })


}])
   
.controller('messageBoardCtrl', ['$scope', '$stateParams', 'campaignService', '$firebaseAuth', 'userService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, campaignService, $firebaseAuth, userService) {
    
    $scope.id = $stateParams.id
    $scope.message = {
        'message' : ''
    }
    
    var updateMessages = function() {
        $scope.messages = campaignService.getMessages($scope.id);
    }
    // $scope.messageList = campaignService.getMessageList
    
    var user = userService.getUser(firebase.auth().currentUser.uid);
    user.then(function(user){
        $scope.userData = {
            name: user.val().name,
            email: user.val().email,
            buildings: user.val().buildings
        }    
    })
    
    $scope.send = function(){
        if($scope.message.message === '')
            return
        campaignService.addMessage($scope.id, $scope.userData.name, new Date().getTime() / 1000, $scope.message.message)
        $scope.message.message = ''
        updateMessages()
    }    
    updateMessages()
}])

.controller('welcomeCtrl', ['$scope', '$stateParams', '$firebaseAuth', 'firebase', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseAuth, firebase, $state) {
 
    if($stateParams.flag == 1){

        $scope.data = {
            'email': '',
            'password': ''
        }


        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            $state.go('tabsController.personal')
        } else {
            // No user is signed in.
        }
        });
    } 
}])
