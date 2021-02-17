// 提供一个函数 接收一个选择器 但是不返回elements 而是返回一个对象(jQuery 构造出来的对象) 这个对象中有一些方法 这些方法会操作这些元素
// (通过闭包 访问函数外部变量)
window.$ = window.jQuery = function (selectorOrArrayOrTemplate) {
  let elements;
  // 重载
  if (typeof selectorOrArrayOrTemplate === "string") {
    if (selectorOrArrayOrTemplate[0] === "<") {
      //创建div
      elements = [createElement(selectorOrArrayOrTemplate)];
    } else {
      //查找div
      elements = document.querySelectorAll(selectorOrArrayOrTemplate);
    }
  } else if (selectorOrArrayOrTemplate instanceof Array) {
    elements = selectorOrArrayOrTemplate;
  }

  function createElement(string) {
    const container = document.createElement("template");
    container.innerHTML = string;
    return container.content.firstChild;
  }

  const api = Object.create(jQuery.prototype); // 将jQuery共用的方法放到原型里面 节省内存
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArrayOrTemplate.oldApi,
  });
  // api.elements = elements
  // api.oldApi = selectorOrArrayOrTemplate.oldApi
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className);
    }
    return this; // 调用时this 就是api 从而实现链式操作
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i);
    }
    return this;
  },
  parent() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(node.parentNode);
      }
    });
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each((node) => {
      if (array.indexOf(node.parentNode) === -1) {
        array.push(...node.children);
      }
    });
    return jQuery(array);
  },
  find(selector) {
    let array = [];
    for (let i = 0; i < this.elements.length; i++) {
      const elements2 = Array.from(this.elements[i].querySelectorAll(selector));
      array = array.concat(elements2);
    }
    array.oldApi = this;
    return jQuery(array);
  },
  print() {
    console.log(this.elements);
  },
  end() {
    return this.oldApi;
  },
};
