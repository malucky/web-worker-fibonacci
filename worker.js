var arr = [];

//handler upon child worker threads respond back with message
var receiveResult = function (e) {
  arr.push(e.data);

  //if both child worker threads finish then post to parent with the sum
  if (arr.length === 2) {
    self.postMessage((Number(arr[0]) + Number(arr[1])).toString());

    //terminate self
    self.close();
  }
};

self.addEventListener('message', function (e) {
  var num = Number(e.data);

  //error checking
  //errors bubble back to main thread
  if (isNaN(num) || num < 1) throw "not a valid number";

  if (num <= 2) {

    //if num is 1 or 2, then send parent 1
    self.postMessage('1');

    //terminate self
    self.close();
  } else {

    //create 2 new workers
    var worker1 = new Worker('worker.js');
    var worker2 = new Worker('worker.js');

    //set listener to handle incoming message from worker thread
    worker1.addEventListener('message', receiveResult);
    worker2.addEventListener('message', receiveResult);

    //send the worker threads the number to calculate
    worker1.postMessage(num - 1);
    worker2.postMessage(num - 2);
  }
});