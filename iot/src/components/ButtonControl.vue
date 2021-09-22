<template>
	<div class="d-flex flex-column justify-content-center">
		<img
			style="margin-top: 20px; margin-bottom: 20px"
			v-bind:src="
				statusLampu == 1
					? 'https://ik.imagekit.io/fquftlqurx6/lampOn_onpdKIMsq.png?updatedAt=1632292006177'
					: 'https://ik.imagekit.io/fquftlqurx6/lampOff_BQQ7DaOgSHW.png?updatedAt=1632292005603'
			"
			alt="lamp"
			width="100"
		/>
		<button
			style="width: 200px; margin-bottom: 20px"
			type="button"
			class="btn btn-primary btn-lg"
			v-on:click="statusLampu == 1 ? sentStatusLamp(0) : sentStatusLamp(1)"
		>
			{{ statusLampu == 1 ? "OFF" : "ON" }}
		</button>
	</div>
</template>

<script>
import io from "socket.io-client";
var socket = io.connect("http://localhost:3000", {
	transports: ["websocket", "polling", "flashsocket"],
});
export default {
	name: "controlLamp",
	created: function () {
		this.$store.dispatch("fetchDataLamp");
		this.getRealtimeData();
	},
	methods: {
		getRealtimeData() {
			socket.on("newdataLamp", (fetchedData) => {
				console.log(fetchedData);
				this.$store.commit("SET_DATA_LAMP", fetchedData);
			});
		},
		sentStatusLamp(payload) {
			this.$store.dispatch("sentDataLamp", payload);
		},
	},
	data() {
		return {};
	},

	computed: {
		statusLampu() {
			return +this.$store.state.dataLamp.lamp;
		},
	},
};

// 			"
// https://ik.imagekit.io/fquftlqurx6/lampOn_onpdKIMsq.png?updatedAt=1632292006177

// https://ik.imagekit.io/fquftlqurx6/lampOff_BQQ7DaOgSHW.png?updatedAt=1632292005603
</script>

<style></style>
