<script>
	import Progress from "src/app/components/Progress.vue";

	export default {
		components: {Progress},
	}
</script>

<template>
	<div class="container" style="
		position: relative;
		padding: var(--image_test_padding);
		align-items: center;
		background: var(--color_background);">

		<h1 style="text-align: center;">Big Five</h1>

		<div v-if="viewModel.loading" style="
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background: var(--color_background_loading_overlay)">

			<Progress style="
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: var(--color_accent);"/>

		</div>

	</div>
</template>