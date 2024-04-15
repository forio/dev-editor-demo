// Save utility functions that do not fall under the formatters sub group

/**
 * Tries to return value at the end of a sequence of keys.
 * E.g. given an obj and keys = ['1', '2', '3'], it will try to return obj['1']['2']['3'].
 * Uses the defaultValue on error.
 * @param {Object} obj        Object you want to access
 * @param {string[]} keys     List of keys you want to sequence through
 * @param {?*} [defaultValue] Default value in case keys do not exist
 * @param {?boolean} [debug]  Use to debug access, Logs the Object and List of keys you requested
 * @returns {*}               The value at the end of the sequence of keys, or default value
 */
export const access = (obj, keys, defaultValue = null, debug = false) => {
    if (debug) {
        // Only used for debugging
        console.log(obj, keys);
    }
    let ref = obj;
    try {
        keys.forEach((key) => (ref = ref[key]));
    } catch (err) {
        if (err instanceof TypeError) {
            return defaultValue;
        }
        throw err;
    }
    if (ref === undefined) return defaultValue;
    return ref;
};

/**
 * simple faux-classnames function
 * takes a base class and/or an object of conditional class names, returns a
 * string containing the base class and all other classes with truthy values
 * @param {string | object} base the base class name to use, OR the optionals
 *  argument (if no base class is needed)
 * @param {object?} optionals object where keys are class names and values are
 *  conditional `{ 'optional-class': condition }`
 * @returns {string} the formatted class names, with any falsy conditionals removed
 * @example
 *  const buttonDisabled = false, type = 'primary';
 *  const classes = classNames('button', { blue: true, disabled: buttonDisabled, primary: type === 'primary' });
 *  // classes === 'button blue primary'
 * @example <div className={classNames('column wide', { rtl: true })}></div>
 *  // <div class="column wide rtl"></div>
 * @example <p className={classNames({ bold: false, italic: true })}></p>
 *  // <p class="italic"></p>
 */
export const classNames = (base, optionals) => {
    if (typeof base === 'object') {
        optionals = base;
        base = '';
    }
    return `${base} ${
        optionals
            ? Object.entries(optionals)
                  .filter(([_, v]) => !!v)
                  .map(([k, _]) => k)
                  .join(' ')
            : ''
    }`.trim();
};
