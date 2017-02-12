/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('buildingData', ['firebase'])

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


.service('buildingService', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject, $rootScope, $q){
    
    var userID = ''
    var refDatabase = firebase.database().ref();
    var refStorage = firebase.storage().ref();
    var buildings = $firebaseArray(refDatabase.child('buildings'));
    var imagesRef = refStorage.child('images');
    
    console.log(buildings);
    
    
    var data = {
        'buildings': buildings,
        addItem: function(title, goal, duration, address, owner, description, image){
            buildings.$add({
                'title' : title,
                'goal' : goal,
                'duration' : duration,
                'address' : address, 
                'owner' : owner, 
                'description' : description,
                'image' : image,
                'campaign' : "NA"
            });
        }, 
        getURL: function(imageName){
            console.log("In get url");
            var promise = imagesRef.child(imageName).getDownloadURL()
            return promise;
        }, 
        getBuilding: function(id){
            console.log(id)
            return refDatabase.child('buildings').child(id).once('value')
        }
        
    }
    return data;

}]);

