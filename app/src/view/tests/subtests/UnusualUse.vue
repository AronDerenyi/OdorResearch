<template>
	<div class="unusual_use">
		<Timer
				class="unusual_use_timer"
				:timer-minutes="viewModel.timerMinutes"
				:timer-seconds="viewModel.timerSeconds"
				:timer-progress="viewModel.timerProgress"/>

		<div class="unusual_use_content">
			<p class="unusual_use_title">{{viewModel.title}}</p>
			<EditText
					area
					class="unusual_use_input"
					:placeholder="viewModel.hint"
					v-model="viewModel.input"/>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import ProgressBar from "src/view/components/ProgressBar.vue";
	import EditText from "src/view/components/EditText.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import Timer from "src/view/tests/subtests/components/Timer.vue";

	import {UnusualUseModel} from "src/viewmodel/tests/subtests/UnusualUseModel";

	@Component({components: {ProgressBar, EditText, FloatingActionButton, Timer}})
	export default class UnusualUse extends Vue {

		@Prop() readonly viewModel: UnusualUseModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.unusual_use {
		display: flex;
		overflow: hidden auto;

		flex-direction: column;
		align-items: center;
		padding: var(--subtest_padding);

		background: var(--color_surface);
	}

	.unusual_use_timer {
		width: var(--subtest_timer_width);
	}

	.unusual_use_content {
		margin-top: var(--subtest_spacing);
		flex-grow: 1;
		width: var(--subtest_input_field_width);

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.unusual_use_title {
		max-width: var(--subtest_help_width);
		font-size: var(--subtest_help_size);
		text-align: center;
	}

	.unusual_use_input {
		margin-top: var(--subtest_spacing);

		height: var(--subtest_input_field_height);
	}
</style>