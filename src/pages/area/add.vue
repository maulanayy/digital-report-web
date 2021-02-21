<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Area</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Add Lab Area</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Add Lab Area">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Name</label>
          <div class="col-md-9">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Name Lab"
              name="name"
              v-model="name"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Lab</label>
          <div class="col-md-9">
            <v-select
              :options="lab_category"
              name="lab_id"
              v-model="lab_id"
            >
            </v-select>
          </div>
        </div>
        <b-button class="float-right mb-3" variant="primary" @click="create()" v-if="url == 'add'">Create</b-button>
        <b-button class="float-right mb-3" variant="primary" @click="create()" v-else>Edit</b-button>
      </form>
    </panel>
    <!-- end panel -->

    <notifications position="top right" class="mt-3 ml-3" :speed="500" />
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  name: "add-area",
  data() {
    return {
      name: "",
      areaId: "",
      url: "",
      lab_category: [],
      lab_id: "",
    };
  },
  created() {
    var currentUrl = this.$route.path.split("/");
    this.areaId = currentUrl[3];
    this.url = currentUrl[2];
    console.log("AREA : ",this.areaId)
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
    create() {
      const body = {
        name: this.name,
        lab_id: this.lab_id.value,
      };

      if (this.url == "add") {
        this.$axios
          .post("/area", body, {
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
              this.$router.push("/area");
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
          .put("/area/" + this.areaId, body, {
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
              this.$router.push("/area");
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
        const url = "/area/" + this.areaId;
        this.$axios
          .get(url)
          .then((response) => {
            this.name = response.data.data.txtName;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getLabCode() {
      const url = "/lab/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.lab_category = response.data.data.data.map(x => {
            return {
              label : x.txtName,
              value : x.id
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getLabCode();
    this.getData();
  },
};
</script>