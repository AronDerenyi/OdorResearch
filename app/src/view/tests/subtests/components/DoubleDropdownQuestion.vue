<template>
	<div
			class="double_dropdown_question"
			:class="{'double_dropdown_question_display_over': dropOver}">

		<p class="double_dropdown_question_title">{{title}}</p>

		<div class="double_dropdown_question_dropdowns">
			<div class="double_dropdown_question_dropdown">
				<EditText
						readonly
						class="double_dropdown_question_input"
						:placeholder="firstPlaceholder"
						:icon="firstDropdown ?
								require('res/drawable/ic_expand_less_24px.svg') :
								require('res/drawable/ic_expand_more_24px.svg')
						"
						:value="firstSelected != null ? firstValues[firstSelected] : null"
						@focus="firstDropdown = true"
						@blur="firstDropdown = false"/>

				<transition name="fade">
					<Menu class="double_dropdown_question_menu" v-if="firstDropdown">
						<p
								class="selectable"
								v-for="(value, index) in firstValues"
								:key="index"
								@click="$emit('first-selected', index)">
							{{value}}
						</p>
					</Menu>
				</transition>
			</div>
			<div class="double_dropdown_question_dropdown">
				<EditText
						class="double_dropdown_question_input" readonly
						:placeholder="secondPlaceholder"
						:icon="secondDropdown ?
								require('res/drawable/ic_expand_less_24px.svg') :
								require('res/drawable/ic_expand_more_24px.svg')
						"
						:value="secondSelected != null ? secondValues[secondSelected] : null"
						@focus="secondDropdown = true"
						@blur="secondDropdown = false"/>

				<transition name="fade">
					<Menu class="double_dropdown_question_menu" v-if="secondDropdown">
						<p
								class="selectable"
								v-for="(value, index) in secondValues"
								:key="index"
								@click="$emit('second-selected', index)">
							{{value}}
						</p>
					</Menu>
				</transition>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import EditText from "src/view/components/EditText.vue";
	import Menu from "src/view/components/Menu.vue";

	@Component({components: {Menu, EditText}})
	export default class DoubleDropdownQuestion extends Vue {

		@Prop(String) readonly title: string;
		@Prop(String) readonly firstPlaceholder: string;
		@Prop(String) readonly secondPlaceholder: string;
		@Prop() readonly firstValues: string[];
		@Prop() readonly secondValues: string[];
		@Prop(Number) readonly firstSelected: number;
		@Prop(Number) readonly secondSelected: number;

		@Prop(Boolean) readonly dropOver: boolean;

		private firstDropdown: boolean = false;
		private secondDropdown: boolean = false;
	};
</script>

<style scoped>
	.double_dropdown_question {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.double_dropdown_question_title {
		font-size: var(--question_title_size);
		text-align: center;
	}

	.double_dropdown_question_dropdowns {
		margin-top: var(--question_spacing);

		width: var(--question_input_width);
		max-width: 100%;

		display: flex;

		align-items: center;
		justify-content: center;
	}

	.double_dropdown_question_dropdowns > *:not(:first-child) {
		 margin-left: var(--question_input_spacing);
	 }

	.double_dropdown_question_dropdown {
		position: relative;

		flex-grow: 1;

		display: flex;
		flex-direction: column;
	}

	.double_dropdown_question_menu {
		position: absolute;
		top: 100%;
		bottom: auto;
		left: 0;
		right: 0;
		z-index: 8;

		max-height: var(--question_dropdown_height);
	}

	.double_dropdown_question_display_over .double_dropdown_question_menu {
		top: auto;
		bottom: 100%;
	}
</style>