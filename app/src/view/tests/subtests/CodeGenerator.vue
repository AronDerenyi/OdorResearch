<template>
	<div>
		<div class="code_generator">
			<div class="code_generator_content">
				<InputQuestion
						class="code_generator_input"
						:title="viewModel.fullNameTitle"
						:placeholder="viewModel.fullNameHint"
						v-model="viewModel.fullName"/>
				<DoubleDropdownQuestion
						class="code_generator_input"
						:title="viewModel.birthdayTitle"
						:first-placeholder="viewModel.birthdayMonthHint"
						:second-placeholder="viewModel.birthdayDayHint"
						:first-values="viewModel.birthdayMonthOptions"
						:second-values="viewModel.birthdayDayOptions"
						:first-selected="viewModel.birthdayMonth"
						:second-selected="viewModel.birthdayDay"
						@first-selected="viewModel.birthdayMonth = $event"
						@second-selected="viewModel.birthdayDay = $event"/>
				<div class="code_generator_input code_generator_code_holder">
					<p class="code_generator_code_description">{{viewModel.codeDescription}}</p>
					<p class="code_generator_code">{{viewModel.code}}</p>
				</div>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light code_generator_next"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showStart"
					@click="viewModel.start()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import InputQuestion from "src/view/tests/subtests/components/InputQuestion.vue";
	import DoubleDropdownQuestion from "src/view/tests/subtests/components/DoubleDropdownQuestion.vue";

	import {CodeGeneratorModel} from "src/viewmodel/tests/subtests/CodeGeneratorModel";

	@Component({components: {FloatingActionButton, InputQuestion, DoubleDropdownQuestion}})
	export default class CodeGenerator extends Vue {

		@Prop() readonly viewModel: CodeGeneratorModel;
	};
</script>

<style scoped>
	.code_generator {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.code_generator_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.code_generator_content > *:not(:first-child) {
		margin-top: var(--subtest_spacing);
	}

	.code_generator_input {
		max-width: var(--code_generator_content_max_width);
		flex-shrink: 0;
	}

	.code_generator_code_holder {
		display: flex;

		flex-direction: column;
		align-items: center;
	}

	.code_generator_code_description {
		color: var(--color_on_surface_variant);
		text-align: center;
		font-size: var(--subtest_help_size);
	}

	.code_generator_code {
		margin-top: var(--code_generator_code_space);

		text-align: center;
		font-size: var(--code_generator_code_size);
	}

	.code_generator_next {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>