angular.module('app.controllers', [])
  
.controller('buildingsCtrl', ['$scope', '$stateParams', 'buildingService', '$ionicModal', '$q', '$rootScope', '$state', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService, $ionicModal, $q, $rootScope, $state, $ionicPopup) {

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
        var alertPopup = $ionicPopup.alert({
            title: 'Feature Only Available for Admins!',
            template: 'See Help for contact information to request access'
        });
        
        alertPopup.then(function(res) {
        });
        //$scope.modal.show()
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
   
.controller('personalCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseAuth', '$state', 'userService', 'campaignService', '$cordovaCamera', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $firebaseArray, $firebaseAuth, $state, userService, campaignService, $cordovaCamera, $ionicPopup) {

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        // handle event
        $scope.update = userService.checkUpdate();
        $scope.update.$loaded()
        .then(function(){
            if($scope.update.$value == 1){
                var alertPopup = $ionicPopup.alert({
                    title: 'Update!',
                    template: 'Update Available!', 
                });
                
                alertPopup.then(function(res) {
                });
            }
        })

        $scope.empty = true;
        var currentUser = firebase.auth().currentUser;
        if(currentUser != null){
            var user = userService.getUser(currentUser.uid);
            user.then(function(user){
                $scope.name = user.val().name;
                $scope.icon = user.val().icon;
                $scope.userData = {
                    name: user.val().name,
                    email: user.val().email,
                    buildings: user.val().buildings,
                    icon: user.val().icon
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
                if($scope.campaigns.length === 0)
                    $scope.empty = true
            })
        }

    });

    $scope.addMedia = function(){
        var options = {
            quality: 75, 
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingTyoe: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        }
        $cordovaCamera.getPicture(options).then(function(imageData){
            var promise = userService.setIcon(firebase.auth().currentUser.uid, imageData)
            promise.then(function(item){
                $scope.doRefresh()
            }).catch(function(error){
                console.log("error setting image")
            })
        }, function(error){
            console.log("error")
            console.log(error)
        })
    }

    $scope.doRefresh = function() {
        $scope.empty = true;
        var currentUser = firebase.auth().currentUser;
        var user = userService.getUser(currentUser.uid);
        user.then(function(user){
            $scope.name = user.val().name;
            $scope.userData = {
                name: user.val().name,
                email: user.val().email,
                buildings: user.val().buildings,
                icon: user.val().icon
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
            if($scope.campaigns.length === 0)
                $scope.empty = true
        })
        $scope.$broadcast('scroll.refreshComplete');
    
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

// Building information Controller. Shows the Utility Data  
.controller('buildingInfoCtrl', ['$scope', '$stateParams', 'buildingService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
function ($scope, $stateParams, buildingService, $state) {
    // Helper function to access firebase storage images
    $scope.getImage = function(){
        var promise = buildingService.getURL($scope.image);
        promise.then(function(val){
            $scope.imgSrc = val
        })
        promise.catch(function(val){
        })
    }

    $scope.$on("$ionicView.beforeEnter", function(event, data){
        $scope.id = $stateParams.id;
        $scope.labels = [];
        $scope.data = [];
        var dailyData = [];
        var rollingAverageAllData = [];
        
        // Get Building Branch
        $scope.building = buildingService.getBuilding($scope.id)
        $scope.building.then(function(snapshot){
            $scope.title = snapshot.val().title;
            $scope.address = snapshot.val().address;
            $scope.owner = snapshot.val().owner;
            $scope.description = snapshot.val().description;
            $scope.campaign = snapshot.val().campaign;
            $scope.dailyCostGoal = snapshot.val().dailyCostGoal;
            $scope.image = snapshot.val().image;
            $scope.campaignVal = $scope.campaign == "NA" ? false : true;
            $scope.getImage();
        }).then(function(){
            // Get the Utility Information for highcharts
            // dataFB structure:
                // [0] = 30DayExtrapolate -> what will the cost be if value stays the same for 30 days
                // [1] = dailyUtilityCosts -> list of all the daily costs
                // [2] = mostRecentUtilityCost -> single object of last cost 
                // [3] = rollingAverageAll -> what is the rolling average of data throughout history
                // [4] = rollingAverageMonthly -> what is the rolling average per month 
             var dataFB = buildingService.getBillingData($scope.id);
             // Get the daily data 
             dataFB.$loaded()
             .then(function(billingObject){
                console.log(billingObject)
                var water = {name: 'Water', data: []}
                var steam = {name: 'Steam', data: []}
                var electric = {name: 'Electric', data: []}
                var total = {name: 'Total', data: []}
                var goal = {name: 'Total Goal', data: []}                 
                angular.forEach(billingObject[1].all, function(bill){
                    var date = new Date(bill.date)
                    goal.data.push([date.getTime(), $scope.dailyCostGoal]);
                    water.data.push([date.getTime(), bill.water]);
                    steam.data.push([date.getTime(), bill.steam]);
                    electric.data.push([date.getTime(), bill.electric]);
                    total.data.push([date.getTime(), bill.total]);
                    $scope.labels.push([date.getTime(), bill.date]);
                })
                dailyData.push(goal);
                dailyData.push(water);
                dailyData.push(steam);
                dailyData.push(electric);
                dailyData.push(total);
                $scope.data.push(dailyData);
                // Now get rolling average all data
                var water = {name: 'Water', data: []}
                var steam = {name: 'Steam', data: []}
                var electric = {name: 'Electric', data: []}
                var total = {name: 'Total', data: []}
                var goal = {name: 'Total Goal', data: []}      
                angular.forEach(billingObject[3], function(bill){
                    if(bill === null || bill === 'rollingAverageAll')
                        return;
                    var date = new Date(bill.date)
                    goal.data.push([date.getTime(), $scope.dailyCostGoal]);
                    water.data.push([date.getTime(), bill.water]);
                    steam.data.push([date.getTime(), bill.steam]);
                    electric.data.push([date.getTime(), bill.electric]);
                    total.data.push([date.getTime(), bill.total]);
                })
                rollingAverageAllData.push(goal);
                rollingAverageAllData.push(water);
                rollingAverageAllData.push(steam);
                rollingAverageAllData.push(electric);
                rollingAverageAllData.push(total);
                $scope.data.push(rollingAverageAllData)
             })
        }).then(function(){
            // Set up the highstock for the dailyCost
            $(function () { 
                var myChart = Highcharts.stockChart('dailyCost', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: $scope.title + ' Daily Costs',
                    },
                    yAxis: {
                        title: {
                            text: 'Cost ($)'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0
                    },
                    credits: {
                        enabled: false
                    },
                    series: $scope.data[0]
            
                });
            });
        })
        .then(function(){
            // Setup the highstock for the rollingAverageAll
            $(function () { 
                var myChart = Highcharts.stockChart('rollingAverageAll', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: $scope.title + ' Rolling Average',
                    },
                    yAxis: {
                        title: {
                            text: 'Cost ($)'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0
                    },
                    credits: {
                        enabled: false
                    },
                    series: $scope.data[1]
            
                });
            });
        })
    });

    $scope.doRefresh = function() {
        $scope.id = $stateParams.id;
        $scope.labels = [];
        $scope.data = [];
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
        }).then(function(){
             var dataFB = buildingService.getBillingData($scope.id);
             dataFB.$loaded()
             .then(function(billingObject){
                 var water = {name: 'Water', data: []}
                 var steam = {name: 'Steam', data: []}
                 var electric = {name: 'Electric', data: []}
                 var total = {name: 'Total', data: []}
                 var goal = {name: 'Total Goal', data: []}                 
                 angular.forEach(billingObject, function(bill){
                     var date = new Date(bill.date)
                     goal.data.push([date.getTime(), $scope.dailyCostGoal]);
                     water.data.push([date.getTime(), bill.water]);
                     steam.data.push([date.getTime(), bill.steam]);
                     electric.data.push([date.getTime(), bill.electric]);
                     total.data.push([date.getTime(), bill.total]);
                     $scope.labels.push([date.getTime(), bill.date]);
                 })
                $scope.data.push(goal);
                $scope.data.push(water);
                $scope.data.push(steam);
                $scope.data.push(electric);
                $scope.data.push(total);
             })
        }).then(function(){
            console.log($scope.data);
            $(function () { 
                var myChart = Highcharts.stockChart('container', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: $scope.title + ' Utility Costs',
                    },
                    // xAxis: {
                    //     categories: $scope.labels
                    // },
                    yAxis: {
                        title: {
                            text: 'Cost ($)'
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0
                    },
                    series: $scope.data
            
                });
            });

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
   
.controller('campaignInfoCtrl', ['$scope', '$stateParams', 'buildingService', 'campaignService', '$ionicModal', '$firebaseAuth', 'userService', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, buildingService, campaignService, $ionicModal, $firebaseAuth, userService, $ionicPopup) {
    

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
        $scope.milestone = snapshot.val().milestone;
    })
    $scope.userID = firebase.auth().currentUser.uid;
    var user = userService.getUser($scope.userID);
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
            $scope.alreadyJoined = 0;
            $scope.usersFB = campaignService.getUserList($scope.id);
            $scope.usersFB.$loaded()
            .then(function(){
                angular.forEach($scope.usersFB, function(member) {
                    if(member.userID === $scope.userID){
                        $scope.dailyAlert = function() {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Already Joined!',
                                template: 'You are already a part of this campaign'
                            });
                            
                            alertPopup.then(function(res) {
                            });
                        };
                        $scope.dailyAlert();
                        $scope.closeModal()
                        $scope.alreadyJoined = 1;
                    }
                })
                if(alreadyJoined === 0){
                    userService.addCampaign(firebase.auth().currentUser.uid, $scope.id)
                    campaignService.addUser($scope.id, firebase.auth().currentUser.uid)
                    $scope.dailyAlert = function() {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Joined!',
                            template: 'You have joined this campaign!'
                        });
                        
                        alertPopup.then(function(res) {
                        });
                    };
                    $scope.dailyAlert();
                }
            })
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
            $scope.building = snapshot.val().building;
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
            }).then(function(){
                $scope.expectedBillFB = buildingService.getExpectedBill($scope.building)
                $scope.expectedBillFB.$loaded()
                .then(function(item){
                    $scope.expectedBill = item.total;
                }).then(function(){
                    var number1 = Number($scope.milestone.replace(/[^0-9\.]+/g,""));
                    var number2 = Number($scope.expectedBill.toString().replace(/[^0-9\.]+/g,""));
                    if(number1 < number2){
                        $scope.success = false;
                    } else {
                        $scope.success = true;
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
        campaignService.addTaskToCampaign($scope.data.title, $scope.data.description, $scope.id, user.$id);
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
        $scope.$broadcast('scroll.refreshComplete');

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
                    'icon': val.val().icon,
                    'id' : user.userID, 
                    'score': user.score
                }
                $scope.users.push(item)
            })
            console.log($scope.users)
        })
        $state.reload
    })

    $scope.doRefresh = function() {
        $scope.usersFB = campaignService.getUserList(id);
        $scope.users = []
        $scope.usersFB.$loaded()
            .then(function(){
            angular.forEach($scope.usersFB, function(user) {
                var promise = userService.getUser(user.userID)
                promise.then(function(val){
                    var item = {
                        'name': val.val().name,
                        'icon': val.val().icon,
                        'id' : user.userID, 
                        'score': user.score
                    }
                    $scope.users.push(item)
                })
                console.log($scope.users)
            })
            $state.reload
        })
        $scope.$broadcast('scroll.refreshComplete');
    };

}])
   
