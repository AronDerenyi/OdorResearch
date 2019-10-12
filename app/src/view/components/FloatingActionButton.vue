<template>
	<div class="selectable floating_action_button" v-on="$listeners">
		<ImgSvg class="floating_action_button_icon" v-if="icon" :src="icon"/>
		<p class="floating_action_button_text" v-else-if="text">{{text}}</p>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import ImgSvg from "src/view/components/ImgSvg.vue";

	@Component({components: {ImgSvg}})
	export default class FloatingActionButton extends Vue {

		@Prop(String) readonly icon: string;
		@Prop(String) readonly text: string;
	}
</script>

<style scoped>
	.floating_action_button {
		position: relative;

		width: 56px;
		height: 56px;

		display: flex;
		overflow: hidden;

		flex-direction: row;
		align-items: center;
		justify-content: center;

		background: var(--color_primary);
		color: var(--color_on_primary);
		--highlight-color: var(--color_on_primary);

		border-radius: 100%;
		box-shadow: 0 4px 20px var(--color_shadow);
	}

	.floating_action_button > .floating_action_button_icon {
		width: 24px;
		height: 24px;

		overflow: hidden;

		fill: currentColor;
	}

	.floating_action_button > .floating_action_button_text {
		overflow: hidden;

		font-size: 20px;
		font-weight: 500;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;

		color: currentColor;
	}

	.floating_action_button.light {
		background: var(--color_on_primary);
		color: var(--color_primary);
		--highlight-color: var(--color_primary);
	}

	.floating_action_button.flat {
		box-shadow: none;
	}
</style>