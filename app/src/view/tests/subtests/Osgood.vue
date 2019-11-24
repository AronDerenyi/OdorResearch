<template>
	<div>
		<div class="osgood">
			<div class="osgood_content">
				<div
						class="osgood_question"
						v-for="index in viewModel.questionCount"
						:key="index">

					<p class="osgood_question_left">{{viewModel.left(index - 1)}}</p>

					<div
							class="osgood_selector"
							v-for="option in viewModel.optionCount"
							:key="option"
							:text="option"
							:class="{'osgood_selector_active': viewModel.selected(index - 1) === option}"
							@click="viewModel.select(index - 1, option)"></div>

					<p class="osgood_question_right">{{viewModel.right(index - 1)}}</p>

				</div>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light osgood_finish"
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
	import {OsgoodModel} from "src/viewmodel/tests/subtests/OsgoodModel";

	@Component({components: {FloatingActionButton, ScaleQuestion}})
	export default class Osgood extends Vue {

		@Prop() readonly viewModel: OsgoodModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.osgood {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.osgood_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		justify-content: center;

		background: var(--color_surface);
	}

	.osgood_content > *:not(:first-child) {
		margin-top: var(--subtest_spacing);
	}

	.osgood_question {
		flex-shrink: 0;

		display: flex;
		align-items: center;
	}

	.osgood_question_left,
	.osgood_question_right {
		flex-basis: 0;
		flex-grow: 1;

		font-size: var(--subtest_help_size);
	}

	.osgood_question_left {
		margin-right: var(--subtest_help_space);
		text-align: right;
	}

	.osgood_question_right {
		margin-left: var(--subtest_help_space);
		text-align: left;
	}

	.osgood_question > .osgood_selector {
		margin-left: var(--question_input_spacing);
	}

	.osgood_question > .osgood_selector:last-of-type {
		margin-right: var(--question_input_spacing);
	}

	.osgood_selector {
		width: 24px;
		height: 24px;

		border-radius: 100%;
		box-shadow: inset 0 0 0 4px var(--color_on_surface_variant);
		transition: box-shadow 0.2s;
	}

	.osgood_selector:hover {
		box-shadow: inset 0 0 0 6px var(--color_primary);
	}

	.osgood_selector.osgood_selector_active {
		box-shadow: inset 0 0 0 12px var(--color_primary);
	}

	.osgood_finish {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>