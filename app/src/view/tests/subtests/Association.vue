<template>
	<div class="ending">
		<div class="ending_content">
			<p class="ending_title">{{viewModel.thankYou}}</p>
			<p class="ending_response_title">{{viewModel.responseTitle}}</p>
			<EditText
					area
					class="ending_response_input"
					v-model="viewModel.response"/>
			<ExtendedFloatingActionButton
					class="light ending_submit"
					:text="viewModel.submitString"
					@click="viewModel.submit()"/>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import ProgressBar from "src/view/components/ProgressBar.vue";
	import EditText from "src/view/components/EditText.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import Timer from "src/view/tests/subtests/components/Timer.vue";

	import {GottschalkModel} from "src/viewmodel/tests/subtests/GottschalkModel";
	import {EndingModel} from "src/viewmodel/tests/subtests/EndingModel";
	import ExtendedFloatingActionButton from "src/view/components/ExtendedFloatingActionButton.vue";

	@Component({components: {ExtendedFloatingActionButton, ProgressBar, EditText, FloatingActionButton, Timer}})
	export default class Gottschalk extends Vue {

		@Prop() readonly viewModel: EndingModel;
	};
</script>

<style scoped>
	.ending {
		display: flex;

		flex-direction: column;
		justify-content: center;

		background: var(--color_surface);
	}

	.ending_content {
		display: flex;
		overflow: hidden auto;

		padding: var(--ending_padding);
		flex-direction: column;
		align-items: center;
	}

	.ending_title {
		font-size: var(--ending_title_size);
		text-align: center;
	}

	.ending_response_title {
		margin-top: var(--ending_spacing);

		font-size: var(--ending_response_title_size);
		text-align: center;
	}

	.ending_response_input {
		margin-top: var(--ending_response_spacing);

		align-self: stretch;
		height: var(--ending_response_input_height);
	}

	.ending_submit {
		margin-top: var(--ending_spacing);

		align-self: stretch;
		height: var(--gottschalk_input_height);
	}
</style>