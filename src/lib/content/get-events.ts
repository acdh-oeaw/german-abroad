import { groupBy } from "@acdh-oeaw/lib";
import { compareDesc } from "date-fns";

import { reader } from "@/lib/content/reader";

export async function getEvents() {
	const events = await reader().collections.events.all();

	const sortedEvents = events.toSorted((a, z) => {
		return compareDesc(new Date(a.entry.date), new Date(z.entry.date));
	});

	const groupedEvents = groupBy(sortedEvents, (event) => {
		return compareDesc(new Date(event.entry.date), new Date()) ? "past" : "future";
	});

	return groupedEvents;
}
