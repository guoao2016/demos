function test() {
  let arr = [1, 2, 3];
  arr.forEach(val => {
    if (val > 2) {
      console.log(val);
      return;
    }
  })
  console.log("end");
}

function test() {
  let arr = [1, 2, 3];

  for (let k in arr) {
    if (arr[k] > 2) {
      console.log(arr[k]);
      return;
    }
  }
  console.log("end");
}

function test() {
  let arr = [1, 2, 3];

  for (let i=0, len = arr.length; i < len; i++) {
    if (arr[i] > 2) {
      console.log(arr[i]);
      return;
    }
  }
  console.log("end");
}
