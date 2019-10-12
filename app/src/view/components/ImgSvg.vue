<template>
	<div v-on="$listeners" v-html="content"></div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from "vue-property-decorator";

	@Component
	export default class ImgSvg extends Vue {

		@Prop(String) readonly src: string;

		content: string = null;

		mounted() {
			this.onSrcChanged(this.src);
		}

		@Watch("src")
		onSrcChanged(src: string) {
			const request = new XMLHttpRequest();
			request.onreadystatechange = () => {
				if (request.readyState === 4 && request.status === 200) {
					this.content = request.responseText;
				} else {
					this.content = null;
				}
			};

			request.open("GET", src, true);
			request.send();
		}
	}
</script>

<style scoped>
	div {
		display: inline-block;
	}

	div >>> svg {
		width: 100%;
		height: 100%;
	}
</style>