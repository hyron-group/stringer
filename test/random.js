const Stringer = require("../");

var stringer = new Stringer();

var printMe = stringer.get("var_2", {
    name : "thangdjw"
})

console.log(printMe);