.controller('messageBoardCtrl', ['$scope', '$stateParams', 'campaignService', '$firebaseAuth', 'userService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, campaignService, $firebaseAuth, userService) {
    
    $scope.id = $stateParams.id
    $scope.userID = firebase.auth().currentUser.uid
    $scope.message = {
        'message' : ''
    }
    
    $scope.updateMessages = function() {
        $scope.messages = [];
        $scope.messagesFB = campaignService.getMessages($scope.id);
        $scope.messagesFB.$loaded()
        .then(function(){
            angular.forEach($scope.messagesFB, function(message){
                var person = userService.getUser(message.id)
                person.then(function(val){
                    var item = {
                        'name' : val.val().name,
                        'message' : message.message, 
                        'icon' : val.val().icon
                    }
                    $scope.messages.push(item);
                })
            })
        })
    }
    // $scope.messageList = campaignService.getMessageList
    
    var user = userService.getUser($scope.userID);
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
        campaignService.addMessage($scope.id, firebase.auth().currentUser.uid, new Date().getTime() / 1000, $scope.message.message)
        $scope.message.message = ''
        $scope.updateMessages()
    }    
    $scope.updateMessages()
    $scope.doRefresh = function(){
        $scope.updateMessages();
        $scope.$broadcast('scroll.refreshComplete');
    }
}])

