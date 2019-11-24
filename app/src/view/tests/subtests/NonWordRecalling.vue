<template>
	<div class="non_word_recalling">
		<Timer
				class="non_word_recalling_timer"
				:timer-minutes="viewModel.timerMinutes"
				:timer-seconds="viewModel.timerSeconds"
				:timer-progress="viewModel.timerProgress"/>

		<div class="non_word_recalling_content">
			<transition name="fade" mode="out-in">
				<p class="non_word_recalling_non_word" :key="viewModel.nonWord">{{viewModel.nonWord}}</p>
			</transition>
			<input
					class="non_word_recalling_input"
					ref="input"
					size="1"
					@blur="focus()"
					v-model="viewModel.input"/>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from "vue-property-decorator";

	import Timer from "src/view/tests/subtests/components/Timer.vue";

	import {NonWordRecallingModel} from "src/viewmodel/tests/subtests/NonWordRecallingModel";

	@Component({components: {Timer}})
	export default class NonWordRepetition extends Vue {

		@Prop() readonly viewModel: NonWordRecallingModel;

		private inputHandler: () => void;

		mounted() {
			this.viewModel.start();

			this.inputHandler = () => this.focus();
			window.addEventListener("keypress", this.inputHandler);
		}

		destroyed() {
			window.removeEventListener("keypress", this.inputHandler);
		}

		private focus() {
			const input = (this.$refs.input as HTMLElement);
			if (input != null) input.focus();
		}
	};
</script>

<style scoped>
	.non_word_recalling {
		display: flex;
		overflow: hidden auto;

		flex-direction: column;
		align-items: center;
		padding: var(--subtest_padding);

		background: var(--color_surface);
	}

	.non_word_recalling_timer {
		width: var(--subtest_timer_width);
	}

	.non_word_recalling_content {
		margin-top: var(--subtest_spacing);
		flex-grow: 1;
		width: var(--non_word_content_width);

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.non_word_recalling_non_word {
		text-align: center;
		font-size: var(--non_word_content_size);
	}

	.non_word_recalling_input {
		margin-top: var(--subtest_spacing);
		padding: var(--non_word_input_padding);

		text-align: center;
		font-size: var(--non_word_content_size);

		border-radius: var(--non_word_input_radius);
		border: var(--color_primary) solid 4px;
	}
</style>