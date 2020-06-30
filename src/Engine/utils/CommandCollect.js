import _ from 'lodash';
import { isDiffInTheRange } from './index';

function pxConverPointWithObject(x) {
    return x;
}
export default class CommandCollect {
    constructor(config, command) {
        this.command = command;
        Object.assign(this, config);
        const o = "orientationchange" in window ? "orientationchange" : "resize";
        if (!config.scene) {
            document.addEventListener('mousedown', this.handleMousedown, true);
            document.addEventListener('mousemove', this.tryMove, true);
            document.addEventListener('mouseup', this.handleMouseup, true);
        }
        window.addEventListener(o, this.debounceResize());
    }
    destroy() {
        const o = "orientationchange" in window ? "orientationchange" : "resize";
        document.removeEventListener('mousedown', this.handleMousedown);
        document.removeEventListener('mousemove', this.tryMove);
        document.removeEventListener('mouseup', this.handleMouseup);
        window.removeEventListener(o, this.debounceResize());
    }
    statusTag = {
        //交互的触发者
        target: {
            type: '',//move resize rotate
            direction: '',//当type为resize时有值
            moduleId: '',
            rotate: '',
        },
        //鼠标点下时 位置记录 依据这个做差异性数据的计算
        'clickOffset.px': {
            //点击时距离body的位置
            startX: 0,
            startY: 0,
            //鼠标距离组件的位置
            offsetX: 0,
            offsetY: 0,
        },
        'offset.px': {
            deltaX: 0,
            deltaY: 0,
            top: 0,
            left: 0
        },
        //移动失败实数 大于1次 则为双击
        numberOfMoveFail: 0,
        //上次鼠标单击事件
        prevSingleClickTimeStamp: 0
    };
    debounceResize = () => {
        this.cache = this.cache || _.debounce(this.resize, 1000);
        return this.cache
    }
    resize = () => {
        // execute({
        //     type: this.command.EVENTS.RESIZE
        // });
    }
    isCursorisCursorInEngine = false;
    attr(dom, key) {
        const match = dom.attributes[key];
        return match ? match.value : undefined;
    }
    getTarget(dom) {
        const { attributes, className = '', id } = dom;
        if (attributes && attributes['data-engine-node']) {
            const nodeType = this.attr(dom, 'data-node-type');
            const nodeId = this.attr(dom, 'data-node-id');
            const nodeMode = this.attr(dom, 'data-mode');
            return {
                type: 'move',
                trigger: dom,
                dom,
                node: {
                    type: nodeType,
                    id: nodeId,
                    mode: nodeMode
                }
            };
        }
        if (className.includes && className.includes('resizable-handler')) {
            const moduleDom = dom.parentNode.childNodes[0];
            return {
                type: 'resize',
                direction: className.split(' ')[0],
                moduleId: moduleDom.id,
                trigger: dom,
                dom: dom.parentNode
            };
        }
        if (className.includes && className.includes('rotate-handler')) {
            const moduleDom = dom.parentNode.childNodes[0];
            return {
                type: 'rotate',
                moduleId: moduleDom.id,
                trigger: dom,
                dom: dom.parentNode
            };
        }
        if (dom.parentElement) {
            return this.getTarget(dom.parentElement);
        } else {
            return false;
        }
    }
    isEngine = (e) => {
        if (e === this.engineContainer) {
            return e;
        }
        if (e.parentElement) {
            return this.isEngine(e.parentElement);
        } else {
            return false;
        }
    }
    getCanvasDom() {
        return this.engineContainer;
    }
    //同步 layer层滚动 保持 layer中模块相对位置与Canvas中一致
    getCanvasScroll = () => {
        const canvasDom = this.getCanvasDom();

        return canvasDom ? {
            x: canvasDom.scrollLeft,
            y: canvasDom.scrollTop
        } : {
                x: 0,
                y: 0
            }
    }
    execute(type, data) {
        const { execute, EVENTS } = this.command;
        execute(EVENTS[type], data);
    }
    handleMousedown = e => {
        const target = this.getTarget(e.target);
        if (target) {
            const { clientX, clientY, offsetX, offsetY } = e;
            //重置标识符
            this.statusTag['clickOffset.px'] = {
                startX: clientX,
                startY: clientY,
                offsetX,
                offsetY
            };
            // console.log(target,'target');
            this.statusTag.target = target;
        }
        this.statusTag.inMove = false;
    }
    cursorisCursorInEngine = e => {
        const p = {
            x: e.pageX - document.documentElement.scrollLeft,
            y: e.pageY - document.documentElement.scrollTop,
        }
        const rect = this.engineContainer.getBoundingClientRect();
        const result = Math.min(p.x, rect.x) === rect.x && Math.max(p.x, rect.x + rect.width) === rect.x + rect.width && Math.min(p.y, rect.y) === rect.y && Math.max(p.y, rect.y + rect.height) === rect.y + rect.height
        return {
            result,
            offset: {
                x: p.x - rect.x,
                y: p.y - rect.y
            }
        }
    }
    tryMove = e => {

        const { clientX, clientY, pageX, pageY } = e;
        const { execute, EVENTS } = this.command;
        const { startX, startY, offsetX, offsetY, } = this.statusTag['clickOffset.px'];
        const { type, direction, moduleId, dom, node } = this.statusTag.target;
        //是否是第一次移动
        let isStartMove = false;
        //移动的幅度大于2才算移动
        if (type && !this.statusTag.inMove && (!isDiffInTheRange(startX - clientX, 2) || !isDiffInTheRange(startY - clientY, 2))) {
            isStartMove = true;
            this.statusTag.inMove = true;
        }
        if (type) {
            if (this.statusTag.inMove) {
                // if (type === 'move') {
                //     const { x, y } = this.getCanvasScroll();
                //     //位置的偏移量等于 clientX的差异 和 cavans的滚动位置的 和
                //     this.statusTag['offset.px'] = {
                //         left: clientX - this.statusTag['clickOffset.px'].startX - x,
                //         top: clientY - this.statusTag['clickOffset.px'].startY - y
                //     }
                // }
                // if (type === 'resize') {
                //     const deltaX = clientX - this.statusTag['clickOffset.px'].startX
                //     const deltaY = clientY - this.statusTag['clickOffset.px'].startY
                //     this.statusTag['offset.px'] = {
                //         deltaX,
                //         deltaY
                //     };
                // }
                // if (type === 'rotate') {
                //     this.statusTag['offset.px'] = {
                //         x: clientX,
                //         y: clientY
                //     };
                // }
                const { result, offset } = this.cursorisCursorInEngine(e);
                if (isStartMove) {
                    execute({
                        type: EVENTS.NODE_START_MOVE,
                        data: {
                            ...this.statusTag.target,
                            isCursorInEngine: result,
                            global: {
                                x: pageX,
                                y: pageY
                            },
                            offset
                        }
                    });
                } else {
                    execute({
                        type: EVENTS.NODE_MOVEING,
                        data: {
                            node,
                            isCursorInEngine: result,
                            global: {
                                x: pageX - offsetX,
                                y: pageY - offsetY
                            },
                            offset
                        }
                    });
                }

            }
            //console.log(offsetX, offsetY)
        }

        return true;
    }

