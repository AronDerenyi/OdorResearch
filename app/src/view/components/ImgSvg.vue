<script lang="ts">
	import {Vue, Component, Prop, Watch} from "vue-property-decorator";
	import {Dictionary} from "src/util/Collections";

	@Component
	export default class ImgSvg extends Vue {

		@Prop(String) readonly src: string;

		xmlns: string = null;
		width: number = null;
		height: number = null;
		viewBox: string = null;
		content: string = null;

		mounted() {
			this.onSrcChanged(this.src);
		}

		@Watch("src")
		onSrcChanged(src: string) {
			try {
				src = this.$resources.require(src);
			} catch (ignored) {
				// The file isn't a resource
			}

			const request = new XMLHttpRequest();
			request.onreadystatechange = () => {
				this.xmlns = null;
				this.width = null;
				this.height = null;
				this.viewBox = null;
				this.content = null;

				if (request.readyState === 4 && request.status === 200) {
					const html = request.responseText;

					const openingStart = html.indexOf("<svg");
					const openingEnd = html.indexOf(">");
					const closingStart = html.lastIndexOf("</svg>");

					let opening = html.substring(openingStart + 4, openingEnd).trim();
					const attributes: Dictionary<string> = {};
					while (opening !== "") {
						const nameEnd = opening.indexOf("=");
						const valueStart = opening.indexOf("\"", nameEnd + 1);
						const valueEnd = opening.indexOf("\"", valueStart + 1);

						const name = opening.substring(0, nameEnd).trim();
						const value = opening.substring(valueStart + 1, valueEnd).trim();
						attributes[name] = value;

						opening = opening.substring(valueEnd + 1).trim();
					}

					for (const key in attributes) {
						const value = attributes[key];
						switch (key) {
							case "xmlns":
								this.xmlns = value;
								break;
							case "width":
								this.width = +value;
								break;
							case "height":
								this.height = +value;
								break;
							case "viewBox":
								this.viewBox = value;
								break;
						}
					}

					this.content = html.substring(openingEnd + 1, closingStart).trim();
				}
			};

			request.open("GET", src, true);
			request.send();
		}
	}
</script>

<template>
	<svg :xmlns="xmlns" :width="width" :height="height" :viewBox="viewBox" v-html="content">
	</svg>
</template>