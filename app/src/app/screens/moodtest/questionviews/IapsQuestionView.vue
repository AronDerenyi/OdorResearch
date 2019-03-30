<script lang="ts">
	import {Vue, Component, Watch, Prop} from "vue-property-decorator";
	import {MoodTestViewModel} from "src/viewmodel/MoodTestViewModel"

	@Component
	export default class IapsQuestionView extends Vue {

		@Prop() readonly question: MoodTestViewModel.IapsQuestion;
		isMoodSelected: boolean = false;
		isMoodPositive: boolean = null;

		@Watch("question")
		onQuestionChanged() {
			this.isMoodSelected = false;
			this.isMoodPositive = null;
		}

		get showQuestion(): boolean {
			return this.question != null;
		}

		onSelectedPositiveMood() {
			this.isMoodSelected = true;
			this.isMoodPositive = true;
			this.question.selectPositiveMood();
		}

		onSelectedNegativeMood() {
			this.isMoodSelected = true;
			this.isMoodPositive = false;
			this.question.selectNegativeMood();
		}

		onRatedMood(rating: number) {
			this.question.rateMood(rating);
		}
	}
</script>

<template>
	<div class="container" style="
		position: relative;
		padding: var(--test_padding);
		align-items: center;
		background: var(--color_background);">

		<!-- Title -->
		<h1 style="
			text-align: center;">{{$strings.iaps_title}}</h1>

		<!-- Image -->
		<div style="
			position: relative;
			margin-top: var(--test_spacing);
			display: flex;
			flex-basis: 0;
			flex-grow: 1;
			flex-direction: column;
			align-items: center;">

			<transition name="fade">

				<img v-if="showQuestion" :src="question.imagePath" :key="question.imageName" style="
					position: absolute;
					height: 100%;
					border-radius: var(--iaps_image_corner_radius);"/>

			</transition>

		</div>

		<!-- Controls -->
		<transition name="float" mode="out-in">

			<!-- Mood select -->
			<div v-if="showQuestion && !isMoodSelected" key="selectMood" style="
				margin-top: var(--test_spacing);
				display: flex;
				flex-direction: row;
				justify-content: center;">

				<div @click="onSelectedNegativeMood" class="selectable fab negative" style="
					margin: var(--iaps_mood_rating_margin);
					width: var(--iaps_mood_select_width);">

					<h3>{{$strings.negative}}</h3>

				</div>

				<div @click="onSelectedPositiveMood" class="selectable fab positive" style="
					margin: var(--iaps_mood_rating_margin);
					width: var(--iaps_mood_select_width);">

					<h3>{{$strings.positive}}</h3>

				</div>

			</div>

			<!-- Mood rate -->
			<div  v-if="showQuestion && isMoodSelected" key="rateMood" style="
				margin-top: var(--test_spacing);
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;">

				<h3 :style="{color: isMoodPositive ? 'var(--color_positive)' : 'var(--color_negative)'}" style="
					margin-right: var(--iaps_mood_rating_description_spacing);
					width: 0;
					direction: rtl;
					white-space: nowrap;">

					{{ isMoodPositive ? $strings.less_positive : $strings.less_negative }}

				</h3>

				<div v-for="rating in [1, 2, 3, 4, 5]"
				     @click="onRatedMood(rating)" :class="{positive: isMoodPositive, negative: !isMoodPositive}"
				     class="selectable fab subtle" style="margin: var(--iaps_mood_rating_margin);">

					<h3 style="font-weight: 800;">{{rating}}</h3>

				</div>

				<h3 :style="{color: isMoodPositive ? 'var(--color_positive)' : 'var(--color_negative)'}" style="
					margin-left: var(--iaps_mood_rating_description_spacing);
					width: 0;
					white-space: nowrap;">

					{{ isMoodPositive ? $strings.more_positive : $strings.more_negative }}

				</h3>

			</div>

		</transition>

	</div>
</template>