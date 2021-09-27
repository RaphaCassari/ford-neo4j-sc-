<template>
  <div id="chart" style="text-align: center">
    <apexchart
      type="pie"
      width="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "ApexSimplePie",
  props: {
    series: Array,
  },
  data() {
    return {
      /*  series: [7, 5, 2], */
      chartOptions: {
        chart: {
          width: 350,
          type: "pie",
        },
        labels: ["Funcionarios", "Candidatos", "Gestores"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 250,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
#chart {
  width: 250px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
</style>
