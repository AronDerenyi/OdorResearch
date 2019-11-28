<template>
	<div class="iaps dark">
		<div class="iaps_image_holder">
			<transition name="fade" mode="out-in">
				<img class="iaps_image" :key="viewModel.imageSource" :src="viewModel.imageSource"/>
			</transition>
		</div>

		<transition name="float" mode="out-in">
			<div class="iaps_input" v-if="!viewModel.showRating" key="selection">
				<ExtendedFloatingActionButton
						class="iaps_selector negative"
						:text="viewModel.negative"
						@click="viewModel.selected = false"/>
				<ExtendedFloatingActionButton
						class="iaps_selector positive"
						:text="viewModel.positive"
						@click="viewModel.selected = true"/>
			</div>
			<div class="iaps_input" v-if="viewModel.showRating" key="rating">
				<FloatingActionButton
						class="light iaps_rating_button"
						:class="{
							'negative': !viewModel.selected,
							'positive': viewModel.selected
						}"
						v-for="rating in viewModel.ratingCount"
						:key="rating"
						:text="rating.toString()"
						@click="viewModel.rating = rating"/>
			</div>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";
	import ExtendedFloatingActionButton from "src/view/components/ExtendedFloatingActionButton.vue";
	import EditText from "src/view/components/EditText.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import {IapsModel} from "src/viewmodel/tests/subtests/IapsModel";

	@Component({components: {ExtendedFloatingActionButton, EditText, FloatingActionButton}})
	export default class Iaps extends Vue {

		@Prop() readonly viewModel: IapsModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.iaps {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--subtest_padding);

		background: var(--color_surface);
	}

	.iaps_image_holder {
		flex-basis: 0;
		flex-grow: 1;
	}

	.iaps_image {
		position: absolute;
		height: 100%;

		border-radius: 16px;

		transform: translateX(-50%);
	}

	.iaps_input {
		margin-top: var(--iaps_input_spacing);
		flex-shrink: 0;
		height: var(--iaps_input_height);

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.iaps_input > *:not(:first-child) {
		margin-left: var(--iaps_input_spacing);
	}

	.iaps_selector {
		width: var(--iaps_input_option_width);
	}

	.dark .iaps_rating_button {
		background: var(--color_surface_variant);
	}
</style>