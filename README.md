# MVVM
Design patterns in MVVM frameworks

## Learning objectives
- the listener/watcher/publish-subscribe pattern, 
- interpreter pattern

problem => state => opertion => goal

## Listener pattern
Without listener patter, the code implementation is written directly, like this: 
```
canvas.java

while (true) {
  read mouse click
  if (clicked on a trash button) doTrash(); // state trandition in the source; function to be called
  else if (clicked on a textbox) doPlaceCursor(); // ...
  else if (clicked on a name in the listbox) doSelectItem(); // ...
  ...
}
```

Or this:
```
login.js

login.success((data) => { // state transition in the source
  header.setAvatar(data.avatar); // funtion to be called
  message.refresh(); // ...
  cart.refresh();  // ...
  ...
})  
```

The main problem of these code examples is that it isn't **modular** - it mix up the 
**responsibilities** of functionality for button, textboox, & listbox and header, message, 
& cart all in one place. It is not *ready for change*.
Think about that, your resposibity is to mantain `login.js`, `header, message, cart` is 
the resposibitities of other developers. Some day, you must add `address.refresh()` to 
refresh the address component in the pages, you have add the line of code after the 
developer code thee `address` module done. This is just one case, if there are mutilple 
modules updated, you have to update your module, again and again. All because that, you 
mix the resposibity of some functionalities of their modules into yours.
So, the listener pattern is coming for handling the probelm.

listener pattern:
- a event sourc generate a list of events, which cooresponds to state 
transitions in the source
- one or more listeners/susbcribers register interest(subscribe) to the events, providing 
a funciton to be called when some event occurs

So, the improved code is like this
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
All you need to do is to manitain the event interfaces, other reponsibities of other modules 
are separated from you. The porblem is handled done.





## Interpreter pattern
  











## Reference 
[1] *Design patterns: elements of reusable object-oriented software* <br>
[2] <<JavaScript设计模式与开发实践>> <br>
[3] wiki [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern)
