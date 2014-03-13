(function () {
  var form = document.querySelector('form');
  var input = document.querySelector('input[name="num"]');
  var answer = document.querySelector('.answer');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    answer.innerHTML = "Calculating " + input.value + "...";
    //create a new dedicated web worker
    var fibWorker = new Worker('worker.js');

    //tell this instance of web-worker to display answer when the
    //worker thread send back the result
    fibWorker.addEventListener('message', function (e) {
      answer.innerHTML = e.data;
    });

    fibWorker.addEventListener('error', function (e) {
      answer.innerHTML = e.message + "...your browser (i.e. chrome) may not support spawning \
      workers within worker. Try firefox!";
    });

    //send the web-worker thread the input to calculate
    fibWorker.postMessage(input.value);
  }, false);
})();