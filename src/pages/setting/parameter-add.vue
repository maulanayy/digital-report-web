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
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Parameter"
              name="parameter"
              v-model="parameter"
            />
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Topic</label>
          <div class="col-md-10">
            <v-select
              :options="topics"
              name="topic_id"
              v-model="topic_id"
            >
            </v-select>
          </div>
        </div>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Control Point</label>
          <div class="col-md-10">
            <v-select
              :options="contorlPoint"
              name="cp_id"
              v-model="cp_id"
            >
            </v-select>
          </div>
        </div>
        <b-button
          class="float-right mb-3"
          variant="primary"
          @click="create()"
          v-if="url == 'add'"
          >Create</b-button
        >
        <b-button
          class="float-right mb-3"
          variant="primary"
          @click="create()"
          v-else
          >Edit</b-button
        >
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
      parameter: "",
      topic_id: "",
      topics: [],
      contorlPoint: [],
      cp_id : "",
      url: "",
      parameterID: "",
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
        name : this.parameter,
        cp_id :this.cp_id.value,
        topic_id : this.topic_id.value
      };

      console.log(body)
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
          .put("/setting/parameter/" + this.parameterID, body, {
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
        const url = "/setting/parameter/" + this.parameterID;
        this.$axios
          .get(url)
          .then((response) => {
            console.log(response.data.data)
            this.parameter = response.data.data.txtName;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getTopics() {
      const url = "/setting/ewon/code";
      this.$axios
        .get(url)
        .then((response) => {
          this.topics = response.data.data.data.map((x) => {
            return {
              label: x.txtTopic,
              value: x.id,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
  },
  mounted() {
    this.getData();
    this.getCP();
    this.getTopics();
  },
};
</script>