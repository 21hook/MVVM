/**
 * This utility provides a set of view update function to be called when some sub-property of data object
 * is changed.
 */
let viewUpdate = {
    text(elt, val) {
        elt.textContent = typeof elt === 'undefined' ? '' : val;
    },
    /**
     * Produce a set of class names separated by a space
     * Ex:
     *  'name name1' -> 'name name1'
     *  'name' -> 'name name1'
     *
     * @param elt element node
     * @param val old class name(s)
     */
    class(elt, val) {
        if (elt.className.indexOf(val) !== -1) {
            elt.className = `${elt.className}' '${val}` ;
        }
    },
    model(elt, val, oldVal) { // still receive/get the old value if the new value is the same as before
        if(val !== oldVal) elt.value = typeof val === 'undefined' ? '' : val;
    }
};

export default viewUpdate;
