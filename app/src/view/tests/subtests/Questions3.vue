<template>
	<div class="third_questions">
		<transition name="fade" mode="out-in">
			<div class="third_questions_group" :key="0" v-if="viewModel.group === 0">
				<div class="third_questions_question third_questions_title_holder">
					<p class="third_questions_title">{{viewModel.methodsTitle}}</p>
					<p class="third_questions_help">{{viewModel.methodsHelp}}</p>
				</div>
				<ScaleQuestion
						class="third_questions_question"
						:title="viewModel.hypnosisTitle"
						:min="viewModel.minMethod"
						:max="viewModel.maxMethod"
						v-model="viewModel.hypnosis"/>
				<ScaleQuestion
						class="third_questions_question"
						:title="viewModel.meditationTitle"
						:min="viewModel.minMethod"
						:max="viewModel.maxMethod"
						v-model="viewModel.meditation"/>
				<ScaleQuestion
						class="third_questions_question"
						:title="viewModel.mindfulnessTitle"
						:min="viewModel.minMethod"
						:max="viewModel.maxMethod"
						v-model="viewModel.mindfulness"/>
			</div>
			<div class="third_questions_group" :key="1" v-if="viewModel.group === 1">
				<ScaleQuestion
						class="third_questions_question"
						:title="viewModel.inLoveTitle"
						:help="viewModel.inLoveHelp"
						:min="viewModel.minInLove"
						:max="viewModel.maxInLove"
						v-model="viewModel.inLove"/>
				<ScaleQuestion
						class="third_questions_question"
						:title="viewModel.smellRefinementTitle"
						:help="viewModel.smellRefinementHelp"
						:min="viewModel.minSmellRefinement"
						:max="viewModel.maxSmellRefinement"
						v-model="viewModel.smellRefinement"/>
				<ScaleQuestion
						class="third_questions_question"
						:title="viewModel.smellSensitivityTitle"
						:help="viewModel.smellSensitivityHelp"
						:min="viewModel.minSmellSensitivity"
						:max="viewModel.maxSmellSensitivity"
						v-model="viewModel.smellSensitivity"/>
			</div>
			<div class="third_questions_group" :key="2" v-if="viewModel.group === 2">
				<div class="third_questions_question third_questions_title_holder">
					<p class="third_questions_title">{{viewModel.useTitle}}</p>
				</div>
				<OptionQuestion
						class="third_questions_question"
						:title="viewModel.useDeodorantTitle"
						:options="viewModel.useDeodorantOptions"
						v-model="viewModel.useDeodorant"/>
				<OptionQuestion
						class="third_questions_question"
						:title="viewModel.usePerfumeTitle"
						:options="viewModel.usePerfumeOptions"
						v-model="viewModel.usePerfume"/>
				<OptionQuestion
						class="third_questions_question"
						:title="viewModel.useOilsTitle"
						:options="viewModel.useOilsOptions"
						v-model="viewModel.useOils"/>
			</div>
		</transition>
		<transition name="fade">
			<FloatingActionButton
					class="light third_questions_next"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showNext"
					@click="viewModel.next()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import OptionQuestion from "src/view/tests/subtests/questions/OptionQuestion.vue";
	import ScaleQuestion from "src/view/tests/subtests/questions/ScaleQuestion.vue";

	import {ThirdQuestionsModel} from "src/viewmodel/tests/subtests/ThirdQuestionsModel";
	import Checkbox from "src/view/components/Checkbox.vue";

	@Component({components: {Checkbox, FloatingActionButton, OptionQuestion, ScaleQuestion}})
	export default class FirstQuestions extends Vue {

		@Prop() readonly viewModel: ThirdQuestionsModel;
	};
</script>

<style scoped>
	.third_questions {
		display: flex;

		flex-direction: column;
		justify-content: center;

		background: var(--color_surface);
	}

	.third_questions_group {
		display: flex;
		overflow: hidden auto;

		padding: var(--questions_padding);
		flex-direction: column;
		align-items: center;
	}

	.third_questions_group > *:not(:first-child) {
		margin-top: var(--questions_spacing);
	}

	.third_questions_question {
		max-width: var(--question_max_width);
		flex-shrink: 0;
	}

	.third_questions_title_holder {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.third_questions_title {
		font-size: var(--questions_title_size);
		text-align: center;
	}

	.third_questions_help {
		margin-top: var(--questions_help_space);

		color: var(--color_on_surface_variant);
		font-size: var(--questions_help_size);
		text-align: center;
	}

	.third_questions_next {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>