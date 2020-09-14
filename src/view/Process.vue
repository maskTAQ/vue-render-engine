<template>
    <div>
		<header class="page__header">
		  <div class="page-actions">
		    <div style="border-right:1px solid #c5c5c5;cursor: pointer;" @click="exit">
		      <i class="el-icon-arrow-left"></i>
		    </div>
		    <div>6</div>
		  </div>
		  <div class="step-tab">
		   
		  </div>
		  <el-button size="small" class="publish-btn" @click="publish">发布</el-button>
		</header>
        <Process  
        ref="processDesign"
        :conf="mockData.processData"
        tabName="processDesign" 
        />
    </div>
</template>
<script>
import Process from "@/components/Process";
import MockData from './mockData.js'
export default {
  name: "Home",
  components: {
    Process,
  },
  data() {
    return {
      mockData: MockData, // 可选择诸如 $route.param，Ajax获取数据等方式自行注入
    };
  },
  
  methods:{
	  exit() {
	    // this.$confirm('离开此页面您得修改将会丢失, 是否继续?', '提示', {
	    //     confirmButtonText: '确定',
	    //     cancelButtonText: '取消',
	    //     type: 'warning'
	    //   }).then(() => {
	    //     this.$message({
	    //       type: 'success',
	    //       message: '模拟返回!'
	    //     });
	    //   }).catch(() => { });
	  },
	  sendToServer(param){
	    // this.$notify({
	    //   title: '数据已整合完成',
	    //   message: '请在控制台中查看数据输出',
	    //   position: 'bottom-right'
	    // });
	    console.log('配置数据', param)
	  },
	  publish() {
	    const getCmpData = name => this.$refs[name].getData()
	    // basicSetting  formDesign processDesign 返回的是Promise 因为要做校验
	    // advancedSetting返回的就是值
	    // const p1 = getCmpData('basicSetting') 
	    // const p2 = getCmpData('formDesign')
	    const p3 = getCmpData('processDesign')
	    Promise.all([ p3])
	    .then(res => {
		   console.log('配置数据1', res)
	      const param = {
	        // basicSetting: res[0].formData,
	        processData: res[0].formData,
	        // formData: res[1].formData,
	        // advancedSetting: getCmpData('advancedSetting')
	      }
	      this.sendToServer(param)
	    })
	    .catch(err => {
	      err.target && (this.activeStep = err.target)
	      err.msg && this.$message.warning(err.msg)
	    })
	  },
  },
}
</script>
<style lang="stylus" scoped>
$header-height = 54px;
.page {
  width: 100vw;
  height: 100vh;
  padding-top: $header-height;
  box-sizing: border-box;

  .page__header {
    width: 100%;
    height: $header-height;
    flex-center()
    justify-content: space-between;
    box-sizing: border-box;
    color: white;
    background: #3296fa;
    font-size: 14px;
    position: fixed;
    top: 0;

    .page-actions {
      height: 100%;
      text-align: center;
      line-height: $header-height;

      > div {
        height: 100%;
        padding-left: 20px;
        padding-right: 20px;
        display: inline-block;
      }

      i {
        font-size: 22px;
        vertical-align: middle;
      }
    }

    .step-tab {
      display: flex;
      justify-content: center;
      height: 100%;
      position: relative;

      >.step {
        width: 140px;
        line-height: $header-height;
        padding-left: 30px;
        padding-right: 30px;
        cursor: pointer;
        position: relative;

        &.ghost-step{
          position: absolute;
          height: $header-height;
          left: 0;
          z-index: -1;
          background: #4483f2;
          transition: transform .5s;

          &::after {
            content: '';
            border-width: 6px 6px 6px;
            border-style: solid;
            border-color: transparent transparent white;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -6px;
          }
        }

        &.active >.step-index  {
          background: white;
          color: #4483f2;
        }

        >.step-index {
          display: inline-block;
          width: 18px;
          height: 18px;
          border: 1px solid #fff;
          border-radius: 8px;
          line-height: 18px;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
  }

  .page__content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background #f5f5f7
  }
}

.publish-btn {
  margin-right: 20px;
  color: #3296fa;
  padding: 7px 20px;
  border-radius: 4px;
  font-size: 14px;
}

.github{
  position fixed
  bottom 10px
  left 20px
}
</style>
