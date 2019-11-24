<template>
	<div class="stm_capacity">
		<Timer
				class="stm_capacity_timer"
				:timer-minutes="viewModel.timerMinutes"
				:timer-seconds="viewModel.timerSeconds"
				:timer-progress="viewModel.timerProgress"/>

		<transition name="fade_quick" mode="out-in">
			<div class="stm_capacity_numbers" :key="viewModel.numbers ? viewModel.numbers.toString() : ''">
				<div
						v-for="(number, index) in viewModel.numbers" :readonly="viewModel.showNumbers"
						class="stm_capacity_input"
						:class="{
							'stm_capacity_input_readonly': viewModel.showNumbers,
							'stm_capacity_input_focused': !viewModel.showNumbers && viewModel.input.length === index
						}">
					{{viewModel.showNumbers ? number : viewModel.input[index]}}
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import Timer from "src/view/tests/subtests/components/Timer.vue";

	import {STMCapacityModel} from "src/viewmodel/tests/subtests/STMCapacityModel";

	@Component({components: {Timer}})
	export default class STMCapacity extends Vue {

		@Prop() readonly viewModel: STMCapacityModel;

		private inputHandler: (event: KeyboardEvent) => void;

		mounted() {
			this.viewModel.start();

			this.inputHandler = (event) => {
				if (!this.viewModel.showNumbers) {
					for (let i = 0; i <= 9; i++) {
						if (event.key == i.toString()) {
							this.viewModel.addInput(i);
						}
					}
				}
			};

			window.addEventListener("keypress", this.inputHandler);
		}

		destroyed() {
			window.removeEventListener("keypress", this.inputHandler);
		}
	};
</script>

<style scoped>
	.stm_capacity {
		display: flex;
		overflow: hidden auto;

		flex-direction: column;
		align-items: center;
		padding: var(--subtest_padding);

		background: var(--color_surface);
	}

	.stm_capacity_timer {
		width: var(--subtest_timer_width);
	}

	.stm_capacity_numbers {
		margin-top: var(--subtest_spacing);
		align-self: stretch;
		flex-grow: 1;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.stm_capacity_numbers > *:not(:first-child) {
		margin-left: var(--stm_capacity_number_spacing);
	}

	.stm_capacity_input {
		position: relative;
		width: var(--stm_capacity_input_width);
		height: var(--stm_capacity_input_height);
		flex-shrink: 0;

		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--stm_capacity_number_size);
	}

	.stm_capacity_input::after {
		content: "";

		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		border-radius: var(--stm_capacity_input_radius);
		border: var(--color_on_surface) solid 4px;
		opacity: 0.5;

		transition: border-color 0.2s, opacity 0.2s;
	}

	.stm_capacity_input.stm_capacity_input_readonly::after {
		opacity: 0;
	}

	.stm_capacity_input.stm_capacity_input_focused::after {
		opacity: 1;
		border-color: var(--color_primary);

		transition: border-color 0.05s, opacity 0.05s;
	}
</style>