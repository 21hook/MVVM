import Dep from './dep'
/**
 * This class represents a set of listeners, and get notified when data objects
 * are mutate.
 */
class Watcher {
    /**
     * Create a Watcher instance.
     *
     * @param vm a Vue instance
     * @param exp an expression(including method calls) in directives, interpolations, computed or watch properties
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

        let val = this.vm[this.exp]; // add watcher object as subscribers to observer objects
        Dep.target = null;
        return val; // return the old val of observer object
    }
}
