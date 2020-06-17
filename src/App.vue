<template>
	<div id="app">
		<a-row>
			<a-col :span="8">
			<NodeMenu />
			</a-col>
			<a-col :span="8">
				<div class="hb">
					<img src="./assets/bj.png" alt="" class="bj">
				    <Engine trigger mode="h5" :dataInject="dataInject" :nodeInject="nodeInject" :bridge="bridge" />
				</div>
			</a-col>
			<a-col :span="8">
				<div>
					<input type="text" placeholder="默认值">
				</div>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import Engine from "@/Engine";
import NodeMenu from "@/NodeMenu";
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
    Engine,
    NodeMenu
  },
  mounted() {
    //像引擎发送一个 EVENTS.NODE_MOVE 命令
    //bridge.execute({ type: bridge.command.EVENTS.NODE_MOVE, data: { x: 0, y: 0 } });
  }
};
</script>

<style lang="scss">
	#app{
		.bj{
			         width: 327px;
			         height: 591px;
			         box-shadow: 2px 3px 6px 3px #EEEEEE;
			         border-radius: 16px;
			         position: absolute;
			         z-index: -1;
			         left: -4px;
			         top: 31px;
		}
	}
</style>
