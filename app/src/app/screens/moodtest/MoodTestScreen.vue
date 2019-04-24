<script lang="ts">
	import {Vue, Component, Watch} from "vue-property-decorator";
	import {Event} from "src/util/Event";
	import {MoodTestViewModel} from "src/viewmodel/MoodTestViewModel";

	import Progress from "src/app/components/Progress.vue";
	import FaceScaleQuestionView from "src/app/screens/moodtest/questionviews/FaceScaleQuestionView.vue";
	import IapsQuestionView from "src/app/screens/moodtest/questionviews/IapsQuestionView.vue";

	@Component({components: {Progress, FaceScaleQuestionView, IapsQuestionView}})
	export default class MoodTestScreen extends Vue {

		readonly viewModel = MoodTestViewModel.requireInstance();

		mounted() {
			this.viewModel.startTest(null, null, 0, null, null, null);
		}

		destroyed() {
			MoodTestViewModel.releaseInstance();
		}

		@Watch("viewModel.error")
		onError(newEvent: Event<Error>, oldEvent: Event<Error>) {
			Event.handle(newEvent, oldEvent, (error) => {
				console.log(error);
				this.$router.push("/home");
			});
		}

		@Watch("viewModel.done")
		onDone(newEvent: Event, oldEvent: Event) {
			Event.handle(newEvent, oldEvent, () => {
				this.viewModel.endTest();
				this.$router.push("/home");
			});
		}

		get isFaceScaleQuestion(): boolean {
			if (this.viewModel.question != null) {
				return this.viewModel.question instanceof MoodTestViewModel.FaceScaleQuestion;
			} else {
				return false;
			}
		}

		get isIapsQuestion(): boolean {
			if (this.viewModel.question != null) {
				return this.viewModel.question instanceof MoodTestViewModel.IapsQuestion;
			} else {
				return false;
			}
		}
	}
</script>

<template>
	<div class="container" style="
		background: var(--color_background);">

		<!-- Question views -->
		<transition name="fade" mode="out-in">

			<FaceScaleQuestionView v-if="isFaceScaleQuestion" :question="viewModel.question" class="overlay"/>
			<IapsQuestionView v-if="isIapsQuestion" :question="viewModel.question" class="overlay"/>

		</transition>

		<!-- Loading indicator -->
		<div v-if="viewModel.loading" class="overlay" style="
			background: var(--color_background_loading_overlay)">

			<Progress style="
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				color: var(--color_accent);"/>

		</div>

	</div>
</template>