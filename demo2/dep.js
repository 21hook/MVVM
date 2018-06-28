/**
 * This class is a implementation of publisher-subscriber pattern, which is to notify watcher objects
 * set event of data object. It represents a list of dependencies for each sub-property of data object.
 *
 * This class define a property dependency of a data object, which store a list of watcher instances.
 * It will get notified & update the list of watcher instances when the sub-property of the data object get
 * mutated.
 */
export default class Dep {
    constructor() {
        // object private fields
        this.subs = [] // dependencies for each sub-properties of data object
    }
    // private object methods
    addListener(sub) { // add the watcher object as the dependencies
        this.subs.push(sub)
    }
    notify() { // notify watcher objects, when the subscribed sub-property are set/mutated
        this.subs.forEach(sub => sub.update()) // notify the state changes in the sub-property
    }
    removeListener(sub) { // remove watcher objects from the dependencies
        if (this.subs.indexOf(sub) !== -1) this.subs.splice(sub, 1)
    }
}


