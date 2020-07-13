class AddNode {
    constructor(nodeId, prevId) {
        this.nodeId = nodeId;
        this.name = nodeId;
        this.prevId = prevId
        this.type = 'approver';
    }
}
class ConditionNode {
    constructor(nodeId, prevId) {
        this.nodeId = nodeId;
        this.type = 'route';
        this.prevId = prevId
        this.conditionNodes = [
            {
                "name": new Date().toLocaleTimeString() + '-1-条件',
                "type": "condition",
                "prevId": nodeId,
                "nodeId": new Date().toLocaleTimeString() + '-1',
            },
            {
                "name": new Date().toLocaleTimeString() + '-2-条件',
                "type": "condition",
                "prevId": nodeId,
                "nodeId": new Date().toLocaleTimeString() + '-2',
            }
        ]

    }
}
class ConditionNodeSingle {
    constructor(nodeId, count, prevId) {
        return {
            "name": `${new Date().toLocaleTimeString()}-${count}-条件`,
            "type": "condition",
            "prevId": prevId,
            "nodeId": `${new Date().toLocaleTimeString()}-${count}`,
        }


    }
}
export class MultiwayTree {
    constructor(tree, context) {
        this._root = tree;
        this.context = context; // 上下文环境
    }
    //深度优先遍历
    traverseDF(callback) {
        let stack = [], found = false;
        stack.unshift(this._root);
        let currentNode = stack.shift();
        while (!found && currentNode) {
            found = callback(currentNode) === true ? true : false;
            if (!found) {
                stack.unshift(...currentNode.childNode);
                currentNode = stack.shift();
            }
        }
    }
    //广度优先遍历
    traverseBF(callback) {
        let queue = [], found = false;
        queue.push(this._root);
        let currentNode = queue.shift();
        // 这里是用了栈的思想去找当前选中的节点
        while (!found && currentNode) {
            if (currentNode.type === "route") {
                found = callback(currentNode) === true ? true : false;
                if (!found) {
                    queue.push(...currentNode.conditionNodes)
                    // 当 当前节点既有子节点也有条件节点时需要都push进入栈内
                    currentNode.childNode && queue.push(currentNode.childNode)
                    currentNode = queue.shift();
                }
            } else {
                found = callback(currentNode) === true ? true : false;
                if (!found) {
                    // 这里是因为当遇到route也就是条件节点的时候，会依次进入的每个条件中
                    // 这里加一个判断是为了避免在进入到某个条件中没有审核节点还去遍历它
                    currentNode.childNode && queue.push(currentNode.childNode)
                    currentNode = queue.shift();
                }
            }
        }
    }
    contains(callback, traversal) {
        traversal.call(this, callback);
    }
    findParent(nodeId, traversal) {
        let parent = null,
            callback = function (node) {
                if (node.nodeId === nodeId) {
                    parent = node;
                    return true;
                }
            };
        this.contains(callback, traversal);
        return parent
    }
    add(option, toData, traversal) {
        if (this._root === null) {
            this._root = node;
            return this;
        }
        const parent = this.findParent(toData, traversal)
        let node
        if (parent) {
            // 确定有父节点再去创建子节点
            // true 是 审核或抄送节点 false 是 条件节点
            if (option.data.nodeType) {
                node = new AddNode(option.nodeId, parent.nodeId)
            } else if (option.data.type !== 'conditionNode') {
                node = new ConditionNode(option.nodeId, parent.nodeId)
            }
            if (parent.childNode && option.data.type !== 'conditionNode') {
                // 如果在当前节点下增加审核节点，则当前节点下的所有子节点放置到条件1下
                if (node.conditionNodes) {
                    parent.childNode.prevId = node.conditionNodes[0].nodeId
                    // 变更其子元素的childNode
                    node.conditionNodes[0].childNode = parent.childNode
                } else {
                    parent.childNode.prevId = node.nodeId
                    node.childNode = parent.childNode;
                }
            }
            if (node) {
                this.context.$set(parent, 'childNode', node)
            }
            if (option.data.type === 'conditionNode') {
                node = new ConditionNodeSingle(option.nodeId, parent.conditionNodes.length + 1, parent.nodeId)
                parent.conditionNodes.push(node)
            }
            return this;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    }
    getLastChildNode(node) {
        if (node.childNode) {
            return this.getLastChildNode(node.childNode)
        }
        return node
    }
    remove(nodeId, fromData, traversal) {
        let childToRemove = null
        const parent = this.findParent(fromData, traversal)
        if (parent) {
            if (parent.conditionNodes) {
                const len = parent.conditionNodes.length
                const index = parent.conditionNodes.findIndex(item => item.nodeId === nodeId)
                if (index >= 0) { // 说明当前要删除的是条件节点
                    const grandsonNode = parent.childNode
                    if (len > 2) {
                        parent.conditionNodes.splice(index, 1)
                    } else if (len === 2) {
                        const conditionNodes = parent.conditionNodes.filter(item => {
                            return item.childNode && item.nodeId !== nodeId
                        })
                        const grandfatherNode = this.findParent(parent.prevId, traversal)
                        this.context.$delete(grandfatherNode, 'childNode')
                        if (conditionNodes.length !== 0) {
                            if (conditionNodes[0].childNode) {
                                // 将条件节点下的节点移到条件节点父亲的下面
                                if (grandsonNode) {
                                    // 递归获取当前节点的最后一个子节点
                                    const lastNode = this.getLastChildNode(conditionNodes[0].childNode)
                                    grandsonNode.prevId = lastNode.nodeId
                                    this.context.$set(lastNode, 'childNode', grandsonNode)
                                }
                                conditionNodes[0].childNode.prevId = grandfatherNode.nodeId
                                this.context.$set(grandfatherNode, 'childNode', conditionNodes[0].childNode)
                            }
                        } else {
                            if (grandsonNode) {
                                grandsonNode.prevId = grandfatherNode.nodeId
                                this.context.$set(grandfatherNode, 'childNode', grandsonNode)
                            }

                        }
                    }
                } else if (parent.childNode.nodeId !== nodeId) {
                    throw new Error('AddNode to remove does not exist.');
                }
            }
            if (parent.childNode && parent.childNode.nodeId === nodeId) {
                if (parent.childNode.childNode) {
                    parent.childNode.childNode.prevId = parent.nodeId
                    this.context.$set(parent, 'childNode', parent.childNode.childNode)
                } else {
                    this.context.$delete(parent, 'childNode')
                }
            }
        } else {
            throw new Error('Parent does not exist.');
        }
        return this;
    }
    _findIndex(arr, nodeId) {
        let index = -1;
        for (let i = 0, len = arr.length; i < len; i++) {
            if (arr[i].nodeId === nodeId) {
                index = i;
                break;
            }
        }
        return index;
    }
}