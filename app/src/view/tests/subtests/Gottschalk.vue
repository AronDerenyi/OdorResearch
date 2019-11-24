<template>
	<div class="first_questions">
		<transition name="fade" mode="out-in">
			<div class="first_questions_group" :key="0" v-if="viewModel.group === 0">
				<OptionQuestion
						class="first_questions_question"
						title="Neme?"
						:options="['Férfi', 'Nő', 'Egyéb']"
						v-model="viewModel.gender"/>
				<DoubleDropdownQuestion
						class="first_questions_question"
						title="Mikor született?"
						first-placeholder="Select year"
						second-placeholder="Select month"
						:first-values="['2001', '2000', '1999', '1998', '1997', '1996', '1995']"
						:second-values="['Jan', 'Feb', 'Mar']"
						:first-selected="viewModel.birthYear"
						:second-selected="viewModel.birthMonth"
						@first-selected="viewModel.birthYear = $event"
						@second-selected="viewModel.birthMonth = $event"/>
				<DropdownQuestion
						drop-over
						class="first_questions_question"
						title="Hol élsz?"
						placeholder="Select something"
						:values="['főváros', 'megyeszékhely', 'város', 'falu']"
						v-model="viewModel.residence"/>
			</div>
			<div class="first_questions_group" :key="1" v-if="viewModel.group === 1">
				<DropdownQuestion
						class="first_questions_question"
						title="Körülbelül hány darab könyvvel teli könyvespolc van az otthonodban?"
						placeholder="Select something"
						:values="['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '10+']"
						v-model="viewModel.bookshelves"/>
				<DropdownQuestion
						class="first_questions_question"
						title="Hány idegen nyelven beszélsz?"
						placeholder="Select something"
						:values="['0', '1', '2', '3', '4', '5', '5+']"
						v-model="viewModel.foreignLanguages"/>
				<DropdownQuestion
						class="first_questions_question"
						title="Mi a legmagasabb iskolázottságod?"
						placeholder="Select something"
						:values="['Általános iskola', 'Középiskola', 'Érettségi', 'Főiskola', 'BA / BSc', 'MA / MSc', 'Szakképzés', 'Doktori']"
						v-model="viewModel.education"/>
				<DropdownQuestion
						drop-over
						class="first_questions_question"
						title="Mi édesanyád legmagasabb iskolai végzettsége?"
						placeholder="Select something"
						:values="['Általános iskola', 'Középiskola', 'Érettségi', 'Főiskola', 'BA / BSc', 'MA / MSc', 'Szakképzés', 'Doktori']"
						v-model="viewModel.educationMother"/>
				<DropdownQuestion
						drop-over
						class="first_questions_question"
						title="Mi édesapád legmagasabb iskolai végzettsége?"
						placeholder="Select something"
						:values="['Általános iskola', 'Középiskola', 'Érettségi', 'Főiskola', 'BA / BSc', 'MA / MSc', 'Szakképzés', 'Doktori']"
						v-model="viewModel.educationFather"/>
			</div>
			<div class="first_questions_group" :key="2" v-if="viewModel.group === 2">
				<DropdownQuestion
						class="first_questions_question"
						title="Hány órát aludtál a kísérletet megelőző este?"
						placeholder="Select something"
						:values="['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '12+']"
						v-model="viewModel.hoursSlept"/>
				<OptionQuestion
						class="first_questions_question"
						title="Fogyasztott kávét az elmúlt 12 órában?"
						:options="['Nem', 'Igen']"
						v-model="viewModel.consumedCoffee"/>
				<OptionQuestion
						class="first_questions_question"
						title="Dohányzott az elmúlt három órában?"
						:options="['Nem', 'Igen']"
						v-model="viewModel.consumedCigarette"/>
				<DropdownQuestion
						drop-over
						class="first_questions_question"
						title="Ha dohányzol akkor milyen régóta?"
						placeholder="Select something"
						:values="['Nem dohányzom', '1 Hónap', '3 Hónap', '6 Hónap', '1 Év', '3 Év', '5 Év', '5+ Év']"
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

	import DropdownQuestion from "src/view/tests/subtests/questions/DropdownQuestion.vue";
	import DoubleDropdownQuestion from "src/view/tests/subtests/questions/DoubleDropdownQuestion.vue";
	import OptionQuestion from "src/view/tests/subtests/questions/OptionQuestion.vue";

	import {FirstQuestionsModel} from "src/viewmodel/tests/subtests/FirstQuestionsModel";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	@Component({components: {FloatingActionButton, OptionQuestion, DropdownQuestion, DoubleDropdownQuestion}})
	export default class FirstQuestions extends Vue {

		@Prop() readonly viewModel: FirstQuestionsModel;
	};
</script>

<style scoped>
	.first_questions {
		display: flex;

		flex-direction: column;
		align-items: stretch;
		justify-content: center;

		background: var(--color_surface);
	}

	.first_questions_group {
		display: flex;
		overflow-x: hidden;
		overflow-y: auto;

		padding: var(--questions_padding);
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
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