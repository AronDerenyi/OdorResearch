<template>
	<div class="progress_bar" v-on="$listeners">
		<div class="progress_bar_container">
			<div class="progress_bar_fill" :style="{width: `${progress * 100}%`}">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	@Component
	export default class ProgressBar extends Vue {
		@Prop(Number) readonly progress: number;
	}
</script>

<style scoped>
	.progress_bar {
		display: flex;
		align-items: center;

		--progress-color: var(--color_primary);
		--progress-background: var(--color_on_surface);
	}

	.progress_bar_container {
		position: relative;
		flex-grow: 1;
		height: 8px;
	}

	.progress_bar_container::before {
		content: "";

		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		border-radius: 4px;
		background: var(--color_on_surface);
		opacity: 0.1;
	}

	.progress_bar_fill {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;

		border-radius: 4px;
		background: var(--progress-color);
	}
</style>