<script>
import { TYPE as LayerType } from "./Layer.vue";
import { getInsertIndex } from "./utils";
import del from "@/assets/del.png";
import Bridge from "@/Engine/utils/Bridge";
import Command from "@/Engine/utils/Command";

export default {
  name: "Layout",
  props: {
    bridge: {
      type: Object,
      required: true
    },
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
    scene: {
      type: String
    },
    mode: String
  },
  data() {
    return {
      nodesId: ""
    };
  },
  render(h) {
    const { nodes, nodeInject, mode, layer, px, scene } = this;
    const { data, type } = layer.toJS();
    const children = nodes
      .map(node => {
        const { height } = node.size;
        const child = nodeInject.get(h, { mode, node, scene });
        return child ? this.getWrapper(child, node, scene) : null;
      })
      .toJS()
      .filter(node => !!node);

    if (data && data.isCursorInEngine && type === LayerType.NODE_MOVEING) {
      const {
        node: { type, mode },
        isCursorInEngine,
        offset
      } = data;
      //if (mode === "menu") {
      const insertNodeData = {
        type: "line",
        props: {
          label: "插入"
        },
        size: {
          height: 44
        }
      };
      children.splice(
        //获取插入节点的位置
        getInsertIndex({ px, nodes: nodes.toJS(), offset }),
        0,
        this.getWrapper(
          nodeInject.get(h, {
            mode: this.mode,
            node: insertNodeData,
            scene
          }),
          insertNodeData,
          scene
        )
      );
      //}
    }
    return (
      <div class="layout">
        {nodeInject.getForm(h, { mode, children, scene ,onSubmit:this.onSubmit})}
      </div>
    );
  },
  methods: {
    getWrapper(child, node, scene) {
      if (scene === "view") {
        return (
             <div data-engine-node={true}
              data-mode="h5"
              data-node-type={node.type}
              data-node-id={node.nid}>
              <div
              class={node.nid === this.nodesId ? "acnode" : "node"}
              onClick={() => this.handleClicknode(child, node)}
              style={{ height: "100%", marginBottom: "2px" }}
              >
              {child}
              <img
                class={node.nid === this.nodesId ? "del" : "displaydel"}
                onClick={() => this.del(child, node)}
                src={del}
              />
            </div>
          </div>
        );
      } else {
        return (
          <div class="node" style={{ height: "100%", marginBottom: "2px" }}>
            {child}
          </div>
        );
      }
    },
    handleClicknode(child, node) {
      this.nodesId = node.nid;
    },
    onSubmit(v){
      this.$emit('submit',v)
    },
    del(child, node) {
      this.bridge.execute({
        type: bridge.command.EVENTS.DELETE_NODE,
        data: node.nid
      });
    }
  }
};
</script>
<style>
.displaydel {
  display: none;
}
.del {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 15px;
}
.acnode {
  border: 1px solid #3296fa;
  position: relative;
}
</style>