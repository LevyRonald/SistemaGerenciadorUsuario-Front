<template>
  <b-card class="shadow" v-dark-mode>
    <label for="">ADMIN - taxa de crescimento</label>
    <div>
      <apexchart
        width="600"
        type="line"
        :options="chartOptions"
        :series="series"
        v-dark-mode
      ></apexchart>
    </div>
  </b-card>
</template>
<script>
export default {
  data: function () {
    return {
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
      
    };
  },
};
</script>
<style scoped>
.shadow.theme--dark{
  background-color: #313336;
}
</style>