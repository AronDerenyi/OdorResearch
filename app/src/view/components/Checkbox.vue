<template>
	<div class="selectable checkbox" :class="{'checkbox_checked': checked}" @click="$emit('checked', !checked)">
		<div class="checkbox_outline"></div>
		<svg class="checkbox_check" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<mask id="mask">
				<rect fill="white" x="0" y="0" width="24" height="24"/>
				<path fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M6,12 L10,16 L18,8"/>
			</mask>
			<rect x="0" y="0" width="24" height="24" mask="url(#mask)"/>
		</svg>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Model} from "vue-property-decorator";

	@Component
	export default class Checkbox extends Vue {
		@Model("checked", {type: Boolean}) readonly checked: boolean;
	}
</script>

<style scoped>
	.checkbox {
		width: 48px;
		height: 48px;

		border-radius: 24px;

		color: var(--color_primary);
		--outline-color: var(--color_on_surface);
		--highlight-color: var(--color_primary);
	}

	.checkbox > .checkbox_outline {
		position: absolute;
		top: calc(50% - 12px);
		bottom: calc(50% - 12px);
		left: calc(50% - 12px);
		right: calc(50% - 12px);

		opacity: 0.5;
		border-radius: 4px;
		border: var(--outline-color) solid 2px;
	}

	.checkbox > .checkbox_check {
		position: absolute;
		top: calc(50% - 12px);
		bottom: calc(50% - 12px);
		left: calc(50% - 12px);
		right: calc(50% - 12px);

		fill: currentColor;
		border-radius: 4px;

		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 0 0, 0 100%, 100% 100%, 100% 0, 0 0);
		transition: clip-path 0.2s;
	}

	.checkbox.checkbox_checked > .checkbox_check {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%);
	}
</style>