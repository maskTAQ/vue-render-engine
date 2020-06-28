<script type="text/ecmascript-6">
import nodeInject from "./components";
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
                {type}
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
}
</style>