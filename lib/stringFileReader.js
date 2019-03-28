const fs = require("fs");
const ARG_PART_REG = /---([\w\d_]+)---/g;
const COMMENT_REG = /(\/\/[^\n]*)/g;
const MATCH_LABEL_REG = /(<#([\w\d_]+)([+-])?>)/;
const MATCH_VAR_REG = /<[?]([\w\d_]+)>/;

var stringHolder = {};

function stringMapping(path) {
    var stringHolder = stringReader(path);
    var executeHolder = caching(stringHolder);
    return executeHolder;
}

function stringReader(path) {
    var data = fs.readFileSync(path).toString();
    var matcher = null;
    var temp = [];
    while ((matcher = ARG_PART_REG.exec(data)) != null) {
        var argName = matcher[1];
        var curIndex = matcher.index;
        temp.push({
            name: argName,
            start_index: curIndex + matcher[0].length,
            end_index: curIndex
        });
    }

    temp.push({
        end_index: data.length
    });

    for (var i = 0; i < temp.length - 1; i++) {
        var curBuf = temp[i];
        var text = data.substring(curBuf.start_index, temp[i + 1].end_index);
        text = text.replace(COMMENT_REG, "");
        text = text.trim();
        stringHolder[curBuf.name] = text;
    }
    return stringHolder;
}

function caching(stringHolder) {
    var executeHolder = {};
    Object.keys(stringHolder).forEach(key => {
        var data = stringHolder[key];
        data = fillDeclaredVar(data, stringHolder);
        data = fillArgument(data);
        data = functional(data);
        executeHolder[key] = data;
    });
    return executeHolder;
}

function fillDeclaredVar(source, stringHolder) {
    var matcher;

    while ((matcher = MATCH_LABEL_REG.exec(source)) != null) {
        var varName = matcher[2];
        var condition = matcher[3];
        var data = stringHolder[varName];
        if (condition == "+") {
            data = "${`" + data + "`.toUpperCase()}";
        } else if (condition == "-") {
            data = "${`" + data + "`.toLowerCase()}";
        }
        source = source.replace(MATCH_LABEL_REG, data);
    }
    return source;
}

function fillArgument(source) {
    var matcher;
    while ((matcher = MATCH_VAR_REG.exec(source)) != null) {
        var varName = matcher[1];
        source = source.replace(MATCH_VAR_REG, "${args." + varName + "}");
    }
    return source;
}

function functional(str) {
    var stringHandle = `(args)=>\`${str}\``;
    return eval(stringHandle);
}

module.exports = stringMapping;