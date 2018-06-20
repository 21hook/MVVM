/**
 * This class is a implementation of publisher-subscriber pattern, which is to notify watcher objects
 * set event of data object. It represents a list of dependencies for each sub-property of data object.
 */
export default class Dep {
    constructor() {
        this.subs = [] // dependencies for each sub-properties of data object
    }
    // private object methods
    addListener(sub) { // add watcher objects as the dependencies
        this.subs.push(sub)
    }
    notify() { // notify watcher objects, when the subscribed sub-property are set/mutated
        this.subs.forEach(sub => sub.update()) // notify the state changes in the sub-property
    }
    removeListener(sub) { // remove watcher objects from the dependencies
        if (this.subs.indexOf(sub) !== -1) this.subs.splice(sub, 1)
    }
}


