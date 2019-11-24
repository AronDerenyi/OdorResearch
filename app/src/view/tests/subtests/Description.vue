<template>
	<div class="description">
		<div class="description_content">
			<p class="description_text" v-html="viewModel.description"></p>

			<ExtendedFloatingActionButton
					class="flat description_start"
					v-if="!viewModel.passcodeRequired"
					:text="viewModel.startString"
					@click="viewModel.start()"/>

			<div class="description_passcode" v-if="viewModel.passcodeRequired">
				<EditText
						class="description_passcode_input"
						:placeholder="viewModel.passcodeHint"
						v-model="viewModel.passcode"/>

				<transition name="fade">
					<FloatingActionButton
							class="flat light description_passcode_start"
							v-if="viewModel.showStart"
							:icon="require('res/drawable/ic_arrow_forward_24px.svg')"
							@click="viewModel.start()"/>
				</transition>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import ExtendedFloatingActionButton from "src/view/components/ExtendedFloatingActionButton.vue";
	import EditText from "src/view/components/EditText.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	import {DescriptionModel} from "src/viewmodel/tests/subtests/DescriptionModel";

	@Component({components: {ExtendedFloatingActionButton, EditText, FloatingActionButton}})
	export default class Description extends Vue {

		@Prop() readonly viewModel: DescriptionModel;
	};
</script>

<style scoped>
	.description {
		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.description_content {
		flex-grow: 1;

		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--subtest_padding);

		background: var(--color_surface);
	}

	.description_text {
		max-width: var(--description_width);
		flex-shrink: 0;

		text-align: justify;
		font-size: var(--description_text_size);
	}

	.description_start {
		margin-top: var(--subtest_spacing);
		flex-shrink: 0;
	}

	.description_passcode {
		margin-top: var(--subtest_spacing);

		flex-shrink: 0;
		width: var(--description_passcode_width);

		display: flex;
	}

	.description_passcode_input {
		flex-grow: 1;
	}

	.description_passcode_start {
		position: absolute;
		top: 0;
		bottom: 0;
		left: calc(100% + var(--description_passcode_start_space));
	}
</style>