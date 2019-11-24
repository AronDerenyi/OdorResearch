<template>
	<div class="input_question">

		<p class="input_question_title">{{title}}</p>

		<EditText
				class="input_question_input"
				:placeholder="placeholder"
				:value="value"
				@value="$emit('value', $event)"
				@focus="dropdown = true"
				@blur="dropdown = false"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Model} from "vue-property-decorator";

	import EditText from "src/view/components/EditText.vue";

	@Component({components: {EditText}})
	export default class InputQuestion extends Vue {

		@Prop(String) readonly title: string;
		@Prop(String) readonly placeholder: string;
		@Model("value", String) readonly value: string;
	};
</script>

<style scoped>
	.input_question {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.input_question_title {
		font-size: var(--question_title_size);
		text-align: center;
	}

	.input_question_input {
		margin-top: var(--question_spacing);

		width: var(--question_input_width);
		max-width: 100%;
	}
</style>