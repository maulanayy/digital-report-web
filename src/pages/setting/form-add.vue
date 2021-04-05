<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Setting</li>
      <li class="breadcrumb-item active">Form</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Create New Form</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Create New Form">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Control Point</label>
          <div class="col-md-4">
            <v-select :options=contorlPoint name="cp_id" placeholder="Enter Control Point" v-model="cp_id">
            </v-select>
          </div>
          <label class="col-form-label col-md-1">No Document</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter No Document" name="name" v-model="name" />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">OKP</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Name OKP" name="okp" v-model="okp" />
          </div>

          <label class="col-form-label col-md-1">Product Name</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Product Name" name="name"
              v-model="name" />
          </div>
        </div>

        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Effective Date</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Effective Date" name="name"
              v-model="name" />
          </div>

          <label class="col-form-label col-md-1">Variable Name</label>
          <div class="col-md-4">
            <input type="input" class="form-control m-b-5" placeholder="Enter Variable Name" name="variable"
              v-model="name" />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Remark</label>
          <div class="col-md-9">
            <b-form-textarea rows="5" class="form-control m-b-5" placeholder="Remark" name="remark"
              v-model="remark" />
          </div>

         
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-1">Parameter Name</label>
          <div class="col-md-4">
            <v-select :options=parameters name="parameter" v-model="parameter">
            </v-select>
          </div>
          <div class="col-md-2">
            <b-button class="float-left" variant="primary" @click="add_parameter()">Add Parameter</b-button>
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
        formID : "",
        name: "",
        cp_id: "",
        url: "",
        columns: [{
            label: "No",
            field: "no",
          },
          {
            label: "Paramater Name",
            field: "parameter",
          },
          {
            label : "Action",
            field : "btn"
          }
        ],
        data: [],
        options : [],
        contorlPoint: [],
        parameters : [],
        meta: {},
      };
    },
    created() {
      var currentUrl = this.$route.path.split("/");
      this.formID = currentUrl[3];
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
      getCP() {
        const url = "/control-point/code";
        this.$axios
          .get(url)
          .then((response) => {
            this.contorlPoint = response.data.data.data.map((x) => {
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
      getParameter(){
         const url = "/setting/parameter";
        this.$axios
          .get(url)
          .then((response) => {
            console.log(response.data.data.data)
            this.parameters = response.data.data.data.map((x) => {
              return {
                label: x.txtname,
                value: x.id,
              };
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    mounted() {
      this.getData();
      this.getCP();
      this.getParameter();
    },
  };
</script>