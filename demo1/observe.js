/**
 * Traverse/walk through all nodes in data object.
 *
 * Ex:
 *  data
 *      - name
 *          - subName
 *              - subSubName
 *              - subsSubName1
 *          - subName1
 *      - name1
 *          - ...
 *
 * => Recursion nested in iteration can walk each sub-properties of data object
 *
 * @param data sub-data in Vue
 */
function observe(data) {
    if (!data || typeof data !== 'object') return false;

    Object.keys(data).forEach(key => listenData(data, key, data[key]))
}

/**
 * Listen/subscribe get/set event in all sub-properties in data object,
 *
 *
 * @param data the original data
 * @param key the sub-property key
 * @param val sub-property value
 */
function listenData(data, key, val) {
    // recurse into the most right & unvisited child node
    observe(val);


    /* subscribe get/set events in all sub-properties in data objects */
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
            return val;
        },
        set(newVal) { // when set event occurs
            if (val === newVal) return; // newVal must be different from val
            val = newVal;
        }
    })
}
