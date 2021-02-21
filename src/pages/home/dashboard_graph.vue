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
      <div class="col-xl-12">
        <div class="widget-chart with-sidebar">
          <div class="widget-chart-content bg-white">
            <h4 class="chart-title">
              Parameter Analytics
              <small>Vitamin C ( mg/100 g solid)</small>
            </h4>
            <div class="widget-chart-full-width" style="height: 260px">
              <vn-stacked-area :model="areaChart.data" yFormat=",.0f" :xFormat="formatDate"
                :clipEdge="areaChart.clipEdge" :rightAlignYAxis="areaChart.rightAlignYAxis"
                :showControls="areaChart.showControls"></vn-stacked-area>
            </div>
          </div>
        </div>
      </div>
      <!-- end col-8 -->
    </div>
    <!-- end row -->
    <div class="row">

      <div class="col-md-3">
        <!-- begin widget-card -->
        <a href="#" class="widget-card widget-card-rounded m-b-20" data-id="widget">
          <div class="widget-card-cover"></div>
          <div class="widget-card-content">
            <h5 class="f-s-12 text-black-transparent-7" data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7" data-dark-class="f-s-12 text-white-transparent-7">
              <b>Vitamin C ( mg/100 g solid)</b>
            </h5>
            <div class="widget-img widget-img-lg rounded bg-inverse pull-left m-r-5 m-b-5"
              style="background-image: url(../assets/img/gallery/gallery-22-thumb.jpg)"></div>
            <h3 class="f-lg-12 text-black-transparent-7 pl-10" data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7" data-dark-class="f-s-12 text-white-transparent-7">
              <b>TOTAL</b>
            </h3>
            <h4 class="f-lg-11 text-black-transparent-7" data-id="widget-elm"><b>91.55</b>
            </h4>

          </div>
        </a>
      </div>

      <div class="col-md-3">
        <!-- begin widget-card -->
        <a href="#" class="widget-card widget-card-rounded m-b-20" data-id="widget">
          <div class="widget-card-cover"></div>
          <div class="widget-card-content">
            <h5 class="f-s-12 text-black-transparent-7" data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7" data-dark-class="f-s-12 text-white-transparent-7">
              <b>Calsium (mg/100g solid)</b>
            </h5>
            <div class="widget-img widget-img-lg rounded bg-inverse pull-left m-r-5 m-b-5"
              style="background-image: url(../assets/img/gallery/gallery-22-thumb.jpg)"></div>
            <h3 class="f-lg-12 text-black-transparent-7 pl-10" data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7" data-dark-class="f-s-12 text-white-transparent-7">
              <b>VALUE</b>
            </h3>
            <h4 class="f-lg-11 text-black-transparent-7" data-id="widget-elm"><b>522.73</b>
            </h4>

          </div>
        </a>
      </div>

      <div class="col-md-3">
        <!-- begin widget-card -->
        <a href="#" class="widget-card widget-card-rounded m-b-20" data-id="widget">
          <div class="widget-card-cover"></div>
          <div class="widget-card-content">
            <h5 class="f-s-12 text-black-transparent-7" data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7" data-dark-class="f-s-12 text-white-transparent-7">
              <b>Sieve test (100 gr sample )</b>
            </h5>
            <div class="widget-img widget-img-lg rounded bg-inverse pull-left m-r-5 m-b-5"
              style="background-image: url(../assets/img/gallery/gallery-22-thumb.jpg)"></div>
            <h3 class="f-lg-12 text-black-transparent-7 pl-10" data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7" data-dark-class="f-s-12 text-white-transparent-7">
              <b>VALUE</b>
            </h3>
            <h4 class="f-lg-11 text-black-transparent-7" data-id="widget-elm"><b>Negative</b>
            </h4>

          </div>
        </a>
      </div>

      <div class="col-md-3">
        <!-- begin widget-card -->
        <a href="#" class="widget-card widget-card-rounded m-b-20" data-id="widget">
          <div class="widget-card-cover"></div>
          <div class="widget-card-content">
            <h5 class="f-s-12 text-black-transparent-7" data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7" data-dark-class="f-s-12 text-white-transparent-7">
              <b>Organoleptic test *</b>
            </h5>
            <div class="widget-img widget-img-lg rounded bg-inverse pull-left m-r-5 m-b-5"
              style="background-image: url(../assets/img/gallery/gallery-22-thumb.jpg)"></div>
            <h3 class="f-lg-12 text-black-transparent-7 pl-10" data-id="widget-elm"
              data-light-class="f-s-12 text-black-transparent-7" data-dark-class="f-s-12 text-white-transparent-7">
              <b>Value</b>
            </h3>
            <h4 class="f-lg-11 text-black-transparent-7" data-id="widget-elm"><b>As Standar</b>
            </h4>

          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dashboard-graph",
    data() {
      function handleGetDate(minusDate) {
        var d = new Date();
        d = d.setDate(d.getDate() - minusDate);
        return d;
      }

      return {
        areaChart: {
          rightAlignYAxis: false,
          showControls: false,
          clipEdge: false,
          data: [{
              key: "Ewon Machine",
              color: "#5AC8FA",
              values: [{
                  x: handleGetDate(77),
                  y: 13,
                },
                {
                  x: handleGetDate(76),
                  y: 13,
                },
                {
                  x: handleGetDate(75),
                  y: 6,
                },
                {
                  x: handleGetDate(73),
                  y: 6,
                },
                {
                  x: handleGetDate(72),
                  y: 6,
                },
                {
                  x: handleGetDate(71),
                  y: 5,
                },
                {
                  x: handleGetDate(70),
                  y: 5,
                },
                {
                  x: handleGetDate(69),
                  y: 5,
                },
                {
                  x: handleGetDate(68),
                  y: 6,
                },
                {
                  x: handleGetDate(67),
                  y: 7,
                },
                {
                  x: handleGetDate(66),
                  y: 6,
                },
                {
                  x: handleGetDate(65),
                  y: 9,
                },
                {
                  x: handleGetDate(64),
                  y: 9,
                },
                {
                  x: handleGetDate(63),
                  y: 8,
                },
                {
                  x: handleGetDate(62),
                  y: 10,
                },
                {
                  x: handleGetDate(61),
                  y: 10,
                },
                {
                  x: handleGetDate(60),
                  y: 10,
                },
                {
                  x: handleGetDate(59),
                  y: 10,
                },
                {
                  x: handleGetDate(58),
                  y: 9,
                },
                {
                  x: handleGetDate(57),
                  y: 9,
                },
                {
                  x: handleGetDate(56),
                  y: 10,
                },
                {
                  x: handleGetDate(55),
                  y: 9,
                },
                {
                  x: handleGetDate(54),
                  y: 9,
                },
                {
                  x: handleGetDate(53),
                  y: 8,
                },
                {
                  x: handleGetDate(52),
                  y: 8,
                },
                {
                  x: handleGetDate(51),
                  y: 8,
                },
                {
                  x: handleGetDate(50),
                  y: 8,
                },
                {
                  x: handleGetDate(49),
                  y: 8,
                },
                {
                  x: handleGetDate(48),
                  y: 7,
                },
                {
                  x: handleGetDate(47),
                  y: 7,
                },
                {
                  x: handleGetDate(46),
                  y: 6,
                },
                {
                  x: handleGetDate(45),
                  y: 6,
                },
                {
                  x: handleGetDate(44),
                  y: 6,
                },
                {
                  x: handleGetDate(43),
                  y: 6,
                },
                {
                  x: handleGetDate(42),
                  y: 5,
                },
                {
                  x: handleGetDate(41),
                  y: 5,
                },
                {
                  x: handleGetDate(40),
                  y: 4,
                },
                {
                  x: handleGetDate(39),
                  y: 4,
                },
                {
                  x: handleGetDate(38),
                  y: 5,
                },
                {
                  x: handleGetDate(37),
                  y: 5,
                },
                {
                  x: handleGetDate(36),
                  y: 5,
                },
                {
                  x: handleGetDate(35),
                  y: 7,
                },
                {
                  x: handleGetDate(34),
                  y: 7,
                },
                {
                  x: handleGetDate(33),
                  y: 7,
                },
                {
                  x: handleGetDate(32),
                  y: 10,
                },
                {
                  x: handleGetDate(31),
                  y: 9,
                },
                {
                  x: handleGetDate(30),
                  y: 9,
                },
                {
                  x: handleGetDate(29),
                  y: 10,
                },
                {
                  x: handleGetDate(28),
                  y: 11,
                },
                {
                  x: handleGetDate(27),
                  y: 11,
                },
                {
                  x: handleGetDate(26),
                  y: 8,
                },
                {
                  x: handleGetDate(25),
                  y: 8,
                },
                {
                  x: handleGetDate(24),
                  y: 7,
                },
                {
                  x: handleGetDate(23),
                  y: 8,
                },
                {
                  x: handleGetDate(22),
                  y: 9,
                },
                {
                  x: handleGetDate(21),
                  y: 8,
                },
                {
                  x: handleGetDate(20),
                  y: 9,
                },
                {
                  x: handleGetDate(19),
                  y: 10,
                },
                {
                  x: handleGetDate(18),
                  y: 9,
                },
                {
                  x: handleGetDate(17),
                  y: 10,
                },
                {
                  x: handleGetDate(16),
                  y: 16,
                },
                {
                  x: handleGetDate(15),
                  y: 17,
                },
                {
                  x: handleGetDate(14),
                  y: 16,
                },
                {
                  x: handleGetDate(13),
                  y: 17,
                },
                {
                  x: handleGetDate(12),
                  y: 16,
                },
                {
                  x: handleGetDate(11),
                  y: 15,
                },
                {
                  x: handleGetDate(10),
                  y: 14,
                },
                {
                  x: handleGetDate(9),
                  y: 24,
                },
                {
                  x: handleGetDate(8),
                  y: 18,
                },
                {
                  x: handleGetDate(7),
                  y: 15,
                },
                {
                  x: handleGetDate(6),
                  y: 14,
                },
                {
                  x: handleGetDate(5),
                  y: 16,
                },
                {
                  x: handleGetDate(4),
                  y: 16,
                },
                {
                  x: handleGetDate(3),
                  y: 17,
                },
                {
                  x: handleGetDate(2),
                  y: 7,
                },
                {
                  x: handleGetDate(1),
                  y: 7,
                },
                {
                  x: handleGetDate(0),
                  y: 7,
                },
              ],
            },
            {
              key: "Data Oracle",
              color: "#348fe2",
              values: [{
                  x: handleGetDate(77),
                  y: 14,
                },
                {
                  x: handleGetDate(76),
                  y: 13,
                },
                {
                  x: handleGetDate(75),
                  y: 15,
                },
                {
                  x: handleGetDate(73),
                  y: 14,
                },
                {
                  x: handleGetDate(72),
                  y: 13,
                },
                {
                  x: handleGetDate(71),
                  y: 15,
                },
                {
                  x: handleGetDate(70),
                  y: 16,
                },
                {
                  x: handleGetDate(69),
                  y: 16,
                },
                {
                  x: handleGetDate(68),
                  y: 14,
                },
                {
                  x: handleGetDate(67),
                  y: 14,
                },
                {
                  x: handleGetDate(66),
                  y: 13,
                },
                {
                  x: handleGetDate(65),
                  y: 12,
                },
                {
                  x: handleGetDate(64),
                  y: 13,
                },
                {
                  x: handleGetDate(63),
                  y: 13,
                },
                {
                  x: handleGetDate(62),
                  y: 15,
                },
                {
                  x: handleGetDate(61),
                  y: 16,
                },
                {
                  x: handleGetDate(60),
                  y: 16,
                },
                {
                  x: handleGetDate(59),
                  y: 17,
                },
                {
                  x: handleGetDate(58),
                  y: 17,
                },
                {
                  x: handleGetDate(57),
                  y: 18,
                },
                {
                  x: handleGetDate(56),
                  y: 15,
                },
                {
                  x: handleGetDate(55),
                  y: 15,
                },
                {
                  x: handleGetDate(54),
                  y: 15,
                },
                {
                  x: handleGetDate(53),
                  y: 19,
                },
                {
                  x: handleGetDate(52),
                  y: 19,
                },
                {
                  x: handleGetDate(51),
                  y: 18,
                },
                {
                  x: handleGetDate(50),
                  y: 18,
                },
                {
                  x: handleGetDate(49),
                  y: 17,
                },
                {
                  x: handleGetDate(48),
                  y: 16,
                },
                {
                  x: handleGetDate(47),
                  y: 18,
                },
                {
                  x: handleGetDate(46),
                  y: 18,
                },
                {
                  x: handleGetDate(45),
                  y: 18,
                },
                {
                  x: handleGetDate(44),
                  y: 16,
                },
                {
                  x: handleGetDate(43),
                  y: 14,
                },
                {
                  x: handleGetDate(42),
                  y: 14,
                },
                {
                  x: handleGetDate(41),
                  y: 13,
                },
                {
                  x: handleGetDate(40),
                  y: 14,
                },
                {
                  x: handleGetDate(39),
                  y: 13,
                },
                {
                  x: handleGetDate(38),
                  y: 10,
                },
                {
                  x: handleGetDate(37),
                  y: 9,
                },
                {
                  x: handleGetDate(36),
                  y: 10,
                },
                {
                  x: handleGetDate(35),
                  y: 11,
                },
                {
                  x: handleGetDate(34),
                  y: 11,
                },
                {
                  x: handleGetDate(33),
                  y: 11,
                },
                {
                  x: handleGetDate(32),
                  y: 10,
                },
                {
                  x: handleGetDate(31),
                  y: 9,
                },
                {
                  x: handleGetDate(30),
                  y: 10,
                },
                {
                  x: handleGetDate(29),
                  y: 13,
                },
                {
                  x: handleGetDate(28),
                  y: 14,
                },
                {
                  x: handleGetDate(27),
                  y: 14,
                },
                {
                  x: handleGetDate(26),
                  y: 13,
                },
                {
                  x: handleGetDate(25),
                  y: 12,
                },
                {
                  x: handleGetDate(24),
                  y: 11,
                },
                {
                  x: handleGetDate(23),
                  y: 13,
                },
                {
                  x: handleGetDate(22),
                  y: 13,
                },
                {
                  x: handleGetDate(21),
                  y: 13,
                },
                {
                  x: handleGetDate(20),
                  y: 13,
                },
                {
                  x: handleGetDate(19),
                  y: 14,
                },
                {
                  x: handleGetDate(18),
                  y: 13,
                },
                {
                  x: handleGetDate(17),
                  y: 13,
                },
                {
                  x: handleGetDate(16),
                  y: 19,
                },
                {
                  x: handleGetDate(15),
                  y: 21,
                },
                {
                  x: handleGetDate(14),
                  y: 22,
                },
                {
                  x: handleGetDate(13),
                  y: 25,
                },
                {
                  x: handleGetDate(12),
                  y: 24,
                },
                {
                  x: handleGetDate(11),
                  y: 24,
                },
                {
                  x: handleGetDate(10),
                  y: 22,
                },
                {
                  x: handleGetDate(9),
                  y: 16,
                },
                {
                  x: handleGetDate(8),
                  y: 15,
                },
                {
                  x: handleGetDate(7),
                  y: 12,
                },
                {
                  x: handleGetDate(6),
                  y: 12,
                },
                {
                  x: handleGetDate(5),
                  y: 15,
                },
                {
                  x: handleGetDate(4),
                  y: 15,
                },
                {
                  x: handleGetDate(3),
                  y: 15,
                },
                {
                  x: handleGetDate(2),
                  y: 18,
                },
                {
                  x: handleGetDate(2),
                  y: 18,
                },
                {
                  x: handleGetDate(0),
                  y: 17,
                },
              ],
            },
          ],
        },
      };
    },
    methods: {
      formatDate(d) {
        var monthsName = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        d = new Date(d);
        d = monthsName[d.getMonth()] + " " + d.getDate();
        return d;
      },
      handleDayChanged(data) {
        if (data.events.length > 0) {
          this.events.displayData = data.events;
        } else {
          this.events.displayData = this.events.data;
        }
      },
    },
  };
</script>