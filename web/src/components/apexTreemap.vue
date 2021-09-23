<template>
  <div id="chart">
    <apexchart
      type="treemap"
      height="400"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "ApexTreemap",
  data() {
    return {
      series: [
        {
          data: [
            {
              x: "Html",
              y: 10,
            },
            {
              x: "Css",
              y: 7,
            },
            {
              x: "Javascript",
              y: 5,
            },
            {
              x: "Ingles",
              y: 9,
            },
            {
              x: "Java",
              y: 3,
            },
            {
              x: "Mandarim",
              y: 2,
            },
          ],
        },
      ],
      chartOptions: {
        legend: {
          show: false,
        },
        chart: {
          height: 350,
          type: "treemap",
        },

        colors: [
          "#3B93A5",
          "#F7B844",
          "#ADD8C7",
          "#EC3C65",
          "#CDD7B6",
          "#C1F666",
          "#D43F97",
          "#1E5D8C",
          "#421243",
          "#7F94B0",
          "#EF6537",
          "#C0ADDB",
        ],
        plotOptions: {
          treemap: {
            distributed: true,
            enableShades: false,
          },
        },
      },
    };
  },
};
</script>

<style scoped>
#chart {
  width: 500px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
</style>
