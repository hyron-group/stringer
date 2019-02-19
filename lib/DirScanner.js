const STRING_DIR = "./strings";
const stringFileReader = require("./stringFileReader");
const fs = require('fs')

module.exports = function scanStringDir() {
    var stringContextHolder = {};
    try {
        var listFile = fs.readdirSync(STRING_DIR);
        if (listFile != null) {
            listFile.forEach(fileName => {
                var langCode = fileName.substr(0, fileName.indexOf("."));
                stringContextHolder[langCode] = stringFileReader(
                    STRING_DIR + "/" + fileName
                );
            });
        }
    } catch (err) {
    }
    return stringContextHolder;
};
