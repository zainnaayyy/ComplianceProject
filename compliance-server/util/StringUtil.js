

var htmlEntities = {
    nbsp: ' ',
    cent: '¢',
    pound: '£',
    yen: '¥',
    euro: '€',
    copy: '©',
    reg: '®',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\''
};

module.exports.isEmpty = (str) => {

    return (!str || str == '' || str === '' || str === "" || str === null || str.length === 0 || str == 0 || str == "0" || str == 0 || str == " " || str == "" || str == "NaN" || str == NaN || str == "Infinity" || str == Infinity || str == "undefined" || str == undefined || str == null || str == "undefined" || str == "null"
        || str == "Invalid date" || str == "Invalid Date" || str == "false" || str == false
    );
}
module.exports.isEmptyTime = (str) => {

    return (str == '' || str === '' || str === "" || str === null || str == " " || str == "" || str == "NaN" || str == NaN || str == "Infinity" || str == Infinity || str == "undefined" || str == undefined || str == null || str == "undefined" || str == "null"
        || str == "Invalid date" || str == "Invalid Date"
    );
}

module.exports.removeTrailingZeros = (num) => {
    const number = parseFloat(num);

    if (!isNaN(number)) {
        const rounded = number.toFixed(2);
        const str = rounded.toString();

        if (str.indexOf('.') !== -1) {
            const stripped = str.replace(/0+$/, '');

            return stripped.replace(/\.$/, '');
        }

        return str;
    }

    return num;
}




module.exports.unescapeHTML = str => {
    return str.replace(/\&([^;]+);/g, function (entity, entityCode) {
        var match;

        if (entityCode in htmlEntities) {
            return htmlEntities[entityCode];
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
            return String.fromCharCode(parseInt(match[1], 16));
            /*eslint no-cond-assign: 0*/
        } else if (match = entityCode.match(/^#(\d+)$/)) {
            return String.fromCharCode(~~match[1]);
        } else {
            return entity;
        }
    });
};
