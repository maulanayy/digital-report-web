<template>
  <div>
    <!-- begin page-header -->
    <h1 class="page-header">Reset Password</h1>
    <!-- end page-header -->

    <!-- begin panel -->
    <panel title="reset password" class="col-md-10">
      <form>
        <div class="form-group row m-b-15">
          <label class="col-form-label col-md-2">Username</label>
          <div class="col-md-5">
            <input
              type="input"
              class="form-control m-b-5"
              placeholder="Enter Username"
              name="username"
              v-model="username"
            />
          </div>
        </div>
        <div class="form-group row m-b-15" >
          <label class="col-form-label col-md-2">Old Password</label>
          <div class="col-md-5">
            <input
              type="password"
              class="form-control m-b-5"
              placeholder="Enter Old Password"
              name="old_password"
              v-model="old_password"
            />
          </div>
        </div>
        <div class="form-group row m-b-15" >
          <label class="col-form-label col-md-2">New Password</label>
          <div class="col-md-5">
            <input
              type="password"
              class="form-control m-b-5"
              placeholder="Enter New Password"
              name="new_password"
              v-model="new_password"
            />
          </div>
        </div>
        <b-button class="float-right mb-3" variant="primary" @click="create()"
          >Reset</b-button
        >
      </form>
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
      username: "",
      old_password: "",
      new_password: ""
    };
  },
  created() {
    PageOptions.pageWithFooter = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageWithFooter = false;
    next();
  },
  methods: {
    create() {

      if (this.username == "") {
        this.$notify({
          title: `Please Insert Username`,
          text: `Warning`,
          type: "warn",
        });

        return;
      }

      let body = {
        username: this.username,
        password: this.old_password,
        new_password: this.new_password,
      };
      this.$axios
        .post("/user/reset-password", body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          this.$notify({
            title: `Reset Password Success`,
            text: `Success`,
            type: "success",
          });

          setTimeout(() => {
            this.$router.push("/home");
          }, 1500);
        })
        .catch((err) => {
          this.$notify({
            title: `Reset Password Failed : ${err}`,
            text: `Error`,
            type: "error",
          });
        });
    },
  },
  mounted() {},
};
</script>
