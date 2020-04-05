/**
 * 工具函数
 */

/**
 * DOMReady,在页面的DOM内容加载完成后即触发，而无需等待其他资源的加载
 * 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发
 * 
 * @class      DOMReady (name)
 * @param      {Function}  fn      需要执行的函数
 */
function DOMReady(fn) {
	//现代浏览器
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fn, false);
	} else {
		IEContentLoaded(fn);
	}
	//IE 浏览器模拟 DOMContentLoaded
	function IEContentLoaded(fn) {
		var isDone = false;
		//确保fn只执行一次
		function init() {
			if (!isDone) {
				isDone = true;
				fn();
			}
		}

    /**
     * ie有个特有的doScroll方法，当页面DOM未加载完成时，调用doScroll方法时，就会报错，
     * 反过来，只要一直间隔调用doScroll直到不报错，那就表示页面DOM加载完毕了。
     */
		(function() {
			try {
        // DOM树未创建完之前调用doScroll会抛出错误
				document.documentElement.doScroll('left');
			} catch (e) {
				// 延迟后再次尝试能否调用doScroll
				setTimeout(arguments.callee, 50);
				return;
			}
			// 运行到此处表示可以调用doScroll,即表示DOM树创建完毕，应该立即执行fn
			init();
		})();

		// 监听 document 的加载状态, readyState 描述了文档的加载状态
		document.onreadystatechange = function() {
			if (document.readyState == 'interactive' || document.readyState == 'complete') {
				document.onreadystatechange = null;
				init();
			}
		}
	}
}

/**
 * 
 * @param      {<string>} id 要获取节点的 id
 * @return     {<object>} 要获取的节点
 */
function getById(id) {
  return document.getElementById(id);
}

/**
 * 通过 class 获取 DOM 节点，返回包含 classname 中所有的类名的节点
 *
 * @param      {object}  parent     父级对象
 * @param      {string}  classname  类名
 * @return     {Array}   获取到的节点数组
 */
function getByClass(parent, classname) {
	if (parent.getElementsByClassName) {
		return parent.getElementsByClassName(classname);
	} else if (document.querySelectorAll) {
		return parent.querySelectorAll('.' + classname);
	} else {
		var elems = parent.getElementsByTagName('*');
		var result = [];
		var re = new RegExp('\\b' + classname + '\\b', 'i');
		for (var i = 0; i < elems.length; i++) {
			if (re.test(elems[i].className)) {
				result.push(elems[i]);
			}
		}
	}
	return result;
}

/**
 * 通过tagName获取DOM节点
 *
 * @param      {object}  parent     父级对象
 * @param      {string}  tagname    标签名
 * @return     {object}   获取到的节点NodeList对象.
 */
function getByName(parent, tagname) {
	return parent.getElementsByTagName(tagname);
}

/**
 * 通过css选择器获取DOM节点
 *
 * @param      {object}  parent     父级对象
 * @param      {string}   str   css选择器
 * @return     {object}   获取到的节点NodeList对象.
 */
function $(parent, str) {
	return parent.querySelectorAll(str);
}

/**
 * 添加事件处理程序
 *
 * @param      {object}  obj      需要绑定事件的对象
 * @param      {string}  type     事件类型
 * @param      {function}  handler  事件触发执行的事件处理函数
 */
function addHandler(obj, type, handler) {
	if (obj.addEventListener) {
		obj.addEventListener(type, handler, false);
	} else if (obj.attachEvent) {
		obj.attachEvent('on' + type, function() {
			// this 原本指向 window，通过 call 改变指向
			handler.call(obj);
		});
	} else {
		obj['on' + type] = handler;
	}
}

/**
 * 移除事件处理程序
 *
 * @param      {object}  obj      要移除事件的对象
 * @param      {string}  type     事件类型
 * @param      {function}  handler  要移除的事件处理函数
 */
function removeHandler(obj, type, handler) {
	if (obj.removeEventListener) {
		obj.removeEventListener(type, handler, false);
	} else if (obj.detachEvent) {
		obj.detachEvent('on' + type, handler);
	} else {
		obj['on' + type] = null;
	}
}

/**
 * 获取实际样式
 * @param  {object} obj  需要获取样式的对象
 * @param  {string} attr 需要获取的样式名
 * @return {string}      获取到的样式值
 */
function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

/**
 * 动画函数
 * @param  {object} obj   需要添加动画的对象
 * @param  {json} json    JSON数据,名为attr,值为iTarget.
 * @param  {int} n        速度因子，控制速度
 * @param  {function} endFn 回调函数，可实现链式运动.连续运动
 * 
 */
function doMove(obj, json, n, endFn) {
	clearInterval(obj.timer);
	var iValue = 0;
	var iSpeed = 0;
	var iOffset = 0;
	obj.timer = setInterval(function() {
		var isStop = true;
		for (var attr in json) {
			var iTarget = json[attr];

			if (attr == 'opacity') {
				iValue = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				iValue = parseInt(getStyle(obj, attr));
			}

			iSpeed = (iTarget - iValue) / n;
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
			iOffset = iValue + iSpeed;

			if (iValue != iTarget) {
				isStop = false;
				if (attr == 'opacity') {
					obj.style.opacity = iOffset / 100;
					obj.style.filter = 'alpha(opacity=' + iOffset + ')';
				} else {
					obj.style[attr] = iOffset + 'px';
				}
			}
		}
		if (isStop) {
			clearInterval(obj.timer);
			endFn && endFn();
		}
	}, 30);
}