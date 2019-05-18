<script lang="ts">
	import {Vue, Component, Watch, Prop} from "vue-property-decorator";
	import {MoodTestViewModel} from "src/viewmodel/MoodTestViewModel"

	import ImgSvg from "src/app/components/ImgSvg.vue"

	@Component({components: {ImgSvg}})
	export default class IapsQuestionView extends Vue {

		@Prop() readonly question: MoodTestViewModel.FaceScaleQuestion;

		onFaceSelected(face: number) {
			this.question.selectFace(face);
		}
	}
</script>

<template>
	<div class="container" style="
		padding: var(--test_padding);
		align-items: center;
		justify-content: center;
		background: var(--color_surface);">

		<!-- Title -->
		<h1 style="
			text-align: center;">{{$strings.face_scale_title}}</h1>

		<!-- Faces -->
		<div style="
			margin-top: var(--test_spacing);
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;">

			<div @click="onFaceSelected(0)" class="selectable fab large light negative" style="
				margin: var(--face_scale_face_margin);">

				<ImgSvg src="res/drawable/face_very_unhappy_24px.svg" style="
					width: var(--face_scale_face_size);
					height: var(--face_scale_face_size);
					fill: currentColor;"/>

			</div>

			<div @click="onFaceSelected(1)" class="selectable fab large light negative" style="
				margin: var(--face_scale_face_margin);">

				<ImgSvg src="res/drawable/face_unhappy_24px.svg" style="
					width: var(--face_scale_face_size);
					height: var(--face_scale_face_size);
					fill: currentColor;"/>

			</div>

			<div @click="onFaceSelected(2)" class="selectable fab large light" style="
				margin: var(--face_scale_face_margin);
				color: var(--color_on_surface_variant);">

				<ImgSvg src="res/drawable/face_neutral_24px.svg" style="
					width: var(--face_scale_face_size);
					height: var(--face_scale_face_size);
					fill: currentColor;"/>

			</div>

			<div @click="onFaceSelected(3)" class="selectable fab large light positive" style="
				margin: var(--face_scale_face_margin);">

				<ImgSvg src="res/drawable/face_happy_24px.svg" style="
					width: var(--face_scale_face_size);
					height: var(--face_scale_face_size);
					fill: currentColor;"/>

			</div>

			<div @click="onFaceSelected(4)" class="selectable fab large light positive" style="
				margin: var(--face_scale_face_margin);">

				<ImgSvg src="res/drawable/face_very_happy_24px.svg" style="
					width: var(--face_scale_face_size);
					height: var(--face_scale_face_size);
					fill: currentColor;"/>

			</div>

		</div>

	</div>
</template>