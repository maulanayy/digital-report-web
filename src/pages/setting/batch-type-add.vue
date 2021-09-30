<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Batch Type Control Point</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">{{ label }}</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel :title="label">
      <b-form @submit="create">
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Batch Type</label>
          <div class="col-md-9">
            <v-select
              :options="batch_types"
              v-model="batch_type"
              placeholder="Enter Name OKP"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Control Points</label>
          <div class="col-md-9">
            <v-select
              v-model="cp_id"
              tag-placeholder="Select Control Point"
              placeholder="Select Control Point"
              label="name"
              track-by="code"
              :options="controlPoints"
              :multiple="true"
            >
            </v-select>
          </div>
        </div>
        <b-button type="submit" class="float-right mb-3" variant="primary">{{
          button_label
        }}</b-button>
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
      batchID: "",
      batch_type: "",
      batch_types: [],
      cp_id: [],
      controlPoints: [],
      url: "",
      label: "",
      button_label: "Create",
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.okpID = currentUrl[4];
    this.url = currentUrl[3];
    this.url = this.url == "edit" ? "Edit" : this.url;
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
      getBatch() {
      this.$axios
        .get("/setting/batch-type/oracle")
        .then((response) => {
          this.batch_types = response.data.data.data.map((x) => {
            return {
              label: x.BATCH_TYPE,
              value: x.BATCH_TYPE,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    create(event) {
      event.preventDefault();
      const cpID =
        this.cp_id.length > 0
          ? this.cp_id.map((x) => {
              return x.code;
            })
          : [];

      if (this.batch_type == "") {
        this.$notify({
          title: `Batch Type is Empty`,
          text: `Warning`,
          type: "warn",
        });

        return;
      }
      if (cpID.length == 0) {
        this.$notify({
          title: `Control Point is empty`,
          text: `Warning`,
          type: "warn",
        });

        return;
      }

      let body = {
        name: this.batch_type,
        cp: cpID,
      };
      
      if (this.url == "add") {
        this.$axios
          .post("/setting/batch-type", body, {
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
              this.$router.push("/setting/batch-type");
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
          .put("/setting/batch-type/" + this.okpID, body, {
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
              this.$router.push("/setting/batch-type");
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
        console.log(this.url)
      if (this.url == "Edit") {
          
        this.label = "Edit Batch Type Control Point Form";
        const url = "/setting/batch-type/" + this.okpID +"/detail"    ;
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data.data;
            
            const cpID = data.map((x) => {
              return {
                name: x.control_points,
                code: x.cp_id,
              };
            });
            this.batch_type = data[0].txtName;
            this.cp_id = cpID;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.label = "Add Batch Type Control Point Form";
      }
    },
    getCPCode() {
      const url = "/control-point/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.controlPoints = response.data.data.data.map((x) => {
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
    this.getBatch();
    this.getData();
    this.getCPCode();
  },
};
</script>
