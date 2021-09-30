<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Control Point</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">{{ label }}</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel :title="label">
      <b-form @submit="create">
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
            <v-select
              v-model="area_id"
              tag-placeholder="Enter Name Area"
              placeholder="Enter Name Area"
              label="name"
              track-by="code"
              :options="areas"
              :multiple="true"
            >
            </v-select>
          </div>
        </div>
        <b-button
          type="submit"
          class="float-right mb-3"
          variant="primary"
          v-if="url == 'add'"
          >Create</b-button
        >
        <b-button
          type="submit"
          class="float-right mb-3"
          variant="primary"
          v-else
          >Edit</b-button
        >
      </b-form>
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
      area_id: [],
      label: "",
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
    create(event) {
      event.preventDefault();
      const areaID =
        this.area_id.length > 0
          ? this.area_id.map((x) => {
              console.log(x);
              return x.code;
            })
          : [];

      if (this.name == "" ){
        this.$notify({
          title: `Name Control Point is Empty`,
          text: `Warning`,
          type: "warn",
        });

        return;
      }
      if (areaID.length == 0) {
        this.$notify({
          title: `Area is empty`,
          text: `Warning`,
          type: "warn",
        });

        return;
      }

      let body = {
        name: this.name,
        area_id: areaID,
      };

      console.log(body);

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
        this.label = "Edit Control Point";
        const url = "/control-point/" + this.cpId;
        this.$axios
          .get(url)
          .then((response) => {
            console.log(response.data.data.data);
            const data = response.data.data.data
            const areaID = data.map(x => {
              return {
                name : x.txtAreaName,
                code : x.intAreaID
              }
            }) 
            this.name = data[0].txtName;
            this.area_id = areaID
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.label = "Add Control Point";
      }
    },
    getAreaCode() {
      const url = "/area/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.areas = response.data.data.data.map((x) => {
            return {
              name: x.txtName,
              code: x.id,
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
