$scope.uploadfile = function () {
    var x = document.getElementById("fileName2").files[0];
    $scope.filename = x.name
var r = new FileReader();
    r.onloadend = function (e) {
        console.log(e.target.result.byteLength);
client.opentempfile($scope.sid, function(fileid){
console.log(fileid)
//                var num = 0;
//                var j = Math.ceil(e.target.result.byteLength / 100);   
//    console.log("j=", j)
client.setlfiledata($scope.sid, fileid, 0, e.target.result, function(count){
 console.log("setlfiledata", count)  
 client.gettempfilemac($scope.sid, fileid, function(mac){
  console.log("gettempfilemac", mac)  
  }, function(name, err){
  console.log(err);
  $scope.appstatus = "gettempfilemac error"
  $scope.$apply()      
  })
 client.temp2lfile($scope.sid, fileid, function(mac){
   console.log("temp2lfile", mac)  
    $scope.fileid = mac
    $scope.appstatus = "upload file ok"
    $scope.$apply()
    console.log($scope.appstatus);        
    }, function(name, err){
     console.log(err);
     $scope.appstatus = "temp2lfile error"
     $scope.$apply()      
   })

}, function(name, err) {
            console.log(err);
            $scope.appstatus = "setlfiledata error"
            $scope.$apply()
        }})

