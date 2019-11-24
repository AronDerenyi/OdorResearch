<template>
	<div
			class="dropdown_question"
			:class="{'dropdown_question_display_over': dropOver}">

		<p class="dropdown_question_title">{{title}}</p>

		<div class="dropdown_question_dropdown">
			<EditText
					readonly
					class="dropdown_question_input"
					:placeholder="placeholder"
					:icon="dropdown ?
							require('res/drawable/ic_expand_less_24px.svg') :
							require('res/drawable/ic_expand_more_24px.svg')
					"
					:value="selected != null ? values[selected] : null"
					@focus="dropdown = true"
					@blur="dropdown = false"/>

			<transition name="fade">
				<Menu class="dropdown_question_menu" v-if="dropdown">
					<p
							class="selectable"
							v-for="(value, index) in values"
							:key="index"
							@click="$emit('selected', index)">
						{{value}}
					</p>
				</Menu>
			</transition>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Model} from "vue-property-decorator";

	import EditText from "src/view/components/EditText.vue";
	import Menu from "src/view/components/Menu.vue";

	@Component({components: {Menu, EditText}})
	export default class DropdownQuestion extends Vue {

		@Prop(String) readonly title: string;
		@Prop(String) readonly placeholder: string;
		@Prop() readonly values: string[];
		@Model("selected", Number) readonly selected: number;

		@Prop(Boolean) readonly dropOver: boolean;

		private dropdown: boolean = false;
	};
</script>

<style scoped>
	.dropdown_question {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.dropdown_question_title {
		font-size: var(--question_title_size);
		text-align: center;
	}

	.dropdown_question_dropdown {
		position: relative;
		margin-top: var(--question_spacing);

		width: var(--question_input_width);
		max-width: 100%;

		display: flex;
		flex-direction: column;
	}

	.dropdown_question_menu {
		position: absolute;
		top: 100%;
		bottom: auto;
		left: 0;
		right: 0;
		z-index: 8;

		max-height: var(--question_dropdown_height);
	}

	.dropdown_question_display_over .dropdown_question_menu {
		top: auto;
		bottom: 100%;
	}
</style>