<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Area</li>
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
            <input type="input" class="form-control m-b-5" placeholder="Enter Name Lab Area  " name="name"
              v-model="name" />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Lab</label>
          <div class="col-md-9">
            <b-form-select :options="lab_category" name="lab_id" v-model="lab_id">
            </b-form-select>
          </div>
        </div>
        <b-button type="submit" class="float-right mb-3" variant="primary" v-if="url == 'add'">Create</b-button>
        <b-button type="submit" class="float-right mb-3" variant="primary" v-else>Edit</b-button>
      </b-form>
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
        label: "",
      };
    },
    created() {
      var currentUrl = this.$route.path.split("/");
      this.areaId = currentUrl[3];
      this.url = currentUrl[2];
      PageOptions.pageWithFooter = true;
    },
    beforeRouteLeave(to, from, next) {
      PageOptions.pageWithFooter = false;
      next();
    },
    methods: {
      create(event) {
        event.preventDefault()
        
        let body = {
          name: this.name,
          lab_id: this.lab_id,
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
          this.label = "Edit Area";
          const url = "/area/" + this.areaId;
          this.$axios
            .get(url)
            .then((response) => {
              this.name = response.data.data.txtName;
              
              this.lab_id = response.data.data.labTxtName;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.label = "Add Area";
        }
      },
      getLabCode() {
        const url = "/lab/code";
        this.$axios
          .get(url)
          .then((response) => {
            this.lab_category = response.data.data.data.map((x) => {
              return {
                text: x.txtName,
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
      this.getLabCode();
      this.getData();
    },
  };
</script>