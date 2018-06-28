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
        // object private fields
        this.vm = vm;
        this.exp = exp;
    }
}
