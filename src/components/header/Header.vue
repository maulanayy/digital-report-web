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
          ><span class="navbar-logo"></span> <b>Digital</b> Report</router-link
        >
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
          ><b>Login</b>
        </router-link>

        <!-- <b-nav-item-dropdown menu-class="dropdown-menu-right" class="dropdown navbar-user" no-caret>
					<template slot="button-content"> -->
        <!-- <img src="@/assets/img/user/user-13.jpg" alt="" />  -->
        <!-- <span class="d-none d-md-inline">Login</span> <b class="caret"></b>
					</template> -->
        <!-- <b-dropdown-item href="javascript:;">Edit Profile</b-dropdown-item>
					<b-dropdown-item href="/login">Log Out</b-dropdown-item> -->
        <!-- </b-nav-item-dropdown> -->
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
            type="email"
            class="form-control form-control-lg inverse-mode"
            placeholder="Email Address"
            v-model="username"
            required
          />
        </div>
        <div class="form-group m-b-20">
          <input
            type="password"
            class="form-control form-control-lg inverse-mode"
            placeholder="Password"
            required
          />
        </div>
        <div class="checkbox checkbox-css m-b-20">
          <input type="checkbox" id="remember_checkbox" />
          <label for="remember_checkbox"> Remember Me </label>
        </div>
        <div class="login-buttons">
          <button type="submit" class="btn btn-success btn-block btn-lg" @click="handleOk">
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
    checkForm: function (e) {
      e.preventDefault();
      this.$router.push({ path: "/extra/search" });
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
      console.log("WAW");
      this.$nextTick(() => {
        this.$bvModal.hide("loginDialog");
      });
    },
  },
};
</script>
