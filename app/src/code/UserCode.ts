export class UserCode {

	private static readonly SALT = "Odor Research Salt";

	public static generate(fullName: string, birthMonth: number, birthDay: number): string {
		if (fullName == null) fullName = "";
		if (birthMonth == null) birthMonth = -1;
		if (birthDay == null) birthDay = -1;

		fullName = fullName.toLowerCase();
		fullName = fullName.replace(/\s+/g,' ').trim();
		fullName += UserCode.SALT;

		let hash = 0;
		hash = ((hash << 5) - hash) + birthMonth;
		hash = ((hash << 5) - hash) + birthDay;

		for (let i = 0; i < fullName.length; i++) {
			let char = fullName.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash |= 0;
		}

		hash = Math.abs(hash);

		return hash.toString(36).toUpperCase().padStart(6, "0").substr(0, 6);
	}
}