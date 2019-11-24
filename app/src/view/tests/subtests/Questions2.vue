<template>
	<div class="questions2">
		<transition name="fade" mode="out-in">
			<div class="questions2_group" :key="0" v-if="viewModel.group === 0">
				<div class="questions2_content">
					<ScaleQuestion
							class="questions2_question"
							:title="viewModel.ecoFamilyTitle"
							:help="viewModel.ecoHelp"
							:min="viewModel.minEco"
							:max="viewModel.maxEco"
							v-model="viewModel.ecoFamily"/>
					<ScaleQuestion
							class="questions2_question"
							:title="viewModel.ecoSelfTitle"
							:help="viewModel.ecoHelp"
							:min="viewModel.minEco"
							:max="viewModel.maxEco"
							v-model="viewModel.ecoSelf"/>
				</div>
			</div>
			<div class="questions2_group" :key="1" v-if="viewModel.group === 1">
				<div class="questions2_content">
					<div class="questions2_question questions2_allergy_question">
						<p class="questions2_title">
							{{viewModel.allergyTitle}}
						</p>
						<div class="questions2_allergies">
							<div class="questions2_allergy_column">
								<div class="questions2_allergy">
									<Checkbox v-model="viewModel.allergyPollen"/>
									<p class="questions2_label">{{viewModel.allergyPollenLabel}}</p>
								</div>
								<div class="questions2_allergy">
									<Checkbox v-model="viewModel.allergyDust"/>
									<p class="questions2_label">{{viewModel.allergyDustLabel}}</p>
								</div>
								<div class="questions2_allergy">
									<Checkbox v-model="viewModel.allergyFood"/>
									<p class="questions2_label">{{viewModel.allergyFoodLabel}}</p>
								</div>
							</div>
							<div class="questions2_allergy_column">
								<div class="questions2_allergy">
									<Checkbox v-model="viewModel.allergyFur"/>
									<p class="questions2_label">{{viewModel.allergyFurLabel}}</p>
								</div>
								<div class="questions2_allergy">
									<Checkbox v-model="viewModel.allergyDrug"/>
									<p class="questions2_label">{{viewModel.allergyDrugLabel}}</p>
								</div>
								<div class="questions2_allergy">
									<Checkbox v-model="viewModel.allergyOther"/>
									<p class="questions2_label">{{viewModel.allergyOtherLabel}}</p>
								</div>
							</div>
						</div>
					</div>
					<DropdownQuestion
							drop-over
							class="questions2_question"
							:title="viewModel.maturedAgeTitle"
							:values="viewModel.maturedAgeOptions"
							v-model="viewModel.maturedAge"/>
					<OptionQuestion
							class="questions2_question"
							:title="viewModel.menstruatingTitle"
							:options="viewModel.menstruatingOptions"
							v-model="viewModel.menstruating"/>
					<OptionQuestion
							class="questions2_question"
							:title="viewModel.contraceptiveTitle"
							:options="viewModel.contraceptiveOptions"
							v-model="viewModel.contraceptive"/>
				</div>
			</div>
			<div class="questions2_group" :key="2" v-if="viewModel.group === 2">
				<div class="questions2_content">
					<ScaleQuestion
							class="questions2_question"
							:title="viewModel.moodTitle"
							:help="viewModel.moodHelp"
							:min="viewModel.minMood"
							:max="viewModel.maxMood"
							v-model="viewModel.mood"/>
					<ScaleQuestion
							class="questions2_question"
							:title="viewModel.stressGeneralTitle"
							:help="viewModel.stressHelp"
							:min="viewModel.minStress"
							:max="viewModel.maxStress"
							v-model="viewModel.stressGeneral"/>
					<ScaleQuestion
							class="questions2_question"
							:title="viewModel.stressTodayTitle"
							:help="viewModel.stressHelp"
							:min="viewModel.minStress"
							:max="viewModel.maxStress"
							v-model="viewModel.stressToday"/>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<FloatingActionButton
					class="light questions2_next"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showNext"
					@click="viewModel.next()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import Checkbox from "src/view/components/Checkbox.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import DropdownQuestion from "src/view/tests/subtests/components/DropdownQuestion.vue";
	import ScaleQuestion from "src/view/tests/subtests/components/ScaleQuestion.vue";
	import OptionQuestion from "src/view/tests/subtests/components/OptionQuestion.vue";

	import {Questions2Model} from "src/viewmodel/tests/subtests/Questions2Model";

	@Component({components: {Checkbox, FloatingActionButton, DropdownQuestion, ScaleQuestion, OptionQuestion}})
	export default class Questions2 extends Vue {

		@Prop() readonly viewModel: Questions2Model;
	};
</script>

<style scoped>
	.questions2 {
		background: var(--color_surface);
	}

	.questions2_group {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.questions2_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.questions2_content > *:not(:first-child) {
		margin-top: var(--subtest_spacing);
	}

	.questions2_question {
		max-width: var(--question_max_width);
		flex-shrink: 0;
	}

	.questions2_title {
		font-size: var(--question_title_size);
		text-align: center;
	}

	.questions2_label {
		font-size: var(--question_help_size);
	}

	.questions2_allergy_question {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.questions2_allergies {
		margin-top: var(--question_spacing);

		max-width: 100%;

		display: flex;

		align-items: center;
		justify-content: center;
	}

	.questions2_allergies > *:not(:first-child) {
		margin-left: var(--question_spacing);
	}

	.questions2_allergy_column {
		margin-top: var(--question_spacing);

		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.questions2_allergy {
		display: flex;
		align-items: center;
	}

	.questions2_next {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>