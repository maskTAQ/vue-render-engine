<template>
    <div>
        <div>
            <a href="javascript:;" class="tabitem current">控件</a>
        </div>
        <div>
            <div v-for="(item,index) in components"
                 v-bind:data-index="index" v-bind:data-type="item.componentName"
                 v-on:mousedown="start">
                <label>
                    {{item.name}}
                </label>
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
               
            }
        }
    }
</script>
