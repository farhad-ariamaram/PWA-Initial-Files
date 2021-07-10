////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//install with button section [START]
var installPwaButton = document.querySelector('#installPwaButton');
var deferredPrompt;

installPwaButton.addEventListener('click', function () {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function (choice) {
      console.log(choice);
      if (choice.outcome === 'dismissed') {
        console.log('installation was cancelled');
      } else {
        console.log('User Added To Home Screen');
      }
    });
    deferredPrompt = null;
  }
});

window.addEventListener('beforeinstallprompt', function (event) {
  console.log('beforeinstallprompt run .');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});
//install with button section [END]

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Register SW if browser support [START]
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register("/sw.js", {
        scope: "/"
      })
      .then(function (res) {
        console.log('Registration Succeded , Scope is : ' + res.scope);
        console.log(res);

      })
      .catch(function (error) {
        console.log(error);
      })
  });
}
//Register SW if browser support [END]
