<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";
	import {PreferencesViewModel} from "src/viewmodel/PreferencesViewModel";

	import ImgSvg from "src/app/components/ImgSvg.vue";

	@Component({components: {ImgSvg}})
	export default class MoodTestOptions extends Vue {

		preferencesViewModel = PreferencesViewModel.requireInstance();

		destroyed() {
			PreferencesViewModel.releaseInstance();
		}
	};
</script>

<template>
	<div class="container" style="
		padding: var(--home_padding);
		background: var(--color_surface_variant);">

		<div style="
			display: flex;">

			<div class="button with_icon flat light" style="
				flex-basis: 0;
				flex-grow: 1;">

				<ImgSvg src="res/drawable/ic_save_24px.svg" class="button_icon" style="fill: currentColor;"/>
				<div class="button_text">{{$strings.save}}</div>

			</div>

			<div class="button with_icon flat light" style="
				flex-basis: 0;
				flex-grow: 1;
				margin-left: var(--home_spacing);">

				<ImgSvg src="res/drawable/ic_open_24px.svg" class="button_icon" style="fill: currentColor;"/>
				<div class="button_text">{{$strings.open}}</div>

			</div>

		</div>

		<div class="button with_icon flat light" style="
			margin-top: var(--home_spacing);">

			<ImgSvg src="res/drawable/ic_export_24px.svg" class="button_icon" style="fill: currentColor;"/>
			<div class="button_text">{{$strings.export_to_csv}}</div>

		</div>

	</div>
</template>