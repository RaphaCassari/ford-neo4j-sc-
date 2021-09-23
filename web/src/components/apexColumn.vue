<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  name: "ApexColumnChartsBasic",
  data() {
    return {
      series: [
        {
          name: "Funcionarios",
          data: [44, 55, 57],
        },
        {
          name: "Candidato",
          data: [50, 30, 40],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["Tecnologia", "Marketing", "RH"],
        },
        yaxis: {
          title: {
            text: "Score",
          },
        },
        fill: {
          opacity: 1,
        },
      },
    };
  },
};
</script>
