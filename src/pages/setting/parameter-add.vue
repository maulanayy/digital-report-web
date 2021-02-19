<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item"><a href="javascript:;">Setting</a></li>
      <li class="breadcrumb-item active">Parameter</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Add Parameter Setting</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Add Parameter" class="col-md-8">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Name</label>
          <div class="col-md-10">
            <input type="input" class="form-control m-b-5" placeholder="Enter Parameter" name="parameter" v-model="parameter" />
          </div>
        </div>
         <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Topic</label>
          <div class="col-md-10">
            <v-select
              :options="[
                'Incoming RM',
                'Incoming PM',
                'Incoming FG',
                'OPRP',
                'PRP',
                'Front Line',
                'COMPOUNDING MIX',
              ]"
              name="id_cp"
              v-model="cp_id"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Control Point</label>
          <div class="col-md-10">
            <v-select
              :options="[
                'Incoming RM',
                'Incoming PM',
                'Incoming FG',
                'OPRP',
                'PRP',
                'Front Line',
                'COMPOUNDING MIX',
              ]"
              name="id_cp"
              v-model="cp_id"
            >
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
    name: "add-parameter",
    data() {
      return {
        name : "",
        topicID: "",
        topics: [],
        contorlPoint : [],
        url: "",
        parameterID: ""
      };
    },
    created() {
      var currentUrl = this.$route.path.split("/");
      this.parameterID = currentUrl[4];
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
          topic: this.topic,
          type_topic: this.type_topic,
        };

        if (this.url == "add") {
          this.$axios
            .post("/setting/parameter", body, {
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
                this.$router.push("/setting/parameter");
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
            .put("/setting/parameter/" + this.topicID, body, {
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
                this.$router.push("/setting/parameter");
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
          const url = "/setting/parameter/" + this.topicID;
          this.$axios
            .get(url)
            .then((response) => {
              this.topic = response.data.data.txtTopic;
              this.type_topic = response.data.data.txtTypeTopic;
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