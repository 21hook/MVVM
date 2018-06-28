import observe from './observe'
import Compiler from './compiler'

/**
 * Create a MVVM instance.
 *
 * @param options
 * @constructor
 */
class MVVM {
    /**
     * Create a MVVM object, and pass the Vue options to it.
     * Then, observe the sub-properties of data object, and compile
     * the template directives & interpolations. Lastly, subscribe as the
     * listeners of Dep instances.
     *
     * @param options a Vue instance options
     */
    constructor(options) {
        this.options = options;
        this._data = this.options.data;

        Object.keys(this._data).forEach(key => self._proxy(key));
        observe(this._data, this);
        this.compiler = new Compiler(options.el || document.body, this);
    }
    /* object private methods */

    /**
     * A proxy method to access to the sub-properties of data object.
     * Ex:
     *  client -> vm.name -> vm._data[name]
     *
     * @param key the property of data object
     */
    _proxy(key) {
        let self = this;

        Object.defineProperty(self, key, {
            configurable: false,
            enumerable: true,
            get() {
                return self._data[key];
            },
            set(newVal) {
                return self._data[key] = newVal;
            }
        })
    }
}
