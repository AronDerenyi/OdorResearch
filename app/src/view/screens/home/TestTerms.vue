<template>
	<div class="test_terms" v-on="$listeners">
		<p class="test_terms_title">{{title}}</p>
		<p class="test_terms_content" v-html="content"></p>
		<ExtendedFloatingActionButton class="flat" :text="accept" @click="$emit('accept')"/>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop} from "vue-property-decorator";
	import FloatingActionButton from "src/view/components/FloatingActionButton.vue";
	import ExtendedFloatingActionButton from "src/view/components/ExtendedFloatingActionButton.vue";

	@Component({components: {FloatingActionButton, ExtendedFloatingActionButton}})
	export default class TestTerms extends Vue {

		@Prop(String) private title: string;
		@Prop(String) private content: string;
		@Prop(String) private accept: string;
	};
</script>

<style scoped>
	.test_terms {
		display: flex;

		flex-direction: column;
		align-items: center;
		padding: var(--home_terms_padding);
	}

	.test_terms > *:not(:first-child) {
		margin-top: var(--home_terms_spacing);
	}

	.test_terms_title {
		max-width: var(--home_terms_max_width);
		flex-shrink: 0;

		text-align: center;
		font-size: var(--home_terms_title_size);
	}

	.test_terms_content {
		max-width: var(--home_terms_max_width);
		flex-shrink: 0;

		text-align: justify;
		font-size: var(--home_terms_text_size);
	}
</style>