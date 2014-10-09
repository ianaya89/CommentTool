(function(){
  var firebaseURL = 'https://luminous-torch-4257.firebaseio.com',
  myDataRef = new Firebase(firebaseURL);

  $(document).ready(function() {

    $('#btnSubmit').click(function(){
      var userRecord = {name: $('#nameInput').val(), password: $('#passInput').val()};
      var id = myDataRef.child('user').push(userRecord).name();
      window.location = 'index.html';
      return false;
    });

   //  myDataRef.child('user').on('child_added', function(snapshot) {
   //   window.location = 'index.html';
   // });
  });

})();

