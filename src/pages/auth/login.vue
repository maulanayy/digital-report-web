<template>
  <!-- begin login -->
  <div class="login login-v1">
    <!-- begin login-container -->
    <div class="login-container">
      <!-- begin login-header -->
      <div class="login-header">
        <div class="brand">
          <span class="logo"></span> <b>Digital</b> Report
          <small>Digital Report Kalbe Kimia Farma</small>
        </div>
      </div>
      <!-- end login-header -->
      <!-- begin login-body -->
      <div class="login-body">
        <!-- begin login-content -->
        <div class="login-content">
          <form v-on:submit="login" method="POST" class="margin-bottom-0">
            <div class="form-group m-b-20">
              <input
                type="text"
                class="form-control form-control-lg inverse-mode"
                placeholder="Username"
                v-model="username"
                required
              />
            </div>
            <div class="form-group m-b-20">
              <input
                type="password"
                class="form-control form-control-lg inverse-mode"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
            <div class="checkbox checkbox-css m-b-20">
              <input type="checkbox" id="remember_checkbox" />
              <label for="remember_checkbox"> Remember Me </label>
            </div>
            <div class="login-buttons">
              <button type="submit" class="btn btn-success btn-block btn-lg">
                Sign me in
              </button>
            </div>
          </form>
        </div>
        <!-- end login-content -->
      </div>
      <!-- end login-body -->
    </div>
    <!-- end login-container -->
  </div>
  <!-- end login -->
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  created() {
    PageOptions.pageEmpty = true;
  },
  beforeRouteLeave(to, from, next) {
    PageOptions.pageEmpty = false;
    next();
  },
  methods: {
    login: function (e) {
      e.preventDefault();
      const body = {
        username: this.username,
        password: this.password,
      };

      this.$axios
        .post("/login", body, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      // this.$router.push({ path: '/dashboard'})
    },
  },
};
</script>