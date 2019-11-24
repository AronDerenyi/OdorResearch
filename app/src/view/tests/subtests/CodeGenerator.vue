<template>
	<div class="ending">
		<div class="ending_content">
			<p class="ending_title">{{viewModel.thankYou}}</p>
			<EditText
					area
					class="ending_response"
					:placeholder="viewModel.responseHint"
					v-model="viewModel.response"/>
			<ExtendedFloatingActionButton
					class="light"
					:text="viewModel.submitString"
					@click="viewModel.submit()"/>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import EditText from "src/view/components/EditText.vue";
	import ExtendedFloatingActionButton from "src/view/components/ExtendedFloatingActionButton.vue";

	import {EndingModel} from "src/viewmodel/tests/subtests/EndingModel";

	@Component({components: {EditText, ExtendedFloatingActionButton}})
	export default class Ending extends Vue {

		@Prop() readonly viewModel: EndingModel;
	};
</script>

<style scoped>
	.ending {
		display: flex;
		overflow: hidden auto;

		flex-direction: column;
	}

	.ending_content {
		display: flex;

		padding: var(--subtest_padding);
		flex-direction: column;
		align-items: center;
		justify-content: center;

		background: var(--color_surface);
	}

	.ending_content > *:not(:first-child){
		margin-top: var(--subtest_spacing);
	}

	.ending_title {
		font-size: var(--ending_title_size);
		text-align: center;
	}

	.ending_response {
		width: var(--subtest_input_field_width);
		height: var(--subtest_input_field_height);
	}
</style>