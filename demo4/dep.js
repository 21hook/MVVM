/**
 * This class is a implementation of publisher-subscriber pattern, which is to notify watcher objects
 * set event of data object. It represents a list of dependencies for each sub-property of data object.
 *
 * This class represents a dependency list for a sub-property of a data object, which is a list of watchers.
 * When a sub-property of the data object is mutated, it will update the list of watchers.
 *
 * add the sub-properties of data object as the subscribers
 * delegation
 * data.subProperty.get(dep.depend(watcher.addDep(dep.addListener(observer))))
 *
 * trigger the set event of the sub-properties of data object
 * delegation
 * data.subProperty.set(dep.notify(watcher.update())) => event_source.event(publisher.notify(subscriber.update()))
 */
export default class Dep {
    constructor() {
        // object private fields
        this.subs = [] // dependencies for each sub-properties of data object

        // object public fields
        Dep.target = null;
    }
    // private object methods
    addListener(sub) { // add watcher objects as the dependencies
        this.subs.push(sub)
    }
    depend() {
        Dep.target.addDep(this) //send a message to Watcher ins(call its method)
    }
    notify() { // notify watcher objects, when the subscribed sub-property are set/mutated
        this.subs.forEach(sub => sub.update()) // notify the state changes in the sub-property
    }
    removeListener(sub) { // remove watcher objects from the dependencies
        if (this.subs.indexOf(sub) !== -1) this.subs.splice(sub, 1)
    }
}


