<template>
    <div>
        <!-- begin breadcrumb -->
        <!-- <ol class="breadcrumb float-xl-right">
            <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
            <li class="breadcrumb-item"><a href="javascript:;">Dashboard</a></li>
        </ol> -->
        <!-- end breadcrumb -->
        <!-- begin page-header -->
        <h1 class="page-header">
            PT Kalbe Morinaga Indonesia ||
            <small>Digital Quality Management System</small>
        </h1>
        <!-- end page-header -->
        <!-- begin row -->
        <div class="row">
            <!-- begin col-8 -->
            <div class="col-xl-6">
                <div class="widget-chart with-sidebar">
                    <div id="chart" class="widget-chart-content bg-white">
                        <apexchart type="line" height="350" width="500" :options="chartDosingKadarAir"
                            :series="seriesDosingKadarAir">
                        </apexchart>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="widget-chart with-sidebar">
                    <div id="chart" class="widget-chart-content bg-white">
                        <apexchart type="line" height="350" width="500" :options="chartWaktuKadarAir"
                            :series="seriesWaktuKadarAir">
                        </apexchart>
                    </div>
                </div>
            </div>
            <!-- end col-8 -->
        </div>
        <div class="row">
            <!-- begin col-8 -->
            <div class="col-xl-6">
                <div class="widget-chart with-sidebar">
                    <div id="chart" class="widget-chart-content bg-white">
                        <apexchart type="bar" height="350" width="500" :options="chartWeight" :series="seriesWeight">
                        </apexchart>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="widget-chart with-sidebar">
                    <div id="chart" class="widget-chart-content bg-white">
                        <apexchart type="bar" height="350" width="500" :options="chartWeightLessAlufo" :series="seriesWeightLessAlufo">
                        </apexchart>
                    </div>
                </div>
            </div>
            <!-- end col-8 -->
        </div>
        <!-- end row -->
        <!-- begin row -->
        <div class="row">
            <!-- begin col-8 -->
            <div class="col-xl-6">
                <div class="widget-chart with-sidebar">
                    <div id="chart" class="widget-chart-content bg-white">
                        <apexchart type="bar" height="350" width="500" :options="chartWeightFoldingBox" :series="seriesWeightFoldingBox">
                        </apexchart>
                    </div>
                </div>
            </div>

            <div class="col-xl-6">
                <div class="widget-chart with-sidebar">
                    <div id="chart" class="widget-chart-content bg-white">
                        <apexchart type="line" height="350" width="500" :options="chartFluxing" :series="seriesFluxing">
                        </apexchart>
                    </div>
                </div>
            </div>
            <!-- end col-8 -->
        </div>
        <!-- end row -->
        <!-- begin row -->
        <div class="row">
            <!-- begin col-8 -->
            <div class="col-xl-6">
                <div class="widget-chart with-sidebar">
                    <div id="chart" class="widget-chart-content bg-white">
                        <apexchart type="bar" height="350" width="500" :options="chartFlusingBar" :series="seriesFlusingBar">
                        </apexchart>
                    </div>
                </div>
            </div>

            
            <!-- end col-8 -->
        </div>
        
        <!-- end row -->
    </div>
</template>

