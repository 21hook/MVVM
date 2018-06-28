# MVVM
Design patterns in MVVM frameworks

[README 中文](https://github.com/21hook/MVVM/blob/master/README-zh_cn.md)

## Key concepts
- observer operation; set/get events(Object.defineProperty())
- Listener/publish-subscribe pattern
- Interpreter pattern
- MVVM pattern

## Mechanism
1. Implement a data observer, which can listen get/set event on the sub-properties 
of the data object;
2. Implement a dependency object, which add a list of watchers for each sub-property of a data object.
3. Implement a directive & expression compiler. It scan, analyze the directive or expression in each element node, 
evaluate the value of the directives according to their names.
4. Implement a watcher object, and add it into as a observer of the sub-properties of 
the data object. When the sub-properties of the data object get mutated, the dependency object 
will get notified, & it will update all subscribers of the sub-property - the watcher objects, automatically.


## Table of contents
1. [Observe operation](https://github.com/21hook/MVVM#observer-operation)
2. [Property dependencies](https://github.com/21hook/MVVM#get/property-dependencies)
3. [Collect subscribers](https://github.com/21hook/MVVM#collect-subscribers)
4. [Template compiler](https://github.com/21hook/MVVM#mvvm-1#template-compiler) 
5. [View update](https://github.com/21hook/MVVM#mvvm-1#view-update)
6. [MVVM](https://github.com/21hook/MVVM#mvvm-1#mvvm)

## Demo1: Observe operation([Source](https://github.com/21hook/MVVM/blob/master/demo1))
Use tree recursion to traverse all sub-property nodes of the data object.
For each node, bind get/set event using 
[object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
. 

## Demo2: Property dependencies([Source](https://github.com/21hook/MVVM/blob/master/demo2))
Define a Dependency class, which is a property dependency for a data object.
Also, define a Watcher class, which is a dep listener/subscriber. This class stores a exp filed, which is an expression
(including method calls) in directives, interpolations, computed or watcher properties of a Vue component.

## Demo3: Collect subscribers([Source](https://github.com/21hook/MVVM/blob/master/demo3))
When the sub-property of the data object is accessed, a dep object starts to collect subscribers/listener.
It will add a watcher object as a subscriber of it.

## Demo4: Template compiler([Source](https://github.com/21hook/MVVM/blob/master/demo4))
A compiler will receive a node tree(That's way <template> must have a root tag), and return a token stream.
The compiler analyzes each directive & interpolation, then it will create a watcher object for evaluating 
each value of them. When a watcher object is created, it will evaluate the exp field, which stores the expressions
of the directives or interpolations. So, all the sub-properties of the data object will be accessed. It starts to 
collect subscribers, as shown in [Demo4](https://github.com/21hook/MVVM#collect-subscribers)

## Demo5: View update([Source](https://github.com/21hook/MVVM/blob/master/demo5))
When create a watcher object using an expression in directives or interpolations, it also binds a update view 
function to update the view. If the dependent sub-property of the data object get mutated, the dep object of it will be 
notified, and all subscribers(watchers) of the dep object will be updated. Then, each watcher will call its update 
view function to update the view.

## Demo6: MVVM([Source](https://github.com/21hook/MVVM/blob/master/demo6))
The main program of a Vue instance. It need to traverse all sub-properties of a data objects, as shown in 
[Demo1](https://github.com/21hook/MVVM#observer-operation). Then, start to compile the template to collect subscribers
of each sub-property of the data object, as shown in [Demo4](https://github.com/21hook/MVVM#mvvm-1#template-compiler).


## MVVM patterns

Subscriber collections

          init              trigger get event              add subscribers
Template --------> Watcher  ------------------> Observe --------------------> Dep 

One-way data binding 
 set                     notify              update           view update
------> Observe --------------------> Dep  ---------> Watcher -------------> View

## License
MIT







## Reference 
[1] *Design patterns: elements of reusable object-oriented software* <br>
[2] <<JavaScript设计模式与开发实践>> <br>
[3] wiki [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)
