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
              placeholder="Enter Name Type OKP"
              name="name"
              v-model="name"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Control Points</label>
          <div class="col-md-9">
            <v-select
              v-model="cp_id"
              tag-placeholder="Enter Name Control Point"
              placeholder="Enter Name Control Point"
              label="name"
              track-by="code"
              :options="cps"
              :multiple="true"
            >
            </v-select>
          </div>
        </div>
        <b-button
          type="submit"
          class="float-right mb-3"
          variant="primary"
          >{{labelBtn}}</b-button
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
      typeOKPID: "",
      url: "",
      cps: [],
      cp_id: [],
      label: "",
      labelBtn : ""
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.typeOKPID = currentUrl[4];
    this.url = currentUrl[3];
    this.labelBtn = this.url == "add" ? "Create" : "Edit"
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
    create(event) {
      event.preventDefault();
      const controlPointID =
        this.cp_id.length > 0
          ? this.cp_id.map((x) => {
              return x.code;
            })
          : [];

      if (this.name == "" ){
        this.$notify({
          title: `Name Type is Empty`,
          text: `Warning`,
          type: "warn",
        });

        return;
      }
      if (controlPointID.length == 0) {
        this.$notify({
          title: `Control Point is empty`,
          text: `Warning`,
          type: "warn",
        });

        return;
      }

      let body = {
        name: this.name,
        cp_id: controlPointID,
      };

      console.log(body);

      if (this.url == "add") {
        this.$axios
          .post("/setting/type-okp", body, {
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
              this.$router.push("/setting/type-okp");
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
          .put("/setting/type-okp/" + this.typeOKPID, body, {
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
              this.$router.push("/setting/type-okp");
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
        this.label = "Edit Type OKP";
        const url = "/setting/type-okp/" + this.typeOKPID;
        this.$axios
          .get(url)
          .then((response) => {
            const data = response.data.data
            const controlPointID = data.list_cp.map(x => {
              return {
                name : x.txtName,
                code : x.intControlPointID
              }
            }) 
            console.log(controlPointID)
            this.name = data.txtName;
            this.cp_id = controlPointID
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.label = "Add Type OKP";
      }
    },
    getAreaCode() {
      const url = "/control-point/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.cps = response.data.data.data.map((x) => {
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
