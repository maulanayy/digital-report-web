<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Oracle</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Add Oracle Setting</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Add Control Point">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Username</label>
          <div class="col-md-9">
            <input type="input" class="form-control m-b-5" placeholder="Enter Username" name="hostname"
              v-model="hostname" />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Ip Address</label>
          <div class="col-md-9">
            <input type="input" class="form-control m-b-5" placeholder="Enter Ip Address" name="ip_address"
              v-model="ip_address" />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-3">Password</label>
          <div class="col-md-9">
            <input type="password" class="form-control m-b-5" placeholder="Enter Password" name="password"
              v-model="password" />
          </div>
        </div>
        <b-button class="float-right mb-3" variant="primary" @click="create()">{{label}}</b-button>
      </form>
    </panel>
    <!-- end panel -->
  </div>
</template>

<script>
  import PageOptions from "../../config/PageOptions.vue";

  export default {
    name: "add-oracle",
    data() {
      return {
        hostname: "",
        ip_address: "",
        password: "",
        url: "",
        oracleID: "",
        label : "Create"
      };
    },
    created() {
      var currentUrl = this.$route.path.split("/");
      this.oracleID = currentUrl[4];
      this.url = currentUrl[3];
      this.label = this.url == 'add' ? this.label : 'Edit'
      PageOptions.pageWithFooter = true;
    },
    beforeRouteLeave(to, from, next) {
      PageOptions.pageWithFooter = false;
      next();
    },
    methods: {
      create() {
        const body = {
          host: this.hostname,
          ip: this.ip_address,
          password: this.password,
        };

        if (this.url == "add") {
          this.$axios
            .post("/setting/oracle", body, {
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
                this.$router.push("/setting/oracle");
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
            .put("/setting/oracle/" + this.topicID, body, {
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
                this.$router.push("/setting/oracle");
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
          const url = "/setting/oracle/" + this.oracleID;
          this.$axios
            .get(url)
            .then((response) => {
              this.hostname = response.data.data.txtHost;
              this.ip_address = response.data.data.txtIP;
              this.password = response.data.data.txtPassword;

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