<script>
    export default {
        name: "dashboard-graph",
        data() {
            return {
                chartDosingKadarAir: {
                    chart: {
                        type: "area",
                        height: 350,
                        zoom: {
                            enabled: true,
                            type: "x",
                            zoomedArea: {
                                fill: {
                                    color: "#90CAF9",
                                    opacity: 0.4,
                                },
                                stroke: {
                                    color: "#0D47A1",
                                    opacity: 0.4,
                                    width: 1,
                                },
                            },
                        },

                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "straight",
                    },
                    title: {
                        text: "Grafik Dosing Kadar Air VS TOC",
                        align: "left",
                        style: {
                            fontSize: '12px',
                        },
                    },

                    xaxis: {
                        type: "int",
                        title: {
                            text: "dosing"
                        },
                    },
                    yaxis: [{
                        opposite: true,
                        title: {
                            text: "Kadar Air"
                        },
                        min: 2.00,
                        max: 3.40
                    },{
                        seriesName: 'TOC',
                        opposite: true,
                        title: {
                            text: "TOC"
                        },
                        min: 92.00,
                        max: 97.50
                    }],
                    legend: {
                        show: true,
                        horizontalAlign: "left",
                    },
                },
                seriesDosingKadarAir: [{
                    name: "Kadar Air",
                    type: 'line',
                    data: [2.77, 2.91, 2.94, 2.77, 2.90, 3.03, 2.93, 2.89, 2.88, 2.84],
                },{
                    name: "TOC",
                    type: 'line',
                    data: [95.6, 95.6, 95.6, 94.6, 94.7, 95.1, 94.4, 95.3, 96.3, 95.1],
                }],
                chartWaktuKadarAir: {
                    chart: {
                        type: "area",
                        height: 350,
                        zoom: {
                            enabled: true,
                            type: "x",
                            zoomedArea: {
                                fill: {
                                    color: "#90CAF9",
                                    opacity: 0.4,
                                },
                                stroke: {
                                    color: "#0D47A1",
                                    opacity: 0.4,
                                    width: 1,
                                },
                            },
                        },

                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "straight",
                    },
                    title: {
                        text: "Grafik Waktu Kadar Air VS TOC",
                        align: "left",
                        style: {
                            fontSize: '14px',
                        },
                    },
                    xaxis: {
                        type: "string",
                        title: {
                            text: "waktu"
                        },
                    },
                    yaxis: [{
                        opposite: true,
                        title: {
                            text: "Kadar Air"
                        },
                        min: 2.00,
                        max: 3.40
                    },{
                        seriesName: 'TOC',
                        opposite: true,
                        title: {
                            text: "TOC"
                        },
                        min: 92.00,
                        max: 97.50
                    }],
                    legend: {
                        show: true,
                        horizontalAlign: "left",
                    },
                },
                seriesWaktuKadarAir: [{
                    name: "Kadar Air",
                    data: [{
                            x: "17:30",
                            y: 2.77
                        },
                        {
                            x: "18:00",
                            y: 2.91
                        },
                        {
                            x: "18:30",
                            y: 2.94
                        },
                        {
                            x: "19:00",
                            y: 2.77
                        },
                        {
                            x: "19:30",
                            y: 2.90
                        },
                        {
                            x: "20:00",
                            y: 3.03
                        },
                        {
                            x: "20:30",
                            y: 2.93
                        },
                        {
                            x: "21:00",
                            y: 2.89
                        },
                        {
                            x: "21:30",
                            y: 2.88
                        },
                    ],
                },{
                    name: "TOC",
                    data: [{
                            x: "17:30",
                            y: 95.6
                        },
                        {
                            x: "18:00",
                            y: 95.6
                        },
                        {
                            x: "18:30",
                            y: 95.6
                        },
                        {
                            x: "19:00",
                            y: 94.6
                        },
                        {
                            x: "19:30",
                            y: 94.7
                        },
                        {
                            x: "20:00",
                            y: 95.1
                        },
                        {
                            x: "20:30",
                            y: 94.4
                        },
                        {
                            x: "21:00",
                            y: 95.3
                        },
                        {
                            x: "21:30",
                            y: 96.6
                        },
                    ],
                }],
                chartWeight: {
                    chart: {
                        height: 350,
                        zoom: {
                            enabled: true,
                            type: "x",
                            zoomedArea: {
                                fill: {
                                    color: "#90CAF9",
                                    opacity: 0.4,
                                },
                                stroke: {
                                    color: "#0D47A1",
                                    opacity: 0.4,
                                    width: 1,
                                },
                            },
                        },

                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "straight",
                    },
                    title: {
                        text: "Monitoring Under Weight Line A Maret ",
                        align: "left",
                        style: {
                            fontSize: '14px',
                        },
                    },
                    xaxis: {
                        type: "int",
                        categories: ['Less Alufo', 'Less Folding Box'],
                    },
                    yaxis: {
                        opposite: true,
                        title: {
                            text: "Jumlah"
                        },
                        tickAmount: 8,
                        min : 0,
                        max : 160
                    },
                    legend: {
                        show: true,
                        horizontalAlign: "left",
                    },
                },
                seriesWeight: [{
                        name: "Des`17",
                        data: [2, 8],
                    },
                    {
                        name: "YTD 2018",
                        data: [32, 60],
                    },
                    {
                        name: "YTD 2019",
                        data: [74, 59],
                    },
                    {
                        name: "YTD 2020",
                        data: [146, 158],
                    },
                    {
                        name: "Jan 2021",
                        data: [0,21],
                    },
                    {
                        name: "Feb 2021",
                        data: [7, 13],
                    },
                    {
                        name: "Weak 1",
                        data: [0, 1],
                    }
                ],
                chartWeightLessAlufo: {
                    chart: {
                        height: 350,
                        zoom: {
                            enabled: true,
                            type: "x",
                            zoomedArea: {
                                fill: {
                                    color: "#90CAF9",
                                    opacity: 0.4,
                                },
                                stroke: {
                                    color: "#0D47A1",
                                    opacity: 0.4,
                                    width: 1,
                                },
                            },
                        },

                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "straight",
                    },
                    title: {
                        text: "Monitoring Under Weight Line A Maret 2021 Less Alufo",
                        align: "left",
                        style: {
                            fontSize: '14px',
                        },
                    },
                    xaxis: {
                        type: "int",
                        categories: ['200G', '300G', '2X300G','400G','2X400G','2X32G'],
                    },
                    yaxis: {
                        opposite: true,
                        title: {
                            text: "Jumlah"
                        },
                        tickAmount: 8,
                        min : 0,
                        max : 160
                    },
                    legend: {
                        show: true,
                        horizontalAlign: "left",
                    },
                },
                seriesWeightLessAlufo: [{
                        name: "Des`17",
                        data: [8, 8, 8, 8, 8, 8],
                    },
                    {
                        name: "YTD 2018",
                        data: [60, 60, 60, 60, 60, 60],
                    },
                    {
                        name: "YTD 2019",
                        data: [59, 59, 59, 59, 59, 59],
                    },
                    {
                        name: "YTD 2020",
                        data: [153, 153, 153, 153, 153, 153],
                    },
                    {
                        name: "Jan 2021",
                        data: [6,13,0,0,2,0],
                    },
                    {
                        name: "Feb 2021",
                        data: [9, 0, 0, 2, 2, 0],
                    },
                    {
                        name: "Weak 1",
                        data: [0, 0, 0, 0, 1, 0],
                    }
                ],
                chartWeightFoldingBox: {
                    chart: {
                        height: 350,
                        zoom: {
                            enabled: true,
                            type: "x",
                            zoomedArea: {
                                fill: {
                                    color: "#90CAF9",
                                    opacity: 0.4,
                                },
                                stroke: {
                                    color: "#0D47A1",
                                    opacity: 0.4,
                                    width: 1,
                                },
                            },
                        },

                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "straight",
                    },
                    title: {
                        text: "Monitoring Under Weight Line A Maret 2021 Less Folding Box",
                        align: "left",
                        style: {
                            fontSize: '14px',
                        },
                    },
                    xaxis: {
                        type: "int",
                        categories: ['200G', '300G', '2X300G','400G','2X400G','2X32G'],
                    },
                    yaxis: {
                        opposite: true,
                        title: {
                            text: "Jumlah"
                        },
                        tickAmount: 8,
                        min : 0,
                        max : 160
                    },
                    legend: {
                        show: true,
                        horizontalAlign: "left",
                    },
                },
                seriesWeightFoldingBox: [{
                        name: "Des`17",
                        data: [8, 8, 8, 8, 8, 8],
                    },
                    {
                        name: "YTD 2018",
                        data: [60, 60, 60, 60, 60, 60],
                    },
                    {
                        name: "YTD 2019",
                        data: [59, 59, 59, 59, 59, 59],
                    },
                    {
                        name: "YTD 2020",
                        data: [153, 153, 153, 153, 153, 153],
                    },
                    {
                        name: "Jan 2021",
                        data: [6,13,0,0,2,0],
                    },
                    {
                        name: "Feb 2021",
                        data: [9, 0, 0, 2, 2, 0],
                    },
                    {
                        name: "Weak 1",
                        data: [0, 0, 0, 0, 1, 0],
                    }
                ],
                chartFluxing: {
                    chart: {
                        height: 350,
                        zoom: {
                            enabled: true,
                            type: "x",
                            zoomedArea: {
                                fill: {
                                    color: "#90CAF9",
                                    opacity: 0.4,
                                },
                                stroke: {
                                    color: "#0D47A1",
                                    opacity: 0.4,
                                    width: 1,
                                },
                            },
                        },

                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "straight",
                    },
                    title: {
                        text: "Prosenase Monitoring Flusing Packing Feb'21 week 04 ",
                        align: "left",
                        style: {
                            fontSize: '14px',
                        },
                    },
                    xaxis: {
                        type: "int",
                    },
                    yaxis: {
                        opposite: true,
                        tickAmount : 5,
                        min : 80
                    },
                    legend: {
                        show: true,
                        horizontalAlign: "left",
                    },
                },
                seriesFluxing: [
                    {
                        name: "LINE A",
                        data: [100, 100, 100, 100],
                    },
                    {
                        name: "LINE C",
                        data: [100, 100, 100, 100],
                    },
                    {
                        name: "LINE B",
                        data: [100, 100, 100, 100],
                    },
                    {
                        name: "LINE D",
                        data: [100, 100, 100, 100],
                    },
                    {
                        name: "LINE E",
                        data: [94, 98, 100, 100],
                    }
                ],
                chartFlusingBar: {
                    chart: {
                        height: 350,
                        zoom: {
                            enabled: true,
                            type: "x",
                            zoomedArea: {
                                fill: {
                                    color: "#90CAF9",
                                    opacity: 0.4,
                                },
                                stroke: {
                                    color: "#0D47A1",
                                    opacity: 0.4,
                                    width: 1,
                                },
                            },
                        },

                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "straight",
                    },
                    title: {
                        text: "Presentase Monitoring Flusing Februari 2021",
                        align: "left",
                        style: {
                            fontSize: '14px',
                        },
                    },
                    xaxis: {
                        type: "int",
                        categories: ['Week 01', 'Week 02', 'Week 03','Week 04'],
                    },
                    yaxis: {
                        opposite: true,
                        title: {
                            text: "Presentase"
                        },
                        tickAmount: 10,
                        min : 91,
                        max : 100
                    },
                    legend: {
                        show: true,
                        horizontalAlign: "left",
                    },
                },
                seriesFlusingBar: [
                    {
                        name: "LINE A",
                        data: ["100%", "100%", "100%", "100%"],
                    },
                     {
                        name: "LINE B",
                        data: ["100%", "100%", "100%", "100%"],
                    },
                     {
                        name: "LINE D",
                        data: ["100%", "100%", "100%", "100%"],
                    },
                     {
                        name: "LINE E",
                        data: ["94%", "98%", "100%", "100%"],
                    }
                ],
                chartOptions: {
                    chart: {
                        type: "area",
                        height: 350,
                        zoom: {
                            enabled: true,
                            type: "x",
                            zoomedArea: {
                                fill: {
                                    color: "#90CAF9",
                                    opacity: 0.4,
                                },
                                stroke: {
                                    color: "#0D47A1",
                                    opacity: 0.4,
                                    width: 1,
                                },
                            },
                        },

                    },
                    dataLabels: {
                        enabled: false,
                    },
                    stroke: {
                        curve: "straight",
                    },
                    title: {
                        text: "Grafik Dosing Kadar Air ",
                        align: "left",
                        style: {
                            fontSize: '14px',
                        },
                    },
                    subtitle: {
                        text: "fluid 100/mg movement",
                        align: "left",
                    },

                    xaxis: {
                        type: "int",
                        title: {
                            text: "dosing"
                        },
                        min: 0,
                        max: 10
                    },
                    yaxis: {
                        opposite: true,
                        title: {
                            text: "TOC (C)"
                        }
                    },
                    legend: {
                        show: true,
                        horizontalAlign: "left",
                    },
                },
                series: [{
                        name: "Kadar Air",
                        data: [3.0, 2.0, 1.0, 5.0, 2.30, 4.2, 3.4, 6.1, 6.6, 8.1],
                    },
                    {
                        name: "TOC",
                        data: [3.5, 2.0, 1.30, 5.10, 3.20, 2.4, 3.4, 6.1, 1.6, 4.3],
                    }
                ],
                cpID: "",
                data: [],
            };
        },
        created: function () {
            this.cpID = 1
        },
        methods: {
            getData() {
                const url = "/setting/parameter/" + this.cpID + "/control-point";
                this.$axios
                    .get(url)
                    .then((response) => {
                        this.data = response.data.data.data;
                        console.log(this.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            },
        },
        mounted() {
            this.getData();
        },
    };
</script>