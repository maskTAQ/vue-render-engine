<template>
  <div id="app">
    <Engine
     
      trigger
      mode="h5"
      :scene="scene"
      :dataInject="datasource"
      :nodeInject="nodeInject"
      :params="id"
      :bridge="bridge"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import Engine from "@/Engine";
import NodeMenu from "@/NodeMenu";
import Setting from "./Seting/index.vue";
import {WfFormVariablesSave} from "@/service/getData.js"
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
import { datasource } from "@/utils";
import nodeInject from "./components";
import bridge from "@/bridge";
window.bridge = bridge;

export default {
  name: "App",
  data() {
    return {
      // edit 可编辑的场景 view只读的场景 none 是隐藏
      scene: "edit",
      id:this.$route.query.id,
      datasource,
      nodeInject,
      bridge
    };
  },
  components: {
    Engine,
    NodeMenu,
    Setting
  },
  created(){
    this.getdata()
  },
  mounted() {
    this.getdata()
    //像引擎发送一个 EVENTS.NODE_MOVE 命令
    //bridge.execute({ type: bridge.command.EVENTS.NODE_MOVE, data: { x: 0, y: 0 } });
  },
  methods: {
    getdata(){
      // let id = this.$route.query.id
      // getFromForStart(id,{
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   }).then(res=>{
      //  console.log(res.result,'res')
      // })
    },
    onSubmit(values) {
      WfFormVariablesSave(values,{
          headers: {
            "Content-Type": "application/json"
          }
        }).then(res=>{
        Toast.success(res.message);
      })
      console.log("submit", values);
    }
  }
};
</script>

<style lang="scss">
.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-row.main-center {
  justify-content: center;
}

.main-between {
  justify-content: space-between;
}

.flex-row.center {
  align-items: center;
}

.flex-end {
  justify-content: flex-end;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-column.main-center {
  justify-content: center;
}

.flex-column.center {
  align-items: center;
}

.align {
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  .bj {
    width: 327px;
    height: 591px;
    box-shadow: 2px 3px 6px 3px #eeeeee;
    border-radius: 16px;
    position: absolute;
    z-index: -1;
    left: -4px;
    top: 31px;
  }
}
.line-box {
  height: 100%;
  width: 100%;
  .line {
    display: block;
    width: 100%;
    height: 1px;
    background: red;
  }
}
.wf-formcanvas {
  position: absolute;
  left: 50%;
  margin-left: -245px;
  width: 490px;
  height: 670px;
  background: url(//img.alicdn.com/tfs/TB1vgDmBntYBeNjy1XdXXXXyVXa-980-1340.png)
    no-repeat top;
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
  top: 7px;
  max-height: 480px;
  background: #f6f6f6;
}
.van-field {
  span {
    word-wrap: break-word;
  }
}
</style>
