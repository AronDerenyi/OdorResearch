<template>
	<div class="questions1">
		<transition name="fade" mode="out-in">
			<div class="questions1_group" :key="0" v-if="viewModel.group === 0">
				<div class="questions1_content">
					<OptionQuestion
							class="questions1_question"
							:title="viewModel.genderTitle"
							:options="viewModel.genderOptions"
							v-model="viewModel.gender"/>
					<DoubleDropdownQuestion
							class="questions1_question"
							:title="viewModel.birthTitle"
							:first-values="viewModel.birthYearOptions"
							:second-values="viewModel.birthMonthOptions"
							:first-selected="viewModel.birthYear"
							:second-selected="viewModel.birthMonth"
							@first-selected="viewModel.birthYear = $event"
							@second-selected="viewModel.birthMonth = $event"/>
					<DropdownQuestion
							drop-over
							class="questions1_question"
							:title="viewModel.residenceTitle"
							:values="viewModel.residenceOptions"
							v-model="viewModel.residence"/>
				</div>
			</div>
			<div class="questions1_group" :key="1" v-if="viewModel.group === 1">
				<div class="questions1_content">
					<DropdownQuestion
							class="questions1_question"
							:title="viewModel.bookshelvesTitle"
							:values="viewModel.bookshelvesOptions"
							v-model="viewModel.bookshelves"/>
					<DropdownQuestion
							class="questions1_question"
							:title="viewModel.foreignLanguagesTitle"
							:values="viewModel.foreignLanguagesOptions"
							v-model="viewModel.foreignLanguages"/>
					<DropdownQuestion
							class="questions1_question"
							:title="viewModel.educationTitle"
							:values="viewModel.educationOptions"
							v-model="viewModel.education"/>
					<DropdownQuestion
							drop-over
							class="questions1_question"
							:title="viewModel.educationMotherTitle"
							:values="viewModel.educationOptions"
							v-model="viewModel.educationMother"/>
					<DropdownQuestion
							drop-over
							class="questions1_question"
							:title="viewModel.educationFatherTitle"
							:values="viewModel.educationOptions"
							v-model="viewModel.educationFather"/>
				</div>
			</div>
			<div class="questions1_group" :key="2" v-if="viewModel.group === 2">
				<div class="questions1_content">
					<DropdownQuestion
							class="questions1_question"
							:title="viewModel.hoursSleptTitle"
							:values="viewModel.hoursSleptOptions"
							v-model="viewModel.hoursSlept"/>
					<OptionQuestion
							class="questions1_question"
							:title="viewModel.consumedCoffeeTitle"
							:options="viewModel.consumedCoffeeOptions"
							v-model="viewModel.consumedCoffee"/>
					<OptionQuestion
							class="questions1_question"
							:title="viewModel.consumedCigaretteTitle"
							:options="viewModel.consumedCigaretteOptions"
							v-model="viewModel.consumedCigarette"/>
					<DropdownQuestion
							drop-over
							class="questions1_question"
							:title="viewModel.smokingTitle"
							:values="viewModel.smokingOptions"
							v-model="viewModel.smoking"/>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<FloatingActionButton
					class="light questions1_next"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showNext"
					@click="viewModel.next()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import DropdownQuestion from "src/view/tests/subtests/components/DropdownQuestion.vue";
	import DoubleDropdownQuestion from "src/view/tests/subtests/components/DoubleDropdownQuestion.vue";
	import OptionQuestion from "src/view/tests/subtests/components/OptionQuestion.vue";

	import {Questions1Model} from "src/viewmodel/tests/subtests/Questions1Model";

	@Component({components: {FloatingActionButton, OptionQuestion, DropdownQuestion, DoubleDropdownQuestion}})
	export default class Questions1 extends Vue {

		@Prop() readonly viewModel: Questions1Model;
	};
</script>

<style scoped>
	.questions1 {
		background: var(--color_surface);
	}

	.questions1_group {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.questions1_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.questions1_content > *:not(:first-child) {
		margin-top: var(--subtest_spacing);
	}

	.questions1_question {
		max-width: var(--question_max_width);
		flex-shrink: 0;
	}

	.questions1_next {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>