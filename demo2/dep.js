/**
 * This class is a proxy that provide a notify method(interface) & other functionality for
 * observer objects to access watcher objects(subject)
 */
class Dep {
    constructor() {
        // object private data
        this.subs = []; // all sub-properties of data object

        // object public data
        Dep.target = null; // current subscribers/listeners
    }
    // private object methods
    addListener(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.forEach(sub => sub.update()) // request update() of watcher subject
    }
    removeListener(sub) {
        if (this.subs.indexOf(sub) !== -1) this.subs.splice(sub, 1)
    }
}
