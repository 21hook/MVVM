import Dep from './dep'

/**
 *          get the sub-property of data object to collect dependencies(depend())
 *      ▆ -------------------------------------------------------------> ▆
 * Watcher ins                                                  observe: getter/setter
 *          update the state of Watcher ins(update())   set the sub-property of data object(notify())
 *      ▆ <----------------------------- ▆ <-------------------------------- ▆
 * Watcher ins                          Dep ins                        observe: getter/setter
 *
 * This class represents a dep listener/watcher for a dep object, which will be get notified when the corresponding
 * sub-property value of the data object is changed.
 */
class Watcher {
    /*
       mathematical quantities or structures preserved by a seq of operations
       on a data type(RI):

     */
    /**
     * Create a watcher instance to listen the set event on the sub-properties
     * of data object. A watcher parse an expression(including method calls), collect dependencies,
     * and trigger callback when the expression value changes.
     *
     * @param vm the Vue instance
     * @param expOrFn an expression or method in directive, interpolation, computed or watch properties
     * @param cb a update view callback
     */
    constructor(vm, expOrFn, cb) {
        // object private data
        this.vm = vm;
        this.getter= expOrFn; // !! expression(combinations of constants, variables, methods, or subexpression)
        this.cb = cb;
        this.depIds = {}; // sub-properties of data object
        this.value = this.get(); // old value of sub-property objects
    }

    // object private method
    /**
     * Update the state the subscriber object.
     */
    update() {
        this.run(); // name binding using dynamic context
    }

    /**
     * Mutate the view if the value of the sub-property of data object is not
     * equal to the previous one.
     */
    run() {
        let val = this.get();
        let oldVal = this.value;

        if(val !== oldVal) { // request data cannot be found in cache(cache miss)
            this.value = val;
            this.cb.call(this.vm, val, oldVal); // update the view using cb callback
        }
    }

    /**
     * Evaluate the getter, and re-collect all listeners of a dependency
     * The function dependencies of some sub-properties of data objects is like this:
     * computed
     *      - 'Hello, ' + name + '!'
     *      - reverse
     *          - data.message
     *          - data.name
     *
     * => Call the expression or function directly, and evaluate the expression
     * or the method body will trigger get event of all sub-properties related, automatically.
     * Then, all related watcher are added as listeners of each sub-properties of data object.
     * When the listened/watched sub-properties of data object is
     * mutated, & the value of expOrFn property of the watcher/listener is changed, set value property of it
     * to the new value, & update the view.
     *
     * @return the old value of the watcher instance
     */
    get() {
        Dep.target = this; // point current subscriber - watcher object

        let val = this.getter.call(this.vm, this.vm); // store the result of the expression or function in val
        Dep.target = null;
        return val; // return the old val of observer object
    }
    addDep(dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addListener(this);
            this.depIds[dep.id] = dep;
        }
    }
}
