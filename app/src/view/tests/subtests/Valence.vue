<template>
	<div>
		<div class="valence">
			<div class="valence_content">
				<ScaleQuestion
						class="valence_question"
						:title="viewModel.pleasantnessTitle"
						:min="viewModel.minPleasantness"
						:max="viewModel.maxPleasantness"
						v-model="viewModel.pleasantness"/>
				<ScaleQuestion
						class="valence_question"
						:title="viewModel.impactTitle"
						:min="viewModel.minImpact"
						:max="viewModel.maxImpact"
						v-model="viewModel.impact"/>
				<InputQuestion
						drop-over
						class="valence_question"
						:title="viewModel.expectationTitle"
						:placeholder="viewModel.expectationHint"
						v-model="viewModel.expectation"/>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light valence_finish"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showFinish"
					@click="viewModel.finish()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import ScaleQuestion from "src/view/tests/subtests/components/ScaleQuestion.vue";
	import InputQuestion from "src/view/tests/subtests/components/InputQuestion.vue";

	import {ValenceModel} from "src/viewmodel/tests/subtests/ValenceModel";

	@Component({components: {FloatingActionButton, ScaleQuestion, InputQuestion}})
	export default class Valence extends Vue {

		@Prop() readonly viewModel: ValenceModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.valence {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.valence_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.valence_content > *:not(:first-child) {
		margin-top: var(--subtest_spacing);
	}

	.valence_question {
		max-width: var(--question_max_width);
		flex-shrink: 0;
	}

	.valence_finish {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>