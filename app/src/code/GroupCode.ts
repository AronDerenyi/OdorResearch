export class GroupCode {

	private static readonly CHARACTERS = [
		'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	];

	private static readonly VALID = /^(creat|mem(R)?|mood)(A|B|C|D)[0-9]{6}[a-z]$/;
	private static readonly VALID_DIVISIBILITY = 26;

	private static readonly CREATIVITY = /^creat(A|B|C|D)[0-9]{6}[a-z]$/;
	private static readonly MEMORY = /^mem(R)?(A|B|C|D)[0-9]{6}[a-z]$/;
	private static readonly MOOD = /^mood(A|B|C|D)[0-9]{6}[a-z]$/;

	private static readonly CONTROL = /^(creat|mem(R)?|mood)A[0-9]{6}[a-z]$/;
	private static readonly RETURNING = /^memR(A|B|C|D)[0-9]{6}[a-z]$/;

	private static readonly DEBUG = /^test(R)?(C)?$/;
	private static readonly DEBUG_CONTROL = /^test(R)?C$/;
	private static readonly DEBUG_RETURNING = /^testR(C)?$/;

	static verify(code: string): boolean {
		if (GroupCode.isDebug(code)) return true;
		if (!GroupCode.VALID.test(code)) return false;

		let sum = 0;

		for (let i = 0; i < code.length; i++) {
			const value = GroupCode.CHARACTERS.indexOf(code.charAt(i));
			if (value < 0) return false;
			sum += value;
		}

		return sum % GroupCode.VALID_DIVISIBILITY == 0;
	}

	static getTest(code: string): ("creativity" | "memory" | "mood") {
		if (GroupCode.CREATIVITY.test(code)) {
			return "creativity";
		} else if (GroupCode.MEMORY.test(code)) {
			return "memory";
		} else if (GroupCode.MOOD.test(code)) {
			return "mood";
		} else {
			return null;
		}
	}

	static isControl(code: string): boolean {
		if (GroupCode.isDebug(code)) return GroupCode.DEBUG_CONTROL.test(code);
		return GroupCode.CONTROL.test(code);
	}

	static isReturning(code: string): boolean {
		if (GroupCode.isDebug(code)) return GroupCode.DEBUG_RETURNING.test(code);
		return GroupCode.RETURNING.test(code);
	}

	static isDebug(code: string) {
		return GroupCode.DEBUG.test(code);
	}
}