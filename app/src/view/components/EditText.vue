<template>
	<div
			class="edit_text"
			:class="{
				'edit_text_readonly': readonly,
				'edit_text_with_icon': icon && !area
			}">

		<input
				class="edit_text_input"
				size="1"
				v-if="!area"
				:placeholder="placeholder"
				:readonly="readonly"
				:maxlength="maxlength"
				:value="value"
				v-on="$listeners"
				@input="$emit('value', $event.target.value)"/>

		<textarea
				class="edit_text_input"
				v-if="area"
				:placeholder="placeholder"
				:readonly="readonly"
				:maxlength="maxlength"
				:value="value"
				v-on="$listeners"
				@input="$emit('value', $event.target.value)"></textarea>

		<ImgSvg
				class="edit_text_icon"
				v-if="icon && !area"
				:src="icon"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Model, Watch} from "vue-property-decorator";

	import ImgSvg from "src/view/components/ImgSvg.vue";

	@Component({components: {ImgSvg}})
	export default class ExtendedFloatingActionButton extends Vue {
		@Model("value", {type: String}) readonly value: string;
		@Prop(Boolean) readonly area: boolean;
		@Prop(String) readonly placeholder: boolean;
		@Prop(Boolean) readonly readonly: boolean;
		@Prop(Number) readonly maxlength: number;
		@Prop(String) readonly icon: string;
	}
</script>

<style scoped>
	.edit_text {
		display: flex;
		overflow: hidden;

		flex-direction: row;
		align-items: stretch;
		justify-content: flex-start;

		border-style: none;

		color: var(--color_on_surface);
		--highlight-color: var(--color_primary);

		transition: border 0.2s;
		-webkit-app-region: no-drag;
	}

	.edit_text::after {
		content: "";

		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		opacity: 0.5;
		border-radius: 5px;
		border: currentColor solid 2px;

		pointer-events: none;
		transition: all 0.2s;
	}

	.edit_text:active::after,
	.edit_text:focus-within::after {
		opacity: 1;
		border-color: var(--highlight-color);
	}

	/* input */

	.edit_text_input {
		flex-grow: 1;
		min-width: 0;
		min-height: 56px;
		resize: none;

		padding: 14px;

		font-size: 16px;
		color: currentColor;

		cursor: text;
	}

	.edit_text_readonly .edit_text_input {
		cursor: default;
	}

	.edit_text_with_icon .edit_text_input {
		padding-right: 48px;
	}

	/* placeholder */

	.edit_text_input::placeholder {
		opacity: 0.5;
		color: currentColor;

		transition: all 0.2s;
	}

	.edit_text_input:focus::placeholder {
		opacity: 1;
		color: var(--highlight-color);
	}

	/* icon */

	.edit_text_icon {
		position: absolute;
		top: calc(50% - 12px);
		bottom: calc(50% - 12px);
		right: 16px;

		width: 24px;
		height: 24px;

		opacity: 0.9;
		fill: currentColor;

		pointer-events: none;
		transition: all 0.2s;
	}
</style>