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
