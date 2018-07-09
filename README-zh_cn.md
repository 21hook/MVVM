# MVVM
MVVM框架中的设计模式

[README English](https://github.com/21hook/MVVM/blob/master/README.md)

## 关键概念
树遍历, get/set事件，发布-订阅模式，解释器模式，单向数据绑定

## 原理
实现一个data观察器，它可以监听数据对象子属性的get/set事件;
实现一个dep对象，该对象为数据对象的每个子属性添加一个观察者列表。
实现指令和表达式compiler。它扫描，分析每个元素节点中的指令或表达式，根据它们的名字计算指令的值。
实现一个watcher对象，并将其添加为数据对象的子属性的观察者。当数据对象的子属值改变时，将通知依赖对象，并且它将自动更新子属性的所有订阅者 - 观察者对象。
并且它将自动更新子属性的所有订阅者 - watcher对象。

## 目录
1. [Observe operation](#demo1-observe-operationsource)
2. [Property dependencies](#demo2-property-dependenciessource)
3. [Collect subscribers](#demo3-collect-subscriberssource)
4. [Template compiler](#demo4-template-compilersource) 
5. [View update](#demo5-view-updatesource)
6. [MVVM](##demo6-mvvmsource)

## Demo1: Observe operation([Source](https://github.com/21hook/MVVM/blob/master/demo1))
使用树递归遍历data对象的所有子属性节点。对于每个节点，使用object.defineProperty()绑定get/set事件。

## Demo2: Property dependencies([Source](https://github.com/21hook/MVVM/blob/master/demo2))
定义一个Dep类，它是data对象的属性依赖。
另外，定义一个Watcher类，它是一个dep订阅者。这个类存储一个exp字段，是一个在Vue组件中的指令&插值的[expression](https://en.wikipedia.org/wiki/Expression_(computer_science))

## Demo3: Collect subscribers([Source](https://github.com/21hook/MVVM/blob/master/demo3))
当访问data对象的子属性时，dep对象开始收集订阅者。它将添加一个watcher对象作为它的订阅者。

## Demo4: Template compiler([Source](https://github.com/21hook/MVVM/blob/master/demo4))
编译器将接收节点树（这就是为什么<template>必须具有根标签），并返回token stream。
编译器分析每个指令和插值，然后它将创建一个watcher对象用于计算
他们的每一个的值。创建watcher对象时，它将计算存储表达式的exp字段
指令或插值。因此，将访问data对象的所有子属性。它开始了订阅者收集

## Demo5: View update([Source](https://github.com/21hook/MVVM/blob/master/demo5))
当使用指令或插值中的表达式创建一个watcher对象时，它还绑定一个更新视图函数。
如果data对象的相关子属性发生突变，它的dep对象将会被
通知，然后dep对象的所有订阅者将被更新。最后，每个观察者将调用它的更新
视图函数更新视图。

## Demo6: MVVM([Source](https://github.com/21hook/MVVM/blob/master/demo6))
Vue实例的主程序。它需要遍历数据对象的所有子属性，如图所示
[Demo1](#demo1-observe-operationsource)。然后，开始编译模板以收集
数据对象的每个子属性的订阅者，如[Demo4](#demo4-template-compilersource)所示。

## MVVM architecture
- watcher订阅者收集
```
          init              trigger get event              add subscribers
Template --------> Watcher  ------------------> Observe --------------------> Dep 
```

- 单向数据绑定
```
       set                     notify              update           view update
Data -------> Observe --------------------> Dep  ---------> Watcher -------------> View
```

## License
MIT

## Reference 
[1] *Design patterns: elements of reusable object-oriented software* <br>
[2] <<JavaScript设计模式与开发实践>> <br>
[3] Wikipedia [Observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)
