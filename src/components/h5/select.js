const DEFAULT_PROPS = {
    PICKER: {
        label: '时间',
        placeholder: '占位符'
    },
};
export default {
    picker(h, node) {
        const { props = DEFAULT_PROPS.PICKER } = node;
        return (
            <div class="field" data-engine-node={true} data-node-type="input">
                <span class="label">{props.label || DEFAULT_PROPS.PICKER.label}</span>
				 <a-date-picker  placeholder={props.placeholder || DEFAULT_PROPS.placeholder} />
            </div>
        )
    }
}