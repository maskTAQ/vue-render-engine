<template>
	<div id="app">
		<a-row>
			<a-col :span="8">
			<NodeMenu />
			</a-col>
			<a-col :span="8">
				<div class="wf-formcanvas">
				 <Engine class="wf-formcanvas-inner" trigger mode="h5" :dataInject="dataInject" :nodeInject="nodeInject" :bridge="bridge" />
				</div>
			</a-col>
			
			<a-col :span="8">
				<Setting :bridge="bridge"/>
			</a-col>
		</a-row>
	</div>
</template>

<script>
import Engine from "@/Engine";
import NodeMenu from "@/NodeMenu";
import Setting from './Seting/index.vue';

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
	NodeMenu,
	Setting
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
	.wf-formcanvas {
    position: absolute;
    left: 50%;
    margin-left: -245px;
    width: 490px;
    height: 670px;
    background: url(//img.alicdn.com/tfs/TB1vgDmBntYBeNjy1XdXXXXyVXa-980-1340.png) no-repeat top;
    background-size: 100% 100%;
}
.wf-formcanvas-inner {
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    width: 292px;
    height: 480px;
    left: 50%;
    margin-left: -146px;
    top: 4px;
    max-height: 480px;
    background: #f6f6f6;
}
</style>
