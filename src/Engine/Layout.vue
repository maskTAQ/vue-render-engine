<script>
export default {
  name: "Layout",
  props: {
    nodes: {
      type: Object,
      required: true
    },
    nodeInject: {
      type: Object,
      required: true
    },
    px: {
      type: Object,
      required: true
    },
    layer: {
      type: Object,
      required: true
    },
    mode: String
  },
  data() {
    return {};
  },
  render(h) {
    const { nodes, nodeInject, mode, layer, px } = this;
    const { data } = layer.toJS();
    const children = nodes
      .map(node => {
        const { height } = node.size;
        const child = nodeInject.get(h, mode, node);
        return child ? this.getWrapper(child, node) : null;
      })
      .toJS()
      .filter(node => !!node);

    if (data && data.isCursorInEngine) {
      const {
        node: { type, from },
        isCursorInEngine,
        offset
      } = data;
      if (from === "add") {
        const insertNodeData = {
          type:"line",
          props: {
            label: "插入"
          },
          size: {
            height: 40
          }
        };
        children.splice(
          this.getInsertIndex(children, offset),
          0,
          this.getWrapper(
            nodeInject.get(h, mode, insertNodeData),
            insertNodeData
          )
        );
      }
    }

    return <div class="layout">{children}</div>;
  },
  methods: {
    getWrapper(child, node) {
      const { height } = node.size;
      return (
        <div class="node" style={{ height: this.px.get(height) }}>
          {child}
        </div>
      );
    },
  getInsertIndex(children, offset) {
  		      const { px } = this;
  		      if (children.length) {
  		        //或者光标y轴的值
  		        const y = offset.y; //px.getNumber(offset.y);
  		        //如果节点数量为一个
  		        if (children.length === 1) {
  		          //如果y轴大于组件的高度 则在后插入 反之在前 组件的高度并不是真实渲染的高度 需要计算出真实渲染的高度
  		          return y > parseFloat(px.getNumber(children[0].data.style.height)) ? 1 : 0;
				 
  		        }
  		        let insertIndex;
  		        const nodeYList = children
  		          //map处理一下 返回每个组件的高度
  		          .map(node => parseFloat(px.getNumber(node.data.style.height)))
  		          //reduce 遍历一下
  		          .reduce((n, p, i) => {
  		            //n为之前的所有高度 p为下一个组件的高度 i为下一个组件的下标
  		            switch (true) {
  		              //如果y小于上一个组件的高度 则在上一个位置插入
  		              case y <= n: {
  		                insertIndex = i - 1;
  		                break;
  		              }
  		              //如果y在上一个组件位置之下 下一个组件位置之上  则插入到下一个组件的位置
  		              case y > n && y <= n + p: {
  		                insertIndex = i;
  		                break;
  		              }
  		              //如果匹配到最后一个节点了 并且之前没有计算出插入的位置 则 在最后一项插入
  		              case i === children.length && insertIndex === undefined: {
  		                insertIndex = i;
  		              }
  		            }
  		            return n + p;
  		          });
  		        return insertIndex;
  		        //console.log("插入", y, nodeYList);
  		      } else {
  		        return 0;
  		      }
  		    }
  }
};
</script>