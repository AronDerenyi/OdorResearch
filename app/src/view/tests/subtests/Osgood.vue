<template>
	<div>
		<div class="panas">
			<div class="panas_content">
				<ScaleQuestion
						class="panas_question"
						v-for="index in viewModel.questionCount"
						:title="viewModel.title(index - 1)"
						:min="viewModel.min"
						:max="viewModel.max"
						:selected="viewModel.selected(index - 1)"
						@selected="viewModel.select(index - 1, $event)"/>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light panas_finish"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showFinish"
					@click="viewModel.finish()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import {PanasModel} from "src/viewmodel/tests/subtests/PanasModel";
	import ScaleQuestion from "src/view/tests/subtests/components/ScaleQuestion.vue";

	@Component({components: {FloatingActionButton, ScaleQuestion}})
	export default class Panas extends Vue {

		@Prop() readonly viewModel: PanasModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.panas {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.panas_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.panas_content > *:not(:first-child) {
		margin-top: var(--panas_spacing);
	}

	.panas_question {
		max-width: var(--panas_max_width);
		flex-shrink: 0;
	}

	.panas_finish {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>