<template>
  <b-row class="principal">
    <b-col class="pb-3">
      <b-card class="shadow" v-dark-mode>
        <label for="">SGF - taxa de crescimento</label>
        <apexchart
          class="apex-style"
          type="line"
          :options="salesBar.chartOptions"
          :series="salesBar.series"
          v-dark-mode
        ></apexchart>
      </b-card>
    </b-col>
    <b-col>
      <b-card class="shadow" v-dark-mode>
        <label for="">SGF - taxa de usuários</label>
        <apexchart
          class="apex-style"
          type="donut"
          :options="Donut.chartOptions"
          :series="Donut.series"
          v-dark-mode
        ></apexchart>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
export default {
  data: function () {
    return {
      salesBar: {
        chartOptions: {
          chart: {
            id: "vuechart-example",
          },
          xaxis: {
            categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2021],
          },
        },
        series: [
          {
            name: "taxa de crescimento",
            data: [30, 40, 35, 50, 49, 60, 70, 91],
          },
        ],
      },
      Donut: {
        series: [10, 25, 20, 10],
        chartOptions: {
          chart: {
            type: "donut",
          },
          labels: ["usuário", "vendedor", "suporte", "admin"],
        },
      },
    };
  },
};
</script>
<style scoped>
.shadow.theme--dark {
  background-color: #313336;
}
.apex-style {
  width: 500px;
}
@media screen and (max-width: 800px) {
  .principal{
    width: 100%;
  }
  .apex-style{
    width: 300px;
  }
}
</style>