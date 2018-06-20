/**
 * This class implements the interpreter pattern, which translate the template
 * directives into a abstract syntax tree. Each node of the AST is added a listener
 * & trigger notify method when it is accessed/mutated.
 */
class Compiler {
    /*
        mathematical quantities & structures preserved over a seq of operations(rep invariant):
            a ref to the vue instance, and
            a ref to the root of the DOM tree
     */

    /**
     * Initialize a
     * @param el the root of the DOM tree
     */
    constructor(el, vm) {
        // object private data/variables
        this.$vm = vm; // vue instance
        this.$el = this.isElementNode(el) ? el : document.querySelector(el);

        if(this.$el) {
            this.$fragement = this.node2Fragment(this.$el);
            this.compileNode(this.$fragement);
            this.$el.appendChild(this.$fragement);
        }
    }
    /* object private methods */
    /**
     * Create a dom fragment using the dom tree.
     * A simple dom tree:
     *      div
     *  div     p
     *          some text
     *
     * @param el a ref to the root of the dom tree(DOM)
     * @return a ref to the root of the dom fragment tree(virtual DOM)
     */
    node2Fragment(el) {
        let domFragment = document.createDocumentFragment(), child; // declare a child


        while(child = el.firstChild) {
            domFragment.appendChild(child);
        }

        return domFragment;
    }

    /**
     * Traverse/scan all nodes of the dom fragment tree. At the same time,
     * analyze & evaluate the values of the different types of nodes.
     *
     * A simple dom fragment tree:
     *  div
     *      - div
     *          - span
     *          - a
     *      - p
     *          - some text
     *
     * => use recursion in loop idiom to traverse all node in the tree
     *
     * @param el a ref to the root of the dom fragment tree
     */
    compileNode(el) {
        let childNodes = el.childNodes;
        let self = this;


        /* programming idiom: recursion in loop */
        childNodes.forEach(node => { // NodeList.prototype.forEach()
            /* analyze & evaluate the different nodes */
            let text = node.textContent; // text nodes
            let reg = /\{\{(.*)\}\}/; // exp interpolation

            if (self.isElementNode(node)) {
                self.evaluateDirective(node);
            } else if (self.isTextNode(node) && reg.test(text)) {
                self.evaluateText(node, RegExp.$1);
            }

            // recurse into the most right & unvisited child node
            if (node.childNodes && node.length) self.compileNode(node);
        })
    }

    /**
     * Evaluate the directive nodes.
     *
     * @param elt an element node
     */
    evaluateDirective(elt) {
        let self = this;

        [].slice.call(elt.attributes).forEach(attr => {
            let name = attr.name;

            // directive nodes
            // v-on:event, v-bind:attr, v-if, v-show, v-text etc.
            if(self.isDirective(name)) {
                let exp = attr.value; // directive value
                let dir = name.substring(2); // directive name

                if (self.isEventDirective(dir)) {
                    evaluateUtil.eventHandler(elt, self.$vm, exp, dir); // set the event handler on the elt
                } else {
                    evaluateUtil[dir] && evaluateUtil[dir](elt, self.$vm, exp);
                }
            }
        })


    }

    /**
     * Evaluate the text nodes.
     */
    evaluateText() {

    }
    isDirective(attr) {
        return attr.indexOf(/(v-bind)|:/) === 0;
    }
    isEventDirective(dir) {
        return dir.indexOf(/(v-on)|@/) === 0;
    }
    isElementNode(node) {
        return node.nodeType === 1;
    }
    isTextNode(node) {
        return node.nodeType === 3;
    }


}

let evaluateUtil = {
    /**
     * Bind the exp
     *
     * @param elt an element node
     * @param vm the vue instance
     * @param exp exp interpolation
     */
    text(elt, vm, exp) {
        this.bind(elt, vm, exp, 'text');
    },
    /**
     * Add a event listener to the node
     *
     * @param elt an element node
     * @param vm the vue instance
     * @param exp exp interpolation
     * @param dir directive name
     */
    eventHandler(elt, vm, exp, dir) {
        let eventType = dir.split(':')[1];
        let fn = vm.$options.methods && vm.$options.methods[exp]; // evaluate exp by computed properties

        if (eventType && fn) {
            elt.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    /**
     * Associate directives(non events) or expression interpolations with the
     * view update.
     *
     * @param elt an element node
     * @param vm the vue instance
     * @param exp expression interpolation
     * @param dir directive name
     */
    bind(elt, vm, exp, dir) {
        let updateFn = viewUpdate[dir];

        updateFn && updateFn(elt, this._getVMVal(vm, exp));

        new Watcher(vm, exp, function(value, oldValue) {
            updateFn && updateFn(elt, value, oldValue);
        });
    }

}
