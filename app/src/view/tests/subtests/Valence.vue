<template>
	<div>
		<div class="questions_temp">
			<div class="questions_temp_content">
				<OptionQuestion
						class="questions_temp_question"
						:title="viewModel.genderTitle"
						:options="viewModel.genderOptions"
						v-model="viewModel.gender"/>
				<DoubleDropdownQuestion
						class="questions_temp_question"
						:title="viewModel.birthTitle"
						:first-values="viewModel.birthYearOptions"
						:second-values="viewModel.birthMonthOptions"
						:first-selected="viewModel.birthYear"
						:second-selected="viewModel.birthMonth"
						@first-selected="viewModel.birthYear = $event"
						@second-selected="viewModel.birthMonth = $event"/>
				<DropdownQuestion
						drop-over
						class="questions_temp_question"
						:title="viewModel.residenceTitle"
						:values="viewModel.residenceOptions"
						v-model="viewModel.residence"/>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light questions_temp_next"
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

	import {QuestionsTempModel} from "src/viewmodel/tests/subtests/QuestionsTempModel";

	@Component({components: {FloatingActionButton, OptionQuestion, DropdownQuestion, DoubleDropdownQuestion}})
	export default class Questions1 extends Vue {

		@Prop() readonly viewModel: QuestionsTempModel;
	};
</script>

<style scoped>
	.questions_temp {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.questions_temp_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.questions_temp_content > *:not(:first-child) {
		margin-top: var(--subtest_spacing);
	}

	.questions_temp_question {
		max-width: var(--question_max_width);
		flex-shrink: 0;
	}

	.questions_temp_next {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>