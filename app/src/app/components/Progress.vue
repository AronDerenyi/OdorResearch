<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";

	@Component
	export default class Progress extends Vue {

		private width = 52;
		private height = 52;
		private stroke = 5;

		private start = 0;
		private end = 0;

		private running = true;

		mounted() {
			const duration = 300;
			const sixth = Math.PI * 2 / 6;
			const steps = [
				[sixth * 1.5, sixth * 1.5 + sixth * 4],
				[sixth * 1.5, sixth * 1.5],
				[sixth * 1.5 + sixth * 4, sixth * 1.5],
				[sixth * 1.5, sixth * 1.5],

				[sixth * 1.5, sixth * 1.5 + sixth * 4],
				[sixth * 1.5, sixth * 1.5],
				[sixth * 1.5 + sixth * 4, sixth * 1.5],
				[sixth * 1.5, sixth * 1.5],

				[sixth * 1.5, sixth * 1.5 + sixth * 4],
				[sixth * 1.5, sixth * 1.5],
				[sixth * 1.5 + sixth * 4, sixth * 1.5],
				[sixth * 1.5, sixth * 1.5],
			];

			const startTime = Date.now();
			const frame = () => {
				const time = Date.now() - startTime;
				const segment = time / duration;
				const segmentNumber = Math.floor(segment);
				const segmentProgress = segment % 1;

				this.start = 0;
				this.end = 0;

				for (let i = 0; i < segmentNumber % steps.length; i++) {
					const step = steps[i];
					this.start += step[0];
					this.end += step[1];
				}

				const step = steps[segmentNumber % steps.length];
				this.start += step[0] * segmentProgress;
				this.end += step[1] * segmentProgress;

				if (this.running) requestAnimationFrame(frame);
			};
			frame();
		}

		destroyed() {
			this.running = false;
		}

		get path(): string {
			const radiusX = (this.width - this.stroke) / 2;
			const radiusY = (this.height - this.stroke) / 2;

			const rotation = 0;
			const largeArc = (this.end - this.start) < Math.PI ? 0 : 1;
			const sweepFlag = 1;

			const startX = this.width / 2 + Math.sin(this.start) * radiusX;
			const startY = this.height / 2 - Math.cos(this.start) * radiusY;

			const endX = this.width / 2 + Math.sin(this.end) * radiusX;
			const endY = this.height / 2 - Math.cos(this.end) * radiusY;

			return `M${startX},${startY} A${radiusX},${radiusY} ${rotation} ${largeArc} ${sweepFlag} ${endX},${endY}`;
		}
	}
</script>

<template>
	<svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" :viewBox="`0 0 ${width} ${height}`">
		<path :d="path" :stroke-width="stroke" stroke-linecap="round" stroke="currentColor" fill="none"></path>
	</svg>
</template>