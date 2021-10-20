<template>
	<div class="d-flex flex-column justify-content-center align-content-center">
		<img
			v-bind:src="
				`https://openweathermap.org/img/wn/` + weatherData[0].icon + `@2x.png`
			"
			alt=""
			srcset=""
			style="width: 300px"
		/>
		<h1 class="justify-content-center" style="margin: auto">
			{{ weatherData[0].main }}
		</h1>
	</div>
</template>

<script>
export default {
	name: "weather",
	created: function () {
		this.$store.dispatch("fetchWeather");
	},
	data() {
		return {};
	},
	computed: {
		// a computed getter
		weatherData: function () {
			return this.$store.state.weather;
		},
	},
};
</script>

<style></style>
