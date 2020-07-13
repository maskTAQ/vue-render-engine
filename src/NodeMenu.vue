<script type="text/ecmascript-6">
import nodeInject from "./components";
import DEFAULT from '@/utils/com.js';

export default {
  name: "NodeMenu",
  data() {
    return {};
  },
  render(h) {
    return (
      <div class="node-menu">
        {nodeInject.getList().map(type => {
          if (type === "line") {
            return "";
          } else {
            return (
              <div
                class="con"
                data-engine-node={true}
                data-mode="menu"
                data-node-type={type}
              >
                {DEFAULT.DEFAULT_PROPS[type].label}
              </div>
            );
          }
        })}
      </div>
    );
  },
  methods: {}
};
</script>
<style>
.con {
  width: 100px;
  border: 1px solid #cfcaca;
  border-radius: 5px;
  text-align: center;
    margin-left:15px;
   margin-bottom:15px;
}
.con:hover{
     cursor: move;
}
</style>