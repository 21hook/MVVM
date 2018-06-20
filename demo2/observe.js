import Dep from './dep'

/**
 * Traverse/walk through all nodes in data object.
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
 * @param data the original data
 * @param key the sub-property key
 * @param val sub-property value
 */
function listenData(data, key, val) {
    let dep = new Dep();
    observe(val);


    /* subscribe get/set events in all sub-properties in data objects */
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
            dep.addListener(this); // add the subscriber/listener
            return val;
        },
        set(newVal) { // when set event occurs
            if (val === newVal) return; // the request data stored in val(cache hit)
            val = newVal;
            dep.notify(); // request notify() of dep proxy
        }
    })
}
