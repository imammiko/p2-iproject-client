let data = [
	{
		hour: "2021-09-21T21:00:00.000Z",
		AVG: 28.64913294797698,
	},
	{
		hour: "2021-09-21T05:00:00.000Z",
		AVG: 30.924000000000007,
	},
	{
		hour: "2021-09-21T11:00:00.000Z",
		AVG: 31.199999999999992,
	},
	{
		hour: "2021-09-21T19:00:00.000Z",
		AVG: 29.13560606060601,
	},
	{
		hour: "2021-09-21T12:00:00.000Z",
		AVG: 31.12825484764564,
	},
	{
		hour: "2021-09-21T20:00:00.000Z",
		AVG: 28.944307692307518,
	},
	{
		hour: "2021-09-21T18:00:00.000Z",
		AVG: 29.282670454545396,
	},
	{
		hour: "2021-09-21T16:00:00.000Z",
		AVG: 29.88611898016979,
	},
	{
		hour: "2021-09-21T04:00:00.000Z",
		AVG: 30.84067796610174,
	},
	{
		hour: "2021-09-21T14:00:00.000Z",
		AVG: 30.59191919191919,
	},
	{
		hour: "2021-09-21T22:00:00.000Z",
		AVG: 28.46022727272731,
	},
	{
		hour: "2021-09-21T15:00:00.000Z",
		AVG: 30.194508670520182,
	},
	{
		hour: "2021-09-21T17:00:00.000Z",
		AVG: 29.553550295857953,
	},
	{
		hour: "2021-09-21T13:00:00.000Z",
		AVG: 30.896883852690937,
	},
];

function compare(a, b) {
	// Use toUpperCase() to ignore character casing
	const hourA = a.hour;
	const hourB = b.hour;

	let comparison = 0;
	if (hourA > hourB) {
		comparison = 1;
	} else if (hourA < hourB) {
		comparison = -1;
	}
	return comparison;
}

data = data.sort(compare);

data = data.map((el) => {
	let dataSplit = el.hour.split("");
	let indexT = dataSplit.findIndex((el) => el == "T");
	dataSplit.splice(indexT, 1, " ");
	let indexDot = dataSplit.findIndex((el) => el == ".");
	dataSplit.splice(indexDot);
	let dataJoin = dataSplit.join("");
	el.hour = dataJoin;
	return el;
});
