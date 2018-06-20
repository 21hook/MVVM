# MVVM
Design patterns in MVVM frameworks

[README 中文](https://github.com/21hook/MVVM/blob/master/README-zh_cn.md)

## Learning objectives
- Listener/watcher/publish-subscribe pattern; observer operation; Object.defineProperty()
- Interpreter pattern
- MVVM

know the problem => analyze the states => plan the operations => achieve the goal

## Table of contents
1. [Listener pattern](https://github.com/21hook/MVVM#listener-pattern)
2. [Proxy pattern] 
2. [Interpreter pattern](https://github.com/21hook/MVVM#interpreter-pattern)
3. [MVVM](https://github.com/21hook/MVVM#mvvm-1) 

## Listener pattern
Without listener patter, the code implementation is written directly, like this: 
```
canvas.java

while (true) {
  read mouse click
  if (clicked on a trash button) doTrash();
  else if (clicked on a textbox) doPlaceCursor();
  else if (clicked on a name in the listbox) doSelectItem();
  ...
}
```

Or this:
```
login.js

login.success((data) => {
  header.setAvatar(data.avatar);
  message.refresh();
  cart.refresh();
  ...
})  
```

The main problem of these code examples is that it isn't **modular** - it mix up the 
**responsibilities** of functionality for button, text box, & list box and header, message, 
& cart all in one module. It is not *ready for change*.
Think about that, your responsibility is to maintain `login.js`, `header, message, cart` is 
the responsibility of other developers. Some day, you must add `address.refresh()` to 
refresh the address component in the pages, you have to add the line of code after the 
developer code thee `address` module done. This is just one case, if there are multiple 
modules updated, you have to update your module, again and again. All because that, you 
mix the responsibility of some functionality of their modules into yours.

Let's analyze the code above:
```
canvas.java

while (true) {
  read mouse click
  if (clicked on a trash button) doTrash(); // state transition in the object; function to be called
  else if (clicked on a textbox) doPlaceCursor(); // ...
  else if (clicked on a name in the listbox) doSelectItem(); // ...
  ...
}

login.js

login.success((data) => { // state transition in the object
  header.setAvatar(data.avatar); // funtion to be called
  message.refresh(); // ...
  cart.refresh(); // ...
  ...
})  
```

So, we can summaries some new concepts for handling the problem:
listener pattern
- an event source generates a list of events, which correspond to state 
transitions in the object
- one or more listeners/subscribers register interest(subscribe) to the events, providing 
a function to be called when some event occurs

Then, the improved code is like this
```
login.js

ajax(url, (data) => {
  login.emit('loginSuccess', data);
})
```

```
header.js

const setAvatar = (avatar) => {
  // ...
}

login.on('loginSuccess', (data) => {
  setAvatar(data.avatar);
})

address.js

const addrRefresh = () => {
  // ...
}

login.on('loginSuccess', (data) => {
  addrRefresh();
})
```
All you need to do is to maintain the event interfaces, other responsibility of other modules 
are separated from you. The problem is handled done.

Let's put listener/watcher pattern, observer operation, & [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) all together in Vue

Ex:
`observer` operation
```
function observe(data) {
  if (!data || type data !== 'object')  return;
  
  Obejct.keys(data).forEach(key => defineReactive(data, key, data[key]));
}

funtion defineReactive(data, key, val) {
  observe(val);
  
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get() {
      Dep.target && dep.addDep(Dep, target);
      return val
    },
    set(newVal) {
      if (val === newVal) return;
      
      val = newVal;
      dep.nofify(); // notify all the subscribers
    }
  })
}

class Dep {
  constructor() {
    this.subs = []
  }
  // object private methods
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.forEach(sub => sub.update());
  },
  removeSubs(sub) {
    this.subs.splice(sub, 1); // remove the sub
  }
}

function Watcher(fn){
	this.update = function(){
		Dep.target = this;
		fn();
		Dep.target = null;
	}
	this.update();
}
```


## Interpreter pattern

```
var data = {name: ''}
```


## MVVM  











## Reference 
[1] *Design patterns: elements of reusable object-oriented software* <br>
[2] <<JavaScript设计模式与开发实践>> <br>
[3] wiki [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)
