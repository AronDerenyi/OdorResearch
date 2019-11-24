<template>
	<div class="word_learning">
		<div class="word_learning_timer">
			<p class="word_learning_timer_text">
				{{viewModel.timerMinutes}}:{{viewModel.timerSeconds.toString().padStart(2, "0")}}
			</p>
			<ProgressBar
					class="word_learning_timer_progress"
					:progress="viewModel.timerProgress"/>
		</div>
		<div class="word_learning_content">
			<transition name="fade" mode="out-in">
				<p class="word_learning_meaning" :key="viewModel.meaning">{{viewModel.meaning}}</p>
			</transition>
			<input
					class="word_learning_input"
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
	export default class WordLearning extends Vue {

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
	.word_learning {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--word_learning_padding);

		background: var(--color_surface);
	}

	.word_learning_timer {
		width: var(--word_learning_timer_width);

		display: flex;
		flex-direction: column;
	}

	.word_learning_timer_text {
		text-align: center;
		font-size: var(--word_learning_timer_text_size);
		font-variant-numeric: tabular-nums;
		color: var(--color_on_surface_variant);
	}

	.word_learning_timer_progress {
		margin-top: var(--word_learning_timer_spacing);
	}

	.word_learning_content {
		margin-top: var(--word_learning_spacing);
		flex-grow: 1;
		width: var(--word_learning_content_width);

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.word_learning_meaning {
		text-align: center;
		font-size: var(--word_learning_meaning_size);
	}

	.word_learning_input {
		margin-top: var(--word_learning_content_spacing);
		padding: var(--word_learning_input_padding);

		text-align: center;
		font-size: var(--word_learning_word_size);

		border-radius: var(--word_learning_input_radius);
		border: var(--color_primary) solid 4px;

		transition: color 0.2s, border-color 0.2s;
	}

	.word_learning_input:read-only {
		color: var(--color_on_surface_variant);
		border-color: transparent;

		cursor: default;
	}
</style>