<template>
	<div class="card home_card" v-on="$listeners">
		<p class="home_card_title">{{title}}</p>
		<ImgSvg
				class="home_card_icon"
				:src="icon"/>
		<ExtendedFloatingActionButton
				class="flat home_card_select"
				:text="select"
				@click="$emit('select')"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";
	import ExtendedFloatingActionButton from "src/view/components/ExtendedFloatingActionButton.vue";
	import ImgSvg from "src/view/components/ImgSvg.vue";
	@Component({
		components: {ImgSvg, ExtendedFloatingActionButton}
	})
	export default class TestCard extends Vue {

		@Prop(String) private title: string;
		@Prop(String) private icon: string;
		@Prop(String) private select: string;
	};
</script>

<style scoped>
	.home_card {
		display: flex;

		flex-direction: column;
		padding: var(--home_card_padding);
	}

	.home_card > *:not(:first-child) {
		margin-top: var(--home_card_spacing);
	}

	.home_card_title {
		flex-shrink: 0;
		flex-grow: 1;

		font-size: var(--home_card_title_size);
		text-align: center;
	}

	.home_card_icon {
		height: var(--home_card_icon_size);

		opacity: 0.8;
	}

	.home_card_select {
		flex-shrink: 0;
	}
</style>