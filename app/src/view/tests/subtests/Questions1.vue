<template>
	<div class="first_questions">
		<transition name="fade" mode="out-in">
			<div class="first_questions_group" :key="0" v-if="viewModel.group === 0">
				<OptionQuestion
						class="first_questions_question"
						:title="viewModel.genderTitle"
						:options="viewModel.genderOptions"
						v-model="viewModel.gender"/>
				<DoubleDropdownQuestion
						class="first_questions_question"
						:title="viewModel.birthTitle"
						:first-values="viewModel.birthYearOptions"
						:second-values="viewModel.birthMonthOptions"
						:first-selected="viewModel.birthYear"
						:second-selected="viewModel.birthMonth"
						@first-selected="viewModel.birthYear = $event"
						@second-selected="viewModel.birthMonth = $event"/>
				<DropdownQuestion
						drop-over
						class="first_questions_question"
						:title="viewModel.residenceTitle"
						:values="viewModel.residenceOptions"
						v-model="viewModel.residence"/>
			</div>
			<div class="first_questions_group" :key="1" v-if="viewModel.group === 1">
				<DropdownQuestion
						class="first_questions_question"
						:title="viewModel.bookshelvesTitle"
						:values="viewModel.bookshelvesOptions"
						v-model="viewModel.bookshelves"/>
				<DropdownQuestion
						class="first_questions_question"
						:title="viewModel.foreignLanguagesTitle"
						:values="viewModel.foreignLanguagesOptions"
						v-model="viewModel.foreignLanguages"/>
				<DropdownQuestion
						class="first_questions_question"
						:title="viewModel.educationTitle"
						:values="viewModel.educationOptions"
						v-model="viewModel.education"/>
				<DropdownQuestion
						drop-over
						class="first_questions_question"
						:title="viewModel.educationMotherTitle"
						:values="viewModel.educationOptions"
						v-model="viewModel.educationMother"/>
				<DropdownQuestion
						drop-over
						class="first_questions_question"
						:title="viewModel.educationFatherTitle"
						:values="viewModel.educationOptions"
						v-model="viewModel.educationFather"/>
			</div>
			<div class="first_questions_group" :key="2" v-if="viewModel.group === 2">
				<DropdownQuestion
						class="first_questions_question"
						:title="viewModel.hoursSleptTitle"
						:values="viewModel.hoursSleptOptions"
						v-model="viewModel.hoursSlept"/>
				<OptionQuestion
						class="first_questions_question"
						:title="viewModel.consumedCoffeeTitle"
						:options="viewModel.consumedCoffeeOptions"
						v-model="viewModel.consumedCoffee"/>
				<OptionQuestion
						class="first_questions_question"
						:title="viewModel.consumedCigaretteTitle"
						:options="viewModel.consumedCigaretteOptions"
						v-model="viewModel.consumedCigarette"/>
				<DropdownQuestion
						drop-over
						class="first_questions_question"
						:title="viewModel.smokingTitle"
						:values="viewModel.smokingOptions"
						v-model="viewModel.smoking"/>
			</div>
		</transition>
		<transition name="fade">
			<FloatingActionButton
					class="light first_questions_next"
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
	import DoubleDropdownQuestion from "src/view/tests/subtests/questions/DoubleDropdownQuestion.vue";
	import OptionQuestion from "src/view/tests/subtests/questions/OptionQuestion.vue";

	import {FirstQuestionsModel} from "src/viewmodel/tests/subtests/FirstQuestionsModel";

	@Component({components: {FloatingActionButton, OptionQuestion, DropdownQuestion, DoubleDropdownQuestion}})
	export default class FirstQuestions extends Vue {

		@Prop() readonly viewModel: FirstQuestionsModel;
	};
</script>

<style scoped>
	.first_questions {
		display: flex;

		flex-direction: column;
		justify-content: center;

		background: var(--color_surface);
	}

	.first_questions_group {
		display: flex;
		overflow: hidden auto;

		padding: var(--questions_padding);
		flex-direction: column;
		align-items: center;
	}

	.first_questions_group > *:not(:first-child) {
		margin-top: var(--questions_spacing);
	}

	.first_questions_question {
		max-width: var(--question_max_width);
		flex-shrink: 0;
	}

	.first_questions_next {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>