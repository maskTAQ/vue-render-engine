<template>
  <div style="width: 100%;position:relative;">
    <div class="zoom">
      <button
        class="zoom-out"
        :disabled="rotate==0.5"
        @click="changeRotate('-')"
      >-</button><span>{{parseInt(rotate*100)}}%</span>
      <button
        :disabled="rotate==3"
        class="zoom-in"
        @click="changeRotate('+')"
      >+</button>
    </div>
    <Branch
      :branchData.sync="branchNodeList"
      :style="`transform: scale(${rotate}); transform-origin: 50% 0px 0px;`"
    ></Branch>
  </div>
</template>

<script>
import Branch from "@/components/Branch/Index.vue";

export default {
  components: {
    Branch
  },
  data() {
    return {
      rotate: 0.5,
      branchNodeList: {
        name: "发起人",
        nodeId: "sid-startevent",
        type: "start"
      }
    };
  },
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    changeRotate(computeType) {
      
      console.log(computeType,'+')
      this.rotate = eval(`${this.rotate * 10}${computeType}1`) / 10;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
* {
  box-sizing: border-box;
}
.box-scale {
  display: inline-block;
  position: relative;
  width: 100%;
  padding: 54.5px 0;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  min-width: -webkit-min-content;
  min-width: -moz-min-content;
  min-width: min-content;
  background-color: #fff;
  .del-node {
    display: inline-block;
    height: 30px;
    width: 30px;
    background: red;
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .node-wrap {
    .del-node {
      background: #3296fa;
    }
  }
  .add-node-btn-box {
    width: 240px;
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 2px;
      height: 100%;
      background-color: red;
    }
  }
  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 20px 0 32px;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    flex-shrink: 0;
    -webkit-box-flex: 1;
    flex-grow: 1;
    button {
      color: #fff;
      outline: none;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      width: 30px;
      height: 30px;
      background: #3296fa;
      border-radius: 50%;
      position: relative;
      border: none;
      cursor: pointer;
      line-height: 30px;
      -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.branch-wrap {
  display: inline-flex;
  width: 100%;
  .branch-box-wrap {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    min-height: 270px;
    width: 100%;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    .branch-box {
      display: flex;
      overflow: visible;
      min-height: 180px;
      height: auto;
      border-bottom: 2px solid red;
      border-top: 2px solid red;
      position: relative;
      margin-top: 15px;
      .add-branch {
        border: none;
        outline: none;
        user-select: none;
        justify-content: center;
        font-size: 12px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        border-radius: 15px;
        color: #3296fa;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        position: absolute;
        top: -16px;
        left: 50%;
        transform: translateX(-50%);
        transform-origin: center center;
        cursor: pointer;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
      .col-box {
        display: inline-flex;
        flex-direction: column;
        -webkit-box-align: center;
        align-items: center;
        position: relative;
        background: #fff;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          margin: auto;
          width: 2px;
          height: 100%;
          background-color: red;
        }
        .condition-node {
          display: inline-flex;
          flex-direction: column;
          min-height: 220px;
        }
        .condition-node-box {
          padding: 30px 50px 0px 50px;
          justify-content: center;
          align-items: center;
          flex-grow: 1;
          position: relative;
          display: inline-flex;
          flex-direction: column;
          &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 2px;
            height: 100%;
            background-color: red;
          }
          .auto-judge {
            position: relative;
            width: 220px;
            min-height: 72px;
            background: #fff;
            padding: 14px 19px;
            cursor: pointer;
            border: 1px solid blue;
            background-color: #f5f5f7;
          }
        }
      }
    }
  }
}
.node-wrap {
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  padding: 0 50px;
  position: relative;
  .node-wrap-box {
    border: 1px solid blue;
    min-height: 72px;
    background-color: #f5f5f7;
    display: inline-flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    position: relative;
    width: 220px;
    min-height: 72px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    border-radius: 4px;
    cursor: pointer;
  }
}
.top-left-cover-line,
.top-right-cover-line {
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  top: -2px;
}
.top-left-cover-line {
  left: -1px;
}
.bottom-left-cover-line {
  left: -1px;
}
.top-right-cover-line {
  right: -1px;
}
.bottom-right-cover-line {
  right: -1px;
}
.top-left-cover-line,
.top-right-cover-line {
  position: absolute;
  height: 19px;
  width: 50%;
  background-color: #fff;
  top: -10px;
}
.bottom-left-cover-line,
.bottom-right-cover-line {
  position: absolute;
  height: 19px;
  width: 50%;
  background-color: #fff;
  bottom: -10px;
}
.zoom {
  display: flex;
  position: fixed;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  height: 40px;
  width: 125px;
  right: 140px;
  margin-top: 30px;
  z-index: 10;
  .zoom-in,
  .zoom-out {
    border: 1px solid #000;
    width: 30px;
    line-height: 30px;
    height: 30px;
    background: #fff;
    color: #c1c1cd;
    cursor: pointer;
    background-size: 100%;
    background-repeat: no-repeat;
  }
}
</style>
