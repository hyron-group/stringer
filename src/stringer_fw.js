const Stringer = require('./Stringer');

function onCreate(){
    Object.assign(this, {
        $stringer: new Stringer()
    });
}

module.exports = {
    onCreate,
    global : true
}