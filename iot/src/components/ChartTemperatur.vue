<template>
	<div class="temp-wrap" v-if="LoadingPage">
		<div class="thermo-temp">{{ sensorRealTime.temperature }}°</div>
		<div class="thermo">
			<div
				class="guage"
				v-bind:style="{ height: sensorRealTime.temperature * 2 + '%' }"
			></div>
		</div>
		<div class="bulb"></div>
	</div>
</template>

<script>
import io from "socket.io-client";
var socket = io.connect("http://localhost:3000", {
	transports: ["websocket", "polling", "flashsocket"],
});
export default {
	name: "chart temperature",
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
/* [class$='button'] { background: #000 }
[class^='small']  { background: #cc0000 } */

/*.thermo:Before{ background: url('http://www.clker.com/cliparts/i/j/v/v/k/Q/magnifying-glass-transparent-png-md.png')no-repeat; width 500px; height: 300px; content:""; z-index: 10; position: relative; display: block }*/
.temp-wrap {
	/* color: #d4d4d4; */
	font-size: 30px;
	width: 80px;

	position: relative;
	text-align: center;
}
.thermo {
	overflow: hidden;
	width: 40px;
	height: 300px;
	border-left: 2px solid #d4d4d4;
	border-right: 2px solid #d4d4d4;
	border-top: 2px solid #d4d4d4;
	position: relative;
	margin: 0 auto;
}

.bulb {
	width: 80px;
	height: 80px;
	border-radius: 45px;
	border: 2px solid #d4d4d4;
	background: #cc0000;
	display: block;
	position: relative;
	bottom: 8px;
	left: -2px;
	z-index: -1;
}

.guage {
	height: 10%;
	width: 100%;
	display: block;
	background: #cc0000;
	position: absolute;
	bottom: 0;
}
.guage {
	height: 20%;
}
/* .guage[data-height="20"] {
	height: 40%;
}
.guage[data-height="30"] {
	height: 60%;
}
.guage[data-height="40"] {
	height: 80%;
}
.guage[data-height="50"] {
	height: 100%;
} */
/* 
.guage[data-height="10"] {
	height: 10%;
}
.guage[data-height="20"] {
	height: 20%;
}
.guage[data-height="30"] {
	height: 30%;
}
.guage[data-height="40"] {
	height: 40%;
}
.guage[data-height="50"] {
	height: 50%;
}
.guage[data-height="60"] {
	height: 60%;
}
.guage[data-height="70"] {
	height: 70%;
}
.guage[data-height="80"] {
	height: 80%;
}
.guage[data-height="90"] {
	height: 90%;
}
.guage[data-height="100"] {
	height: 100%;
} */
</style>