.controller('campaignPicturesCtrl', ['$scope', '$stateParams', 'campaignService', 'userService', '$ionicModal', '$cordovaCamera', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, campaignService, userService, $ionicModal, $cordovaCamera, $ionicPopup) {
    
    $scope.campaignID = $stateParams.campaignID
    $scope.userID = $stateParams.userID
    
    $scope.updatePictures = function() {
        $scope.pictures = [];
        $scope.picturesFB = campaignService.getPictures($scope.campaignID);
        $scope.picturesFB.$loaded()
        .then(function(){
            angular.forEach($scope.picturesFB, function(picture){
                var item = {
                    'name' : picture.name,
                    'description' : picture.description, 
                    'picture' : picture.picture
                }
                $scope.pictures.push(item);
            })
        })
    }

    $scope.$on("$ionicView.beforeEnter", function(event, data){

        var user = userService.getUser($scope.userID);
        user.then(function(user){
            $scope.userData = {
                name: user.val().name,
                email: user.val().email,
                buildings: user.val().buildings
            }    
        })
        $scope.updatePictures()
    })

    $scope.data = {
        'description' : ''
    }

    $scope.addPicture = function(){
        $scope.showModal()
    }

    $scope.addMedia = function(){
        $scope.closeModal()
        var options = {
            quality: 75, 
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingTyoe: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        }
        $cordovaCamera.getPicture(options).then(function(imageData){
            var promise = campaignService.addPicture($scope.campaignID, $scope.userData.name, $scope.data.description, imageData, new Date().getTime() / 1000)
            promise.then(function(item){
                $scope.updatePictures()
                var one = function(callback){
                    $scope.usersFB = campaignService.getUserList($scope.campaignID);
                    $scope.usersFB.$loaded()
                        .then(function(){
                        angular.forEach($scope.usersFB, function(member) {
                            if(member.userID === $scope.userID){
                                $scope.campaignUserID = member.$id
                                callback();
                            }
                        })
                    })
                }
                var two = function(){
                    $scope.userInfoFB = campaignService.getUserInfo($scope.campaignID, $scope.campaignUserID)
                    $scope.userInfoFB.$loaded()
                    .then(function(item){
                        $scope.score = item.score
                        campaignService.addPoints($scope.campaignID, $scope.campaignUserID, $scope.score + 50);
                        $scope.pictureAlert = function(){
                            var alertPopup = $ionicPopup.alert({
                                title: '50 Added Points!',
                                template: 'Thanks for sharing your picture!'
                            });
                            
                            alertPopup.then(function(res) {
                            });
                        }
                        $scope.pictureAlert();       
                    })
                }
                one(function(){
                    two()
                })

            }).catch(function(error){
                console.log("error setting image")
            })
        }, function(error){
            console.log("error")
            console.log(error)
        })
    }

    $scope.modal = $ionicModal.fromTemplate(
    "<ion-modal-view>" + 
        "<ion-header-bar class='bar-balanced'>" +
            "<h1 class='title'>Add a Picture</h1>" +
            '<button class="button button-clear" ng-click="closeModal()">Close</button>' +
        "</ion-header-bar>" +
        "<ion-content class='padding'>" +
            '<label class="item item-input"><input type="text" ng-model="data.description" placeholder="Description"></label>' +
            "<button ng-click='addMedia()' class='button button-balanced button-block'>Select Picture</button>" + 
        "</ion-content>" +
    "</ion-modal-view",{
        scope: $scope, 
        animation : 'slide-in-up'
    }) 
        
    $scope.showModal = function(){
        $scope.modal.show()
    }
    $scope.closeModal = function(){
        $scope.modal.hide();
    }
    
    $scope.doRefresh = function(){
        $scope.updatePictures()
        $scope.$broadcast('scroll.refreshComplete')

    }

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


.controller('cambridgePrizeCtrl', ['$scope', '$stateParams', 'buildingService', 'campaignService', 'userService', '$firebaseAuth', '$ionicPopup',
function ($scope, $stateParams, buildingService, campaignService, userService, $firebaseAuth, $ionicPopup) {
    
    $scope.$on("$ionicView.beforeEnter", function(event, data){
        // Get the ID for the campaign, and the user
        $scope.campaignID = $stateParams.campaignID;
        $scope.userID = $stateParams.userID;

        // Get the campaigns info on the user
        $scope.campaignUser = campaignService.getCampaignUser($scope.campaignID, $scope.userID)
        // Array of the points for each prize - firebase alphabetizes them so it should match campaign ordering
        var userPoints = []
        $scope.campaignUser.$loaded()
        .then(function(user){
            // Get the point distribution for the user
            userPoints = $.map(user[1], function(value, index) {
                return [value];
            });
            // Take off the id and priority
            userPoints.pop()
            userPoints.pop()
            $scope.score = $scope.campaignUser[2].$value
        })

        // Get the prize list of the campaigns and create the object array of prizes to repeated on 
        $scope.prizes = campaignService.getPrizes($scope.campaignID);
        $scope.prizeList = [];
        $scope.prizes.$loaded()
        .then(function(prizes){
            angular.forEach(prizes, function(prize, i) {
                var item = {
                    name: prize.$id,
                    picture: prize.picture,
                    description: prize.description,
                    score: userPoints[i]
                }
                $scope.prizeList.push(item);
            })
        })      
    })

    $scope.save = function(){
        var total = 0;
        var prizeArray = []
        // Go through the scores of each prize
        angular.forEach($scope.prizeList, function(prize){
            var temp = {}
            total += prize.score;
            // Create the array to save back to firebase
            temp[prize.name] = prize.score;
            prizeArray.push(temp)
            // Check for negative score
            if(prize.score < 0){
                var alertPopup = $ionicPopup.alert({
                    title: 'Oops!',
                    template: 'Enter Valid Points'
                });
                alertPopup.then(function(res) {});
                return;
            }
        })
        // Check for going over total score
        if(total > Number($scope.score)){
            var alertPopup = $ionicPopup.alert({
                title: 'Nice Try!',
                template: 'Collective points are more than your total!'
            });
            alertPopup.then(function(res) {});
        } 
        // All went well, saving back to firebase
        else {
            console.log(prizeArray)
            campaignService.savePrizes($scope.campaignID, $scope.userID, prizeArray)
            var alertPopup = $ionicPopup.alert({
                title: 'Saved!',
                template: 'Your points have been saved!'
            });
            alertPopup.then(function(res) {});
        }
    }
}])


.controller('helpCtrl', ['$scope', '$stateParams', 'userService', '$firebaseAuth', '$ionicPopup',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, userService, $firebaseAuth, $ionicPopup) {
    
    var currentUser = firebase.auth().currentUser;
    if(currentUser != null){
        var user = userService.getUser(currentUser.uid);
        user.then(function(user){
            $scope.name = user.val().name;
            $scope.icon = user.val().icon;
            $scope.email = user.val().email;
            $scope.userData = {
                name: user.val().name,
                email: user.val().email,
                buildings: user.val().buildings,
                icon: user.val().icon
            }    
        }).catch(function(val){
        })
    }

    $scope.reset = function(){
        var auth = firebase.auth();
        var emailAddress = $scope.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
            var alertPopup = $ionicPopup.alert({
                title: 'Reset Email Sent',
                template: 'Check Email to Reset Password'
            });
            
            alertPopup.then(function(res) {
            });
        }, function(error) {
        // An error happened.
        });
    }

}])
