import * as intentRunner from "../../background/intentRunner.js";

let timerIntervalId;


intentRunner.registerIntent({
  name: "timer.start",
  async run(context) {
    console.log("STARTED")
    timerIntervalId = setInterval(() => {
      let d = new Date();
      console.log(d.toLocaleTimeString());
    }, 1000);
    
    // context.done(0);
  },
});

intentRunner.registerIntent({
  name: "timer.stop",
  async run(context) {
    console.log("STOPPED")
    clearInterval(timerIntervalId);
    
    // context.done(0);
  },
});

