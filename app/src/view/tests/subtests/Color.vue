<template>
	<div>
		<div class="color_subtest">
			<div class="color_subtest_content">
				<p class="color_subtest_title">{{viewModel.title}}</p>

				<div
						class="color_subtest_row"
						v-for="colors in [
							['#85492f', '#fff3e0', '#b71c1c', '#dd1906',
							'#e91e63', '#f44336', '#ff5722', '#ff9800'],
							['#ffc107', '#ffee58', '#ffff00', '#eeff00',
							'#cddc39', '#9e9d24', '#8bc34a', '#4caf50'],
							['#009688', '#26c6da', '#29b6f6', '#2196f3',
							'#3f51b5', '#7e57c2', '#673ab7', '#ab47bc'],
							['#000000', '#444444', '#888888', '#ffffff']
						]"
						:key="colors.toString()">

					<div
							class="color_subtest_selector"
							v-for="color in colors"
							:style="{'color': color}"
							:class="{'color_subtest_selector_active': viewModel.value === color}"
							:key="color"
							@click="viewModel.value = color"></div>
				</div>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light color_subtest_finish"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showFinish"
					@click="viewModel.finish()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	import {ColorModel} from "src/viewmodel/tests/subtests/ColorModel";

	@Component({components: {FloatingActionButton}})
	export default class Color extends Vue {

		@Prop() readonly viewModel: ColorModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.color_subtest {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.color_subtest_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.color_subtest_title {
		margin-bottom: var(--subtest_spacing);
		max-width: var(--subtest_help_width);
		font-size: var(--subtest_help_size);
		text-align: center;
	}

	.color_subtest_row {
		margin-top: var(--subtest_spacing);

		display: flex;

		align-items: center;
		justify-content: center;
	}

	.color_subtest_row:not(:first-of-type) {
		margin-top: var(--question_input_spacing);
	}

	.color_subtest_row > *:not(:first-child) {
		margin-left: var(--question_input_spacing);
	}

	.color_subtest_finish {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}

	.color_subtest_selector {
		flex-shrink: 0;
		flex-grow: 0;
		width: 64px;
		height: 64px;

		border-radius: 100%;
		box-shadow: 0 3px 16px var(--color_shadow);
	}

	.color_subtest_selector::before {
		content: "";
		position: absolute;

		left: 16px;
		right: 16px;
		top: 16px;
		bottom: 16px;

		border-radius: 100%;
		box-shadow: inset 0 3px 16px var(--color_shadow);
	}

	.color_subtest_selector::after {
		content: "";

		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		border-radius: 100%;
		box-shadow: inset 0 0 0 32px currentColor;

		transition: box-shadow 0.2s;
	}

	.color_subtest_selector:hover::after {
		box-shadow: inset 0 0 0 16px currentColor;
	}

	.color_subtest_selector_active::after,
	.color_subtest_selector_active:hover::after {
		box-shadow: inset 0 0 0 20px currentColor;
	}
</style>