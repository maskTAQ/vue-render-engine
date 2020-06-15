<script>
export default {
  name: "Layout",
  props: {
    nodes: {
      type: Object,
      required: true
    },
    nodeInject: {
      type: Object,
      required: true
    },
    mode: String
  },
  data() {
    return {};
  },
  render(h) {
    const { nodes, nodeInject, mode } = this;
    return (
      <div class="layout" >
        {nodes
          .map(node => nodeInject.get(h, mode, node))
          .toJS()
          .filter(node => !!node)}
      </div>
    );
  }
};
</script>