<template>
	<div class="container">
		<div class="row justify-content-md-center">
			<div class="card col-9" style="margin-top: 25px">
				<div class="card-body shadow-lg d-flex flex-row justify-content-evenly">
					<weather class=""></weather>
					<chart-temperatur class=""></chart-temperatur>
					<gauge-humidity class=""></gauge-humidity>
				</div>
			</div>
			<div
				class="card col-4 d-flex shadow-lg flex-row justify-content-md-center"
				style="margin-top: 25px"
			>
				<button-control></button-control>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

import ChartTemperatur from "../components/ChartTemperatur.vue";
import GaugeHumidity from "../components/GaugeHumidity.vue";
import ButtonControl from "../components/ButtonControl.vue";
import Weather from "../components/Weather.vue";

export default {
	name: "Home",
	components: {
		ChartTemperatur,
		GaugeHumidity,
		ButtonControl,
		Weather,
	},
};
</script>
