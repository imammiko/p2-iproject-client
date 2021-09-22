<template>
	<div>
		<p>Humidity</p>
		<p>{{ longStatusTime.toUpperCase() }}</p>
		<ve-line :data="humidityValue"></ve-line>

		<div class="btn-group" role="group" aria-label="Basic outlined example">
			<button
				type="button"
				v-on:click="tombolFetchData('hour')"
				class="btn btn-outline-primary"
			>
				Hour
			</button>
			<button
				type="button"
				v-on:click="tombolFetchData('day')"
				class="btn btn-outline-primary"
			>
				Day
			</button>
			<button
				type="button"
				v-on:click="tombolFetchData('month')"
				class="btn btn-outline-primary"
			>
				Month
			</button>
		</div>
	</div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
import io from "socket.io-client";
var socket = io.connect("http://localhost:3000", {
	transports: ["websocket", "polling", "flashsocket"],
});
export default {
	name: "ValueHumidity",
	created() {
		this.getRealtimeData();
		this.$store.dispatch("fetchDataSensorHumidity", "hour");
	},
	data() {
		return {
			longStatusTime: "hour",
		};
	},
	methods: {
		getRealtimeData() {
			socket.on("newdataLamp", (fetchedData) => {
				console.log(fetchedData);
			});
		},
		tombolFetchData(longTime) {
			console.log(longTime);
			this.$store.dispatch("fetchDataSensorHumidity", longTime);
			this.longStatusTime = longTime;
		},
	},
	computed: {
		humidityValue() {
			return {
				columns: [this.longStatusTime, "AVG"],
				rows: this.$store.state.dataSensorHumidity,
			};
		},
		LoadingPage() {
			if (
				this.$store.state.dataSensorHumidity &&
				this.$store.state.dataSensorHumidity.length > 0
			) {
				return true;
			}

			return false;
		},
	},

	components: { VeLine },
};
</script>

<style></style>
