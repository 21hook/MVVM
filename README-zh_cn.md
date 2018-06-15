#MVVM

## MVVM框架中的设计模式

[README English](https://github.com/21hook/MVVM/blob/master/README.md)

Mechanism: how it works => step by step procedures

## 关键概念
- listener/watch/publish-subscribe pattern; observer operation; object.defineProperty()
- interpreter pattern
- MVVM

### 目录
1. [实现Watcher pattern, observer opertion]()
2. [实现interpreter pattern]()
3. [实现MVVM]()

## 实现Watcher pattern
1. 实现data observation, 对data的所有属性进行绑定get/set event
2. 实现一个directive interpreter, 对每个tag的attribute & directive进行scan & parse,
根据directive template(computed property)替换数据，以及绑定相应的updattion function
(watch property);
3. 实现一个watcher/listener pattern, subscribe data的所有属性的get/set event，并执行相应的
callback


## 实现Observer opertion

1. 模拟data, data observation, 绑定data的属性

```
  /*
   data property in Vue
    data
      - name
        - subName
          - subSubName
        - subName1
          - subSubName 
      - name1
      => 使用iteration & recursion就可以处理所有的sub-property nodes
  */
  
  function observe(data) {
    if (!data || typeof data !== 'object') return;
    
    /*  iterate all the perperties of data */
    Object.keys(data).forEach(key => defineReactive(data, key, data[key]))
  }
  
  function defineReactive(data, key, val) {
    observe(val); // observe the subproperties of data
    
    return Object.defineProperty(data, key, val) {
      enumerable: true,
      configurable: false,
      get() {
        return val;
      },
      set(newVal) {
        val = newVal;
      }
    };
  }
```

2. 封装publisher, notify所有subscribers当get/set event事件发生的时候

```
function Dep() {
  this.subs = []; // all subscribers
}

Dep.prototype = {
  addListener(sub) {
    this.subs.push(sub)
  },
  notify() {
    this.subs.forEach(sub => sub.update())
  },
  removeListener(sub) {
    this.subs.splice(sub, 1) 
  }
}
```

3. observers notify all subscribers in dep
只需要在observe 的defineReactive 的set的函数中添加以下代码
```
function defineReactive(data, key, val) {
	  let dep = new Dep(); // all sub-properties are the objects to be listened(publishers)
    observe(val);

    Object.defineProperty(data, key, {
        // ... 省略
        set: function(newVal) {
        	if (val === newVal) return;
            val = newVal;
            dep.notify(); // notify all the subscribers
        }
    });
}

```

4. 添加watcher 为subscribers, 并通知dep的变化

```
// Observer.js
// ...
Object.defineProperty(data, key, {
	get: function() {
		Dep.target && dep.addDep(Dep.target); // add subscribers for watcher
		return val;
	}
    // ...
});

// Watcher.js
Watcher.prototype = {
	get: function(key) {
		Dep.target = this;
		this.value = data[key];	// emit get event to add suscribers
		Dep.target = null;
	}
}

```


