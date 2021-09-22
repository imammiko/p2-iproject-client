<template>
	<div
		class="gauge"
		v-bind:style="{
			width: 200 + 'px',
			'--rotation': sensorRealTime.humidity * (180 / 100) + 'deg',
			'--color': '#5cb85c',
			'--background': '#e9ecef',
		}"
	>
		<div class="percentage"></div>
		<div class="mask"></div>
		<span class="value">{{ sensorRealTime.humidity }}%</span>
	</div>
</template>

<script>
import io from "socket.io-client";
var socket = io.connect("http://localhost:3000", {
	transports: ["websocket", "polling", "flashsocket"],
});
export default {
	name: "gauge humidty",
	created: function () {
		this.$store.dispatch("fetchDataRealTime");
		this.getRealtimeData();
	},
	methods: {
		getRealtimeData() {
			socket.on("newdata", (fetchedData) => {
				console.log(fetchedData);
				this.$store.commit("SET_REAL_TIME_DATA", fetchedData);
			});
		},
	},
	computed: {
		// a computed getter
		sensorRealTime: function () {
			return this.$store.state.dataRealTime;
		},
		LoadingPage() {
			if (this.$store.state.dataRealTime) {
				return true;
			}

			return false;
		},
	},
};
</script>

<style>
.gauge {
	position: relative;
	border-radius: 50%/100% 100% 0 0;
	background-color: var(--color, #a22);
	overflow: hidden;
}
.gauge:before {
	content: "";
	display: block;
	padding-top: 50%; /* ratio of 2:1*/
}
.gauge .chart {
	overflow: hidden;
}
.gauge .mask {
	position: absolute;
	left: 20%;
	right: 20%;
	bottom: 0;
	top: 40%;
	background-color: #fff;
	border-radius: 50%/100% 100% 0 0;
}

.gauge .percentage {
	position: absolute;
	top: -1px;
	left: -1px;
	bottom: 0;
	right: -1px;
	background-color: var(--background, #aaa);
	transform: rotate(var(--rotation));
	transform-origin: bottom center;
	transition-duration: 600;
}
.gauge:hover {
	--rotation: 100deg;
}
.gauge .value {
	position: absolute;
	bottom: 0%;
	left: 0;
	width: 100%;
	text-align: center;
}

.gauge .min {
	position: absolute;
	bottom: 0;
	left: 5%;
}
.gauge .max {
	position: absolute;
	bottom: 0;
	right: 5%;
}
</style>
