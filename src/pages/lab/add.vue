<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">Create Lab</li>
    </ol>
    <!-- end breadcrumb -->
    <!-- begin page-header -->
    <h1 class="page-header">Create Lab</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="Create Lab">
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
  name: "add-lab",
  data() {
    return {
      name: "",
      labId: "",
      url: "",
    };
  },
  created: function () {
    var currentUrl = this.$route.path.split("/");
    this.labId = currentUrl[3];
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
          .post("/lab", body, {
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
              this.$router.push("/lab");
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
          .put("/lab/" + this.labId, body, {
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
              this.$router.push("/lab");
            }, 1500);
          })
          .catch((err) => {
            console.log(err)
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
        const url = "/lab/" + this.labId;
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