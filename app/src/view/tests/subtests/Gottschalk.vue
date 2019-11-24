<template>
	<div class="gottschalk">
		<Timer
				class="gottschalk_timer"
				:timer-minutes="viewModel.timerMinutes"
				:timer-seconds="viewModel.timerSeconds"
				:timer-progress="viewModel.timerProgress"/>

		<div class="gottschalk_content">
			<EditText
					area
					class="gottschalk_input"
					:maxlength="viewModel.maxLength"
					v-model="viewModel.input"/>
			<p class="gottschalk_counter" @click="focus()">{{viewModel.input.length}} / {{viewModel.maxLength}}</p>
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

	@Component({components: {ProgressBar, EditText, FloatingActionButton, Timer}})
	export default class Gottschalk extends Vue {

		@Prop() readonly viewModel: GottschalkModel;

		mounted() {
			this.viewModel.start();
		}
	};
</script>

<style scoped>
	.gottschalk {
		display: flex;
		overflow: hidden auto;

		flex-direction: column;
		align-items: center;
		padding: var(--subtest_padding);

		background: var(--color_surface);
	}

	.gottschalk_timer {
		width: var(--subtest_timer_width);
	}

	.gottschalk_content {
		margin-top: var(--subtest_spacing);
		flex-grow: 1;
		width: var(--subtest_input_field_width);

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.gottschalk_input {
		height: var(--subtest_input_field_height);
	}

	.gottschalk_counter {
		margin-top: var(--gottschalk_counter_space);

		text-align: right;
		font-size: var(--gottschalk_counter_size);
		color: var(--color_on_surface_variant);
	}
</style>