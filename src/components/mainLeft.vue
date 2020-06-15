<template>
    <div class="wf-panel wf-widgetspanel">
        <div class="wf-panel-tab">
            <a href="javascript:;" class="tabitem current">控件</a>
        </div>
        <div class="wf-panel-body">
            <div v-for="(item,index) in components"
                 class="wf-widgetsitem" v-bind:data-index="index" v-bind:data-type="item.componentName"
                 v-on:mousedown="start">
                <label>
                    {{item.name}}
                </label>
                <i class="widgeticon" v-bind:class="item.componentName"></i>
            </div>

        </div>
    </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'mainleft',
        data(){
            return {
                components: [
                    {
                        name: '单行输入框',
                        defaultLable: '单行输入框',
                        defaultProps: '请输入',
                        defaultImportant: false,
                        defaultPrint: false,
                        componentName: 'textfield',
                        supportSetting: ['label', 'placeholder', 'required', 'important', 'print']
                    },
                ]
            }
        },
        methods: {
            start: function (e) {
                let obj = {}
                let dom = e.currentTarget
                let index = dom.getAttribute('data-index')
                let actualLeft = dom.offsetLeft;
                let current = dom.offsetParent;
                let actualTop = dom.offsetTop;
                while (current !== null) {
                    actualLeft += current.offsetLeft;
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                obj.componentName = dom.getAttribute("data-type")
                obj.componentText = dom.querySelector('label').innerText
                obj.clientX = e.clientX
                obj.clientY = e.clientY
                obj.isstart = true
                obj.componentView = this.components[index]
                console.log(obj)
                drag.$emit("movestart", obj)
            }
        }
    }
</script>
