<template>
  <div v-if="ishow">
    标题名 <input type="text" v-model="label" @change="onChange">
  </div>
</template>
<script>
import Bridge from "@/Engine/utils/Bridge";
import Command from "@/Engine/utils/Command";

export default {
  name: "seting",
  props: {
    //通信桥
    bridge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      ishow:false,
      label:'',
      point: {
        click: ""
      }
    };
  },
  
  methods: {
    onChange(){
      this.label 
    },
    watchPoint({now, old}) {
      //通过监听 来同步引擎内 的指针状态
      console.log(now.toJS(), old.toJS(),'now, old')
      this.point = now.toJS();
      this.ishow = true
    }
  },
  mounted() {
    //第一步监听改变
    this.bridge.addEventListener("point", this.watchPoint, ["click"]);
  },
  destroyed() {
    //卸载 移除句柄
    this.bridge.removeEventListener("point", this.watchPoint);
     this.ishow = false;
  }
};
</script>