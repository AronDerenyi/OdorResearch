export class QuestionsData {

	gender: QuestionsData.Gender;
	birthYear: number;
	birthMonth: QuestionsData.Month;
	residence: QuestionsData.Residence;

	bookshelves: number;
	foreignLanguages: number;
	education: QuestionsData.Education;
	educationMother: QuestionsData.Education;
	educationFather: QuestionsData.Education;

	hoursSlept: number;
	consumedCoffee: boolean;
	consumedCigarette: boolean;
	smoking: number;



	ecoFamily: number;
	ecoSelf: number;

	allergyPollen: boolean;
	allergyFur: boolean;
	allergyDust: boolean;
	allergyDrug: boolean;
	allergyFood: boolean;
	allergyOther: boolean;
	maturedAge: number;
	menstruating: boolean;
	contraceptive: boolean;

	mood: number;
	stressGeneral: number;
	stressToday: number;



	hypnosis: number;
	meditation: number;
	mindfulness: number;

	inLove: number;
	smellRefinement: number;
	smellSensitivity: number;

	useDeodorant: boolean;
	usePerfume: boolean;
	useOils: boolean;
}

export module QuestionsData {

	export enum Gender {
		Male = "male",
		Female = "female",
		Other = "other"
	}

	export enum Month {
		Jan = "jan",
		Feb = "feb",
		Mar = "mar",
		Apr = "apr",
		May = "may",
		Jun = "jun",
		Jul = "jul",
		Aug = "aug",
		Sep = "sep",
		Oct = "oct",
		Nov = "nov",
		Dec = "dec"
	}

	export enum Residence {
		Capital = "capital",
		CountySeat = "county_seat",
		Town = "town",
		Village = "village"
	}

	export enum Education {
		PrimarySchool = "primary_school",
		HighSchool = "high_school",
		Polytechnic = "polytechnic",
		College = "college",
		Bachelor = "bachelor",
		Master = "master",
		Doctoral = "doctoral"
	}
}