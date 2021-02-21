<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Role</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Add Role</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Add Role">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Name</label>
          <div class="col-md-9">
            <input type="input" class="form-control m-b-5" placeholder="Enter Role" name="name" v-model="name" />
          </div>
        </div>
        
        <b-button class="float-right mb-3" variant="primary" @click="create()" v-if="url == 'add'">Create</b-button>
        <b-button class="float-right mb-3" variant="primary" @click="create()" v-else>Edit</b-button>
      </form>
    </panel>
    <!-- end panel -->
  </div>
</template>

<script>
  import PageOptions from "../../config/PageOptions.vue";

  export default {
    name: "add-ewon",
    data() {
      return {
        name: "",
        url: "",
        roleID: ""
      };
    },
    created() {
      var currentUrl = this.$route.path.split("/");
      this.roleID = currentUrl[4];
      this.url = currentUrl[3];
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
            .post("/role", body, {
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
                this.$router.push("/setting/role");
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
            .put("/role/" + this.roleID, body, {
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
                this.$router.push("/setting/role");
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
          const url = "/role/" + this.roleID;
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