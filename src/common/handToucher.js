;(function (global, doc, factory) {
    // console.log(typeof global.define);
    if (typeof module !== 'undefined' && typeof module.exports === 'object') {  // 支持 module.exports
        module.exports = factory(global, doc);
    } else if (typeof global.define === 'function' && global.define.amd) {
        // 挂在到window
        global.andToucher = factory(global, doc);
    }
})(window, document,
//手势函数
    function (global) {

        if (!'ontouchstart' in global) {
            assert('此浏览器不支持触摸事件！');
            return
        }

        // 断言
        function assert(message) {
            console.error(`[handToucher Error]: ${message}`)
        }

        /**
         * 手势构造函数
         * @param target HTMLElement or id | class
         */
        function HandToucher(target) {
            if (!(this instanceof HandToucher)) {
                return new HandToucher(target);
            }
            this.target = target instanceof HTMLElement ? target :
                typeof target === 'string' ? document.querySelector(target) : null;
            if (!this.target) {
                assert('参数必须为Element或元素的class、id');
                return
            }

            this.emit = function () {
                let eventName = arguments[0];
                let arg = [...arguments];
                if (Array.isArray(this.eventList[eventName])) {
                    this.eventList[eventName].map(item => {
                        item.apply(null, []);
                    });
                    // this.clear();
                }
            }.bind(this);

            this.clear = function () {
                this.touch = void 0;
                this.movetouch = void 0;
                this.touchTime = 0;
                this.diffX = 0;
                this.diffY = 0;
            };

            this.touch = void 0; // 记录刚触摸的手指
            this.movetouch = void 0; // 记录移动过程中变化的手指参数
            this.touchTime = 0; // 记录 touchstart 触发时间
            this.diffX = 0;     // touchstart -> touchend pageX 差值
            this.diffY = 0;     // touchstart -> touchend pageY 差值
            this.eventList = {}; // 注册触发的事件
            //保存原始的 top 值
            this.originalTop = this.target.style.top ? ~~this.target.style.top.replace('px', '') : 0;
            // this.touchTimeEnd = 0;
            this.target.addEventListener('touchstart', _touchStart.bind(this), false);
            this.target.addEventListener('touchmove', _touchMove.bind(this), false);
            this.target.addEventListener('touchend', _touchEnd.bind(this), false);
            // this.target.addEventListener('touchcancel',this._cancel);
        }

        function _touchStart(e) {
            e.preventDefault();
            // 一个手指时
            this.touchTime = 0;
            this.movetouch = void 0;
            if (e.touches.length === 1) {
                this.touch = e.touches[0];
                // 记录当前的时间
                this.touchTime = getCurrentTime();
            }

        }

        function _touchMove(e) {
            e.preventDefault();
            if (e.touches.length === 1) {
                this.movetouch = e.touches[0];
                if (this.eventList['slide']) {
                    let el = this.target;
                    el.style.top = (this.movetouch.pageY - this.touch.pageY) + this.originalTop + 'px';
                }
            }
        }

        function _touchEnd(e) {
            e.preventDefault();
            let currentTime = getCurrentTime();
            let diffTime = currentTime - this.touchTime;
            let isTap = false, vector = 0;
            if (this.movetouch) {
                vector = getDistance(this.touch.pageX, this.touch.pageY, this.movetouch.pageX, this.movetouch.pageY);
                // 向量小于3时，可为触发 'tap' 事件的条件之一
                if (vector < 3) {
                    isTap = true;
                }
                this.diffX = this.movetouch.pageX - this.touch.pageX;
                this.diffY = this.movetouch.pageY - this.touch.pageY;
                this.originalTop = this.originalTop + this.diffY;
            } else {
                isTap = true;
            }
            // 记录当前的时间
            if (diffTime < 800 && isTap) {
                this.emit('tap')
            } else if (diffTime >= 800 && isTap) {
                this.emit('longtap')
            } else if (!isTap) {
                this.emit('slide', this.diffX, this.diffY, vector)
            }
            if (this.eventList['slide']) {

                let diffY = this.diffY;
                let v = diffY / diffTime * 1000;
                moveSlide.call(this, v - (v / 2));

            }

        }

        function moveStep(l) {
            this.target.style.top = l + this.originalTop + 'px';
            this.originalTop = ~~this.target.style.top.replace('px','')
        }

        function moveSlide(v) {
            if (v > 0) {
                let l = v * (3 / 50);
                // window.requestAnimationFrame(moveStep.bind(this, l));
                setTimeout(moveStep.bind(this, l),100)
                moveSlide.call(this, v - 10);
            } else {
                this.originalTop = this.target.style.top ? ~~this.target.style.top.replace('px', '') : 0;
            }
        }

        function getDistance(startX, startY, endX, endY) {
            // Math.sqrt 平方根
            // Math.pow(number,n)  n次幂
            return Math.sqrt(Math.pow((startX - endX), 2) + Math.pow((startY - endY), 2))
        }

        function getCurrentTime() {
            return Date.now();
        }

        HandToucher.prototype = {
            constuctor: HandToucher,
            on: function (eventName, callback) {
                if (['tap', 'longtap', 'slide'].indexOf(eventName) === -1) {
                    assert('触发事件必须为 tap、longtap、slide 其中之一');
                    return
                }
                if (!this.eventList[eventName]) {
                    this.eventList[eventName] = [];
                }
                this.eventList[eventName].push(callback)
            }
        };

        return HandToucher;

    });