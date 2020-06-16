<script>
import Vue from "vue";
import nodeInject from "../components";
import { MapUtils } from "./utils";

export default {
  name: "Layer",
  props: ["data"],
  nodeGlobal: null,
  data() {
    return {};
  },
  beforeUpdate() {
    const { process, isShowMoveNodeGlobal, moveData } = MapUtils.getKeys(
      this.data,
      ["process", "isShowMoveNodeGlobal", "moveData"]
    );
    console.log(process, "process");
    switch (process) {
      case "start": {
        this.injectNodeToRoot();
        break;
      }
      case "moveing": {
        const { left, top } = moveData.location;
        this.setStyle(this.nodeGlobal, {
          position: "absolute",
          left: `${left}px`,
          top: `${top}px`
        });
        break;
      }
      case "end": {
        this.destroyNodeInRoot();
        break;
      }
    }
  },
  methods: {
    injectNodeToRoot() {
      if (!this.nodeGlobal) {
        const moveData = this.data.get("moveData") || {};
        const {
          dom,
          location: { left, top }
        } = moveData;
        const nodeGlobal = dom.cloneNode(true);
        const root = document.getElementById("app");
        this.setStyle(nodeGlobal, {
          position: "absolute",
          left: `${left}px`,
          top: `${top}px`
        });
        this.nodeGlobal = nodeGlobal;

        root.appendChild(nodeGlobal);
      }
    },
    destroyNodeInRoot() {
      this.nodeGlobal.parentNode.removeChild(this.nodeGlobal);
      this.nodeGlobal = null;
    },
    setStyle(dom, style) {
      Object.assign(dom.style, style);
    }
  },
  render(h) {
    return <div class="layer">{this.data}</div>;
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