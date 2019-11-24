<template>
	<div class="memory_test">
		<FirstQuestions
				class="memory_test_sub"
				v-if="firstQuestionsModel"
				:view-model="firstQuestionsModel"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";

	import FirstQuestions from "src/view/questions/FirstQuestions.vue";

	import {MemoryTestModel} from "src/viewmodel/test/MemoryTestModel";
	import {FirstQuestionsModel} from "src/viewmodel/questions/FirstQuestionsModel";

	@Component({components: {FirstQuestions}})
	export default class MemoryTestScreen extends Vue {

		private viewModel: MemoryTestModel = new MemoryTestModel();

		get firstQuestionsModel(): FirstQuestionsModel {
			if (this.viewModel.subTest instanceof FirstQuestionsModel) {
				return this.viewModel.subTest as FirstQuestionsModel;
			} else {
				return null;
			}
		}
	};
</script>

<style scoped>
	.memory_test {
		background: var(--color_surface);
	}

	.memory_test_sub {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>