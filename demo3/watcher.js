import Dep from './dep'
/**
 * This class represents a set of listeners, and get notified when data objects
 * are mutate.
 */
class Watcher {
    /**
     *
     * @param vm Vue instance
     * @param exp exp interpolation in directive or text nodes
     */
    constructor(vm, exp) {
        // object private data
        this.vm = vm;
        this.exp = exp;
        this.value = this.get(); // old value of sub-property objects
    }

    // object private method
    update() {
        this.run(); // name binding using dynamic context
    }
    run() {
        let val = this.get();
        let oldVal = this.value;

        if(val !== oldVal) this.value = val;
    }
    get() {
        Dep.target = this; // point current subscriber - watcher object

        let val = this.vm[exp]; // add watcher object as subscribers to observer objects
        Dep.target = null;
        return val; // return the old val of observer object
    }
}
