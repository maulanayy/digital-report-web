<template>
  <div>
    <!-- begin breadcrumb -->
    <ol class="breadcrumb float-xl-right">
      <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
      <li class="breadcrumb-item active">{{ label }}</li>
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
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Name Lab"
              name="name"
              v-model="name"
            />
          </div>
        </div>
        <b-button
          type="submit"
          class="float-right mb-3"
          variant="primary"
          :disabled="isLoading"
          >{{label_button}}</b-button
        >
       
      </b-form>
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
      label: "",
      label_button : "Create",
      isLoading : false
    };
  },
  created: function() {
    var currentUrl = this.$route.path.split("/");
    this.labId = currentUrl[3];
    this.url = currentUrl[2];
    this.label_button = this.url == "edit" ? "Edit" : "Create"
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
    create(event) {
      event.preventDefault();

      if (this.name == "") {
        this.$notify({
          title: `Please Insert Name Lab`,
          text: `Warning`,
          type: "warn",
        });

        return
      }

      const body = {
        name: this.name,
      };

      if (this.url == "add") {
        this.isLoading = true
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
            this.isLoading = false
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
            this.isLoading = false
          });
      } else {
        this.isLoading = true
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
            this.isLoading = false
            setTimeout(() => {
              this.$router.push("/lab");
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false
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
        this.label = "Edit Lab";
        const url = "/lab/" + this.labId;
        this.$axios
          .get(url)
          .then((response) => {
            this.name = response.data.data.txtName;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.label = "Create Lab";
      }
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
