<template>
	<div class="scale_question">
		<p class="scale_question_title">{{title}}</p>
		<p class="scale_question_help" v-if="help">{{help}}</p>

		<div class="scale_question_options">
			<FloatingActionButton
					v-for="option in options"
					:key="option"
					:class="{'light': !(selected === option)}"
					:text="option.toString()"
					@click="$emit('selected', option)"/>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Model} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	@Component({components: {FloatingActionButton}})
	export default class ScaleQuestion extends Vue {

		@Prop(String) readonly title: string;
		@Prop(String) readonly help: string;
		@Prop() readonly min: number;
		@Prop() readonly max: number;
		@Model("selected", Number) readonly selected: number;

		get options() {
			const options: number[] = [];
			for (let i = this.min; i <= this.max; i++) options.push(i);
			return options;
		}
	};
</script>

<style scoped>
	.scale_question {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.scale_question_title {
		font-size: var(--question_title_size);
		text-align: center;
	}

	.scale_question_help {
		margin-top: var(--question_help_space);

		font-size: var(--question_help_size);
		text-align: center;
		color: var(--color_on_surface_variant);
	}

	.scale_question_options {
		margin-top: var(--question_spacing);

		max-width: 100%;

		display: flex;

		align-items: center;
		justify-content: center;
	}

	.scale_question_options > *:not(:first-child) {
		margin-left: var(--question_input_spacing);
	}
</style>