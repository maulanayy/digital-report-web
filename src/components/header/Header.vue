<template>
  <div>
    <!-- begin #header -->
    <div id="header" class="header navbar-inverse">
      <!-- begin navbar-header -->
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle pull-left"
          v-on:click="toggleMobileRightSidebar"
          v-if="pageOptions.pageWithTwoSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link to="/dashboard" class="navbar-brand"
          ><span class="navbar-logo"></span> <b>Digital Quality</b> Management System
        </router-link>
        <button
          type="button"
          class="navbar-toggle pt-0 pb-0 mr-0 collapsed"
          v-on:click="toggleMobileTopMenu"
          v-if="pageOptions.pageWithTopMenu && !pageOptions.pageWithoutSidebar"
        >
          <span class="fa-stack fa-lg text-inverse">
            <i class="far fa-square fa-stack-2x"></i>
            <i class="fa fa-cog fa-stack-1x"></i>
          </span>
        </button>
        <button
          type="button"
          class="navbar-toggle"
          v-on:click="toggleMobileTopMenu"
          v-if="pageOptions.pageWithTopMenu && pageOptions.pageWithoutSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <button
          type="button"
          class="navbar-toggle p-0 m-r-0"
          v-on:click="toggleMobileMegaMenu"
          v-if="pageOptions.pageWithMegaMenu"
        >
          <span class="fa-stack fa-lg text-inverse m-t-2">
            <i class="far fa-square fa-stack-2x"></i>
            <i class="fa fa-cog fa-stack-1x"></i>
          </span>
        </button>
        <button
          type="button"
          class="navbar-toggle"
          v-on:click="toggleMobileSidebar"
          v-if="!pageOptions.pageWithoutSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <!-- end navbar-header -->

      <header-mega-menu v-if="pageOptions.pageWithMegaMenu"></header-mega-menu>

      <!-- begin header-nav -->
      <div class="navbar-nav navbar-right">
        <router-link
          to="#"
          v-b-modal.loginDialog
          class="navbar-brand"
          style="font-size: 15px"
          v-if="this.$store.state.userdata == null"
          ><b>Login</b>
        </router-link>

        <b-nav-item-dropdown
          menu-class="dropdown-menu-right"
          class="dropdown navbar-user"
          no-caret
          v-if="this.$store.state.userdata != null"
        >
          <template slot="button-content">
            <img src="@/assets/img/user/user-13.jpg" alt="" />
            <span class="d-none d-md-inline">{{
              this.$store.state.userdata.txtUsername
            }}</span>
            <b class="caret"></b>
          </template>
          <b-dropdown-item href="javascript:;">Edit Profile</b-dropdown-item>
          <b-dropdown-item href="javascript:;" @click="logout"
            >Log Out</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </div>
      <!-- end header navigation right -->
    </div>
    <!-- end #header -->

    <b-modal
      id="loginDialog"
      hide-footer
      cancel-variant="default"
      title="Login"
      @show="resetModal"
      @hidden="resetModal"
    >
      <form @submit.stop.prevent="login" method="POST" class="margin-bottom-0">
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
          <button
            type="submit"
            class="btn btn-success btn-block btn-lg"
            @click="handleOk"
          >
            Sign me in
          </button>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PageOptions from "../../config/PageOptions.vue";
import HeaderMegaMenu from "./HeaderMegaMenu.vue";
import cookie from "js-cookie";

export default {
  name: "Header",
  components: {
    HeaderMegaMenu,
  },
  data() {
    return {
      username: "",
      password: "",
      pageOptions: PageOptions,
    };
  },
  methods: {
    toggleMobileSidebar() {
      this.pageOptions.pageMobileSidebarToggled = !this.pageOptions
        .pageMobileSidebarToggled;
    },
    toggleMobileRightSidebar() {
      this.pageOptions.pageMobileRightSidebarToggled = !this.pageOptions
        .pageMobileRightSidebarToggled;
    },
    toggleMobileTopMenu() {
      this.pageOptions.pageMobileTopMenu = !this.pageOptions.pageMobileTopMenu;
    },
    toggleMobileMegaMenu() {
      this.pageOptions.pageMobileMegaMenu = !this.pageOptions
        .pageMobileMegaMenu;
    },
    toggleRightSidebar() {
      this.pageOptions.pageRightSidebarToggled = !this.pageOptions
        .pageRightSidebarToggled;
    },
    toggleRightSidebarCollapsed() {
      this.pageOptions.pageRightSidebarCollapsed = !this.pageOptions
        .pageRightSidebarCollapsed;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.login();
    },
    login() {
      // Exit when the form isn't valid
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
          this.setAuthLogin(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$nextTick(() => {
        this.$bvModal.hide("loginDialog");
      });
    },
    setAuthLogin(user) {
      this.$axios
        .get("/user/" + user.id)
        .then((response) => {
          let userdata = response.data.data;
          userdata.access_token = user.token;
          this.$axios("/role/" + userdata.intRoleID).then((role) => {
            console.log(role.data);
            let roleData = role.data.data;
            userdata.role = roleData.txtName;

            // userdata.first_login = user.first_login
            this.$store.commit("set_login", userdata);
            cookie.set("userdata", userdata, {
              expires: 1,
            });
            window.location.reload();
          });
        })
        .catch((error) => {
          console.log(error);
          // if (error.response) {
          //   if(error.response.data){
          //     this.errorMessage = error.response.data.message
          //   }
          // }
        });
    },
    logout() {
      cookie.remove("userdata");
      this.$store.commit("set_login", null);
      window.location.reload();
    },
  },
};
</script>