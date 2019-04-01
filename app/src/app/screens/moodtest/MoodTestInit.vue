<script lang="ts">
	import {Vue, Component} from "vue-property-decorator";

	@Component
	export default class MoodTestInit extends Vue {

		userId: string = "";
		groupId: string = "";

		age: number = 0;
		gender: string = "";

		residency: string = "";
		education: string = "";

		submit() {
			this.$emit('start-test', this.userId, this.groupId, this.age, this.gender, this.residency, this.education);
		}
	}
</script>

<template>
	<div class="container" style="
		padding: var(--test_padding);
		background: var(--color_background);
		align-items: center;
		justify-content: center;">

		<div style="
			display: flex;
			flex-direction: row;">

			<input type="text" v-model="userId" placeholder="User ID">

			<input type="text" v-model="groupId" placeholder="Group ID" style="
				margin-left: var(--test_spacing);">

		</div>

		<div style="
			margin-top: var(--test_spacing);
			display: flex;
			flex-direction: row;">

			<input type="number" v-model="age" placeholder="Age">

			<input type="text" v-model="gender" placeholder="Gender" style="
				margin-left: var(--test_spacing);">

		</div>

		<input type="text" v-model="residency" placeholder="Residency" style="
			margin-top: var(--test_spacing);">

		<input type="text" v-model="education" placeholder="Education" style="
			margin-top: var(--test_spacing);">

		<input type="submit" @click="submit" value="Start test" style="
			margin-top: var(--test_spacing);">

	</div>
</template>