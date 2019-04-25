<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";

	@Component
	export default class CreativityTestInit extends Vue {

		submit() {
			this.$router.push("/test/creativity");
		}
	};
</script>

<template>
	<div class="container" style="
		padding: var(--home_padding);
		background: var(--color_background);">

		<h3>This test is currently unavailable</h3>

	</div>
</template>