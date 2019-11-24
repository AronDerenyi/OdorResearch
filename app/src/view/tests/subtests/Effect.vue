<template>
	<div>
		<div class="effect">
			<div class="effect_content">
				<p class="effect_title">{{viewModel.effectTitle}}</p>
				<EditText
						area
						class="effect_input"
						v-model="viewModel.input"/>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light effect_finish"
					:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
					v-if="viewModel.showFinish"
					@click="viewModel.finish()"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import EditText from "src/view/components/EditText.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	import {EffectModel} from "src/viewmodel/tests/subtests/EffectModel";

	@Component({components: {EditText, FloatingActionButton}})
	export default class Effect extends Vue {

		@Prop() readonly viewModel: EffectModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.effect {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.effect_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.effect_title {
		max-width: var(--subtest_help_width);
		font-size: var(--subtest_help_size);
		text-align: center;
	}

	.effect_input {
		margin-top: var(--subtest_spacing);

		width: var(--subtest_input_field_width);
		height: var(--subtest_input_field_height);
	}

	.effect_finish {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>