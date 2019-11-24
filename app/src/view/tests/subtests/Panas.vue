<template>
	<div>
		<div class="tellegen">
			<div class="tellegen_content">
				<OptionQuestion
						class="tellegen_question"
						v-for="index in viewModel.questionCount"
						:title="viewModel.title(index - 1)"
						:options="viewModel.options"
						:selected="viewModel.selected(index - 1)"
						@selected="viewModel.select(index - 1, $event)"/>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light tellegen_finish"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showFinish"
					@click="viewModel.finish()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import OptionQuestion from "src/view/tests/subtests/components/OptionQuestion.vue";

	import {TellegenModel} from "src/viewmodel/tests/subtests/TellegenModel";

	@Component({components: {FloatingActionButton, OptionQuestion}})
	export default class Tellegen extends Vue {

		@Prop() readonly viewModel: TellegenModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.tellegen {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.tellegen_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.tellegen_content > *:not(:first-child) {
		margin-top: var(--tellegen_spacing);
	}

	.tellegen_question {
		max-width: var(--tellegen_max_width);
		flex-shrink: 0;
	}

	.tellegen_finish {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>