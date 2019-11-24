<template>
	<div>
		<div class="face_scale">
			<div class="face_scale_content">
				<p class="face_scale_title">{{viewModel.title}}</p>

				<div class="face_scale_input">
					<FloatingActionButton
							v-for="index in [1, 2, 3, 4, 5]"
							:class="{'light': !(viewModel.value === index)}"
							:key="index"
							:icon="[
								require('res/drawable/ic_face_very_unhappy_24px.svg'),
								require('res/drawable/ic_face_unhappy_24px.svg'),
								require('res/drawable/ic_face_neutral_24px.svg'),
								require('res/drawable/ic_face_happy_24px.svg'),
								require('res/drawable/ic_face_very_happy_24px.svg')
							][index - 1]"
							@click="viewModel.value = index"/>
				</div>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light face_scale_finish"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showFinish"
					@click="viewModel.finish()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	import {FaceScaleModel} from "src/viewmodel/tests/subtests/FaceScaleModel";

	@Component({components: {FloatingActionButton}})
	export default class FaceScale extends Vue {

		@Prop() readonly viewModel: FaceScaleModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.face_scale {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.face_scale_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.face_scale_title {
		max-width: var(--subtest_help_width);
		font-size: var(--subtest_help_size);
		text-align: center;
	}

	.face_scale_input {
		margin-top: var(--subtest_spacing);

		display: flex;

		align-items: center;
		justify-content: center;
	}

	.face_scale_input > *:not(:first-child) {
		margin-left: var(--subtest_spacing);
	}

	.face_scale_finish {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>