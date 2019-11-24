<template>
	<div class="non_word_repetition">
		<div class="non_word_repetition_timer">
			<p class="non_word_repetition_timer_text">
				{{viewModel.timerMinutes}}:{{viewModel.timerSeconds.toString().padStart(2, "0")}}
			</p>
			<ProgressBar
					class="word_learning_timer_progress"
					:progress="viewModel.timerProgress"/>
		</div>
		<div class="non_word_repetition_content">
			<transition name="fade" mode="out-in">
				<p class="non_word_repetition_meaning" :key="viewModel.meaning">{{viewModel.meaning}}</p>
			</transition>
			<input
					class="non_word_repetition_input"
					ref="input"
					:readonly="viewModel.showNonWord"
					:value="viewModel.showNonWord ? viewModel.nonWord : viewModel.input"
					@input="viewModel.input = $event.target.value"
					@blur="focus()"/>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import ProgressBar from "src/view/components/ProgressBar.vue";
	import EditText from "src/view/components/EditText.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	import {NonWordRepetitionModel} from "src/viewmodel/tests/subtests/NonWordRepetitionModel";

	@Component({components: {ProgressBar, EditText, FloatingActionButton}})
	export default class NonWordRepetition extends Vue {

		@Prop() readonly viewModel: NonWordRepetitionModel;

		mounted() {
			this.focus();
		}

		focus() {
			(this.$refs.input as HTMLElement).focus()
		}
	};
</script>

<style scoped>
	.non_word_repetition {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--non_word_repetition_padding);

		background: var(--color_surface);
	}

	.non_word_repetition_timer {
		width: var(--non_word_repetition_timer_width);

		display: flex;
		flex-direction: column;
	}

	.non_word_repetition_timer_text {
		text-align: center;
		font-size: var(--non_word_repetition_timer_text_size);
		font-variant-numeric: tabular-nums;
		color: var(--color_on_surface_variant);
	}

	.word_learning_timer_progress {
		margin-top: var(--non_word_repetition_timer_spacing);
	}

	.non_word_repetition_content {
		margin-top: var(--non_word_repetition_spacing);
		flex-grow: 1;
		width: var(--non_word_repetition_content_width);

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.non_word_repetition_meaning {
		text-align: center;
		font-size: var(--non_word_repetition_meaning_size);
	}

	.non_word_repetition_input {
		margin-top: var(--non_word_repetition_content_spacing);
		padding: var(--non_word_repetition_input_padding);

		text-align: center;
		font-size: var(--non_word_repetition_non_word_size);

		border-radius: var(--non_word_repetition_input_radius);
		border: var(--color_primary) solid 4px;

		transition: color 0.2s, border-color 0.2s;
	}

	.non_word_repetition_input:read-only {
		color: var(--color_on_surface_variant);
		border-color: transparent;

		cursor: default;
	}
</style>