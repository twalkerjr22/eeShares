/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('data', ['firebase'])

.run(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAoOYEtTFr_EN2Qiyd45Kheh4iGBg2c720",
    authDomain: "eeshares-49f6f.firebaseapp.com",
    databaseURL: "https://eeshares-49f6f.firebaseio.com",
    storageBucket: "eeshares-49f6f.appspot.com",
    messagingSenderId: "76398339872"
  };
  firebase.initializeApp(config);
})

.service('userService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject, $rootScope, $q){
        var refDatabase = firebase.database().ref();
        var users = $firebaseArray(refDatabase.child('users'))
        var currentID = ''
        var data = {
            'users' : users, 
            addUser: function(id, name, email){
                console.log(name)
                return refDatabase.child('users').child(id).update({
                    'name': name,
                    'email': email
                })
            },
            getUser: function(id){
                return refDatabase.child('users').child(id).once('value')
            }, 
            addCampaign: function(userID, campaignID){
                var campaigns = $firebaseArray(refDatabase.child('users').child(userID).child('campaigns'))
                campaigns.$add({
                    campaignID: campaignID    
                })
            }, 
            getCampaignList: function(id){
                return $firebaseArray(refDatabase.child('users').child(id).child('campaigns'));
            }
        }
        return data

    }]
)


.service('campaignService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject, $rootScope, $q){
        var refDatabase = firebase.database().ref();
        var campaigns = $firebaseArray(refDatabase.child('campaigns'))
        var data = {
            'campaigns' : campaigns, 
            addCampaign: function(name, goal, duration, description, key, buildingID, uID){
                console.log(name)
                return campaigns.$add({
                    'name': name,
                    'goal': goal, 
                    'duration': duration, 
                    'description': description, 
                    'key': key, 
                    'building': buildingID,
                    'active' : "inactive", 
                    'owner' : uid
                })
            },
            getCampaign: function(id){
                return refDatabase.child('campaigns').child(id).once('value')
            }, 
            addUser: function(campaignID, userID){
                var users = $firebaseArray(refDatabase.child('campaigns').child(campaignID).child('users'))
                users.$add({
                    'userID': userID    
                })
            }, 
            getUserList: function(id){
                return $firebaseArray(refDatabase.child('campaigns').child(id).child('users'));
            }, 
            addMessage: function(id, name, date, message) {
                var messages = $firebaseArray(refDatabase.child('campaigns').child(id).child('messages'))
                messages.$add({
                    'date' : date, 
                    'name' : name,
                    'message' : message
                })
                
            }, 
            getMessages: function(id){
                return $firebaseArray(refDatabase.child('campaigns').child(id).child('messages'))
            }, 
            getTasks: function(id){
                return $firebaseArray(refDatabase.child('campaigns').child(id).child('tasks'))
            }, 
            addTask: function(title, description, id){
                var tasks = $firebaseArray(refDatabase.child('campaigns').child(id).child('tasks'))
                tasks.$add({
                    'title': title, 
                    'description' : description
                })
            }
            
        }
        return data

    }]
)


.service('buildingService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject, $rootScope, $q){
    
    var refDatabase = firebase.database().ref();
    var refStorage = firebase.storage().ref();
    var buildings = $firebaseArray(refDatabase.child('buildings'));
    var imagesRef = refStorage.child('images');
    
    console.log(buildings);
    
    
    var data = {
        'buildings': buildings,
        addItem: function(title, address, owner, description, image){
            buildings.$add({
                'title' : title,
                'address' : address, 
                'owner' : owner, 
                'description' : description,
                'image' : image,
                'campaign' : "NA"
            });
        }, 
        addCampaign: function(buildingID, campaignID){
            var campaignRef = refDatabase.child('buildings').child(buildingID).update({
                'campaign' : campaignID
            })
        },
        getURL: function(imageName){
            console.log("asd")
            console.log(imageName)
            var promise = imagesRef.child(imageName).getDownloadURL()
            return promise;
        }, 
        getBuilding: function(id){
            return refDatabase.child('buildings').child(id).once('value')
        }
        
    }
    return data;

}]);

