const secondsDivider = 60;
const minutesDivider = 60 * 60;

export function FormatTime(sourceTime) {
	let time = parseInt(sourceTime, 10);

	const seconds = time % secondsDivider;
	time -= seconds;

	const minutes = time % minutesDivider;
	time -= minutes;

	const hours = time / minutesDivider;

	const paddedTime = [hours, minutes / 60, seconds].map(
		time =>
			time.toString().length < 2 ? `0${time.toString()}` : time.toString()
	);

	return `${paddedTime[0]}:${paddedTime[1]}`;
}
