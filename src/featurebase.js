(function (exports) {

  var xmlhttp;

  if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
  } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }




  function FeatureBase(projectId) {

    var that = this;
    
    this.projectId = projectId;

    this.reportUsage = function(featureName, status, onSuccess) {

      var data = {
        featureId: featureName,
        projectId: that.projectId,
        type: "feature_used"
      };

      postFeatureUsage(data, onSuccess);
    }

    return this;

  };


  function postFeatureUsage(data, onSuccess) {

      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 ) {
             if(xmlhttp.status == 200){
                 console.log("success")
                 onSuccess && onSuccess("successfully send");
             }
             else if(xmlhttp.status == 400) {
                console.log('There was an error 400')
             }
             else {
                console.log('something else other than 200 was returned:')
                console.log(xmlhttp)
             }
          }
      }

      xmlhttp.open("POST", "https://featurebaseapi.herokuapp.com/"+data.type, true);
      xmlhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
      xmlhttp.send(JSON.stringify(data));
  }

  /*global define:false */
  if (typeof define === "function" && define.amd) {
      define([], function () {
          return FeatureBase;
      });
  }
  else {
      exports.FeatureBase = FeatureBase;
  }

}(typeof exports === 'object' && exports || window));

