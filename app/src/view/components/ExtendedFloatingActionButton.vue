<template>
	<div class="selectable extended_floating_action_button" v-on="$listeners">
		<ImgSvg class="extended_floating_action_button_icon" v-if="icon" :src="icon"/>
		<p class="extended_floating_action_button_text">{{text}}</p>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";
	import ImgSvg from "src/view/components/ImgSvg.vue";

	@Component({components: {ImgSvg}})
	export default class ExtendedFloatingActionButton extends Vue {
		@Prop(String) readonly icon: string;
		@Prop(String) readonly text: string;
	}
</script>

<style scoped>
	.extended_floating_action_button {
		position: relative;

		min-width: 48px;
		height: 48px;

		display: flex;
		overflow: hidden;

		flex-direction: row;
		align-items: center;
		justify-content: center;

		padding-left: 10px;
		padding-right: 10px;

		background: var(--color_primary);
		color: var(--color_on_primary);
		--highlight-color: var(--color_on_primary);

		border-radius: 24px;
		box-shadow: 0 4px 20px var(--color_shadow);
	}

	.extended_floating_action_button_icon {
		margin-left: 2px;
		margin-right: 2px;

		flex-shrink: 0;
		flex-grow: 0;

		width: 24px;
		height: 24px;

		fill: currentColor;
	}

	.extended_floating_action_button_text {
		margin-left: 10px;
		margin-right: 10px;

		flex-basis: 0;
		flex-grow: 1;

		overflow: hidden;

		font-size: 16px;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;

		color: currentColor;
	}

	.extended_floating_action_button.light {
		background: var(--color_on_primary);
		color: var(--color_primary);
		--highlight-color: var(--color_primary);
	}

	.extended_floating_action_button.flat {
		box-shadow: none;
	}
</style>