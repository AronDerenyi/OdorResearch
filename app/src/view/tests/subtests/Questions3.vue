<template>
	<div class="questions3">
		<transition name="fade" mode="out-in">
			<div class="questions3_group" :key="0" v-if="viewModel.group === 0">
				<div class="questions3_content">
					<div class="questions3_question questions3_title_holder">
						<p class="questions3_title">{{viewModel.methodsTitle}}</p>
						<p class="questions3_help">{{viewModel.methodsHelp}}</p>
					</div>
					<ScaleQuestion
							class="questions3_question"
							:title="viewModel.hypnosisTitle"
							:min="viewModel.minMethod"
							:max="viewModel.maxMethod"
							v-model="viewModel.hypnosis"/>
					<ScaleQuestion
							class="questions3_question"
							:title="viewModel.meditationTitle"
							:min="viewModel.minMethod"
							:max="viewModel.maxMethod"
							v-model="viewModel.meditation"/>
					<ScaleQuestion
							class="questions3_question"
							:title="viewModel.mindfulnessTitle"
							:min="viewModel.minMethod"
							:max="viewModel.maxMethod"
							v-model="viewModel.mindfulness"/>
				</div>
			</div>
			<div class="questions3_group" :key="1" v-if="viewModel.group === 1">
				<div class="questions3_content">
					<ScaleQuestion
							class="questions3_question"
							:title="viewModel.inLoveTitle"
							:help="viewModel.inLoveHelp"
							:min="viewModel.minInLove"
							:max="viewModel.maxInLove"
							v-model="viewModel.inLove"/>
					<ScaleQuestion
							class="questions3_question"
							:title="viewModel.smellRefinementTitle"
							:help="viewModel.smellRefinementHelp"
							:min="viewModel.minSmellRefinement"
							:max="viewModel.maxSmellRefinement"
							v-model="viewModel.smellRefinement"/>
					<ScaleQuestion
							class="questions3_question"
							:title="viewModel.smellSensitivityTitle"
							:help="viewModel.smellSensitivityHelp"
							:min="viewModel.minSmellSensitivity"
							:max="viewModel.maxSmellSensitivity"
							v-model="viewModel.smellSensitivity"/>
				</div>
			</div>
			<div class="questions3_group" :key="2" v-if="viewModel.group === 2">
				<div class="questions3_content">
					<div class="questions3_question questions3_title_holder">
						<p class="questions3_title">{{viewModel.useTitle}}</p>
					</div>
					<OptionQuestion
							class="questions3_question"
							:title="viewModel.useDeodorantTitle"
							:options="viewModel.useDeodorantOptions"
							v-model="viewModel.useDeodorant"/>
					<OptionQuestion
							class="questions3_question"
							:title="viewModel.usePerfumeTitle"
							:options="viewModel.usePerfumeOptions"
							v-model="viewModel.usePerfume"/>
					<OptionQuestion
							class="questions3_question"
							:title="viewModel.useOilsTitle"
							:options="viewModel.useOilsOptions"
							v-model="viewModel.useOils"/>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<FloatingActionButton
					class="light questions3_next"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showNext"
					@click="viewModel.next()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import OptionQuestion from "src/view/tests/subtests/components/OptionQuestion.vue";
	import ScaleQuestion from "src/view/tests/subtests/components/ScaleQuestion.vue";

	import {Questions3Model} from "src/viewmodel/tests/subtests/Questions3Model";
	import Checkbox from "src/view/components/Checkbox.vue";

	@Component({components: {Checkbox, FloatingActionButton, OptionQuestion, ScaleQuestion}})
	export default class Questions3 extends Vue {

		@Prop() readonly viewModel: Questions3Model;
	};
</script>

<style scoped>
	.questions3 {
		background: var(--color_surface);
	}

	.questions3_group {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.questions3_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.questions3_content > *:not(:first-child) {
		margin-top: var(--subtest_spacing);
	}

	.questions3_question {
		max-width: var(--question_max_width);
		flex-shrink: 0;
	}

	.questions3_title_holder {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.questions3_title {
		font-size: var(--subtest_title_size);
		text-align: center;
	}

	.questions3_help {
		margin-top: var(--subtest_help_space);

		color: var(--color_on_surface_variant);
		font-size: var(--subtest_help_size);
		text-align: center;
	}

	.questions3_next {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>