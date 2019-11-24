<template>
	<div class="timer">
		<p class="timer_text">
			{{timerMinutes}}:{{timerSeconds.toString().padStart(2, "0")}}
		</p>
		<ProgressBar
				class="timer_progress"
				:progress="timerProgress"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import ProgressBar from "src/view/components/ProgressBar.vue";

	@Component({components: {ProgressBar}})
	export default class Timer extends Vue {
		@Prop(Number) readonly timerMinutes: number;
		@Prop(Number) readonly timerSeconds: number;
		@Prop(Number) readonly timerProgress: number;
	};
</script>

<style scoped>
	.timer {
		display: flex;
		flex-direction: column;
	}

	.timer_text {
		text-align: center;
		font-size: var(--subtest_timer_text_size);
		font-variant-numeric: tabular-nums;
		color: var(--color_on_surface_variant);
	}

	.timer_progress {
		margin-top: var(--subtest_timer_spacing);
	}
</style>