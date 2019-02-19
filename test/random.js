const Stringer = require("@hyron/stringer");

var stringer = new Stringer();

var printMe = stringer.get("print_my_name", {
    myName : "thangdjw"
})

console.log(printMe);