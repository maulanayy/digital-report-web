<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Ewon</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">{{label}}</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel :title="label">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Topic</label>
          <div class="col-md-10">
            <input type="input" class="form-control m-b-5" placeholder="Enter Topic" name="topic" v-model="topic" />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Status</label>
          <div class="col-md-10">
            <v-select :options="statuses" v-model="status" placeholder="Select Type Status">
            </v-select>
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
        topic: "",
        statuses : ["offline","online"],
        status : "",
        url: "",
        tipe_data: "",
        topicID: "",
        label: ""
      };
    },
    created() {
      var currentUrl = this.$route.path.split("/");
      this.topicID = currentUrl[4];
      this.url = currentUrl[3];
      PageOptions.pageWithFooter = true;
    },
    beforeRouteLeave(to, from, next) {
      PageOptions.pageWithFooter = false;
      next();
    },
    methods: {
      create() {
        const status = this.status == "online" ? true : false;
        const body = {
          topic: this.topic,
          status: status
        };

        if (this.url == "add") {
          this.$axios
            .post("/setting/ewon", body, {
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
                this.$router.push("/setting/ewon");
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
            .put("/setting/ewon/" + this.topicID, body, {
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
                this.$router.push("/setting/ewon");
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
          this.label = "Edit TagName"
          const url = "/setting/ewon/" + this.topicID;
          this.$axios
            .get(url)
            .then((response) => {
              this.topic = response.data.data.txtTopic;
              this.status = response.data.data.txtStatus;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.label = "Add TagName"
        }
      },
    },
    mounted() {
      this.getData();
    },
  };
</script>