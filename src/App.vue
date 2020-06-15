<template>
  <div id="app">
	<MainLeft></MainLeft>
    <Engine mode="h5" :dataInject="dataInject" :nodeInject="nodeInject" :bridge="bridge" />
  </div>
</template>

<script>
import Engine from "@/Engine";
import MainLeft from "@/components/mainLeft";
import Bridge from "@/Engine/utils/Bridge";
import { dataInject } from "@/utils";
import nodeInject from "./components";

const bridge = new Bridge();
window.bridge = bridge;

export default {
  name: "App",
  data() {
    return {
      dataInject,
      nodeInject,
      bridge
    };
  },
  components: {
    Engine,MainLeft
  },
  mounted() {
    //像引擎发送一个 EVENTS.NODE_MOVE 命令
    //bridge.execute({ type: bridge.command.EVENTS.NODE_MOVE, data: { x: 0, y: 0 } });
  }
};
</script>

<style lang="scss">
</style>
