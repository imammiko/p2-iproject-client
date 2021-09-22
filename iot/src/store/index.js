import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

let baseUrl = "http://localhost:3000";
const instance = axios.create({
	baseURL: `${baseUrl}`,
});

export default new Vuex.Store({
	state: {
		dataSensorTemperature: [],
		dataSensorHumidity: [],
		dataLamp: {},
		dataRealTime: {},
		statusLampu: "on",
	},
	mutations: {
		SET_DATA_SENSOR_TEMPERATURE(state, payload) {
			state.dataSensorTemperature = payload;
		},
		SET_DATA_SENSOR_HUMIDITY(state, payload) {
			state.dataSensorHumidity = payload;
		},
		SET_DATA_LAMP(state, payload) {
			state.dataLamp = payload;
		},
		SET_REAL_TIME_DATA(state, payload) {
			state.dataRealTime = payload;
		},
	},
	actions: {
		async fetchDataLamp(context) {
			instance
				.get("/controlLampu")
				.then((data) => {
					console.log(data.data, "<<<<<data fetch data lamp");
					context.commit("SET_DATA_LAMP", data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async sentDataLamp(context, payload) {
			let dataKirim = {
				lamp: +payload,
			};
			instance
				.post("/controlLampu", dataKirim)
				.then((data) => {
					console.log(data.data, "<<<data dikrim dengan sempurna");
					context.commit("SET_DATA_LAMP", data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async fetchDataRealTime(context) {
			instance
				.get("/lastDataSensor")
				.then((data) => {
					context.commit("SET_REAL_TIME_DATA", data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async fetchDataSensorTemperature(context, payload) {
			payload = payload.toLowerCase();
			instance
				.get(`/dataSensorTemperature?rangeData=${payload}`)
				.then((data) => {
					data = data.data;
					function compare(a, b) {
						// Use toUpperCase() to ignore character casing
						const hourA = a[payload];
						const hourB = b[payload];

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
						let dataSplit = el[payload].split("");
						let indexT = dataSplit.findIndex((el) => el == "T");
						dataSplit.splice(indexT, 1, " ");
						let indexDot = dataSplit.findIndex((el) => el == ".");
						dataSplit.splice(indexDot);
						let dataJoin = dataSplit.join("");
						el[payload] = dataJoin;
						return el;
					});
					console.log(data, "<<<<", payload);
					context.commit("SET_DATA_SENSOR_TEMPERATURE", data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
		async fetchDataSensorHumidity(context, payload) {
			payload = payload.toLowerCase();
			instance
				.get(`/dataSensorHumidity?rangeData=${payload}`)
				.then((data) => {
					data = data.data;
					function compare(a, b) {
						// Use toUpperCase() to ignore character casing
						const hourA = a[payload];
						const hourB = b[payload];

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
						let dataSplit = el[payload].split("");
						let indexT = dataSplit.findIndex((el) => el == "T");
						dataSplit.splice(indexT, 1, " ");
						let indexDot = dataSplit.findIndex((el) => el == ".");
						dataSplit.splice(indexDot);
						let dataJoin = dataSplit.join("");
						el[payload] = dataJoin;
						return el;
					});
					console.log(data, "<<<<", payload);
					context.commit("SET_DATA_SENSOR_HUMIDITY", data);
				})
				.catch((err) => {
					console.log(err);
				});
		},
	},

	modules: {},
});
