<template>
	<div class="card test_card" v-on="$listeners">
		<p class="test_card_title">{{title}}</p>
		<p class="test_card_description">{{description}}</p>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";

	@Component
	export default class TestCard extends Vue {

		@Prop(String) private title: string;
		@Prop(String) private description: string;
	};
</script>

<style scoped>
	.test_card {
		display: flex;

		flex-direction: column;
		align-items: center;
		padding: var(--home_card_padding);
	}

	.test_card > *:not(:first-child) {
		margin-top: var(--home_card_spacing);
	}

	.test_card_title {
		flex-shrink: 0;

		overflow: hidden;

		font-size: var(--home_card_title_size);
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.test_card_description {
		flex-shrink: 0;

		display: -webkit-box;
		overflow: hidden;

		-webkit-box-orient: vertical;
		-webkit-line-clamp: 11;

		text-align: justify;
		font-size: var(--home_card_text_size);
	}
</style>