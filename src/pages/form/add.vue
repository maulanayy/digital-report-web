<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Control Point</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Add Form</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Add Control Point">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Name</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Name Form" name="name" v-model="name" />
          </div>

          <label class="col-form-label col-md-1">OKP</label>
          <div class="col-md-4">
            <v-select :options="['PD-3728', 'PD-3728']" name="okp" v-model="okp">
            </v-select>
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Name</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Product Name" name="name"
              v-model="name" />
          </div>

          <label class="col-form-label col-md-1">No Document</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter No Document" name="name" v-model="name" />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Product Date</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Product Date" name="name"
              v-model="name" />
          </div>

          <label class="col-form-label col-md-1">Effective Date</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Effective Date" name="name"
              v-model="name" />
          </div>
        </div>

        <vue-good-table :columns="columns" :rows="data" :line-numbers="true">
        </vue-good-table>

        <b-button class="float-right mt-3" variant="primary" @click="create()">Create</b-button>
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
        columns: [{
            label: "Compound Tank",
            field: "id",
          },
          {
            label: "Standard",
            field: "txtName",
          },
          {
            label: "Mix Number",
            field: "txtProductName"
          },
        ],
        data: [],
        meta: {},
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
        const body = {
          name: this.name,
        };

        if (this.url == "add") {
          this.$axios
            .post("/form", body, {
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
                this.$router.push("/form");
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
            .put("/form/" + this.cpId, body, {
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
                this.$router.push("/form");
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
        console.log(this.url);
        if (this.url == "edit") {
          const url = "/form/" + this.cpId;
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
    },
    mounted() {
      this.getData();
    },
  };
</script>