    handleMouseup = (e) => {
        const { pageX, pageY } = e;
        const { offsetX, offsetY, } = this.statusTag['clickOffset.px'];
        const { moduleId, node } = this.statusTag.target;
        const { inMove, numberOfMoveFail, prevSingleClickTimeStamp } = this.statusTag;
        const { EVENTS, execute } = this.command;
        const now = Date.now();

        if (inMove) {
            this.statusTag.numberOfMoveFail = 0;
        } else {
            this.statusTag.numberOfMoveFail += 1;
        }
        //确定事件类型
        const eventType = numberOfMoveFail >= 1 && now - prevSingleClickTimeStamp <= 300 ? 'doubleClick' : 'click';

        if (eventType === 'click') {
            if (node) {
                if (inMove) {
                    const { result, offset } = this.cursorisCursorInEngine(e);
                    execute({
                        type: EVENTS.NODE_MOVE_COMPLETE,
                        data: {
                            node,
                            isCursorInEngine: result,
                            global: {
                                x: pageX - offsetX,
                                y: pageY - offsetY
                            },
                            offset
                        }
                    });
                } else {
                    console.log(e.target.innerHTML,'发送')
                    execute({
                        type: EVENTS.CLICK_NODE,
                        data:{node:node,value:e.target.innerHTML}
                    });
                }
            } else {
                //没有则判断点击的dom是不是冒泡到canvas
                if (this.isEngine(e.target)) {
                    execute({
                        type: EVENTS.CLICK_CANVAS
                    });
                }
            }
        }

        if (eventType === 'doubleClick') {
            if (moduleId) {
                execute({
                    type: EVENTS.DOUBLECLICK_NODE,
                    data: moduleId
                });
            } else {
                //没有则判断点击的dom是不是冒泡到canvas
                if (this.isEngine(e.target)) {
                    execute({
                        type: EVENTS.DOUBLECLICK_CANVAS,
                        data: moduleId
                    });
                }
            }
        }
        this.statusTag.prevSingleClickTimeStamp = now;
        this.statusTag.target = {};
        this.statusTag['offset.px'] = {};
    }
}