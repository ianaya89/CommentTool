(function(){
  var firebaseURL = 'https://luminous-torch-4257.firebaseio.com',
  myDataRef = new Firebase(firebaseURL),
  messageTemplate = '<div class="alert alert-dismissable alert-{0}" data-name="{3}"><button type="button" class="close btnRemove" data-dismiss="alert">×</button><b>{1}</b>: {2}</div>';

  $(document).ready(function() {
    $('#messageInput').keypress(function(e) {
      if (e.keyCode == 13) sendComment();
    });

    $('#btnSubmit').click(function() {
      sendComment();
      return false;
    });

    $('#messagesDiv').on('click', '.btnRemove', function() {
      var $parent = $(this).parent();
      var rmObject = new Firebase(firebaseURL + '/' + $parent.data('name'));

      rmObject.remove();
      $parent.remove();
      rmObject = null;
    });

    myDataRef.child('comments').on('child_added', function(snapshot) {
      var message = snapshot.val();
      displayChatMessage((message.subject || 'info'), message.name, message.text, snapshot.name());
    });
  });

  function displayChatMessage(subject, name, text, id) {
    $('#messagesDiv').append(messageTemplate.format(subject, name, text, id));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  }

  function sendComment() {
    var name = $('#nameInput').val();
    var text = $('#messageInput').val();
    var subject = $('#subjectInput').val();

    if (!subject || !name || !text) return;
    myDataRef.child('comments').push({
      name: name,
      text: text,
      subject: subject
    });
    $('#messageInput').val('');
    $('#subjectInput option:eq(0)').prop('selected', true);
  }
})();

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
};