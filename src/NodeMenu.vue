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
<<<<<<< HEAD
        {nodeInject.getList().map(render => render(h, {},'menu'))}
=======
        {nodeInject.getList().map(render => render(h, {}, "menu"))}
>>>>>>> 4f7e452cb90f66142ca3e0387a6c8e6824115eb3
      </div>
    );
  },
  methods: {}
};
</script>
