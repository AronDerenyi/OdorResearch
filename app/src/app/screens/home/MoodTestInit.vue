<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";

	import ImgSvg from "src/app/components/ImgSvg.vue";

	@Component({components: {ImgSvg}})
	export default class MoodTestInit extends Vue {

		submit() {
			this.$router.push("/test/mood");
		}
	};
</script>

<template>
	<div class="container" style="
		padding: var(--home_padding);
		background: var(--color_background);">

		<div style="
			display: flex;
			flex-direction: row;">

			<div class="textinput outlined" style="
				flex-basis: 0;
				flex-grow: 1;">

				<!--suppress HtmlFormInputWithoutLabel -->
				<input type="text" :placeholder="$strings.user_id" size="4" class="textinput_input"/>

			</div>

			<div class="textinput outlined" style="
				margin-left: var(--home_spacing);
				flex-basis: 0;
				flex-grow: 1;">

				<!--suppress HtmlFormInputWithoutLabel -->
				<input type="text" :placeholder="$strings.group_id" size="4" class="textinput_input"/>

			</div>

		</div>

		<div style="
			margin-top: var(--home_spacing);
			display: flex;
			flex-direction: row;">

			<div class="textinput outlined" style="
				flex-basis: 0;
				flex-grow: 1;">

				<!--suppress HtmlFormInputWithoutLabel -->
				<input type="number" :placeholder="$strings.age" size="4" class="textinput_input"/>

			</div>

			<div class="textinput outlined" style="
				margin-left: var(--home_spacing);
				flex-basis: 0;
				flex-grow: 1;">

				<!--suppress HtmlFormInputWithoutLabel -->
				<input type="text" :placeholder="$strings.gender" size="4" class="textinput_input"/>

			</div>

		</div>

		<div class="textinput outlined" style="margin-top: var(--home_spacing);;">

			<!--suppress HtmlFormInputWithoutLabel -->
			<input type="text" :placeholder="$strings.residency" size="4" class="textinput_input"/>

		</div>

		<div class="textinput outlined" style="margin-top: var(--home_spacing);">

			<!--suppress HtmlFormInputWithoutLabel -->
			<input type="text" :placeholder="$strings.education" size="4" class="textinput_input"/>

		</div>

		<div style="visibility: hidden; flex-grow: 1;"></div>

		<button @click="submit" class="button flat selectable" style="
			margin-top: var(--home_spacing);
			align-self: center;">

			<div class="button_text">{{$strings.start_test}}</div>

		</button>

	</div>
</template>