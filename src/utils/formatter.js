/**
 * Splits up a template string into an array where each element is either a string original to the template string or the value of it's corresponding variable mapped by varMap
 * @param   {String} templateString the template string to be parsed
 * @param   {Object} varMap the map holding the variables to be substituted in
 * @returns {Array}
 * Usage:
 *    var weatherVarMap = { campInfo: { key: 'base', name: 'base camp', handleClick: () => {...} } }
 *    var newArr = generateTemplatedArray(`weather predictions for ${campInfo} today`, weatherVarMap),
 *
 *    console.log(newArr);
 *    // Logs: ["weather predictions for ", { campInfo: {...} }, " today"]
 */
export const generateTemplatedArray = (templateString, varMap) => {
    const regEx = /\$\{([\s]*[^;\s\{]+[\s]*)\}/g;
    const items = templateString.split(regEx);
    items.forEach((item, i) => {
        if (varMap[item]) {
            items[i] = varMap[item];
        }
    });
    return items.filter((item) => item !== '');
};

/**
 * From: https://stackoverflow.com/questions/29182244/convert-a-string-to-a-template-string/31999948#31999948
 * Produces a function which uses template strings to do simple interpolation from objects.
 *
 * Usage:
 *    var makeMeKing = templateString('${name} is now the king of ${country}!');
 *
 *    console.log(makeMeKing({ name: 'Bryan', country: 'Scotland'}));
 *    // Logs 'Bryan is now the king of Scotland!'
 */
export const templateString = (function () {
    const cache = {};

    function generateTemplate(template) {
        let fn = cache[template];

        if (!fn) {
            // Replace ${expressions} (etc) with ${map.expressions}.

            const sanitized = template
                .replace(
                    /\$\{([\s]*[^;\s\{]+[\s]*)\}/g,
                    (_, match) => `\$\{map.${match.trim()}\}`
                )
                // Afterwards, replace anything that's not ${map.expressions}' (etc) with a blank string.
                .replace(/(\$\{(?!map\.)[^}]+\})/g, '');

            fn = Function('map', `return \`${sanitized}\``); //eslint-disable-line no-new-func
        }

        return fn;
    }

    return generateTemplate;
})();

export const toLocaleNumbering = (number) => {
    // for cases where toLocaleNumbering needs to be called along with toFixed
    const convertedNumber = Number(number);
    return convertedNumber.toLocaleString();
};

export const correctDateFormatting = (date) => {
    return date.toLocaleString();
};

export const getNavLinkClass = (props) => (props.isActive ? 'active' : '');
