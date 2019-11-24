<template>
	<div class="second_questions">
		<transition name="fade" mode="out-in">
			<div class="second_questions_group" :key="0" v-if="viewModel.group === 0">
				<ScaleQuestion
						class="second_questions_question"
						:title="viewModel.ecoFamilyTitle"
						:help="viewModel.ecoHelp"
						:min="viewModel.minEco"
						:max="viewModel.maxEco"
						v-model="viewModel.ecoFamily"/>
				<ScaleQuestion
						class="second_questions_question"
						:title="viewModel.ecoSelfTitle"
						:help="viewModel.ecoHelp"
						:min="viewModel.minEco"
						:max="viewModel.maxEco"
						v-model="viewModel.ecoSelf"/>
			</div>
			<div class="second_questions_group" :key="1" v-if="viewModel.group === 1">
				<div class="second_questions_question second_questions_allergy_question">
					<p class="second_questions_title">
						{{viewModel.allergyTitle}}
					</p>
					<div class="second_questions_allergies">
						<div class="second_questions_allergy_column">
							<div class="second_questions_allergy">
								<Checkbox v-model="viewModel.allergyPollen"/>
								<p class="second_questions_label">{{viewModel.allergyPollenLabel}}</p>
							</div>
							<div class="second_questions_allergy">
								<Checkbox v-model="viewModel.allergyDust"/>
								<p class="second_questions_label">{{viewModel.allergyDustLabel}}</p>
							</div>
							<div class="second_questions_allergy">
								<Checkbox v-model="viewModel.allergyFood"/>
								<p class="second_questions_label">{{viewModel.allergyFoodLabel}}</p>
							</div>
						</div>
						<div class="second_questions_allergy_column">
							<div class="second_questions_allergy">
								<Checkbox v-model="viewModel.allergyFur"/>
								<p class="second_questions_label">{{viewModel.allergyFurLabel}}</p>
							</div>
							<div class="second_questions_allergy">
								<Checkbox v-model="viewModel.allergyDrug"/>
								<p class="second_questions_label">{{viewModel.allergyDrugLabel}}</p>
							</div>
							<div class="second_questions_allergy">
								<Checkbox v-model="viewModel.allergyOther"/>
								<p class="second_questions_label">{{viewModel.allergyOtherLabel}}</p>
							</div>
						</div>
					</div>
				</div>
				<DropdownQuestion
						drop-over
						class="second_questions_question"
						:title="viewModel.maturedAgeTitle"
						:values="viewModel.maturedAgeOptions"
						v-model="viewModel.maturedAge"/>
			</div>
			<div class="second_questions_group" :key="2" v-if="viewModel.group === 2">
				<ScaleQuestion
						class="second_questions_question"
						:title="viewModel.moodTitle"
						:help="viewModel.moodHelp"
						:min="viewModel.minMood"
						:max="viewModel.maxMood"
						v-model="viewModel.mood"/>
				<ScaleQuestion
						class="second_questions_question"
						:title="viewModel.stressGeneralTitle"
						:help="viewModel.stressHelp"
						:min="viewModel.minStress"
						:max="viewModel.maxStress"
						v-model="viewModel.stressGeneral"/>
				<ScaleQuestion
						class="second_questions_question"
						:title="viewModel.stressTodayTitle"
						:help="viewModel.stressHelp"
						:min="viewModel.minStress"
						:max="viewModel.maxStress"
						v-model="viewModel.stressToday"/>
			</div>
		</transition>
		<transition name="fade">
			<FloatingActionButton
					class="light second_questions_next"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showNext"
					@click="viewModel.next()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import DropdownQuestion from "src/view/tests/subtests/questions/DropdownQuestion.vue";
	import ScaleQuestion from "src/view/tests/subtests/questions/ScaleQuestion.vue";

	import {SecondQuestionsModel} from "src/viewmodel/tests/subtests/SecondQuestionsModel";
	import Checkbox from "src/view/components/Checkbox.vue";

	@Component({components: {Checkbox, FloatingActionButton, DropdownQuestion, ScaleQuestion}})
	export default class FirstQuestions extends Vue {

		@Prop() readonly viewModel: SecondQuestionsModel;
	};
</script>

<style scoped>
	.second_questions {
		display: flex;

		flex-direction: column;
		justify-content: center;

		background: var(--color_surface);
	}

	.second_questions_group {
		display: flex;
		overflow: hidden auto;

		padding: var(--questions_padding);
		flex-direction: column;
		align-items: center;
	}

	.second_questions_group > *:not(:first-child) {
		margin-top: var(--questions_spacing);
	}

	.second_questions_question {
		max-width: var(--question_max_width);
		flex-shrink: 0;
	}

	.second_questions_title {
		font-size: var(--question_title_size);
		text-align: center;
	}

	.second_questions_label {
		font-size: var(--questions_label_size);
	}

	.second_questions_allergy_question {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.second_questions_allergies {
		margin-top: var(--question_spacing);

		max-width: 100%;

		display: flex;

		align-items: center;
		justify-content: center;
	}

	.second_questions_allergies > *:not(:first-child) {
		margin-left: var(--question_spacing);
	}

	.second_questions_allergy_column {
		margin-top: var(--question_spacing);

		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.second_questions_allergy {
		display: flex;
		align-items: center;
	}

	.second_questions_next {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>