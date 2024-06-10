import { isNonNullable } from "@acdh-oeaw/lib";

export function getFullName(value: { firstName?: string; lastName: string }): string {
	return [value.firstName, value.lastName].filter(isNonNullable).join(" ");
}
