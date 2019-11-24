<template>
	<div class="option_question">
		<p class="option_question_title">{{title}}</p>

		<div class="option_question_options">
			<ExtendedFloatingActionButton
					class="option_question_option"
					v-for="(option, index) in options"
					:key="index"
					:class="{'light': !(selected === index)}"
					:text="option"
					@click="$emit('selected', index)"/>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Model} from "vue-property-decorator";

	import ExtendedFloatingActionButton from "src/view/components/ExtendedFloatingActionButton.vue";

	@Component({components: {ExtendedFloatingActionButton}})
	export default class OptionQuestion extends Vue {

		@Prop(String) readonly title: string;
		@Prop() readonly options: string[];
		@Model("selected", Number) readonly selected: number;
	};
</script>

<style scoped>
	.option_question {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.option_question_title {
		font-size: var(--question_title_size);
		text-align: center;
	}

	.option_question_options {
		margin-top: var(--question_spacing);

		width: var(--question_input_width);
		max-width: 100%;

		display: flex;

		align-items: center;
		justify-content: center;
	}

	.option_question_options > *:not(:first-child) {
		margin-left: var(--question_input_spacing);
	}

	.option_question_option {
		flex-grow: 1;
		min-width: var(--question_option_width)
	}
</style>