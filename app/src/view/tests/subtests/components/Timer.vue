<template>
	<div class="gottschalk">
		<div class="gottschalk_timer">
			<p class="gottschalk_timer_text">
				{{viewModel.timerMinutes}}:{{viewModel.timerSeconds.toString().padStart(2, "0")}}
			</p>
			<ProgressBar
					class="gottschalk_timer_progress"
					:progress="viewModel.timerProgress"/>
		</div>
		<div class="gottschalk_content">
			<p class="gottschalk_help">{{viewModel.help}}</p>
			<EditText
					area
					class="gottschalk_input"
					:maxlength="viewModel.textLimit"
					v-model="viewModel.text"/>
			<p class="gottschalk_counter" @click="focus()">{{viewModel.text.length}} / {{viewModel.textLimit}}</p>
		</div>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	import ProgressBar from "src/view/components/ProgressBar.vue";
	import EditText from "src/view/components/EditText.vue";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";

	import {GottschalkModel} from "src/viewmodel/tests/subtests/GottschalkModel";

	@Component({components: {ProgressBar, EditText, FloatingActionButton}})
	export default class Gottschalk extends Vue {

		@Prop() readonly viewModel: GottschalkModel;

		mounted() {
			const input = this.$el.getElementsByTagName("textarea")[0];
			if (input) input.focus();
		}
	};
</script>

<style scoped>
	.gottschalk {
		display: flex;

		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: var(--gottschalk_padding);

		background: var(--color_surface);
	}

	.gottschalk_timer {
		width: var(--gottschalk_timer_width);

		display: flex;
		flex-direction: column;
	}

	.gottschalk_timer_text {
		text-align: center;
		font-size: var(--gottschalk_timer_text_size);
		font-variant-numeric: tabular-nums;
		color: var(--color_on_surface_variant);
	}

	.gottschalk_timer_progress {
		margin-top: var(--gottschalk_timer_spacing);
	}

	.gottschalk_content {
		margin-top: var(--gottschalk_spacing);
		flex-grow: 1;
		width: var(--gottschalk_content_width);

		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.gottschalk_help {
		margin-bottom: var(--gottschalk_help_space);

		text-align: center;
		font-size: var(--gottschalk_help_size);
	}

	.gottschalk_input {
		height: var(--gottschalk_input_height);
	}

	.gottschalk_counter {
		margin-top: var(--gottschalk_counter_space);

		text-align: right;
		font-size: var(--gottschalk_counter_size);
		color: var(--color_on_surface_variant);
	}
</style>