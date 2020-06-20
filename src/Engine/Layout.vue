<script>
import { TYPE as LayerType } from "./Layer.vue";
import { getInsertIndex } from "./utils";

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
    const { data, type } = layer.toJS();
    const children = nodes
      .map(node => {
        const { height } = node.size;
        const child = nodeInject.get(h, mode, node);
        return child ? this.getWrapper(child, node) : null;
      })
      .toJS()
      .filter(node => !!node);

    if (data && data.isCursorInEngine && type === LayerType.NODE_MOVEING) {
      const {
        node: { type, mode },
        isCursorInEngine,
        offset
      } = data;
      if (mode === "menu") {
        const insertNodeData = {
          type: "line",
          props: {
            label: "插入"
          },
          size: {
            height:40
          }
        };
        children.splice(
          //获取插入节点的位置
          getInsertIndex({ px, nodes: nodes.toJS(), offset }),
          0,
          this.getWrapper(
            nodeInject.get(h, this.mode, insertNodeData),
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
    }
  }
};
</script>