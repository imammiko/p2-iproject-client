<template>
	<div>
		<value-sensor></value-sensor>
		<value-sensor-humidity></value-sensor-humidity>
	</div>
</template>

<script>
import ValueSensor from "../components/ValueSensor.vue";
import ValueSensorHumidity from "../components/ValueSensorHumidity.vue";
export default {
	name: "chart vue",
	components: {
		ValueSensor,
		ValueSensorHumidity,
	},
};
</script>

<style></style>
