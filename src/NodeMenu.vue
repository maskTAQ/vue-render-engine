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

        {nodeInject.getList().map(render => render(h, {}, "menu"))}
      </div>
    );
  },
  methods: {}
};
</script>
