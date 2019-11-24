<template>
	<div>
		<div class="association">
			<div class="association_content">
				<p class="association_title">{{viewModel.associationTitle}}</p>
				<EditText
						area
						class="association_input"
						v-model="viewModel.input"/>
			</div>
		</div>
		<transition name="fade">
			<FloatingActionButton
					class="light association_finish"
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

	import {AssociationModel} from "src/viewmodel/tests/subtests/AssociationModel";

	@Component({components: {EditText, FloatingActionButton}})
	export default class Association extends Vue {

		@Prop() readonly viewModel: AssociationModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.association {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.association_content {
		flex-grow: 1;

		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.association_title {
		max-width: var(--subtest_help_width);
		font-size: var(--subtest_help_size);
		text-align: center;
	}

	.association_input {
		margin-top: var(--subtest_spacing);

		width: var(--subtest_input_field_width);
		height: var(--subtest_input_field_height);
	}

	.association_finish {
		position: absolute;
		bottom: var(--subtest_navigation_padding);
		right: var(--subtest_navigation_padding);
	}
</style>