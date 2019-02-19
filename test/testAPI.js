const stringer = require('..');
const chai = require('chai');
const chai_http = require('chai-http');
const hyronTestInstance = require("./hyronTestCase");

chai.use(chai_http);
describe("application program interface", () => {
    it("get()", () => {
        var instance = new stringer();
        var res = instance.get("var_2", {
            name: "thang"
        });
        chai.should().not.equal(res, null);
    })

    it("hyron get()", ()=>{
        var app = hyronTestInstance.app;
        chai.request(app)
        .get("/test/get-string")
        .end((err, res)=>{
            chai.should().not.equal(res, null);
        })
    })

})

