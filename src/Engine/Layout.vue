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
          type,
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
        const y = px.getNumber(offset.y);
        if (children.length === 1) {
          return y > parseFloat(children[0].data.style.height) ? 1 : 0;
        }
        let insertIndex;
        const nodeYList = children
          .map(node => parseFloat(node.data.style.height))
          .reduce((n, p, i) => {
            switch (true) {
              case y <= p: {
                insertIndex = i;
                break;
              }
              case y > n && n < p: {
                insertIndex = i + 1;
                break;
              }
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