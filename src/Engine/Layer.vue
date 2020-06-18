<script>
import Vue from "vue";
import nodeInject from "../components";
import { MapUtils } from "./utils";

export const TYPE = {
  NODE_START_MOVE: "NODE_START_MOVE",
  NODE_MOVEING: "NODE_MOVEING",
  NODE_MOVE_COMPLETE: "NODE_MOVE_COMPLETE"
};
export default {
  name: "Layer",
  props: ["data"],
  nodeGlobal: null,
  data() {
    return {};
  },
  beforeUpdate() {
    const { type, data } = MapUtils.getKeys(this.data, ["type", "data"]);

    switch (type) {
      case TYPE.NODE_START_MOVE: {
        this.injectNodeToRoot();
        break;
      }
      case TYPE.NODE_MOVEING: {
        const { x, y } = data.global;
        this.setStyle(this.nodeGlobal, {
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`
        });
        break;
      }
      case TYPE.NODE_MOVE_COMPLETE: {
        this.destroyNodeInRoot(data);
        break;
      }
    }
  },
  methods: {
    injectNodeToRoot() {
      if (!this.nodeGlobal) {
        const data = this.data.get("data") || {};
        const {
          dom,
          global: { x, y }
        } = data;
        const nodeGlobal = dom.cloneNode(true);
        const root = document.getElementById("app");
        this.setStyle(nodeGlobal, {
          position: "absolute",
          left: `${x}px`,
          top: `${y}px`
        });
        this.nodeGlobal = nodeGlobal;

        root.appendChild(nodeGlobal);
      }
    },
    destroyNodeInRoot(data) {
      console.log(data, "data");
      this.nodeGlobal.parentNode.removeChild(this.nodeGlobal);
      this.nodeGlobal = null;
    },
    setStyle(dom, style) {
      Object.assign(dom.style, style);
    }
  },
  render(h) {
    this.data;
    return null;
  }
};
</script>
<style lang="scss">
.layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid red;
}
</style>