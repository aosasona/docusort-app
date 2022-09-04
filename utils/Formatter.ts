export class Trim {
  static single(value: string): string {
	return String(value)?.trim()
  }

  static all(data: any): any {
	for (const [key, value] of Object.entries(data)) {
	  data[key] = String(value)?.trim()
	}
	return data
  }
}