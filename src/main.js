// const api = jQuery(".test");
// api.addClass("red").addClass("blue").addClass("green");
// const x1 = jQuery(".test");
// x1.addClass("red");
// const x2 = x1.find(".child").addClass("green");
// x1.addClass("blue");
$(".test")
  .find("child")
  .addClass("red")
  .addClass("blue")
  .addClass("green")
  .end()
  .addClass("yellow");

$(".test").children().print();
// obj.fn(p1) // 函数里的this就是obj
// obj.fn.call(obj,p1)
