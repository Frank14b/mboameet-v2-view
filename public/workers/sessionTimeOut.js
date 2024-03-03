"use client";

self.addEventListener('connect', function (event) {
  const port = event.port[0];
  console.log("🚀 ~ port:", port)

  port.addEventListener('message', function(e) {
    console.log("Worker: Message received from main script");
    const validityPreiod = e.data;
  
    if (isNaN(result)) {
      postMessage({ status: false, msg: "Please provide a valid number" });
      return;
    }
  
    // let i = result;
    let timer = null;
  
    timer = this.setInterval(() => {
      // i--;
      const currentDate = parseInt(Date.now() / 1000, 10);
      const diff = validityPreiod - currentDate;
  
      // console.log("🚀 ~ worker session time out :", i, diff, currentDate);
      if (diff == 0) {
        postMessage({ status: true, msg: "Result time out" });
        timer && this.clearInterval(timer);
      }
    }, 1000);
  })
});
