var stringHolder = require("../lib/DirScanner")();

module.exports = class Stringer {
    constructor() {
        this.setLanguage("default");
    }

    setLanguage(lang) {
        this.lang = lang;
    }

    get(key, args) {
        if (this.lang == null) return null;
        var handle = stringHolder[this.lang][key];
        if (handle == null) return null;
        return handle(args);
    }

    set(key, val, lang) {
        if (lang == null) lang = this.lang;
        if(stringHolder[lang] == null){
            stringHolder[lang] = {};
        }
        stringHolder[lang][key] = val;
    }
};
