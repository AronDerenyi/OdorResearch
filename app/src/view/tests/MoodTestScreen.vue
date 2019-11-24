<template>
	<div class="mood_test">
		<transition name="fade" mode="out-in">
			<CodeGenerator
					class="mood_sub_test"
					v-if="codeGeneratorModel"
					:view-model="codeGeneratorModel"/>
			<Description
					class="mood_sub_test"
					v-if="descriptionModel"
					:view-model="descriptionModel"/>
			<Questions1
					class="mood_sub_test"
					v-if="questions1Model"
					:view-model="questions1Model"/>
			<Questions2
					class="mood_sub_test"
					v-if="questions2Model"
					:view-model="questions2Model"/>
			<Questions3
					class="mood_sub_test"
					v-if="questions3Model"
					:view-model="questions3Model"/>
			<FaceScale
					class="mood_sub_test"
					v-if="faceScaleModel"
					:view-model="faceScaleModel"/>
			<Panas
					class="mood_sub_test"
					v-if="panasModel"
					:view-model="panasModel"/>
			<Iaps
					class="mood_sub_test"
					v-if="iapsModel"
					:view-model="iapsModel"/>
			<Osgood
					class="mood_sub_test"
					v-if="osgoodModel"
					:view-model="osgoodModel"/>
			<Valence
					class="mood_sub_test"
					v-if="valenceModel"
					:view-model="valenceModel"/>
			<Effect
					class="mood_sub_test"
					v-if="effectModel"
					:view-model="effectModel"/>
			<Color
					class="mood_sub_test"
					v-if="colorModel"
					:view-model="colorModel"/>
			<Association
					class="mood_sub_test"
					v-if="associationModel"
					:view-model="associationModel"/>
			<Ending
					class="mood_sub_test"
					v-if="endingModel"
					:view-model="endingModel"/>
		</transition>
	</div>
</template>

<script lang="ts">
	import {Vue, Component, Prop, Watch} from "vue-property-decorator";
	import CodeGenerator from "src/view/tests/subtests/CodeGenerator.vue";
	import Description from "src/view/tests/subtests/Description.vue";
	import Questions1 from "src/view/tests/subtests/Questions1.vue";
	import Questions2 from "src/view/tests/subtests/Questions2.vue";
	import Questions3 from "src/view/tests/subtests/Questions3.vue";
	import Valence from "src/view/tests/subtests/Valence.vue";
	import Association from "src/view/tests/subtests/Association.vue";
	import Ending from "src/view/tests/subtests/Ending.vue";
	import {CodeGeneratorModel} from "src/viewmodel/tests/subtests/CodeGeneratorModel";
	import {DescriptionModel} from "src/viewmodel/tests/subtests/DescriptionModel";
	import {Questions1Model} from "src/viewmodel/tests/subtests/Questions1Model";
	import {Questions2Model} from "src/viewmodel/tests/subtests/Questions2Model";
	import {Questions3Model} from "src/viewmodel/tests/subtests/Questions3Model";
	import {ValenceModel} from "src/viewmodel/tests/subtests/ValenceModel";
	import {AssociationModel} from "src/viewmodel/tests/subtests/AssociationModel";
	import {EndingModel} from "src/viewmodel/tests/subtests/EndingModel";
	import FaceScale from "src/view/tests/subtests/FaceScale.vue";
	import {FaceScaleModel} from "src/viewmodel/tests/subtests/FaceScaleModel";
	import {MoodTestModel} from "src/viewmodel/tests/MoodTestModel";
	import Panas from "src/view/tests/subtests/Panas.vue";
	import {PanasModel} from "src/viewmodel/tests/subtests/PanasModel";
	import {OsgoodModel} from "src/viewmodel/tests/subtests/OsgoodModel";
	import Osgood from "src/view/tests/subtests/Osgood.vue";
	import Iaps from "src/view/tests/subtests/Iaps.vue";
	import {IapsModel} from "src/viewmodel/tests/subtests/IapsModel";
	import {EffectModel} from "src/viewmodel/tests/subtests/EffectModel";
	import Effect from "src/view/tests/subtests/Effect.vue";
	import {ColorModel} from "src/viewmodel/tests/subtests/ColorModel";
	import Color from "src/view/tests/subtests/Color.vue";

	@Component({
		components: {
			CodeGenerator,
			Description,
			Questions1,
			Questions2,
			Questions3,
			FaceScale,
			Panas,
			Iaps,
			Osgood,
			Valence,
			Effect,
			Color,
			Association,
			Ending
		}
	})
	export default class MoodTestScreen extends Vue {

		@Prop(String) private readonly groupCode: string;

		private viewModel = new MoodTestModel(this.groupCode);

		mounted() {
			this.viewModel.start();
		}

		destroyed() {
			this.viewModel.dispose();
			this.viewModel = null;
		}

		get codeGeneratorModel(): CodeGeneratorModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof CodeGeneratorModel ? subTest as CodeGeneratorModel : null;
		}

		get descriptionModel(): DescriptionModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof DescriptionModel ? subTest as DescriptionModel : null;
		}

		get questions1Model(): Questions1Model {
			const subTest = this.viewModel.subTest;
			return subTest instanceof Questions1Model ? subTest as Questions1Model : null;
		}

		get questions2Model(): Questions2Model {
			const subTest = this.viewModel.subTest;
			return subTest instanceof Questions2Model ? subTest as Questions2Model : null;
		}

		get questions3Model(): Questions3Model {
			const subTest = this.viewModel.subTest;
			return subTest instanceof Questions3Model ? subTest as Questions3Model : null;
		}

		get faceScaleModel(): FaceScaleModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof FaceScaleModel ? subTest as FaceScaleModel : null;
		}

		get panasModel(): PanasModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof PanasModel ? subTest as PanasModel : null;
		}

		get iapsModel(): IapsModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof IapsModel ? subTest as IapsModel : null;
		}

		get osgoodModel(): OsgoodModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof OsgoodModel ? subTest as OsgoodModel : null;
		}

		get valenceModel(): ValenceModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof ValenceModel ? subTest as ValenceModel : null;
		}

		get effectModel(): EffectModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof EffectModel ? subTest as EffectModel : null;
		}

		get colorModel(): ColorModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof ColorModel ? subTest as ColorModel : null;
		}

		get associationModel(): AssociationModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof AssociationModel ? subTest as AssociationModel : null;
		}

		get endingModel(): EndingModel {
			const subTest = this.viewModel.subTest;
			return subTest instanceof EndingModel ? subTest as EndingModel : null;
		}

		@Watch("viewModel.navigateToHome", {immediate: true})
		onNavigateToHome(event: Event) {
			if (event) this.$router.push({name: "Home"});
		}
	};
</script>


<style scoped>
	.mood_test {
		background: var(--color_surface);
	}

	.mood_sub_test {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
</style>