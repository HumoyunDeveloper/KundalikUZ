/* 
  Name: DesignJS
  Date: 2019/13/02
  Updated: 2020/28/05
  Created by: Humoyun Dev
  Description: Simple Css Styler in JavaScript
*/

(function(_o1, _o2) {
  "use strict";
  const isArray = function(_param) {
    return /array/gi.test(_param.constructor.toString());
  };
  const checkAll = function(_param, _param2) {
    return isArray(_param) ? _param.every(function(_val) { return typeof _val === _param2; }) : typeof _param === _param2 ? true : false;
  };
  const isObject = function(_param) {
    return checkAll(_param, "object");
  };
  const isString = function(_param) {
    return checkAll(_param, "string");
  };
  const isNumber = function(_param) {
    return checkAll(_param, "number");
  }
  const toString = Object.prototype.toString;
  const toNumber = function(_param) {
    return Number ? Number : +_param;
  };
  const filterEl = function(_els) {
    const filtered = _els.filter(function(_val) { return isObject(_val) ? true : isString(_val) ? checkEl(_val) ? true : false : false; });
    return filtered;
  };
  const getProp = function(_str) {
    var str, med, rped, rt, act;
    str = _str.toString().toLowerCase();
    if (/^[a-z]+\-[a-z]+/.test(str)) {
      var ind = 0,
        med = str.split(""),
        len = med.length;
      for (; ind < len; ind++) {
        if (med[ind] == "-") {
          med.splice(ind, 2, med[ind + 1].toString().toUpperCase());
        }
      }
      rt = med.join("").toString();
    } else {
      rt = _str.toLowerCase();
    }
    return rt;
  }
  if (isObject([_o1, _o2])) { doOpt(); }
  const checkEl = function(_el) { return document.querySelector(_el) ? true : false; };

  function doOpt() {
    const libName = "DesignJS";
    const designAll = function(_els, _obj, _prop) {
      if (isArray(_els)) {
        const filtered = filterEl(_els);
        if (isObject(_obj)) {
          const keys = Object.keys(_obj);
          if (keys.length !== 0) {
            keys.forEach(function(_key) {
              const prop = _obj[_key];
              filtered.forEach(function(elem) {
                if (isString(elem)) {
                  var elements, gkey;
                  gkey = getProp(_key);
                  elements = document.querySelectorAll(elem);
                  elements.forEach(function(el) { el.style[gkey] = prop; });
                } else {
                  elem.style[gkey] = prop;
                }
              });
            });
          }
        } else if (isString(_obj) && typeof _prop !== "undefined") {
          const filtered = filterEl(_els)
          filtered.forEach(function(el) {
            if (isString(el)) {
              var elements;
              elements = document.querySelectorAll(el);
              var gobj = getProp(_obj);
              elements.forEach(function(el) { el.style[gobj] = _prop.toString(); });
            } else {
              el.style[gobj] = _prop.toString();
            }
          });
        } else {
          throw new Error(libName + ": Invalid Arguments - (" + _obj + ", " + _prop + ")");
        }
      } else if (isObject(_els)) {
        if (isObject(_obj)) {
          const keys = Object.keys(_obj);
          keys.forEach(function(key) {
            var gkey = getProp(key);
            const prop = _obj[key];
            _els.style[gkey] = prop;
          });
        } else if (isString(_obj) && typeof _prop !== "undefined") {
          var gobj = getProp(_obj);
          _els.style[gobj] = _prop.toString();
        } else {
          throw new Error(libName + ": Invalid Arguments (" + _obj + ", " + _prop + ")");
        }
      } else if (isString(_els)) {
        if (isObject(_obj) && checkEl(_els)) {
          const keys = Object.keys(_obj);
          keys.forEach(function(key) {
            const prop = _obj[key];
            var gkey = getProp(key);
            var elements;
            elements = document.querySelectorAll(_els);
            elements.forEach(function(el) { el.style[gkey] = prop; });
          });
        } else if (checkEl(_els) && isString(_obj) && typeof _prop !== "undefined") {
          var elements, gobj;
          elements = document.querySelectorAll(_els);
          gobj = getProp(_obj);
          elements.forEach(function(el) { el.style[gobj] = _prop.toString(); });
        }
        else {
          throw new Error(libName + ": Invalid Arguments - (" + _els + ", " + _obj + ", " + _prop + ")");
        }
      }
      return _els;
    }
    const designOne = function(_els, _obj, _prop) {
      if (isArray(_els)) {
        const filtered = filterEl(_els);
        if (isObject(_obj)) {
          const keys = Object.keys(_obj);
          if (keys) {
            keys.forEach(function(_key) {
              const prop = _obj[_key];
              var gkey = getProp(_key);
              filtered.forEach(function(el) {
                if (isString(el) && checkEl(el)) {
                  document.querySelector(_el).style[gkey] = _prop;
                } else {
                  el.style[gkey] = prop;
                }
              });
            });
          }
        }
      } else if (isObject(_els)) {
        if (isObject(_obj)) {
          const keys = Object.keys(_obj);
          keys.forEach(function(key) {
            var gkey = getProp(_key);
            const prop = _obj[key];
            _els.style[gkey] = prop;
          });
        } else if (isString(_obj) && typeof _prop !== "undefined") {
          var gobj = getProp(_obj);
          _els.style[gobj] = _prop.toString();
        } else {
          throw new Error(libName + ": Invalid Arguments (" + _obj + ", " + _prop + ")");
        }
      } else if (isString(_els)) {
        if (isObject(_obj) && checkEl(_els)) {
          const keys = Object.keys(_obj);
          keys.forEach(function(key) {
            var gkey = getProp(key);
            const prop = _obj[key];
            document.querySelector(_els).style[gkey] = prop;
          });
        } else if (checkEl(_els) && isString([_obj, _prop])) {
          var gobj = getProp(_obj);
          document.querySelector(_els).style[gobj] = _prop;
        } else {
          throw new Error(libName + ": Invalid Arguments or Element NOT Found Error (" + _obj + ", " + _prop + ")");
        }
      }
      return _els;
    }
    const design = function(_obj, _val) {
      var now = this;
      if (isObject(_obj)) {
        const keys = Object.keys(_obj);
        keys.forEach(function(key) {
          const value = _obj[key];
          var gkey = getProp(key);
          now.style[gkey] = value;
        });
      } else if (isString(_obj) && typeof _val !== "undefined") {
        var gobj = getProp(_obj);
        now.style[gobj] = _val.toString();
      } else {
        throw new Error(libName + ": Invalid Arguments (" + _obj + ", " + _val + ")");
      }
      return now;
    }
    Element ? Element.prototype.design = design : console ? console["info"](libName + ": HTMLElement.design() Function is Not Supported in Your Browser.") : false;
    _o1.design = designAll;
    _o1.designOne = designOne;
  }
})(this, document);