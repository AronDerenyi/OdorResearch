<template>
	<div class="menu" v-on="$listeners">
		<slot/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	@Component
	export default class Menu extends Vue {
		@Prop(String) readonly icon: string;
		@Prop(String) readonly text: string;
	}
</script>

<style scoped>
	.menu {
		display: flex;
		overflow-x: hidden;
		overflow-y: auto;

		flex-direction: column;
		align-items: stretch;
		justify-content: start;

		padding-top: 8px;
		padding-bottom: 8px;

		background: var(--color_surface);
		color: var(--color_on_surface);

		border-radius: 8px;
		box-shadow: 0 4px 20px var(--color_shadow);
	}

	.menu > * {
		flex-shrink: 0;

		padding: 12px 16px;

		font-size: 16px;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: currentColor;
		fill: currentColor;
	}
</style>