<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Control Point</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Form Control Point</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Form Control Point">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Name</label>
          <div class="col-md-9">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Name Control Point"
              name="name"
              v-model="name"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Area</label>
          <div class="col-md-9">
            <v-select :options="areas" name="area_id" v-model="area_id">
            </v-select>
          </div>
        </div>
        <b-button
          class="float-right mb-3"
          variant="primary"
          @click="create()"
          v-if="url == 'add'"
          >Create</b-button
        >
        <b-button
          class="float-right mb-3"
          variant="primary"
          @click="create()"
          v-else
          >Edit</b-button
        >
      </form>
    </panel>
    <!-- end panel -->

    <notifications position="top right" class="mt-3 ml-3" :speed="500" />
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "add-control-point",
  data() {
    return {
      name: "",
      cpId: "",
      url: "",
      areas: [],
      area_id: "",
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.cpId = currentUrl[3];
    this.url = currentUrl[2];
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
    create() {
      const areaID = !this.area_id.value
        ? this.areas.find((x) => {
            return x.label == this.area_id;
          })
        : this.area_id;

      let body = {
        name: this.name,
        area_id: areaID.value,
      };

      if (this.url == "add") {
        this.$axios
          .post("/control-point", body, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            this.$notify({
              title: `Insert Data Success`,
              text: `Success`,
              type: "success",
            });
            setTimeout(() => {
              this.$router.push("/control_point");
            }, 1500);
          })
          .catch((err) => {
            this.$notify({
              title: `Insert Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      } else {
        console.log(body);
        this.$axios
          .put("/control-point/" + this.cpId, body, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            this.$notify({
              title: `Update Data Success`,
              text: `Success`,
              type: "success",
            });

            setTimeout(() => {
              this.$router.push("/control_point");
            }, 1500);
          })
          .catch((err) => {
            this.$notify({
              title: `Update Data Failed : ${err}`,
              text: `Error`,
              type: "error",
            });
          });
      }
    },
    getData() {
      if (this.url == "edit") {
        const url = "/control-point/" + this.cpId;
        this.$axios
          .get(url)
          .then((response) => {
            this.name = response.data.data.txtName;
            this.area_id = response.data.data.areaTxtName;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getAreaCode() {
      const url = "/area/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.areas = response.data.data.data.map((x) => {
            return {
              label: x.txtName,
              value: x.id,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getData();
    this.getAreaCode();
  },
};
</script>