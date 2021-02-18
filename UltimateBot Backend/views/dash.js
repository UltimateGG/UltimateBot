$(document).ready(function() {
  document.getElementById('currenthwid').value = document.getElementById('hwidh').innerHTML;

  document.getElementById('resethwid').addEventListener('click', function() {
    $('#confirmReset').modal('toggle');
  });

  var hwidResets = document.getElementById('hwidResetsCount').innerHTML.toString().trim();

  if (hwidResets == "0/3") {
    document.getElementById('resethwid').disabled = true;
    document.getElementById('outOfResetsText').hidden = false;
  }

  document.getElementById('hw4r').value = document.getElementById('uskeyd').innerHTML;

});
