<template>
	<div class="home">
		<value-sensor></value-sensor>
		<chart-temperatur></chart-temperatur>
		<gauge-humidity></gauge-humidity>
		<button-control></button-control>
	</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ValueSensor from "../components/ValueSensor.vue";
import ChartTemperatur from "../components/ChartTemperatur.vue";
import GaugeHumidity from "../components/GaugeHumidity.vue";
import ButtonControl from "../components/ButtonControl.vue";
export default {
	name: "Home",
	components: { ValueSensor, ChartTemperatur, GaugeHumidity, ButtonControl },
};
</script>
