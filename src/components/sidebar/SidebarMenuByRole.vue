<script>
const sidebarMenuByRole = {
  superadmin: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/lab", icon: "fa fa-flask", title: "Lab" },
    { path: "/area", icon: "fa fa-warehouse", title: "Area" },
    { path: "/control_point", icon: "fa fa-sliders-h", title: "Control Point" },
    { path: "/form", icon: "fa fa-file", title: "Form" },
    {
      path: "/setting",
      icon: "fa fa-cog",
      title: "Setting",
      children: [
        { path: "/setting/ewon", title: "Ewon" },
        { path: "/setting/oracle", title: "Oracle" },
        { path: "/setting/parameter", title: "Parameter" },
        { path: "/setting/form-parameter", title: "Form Parameter" },
        { path: "/setting/shift", title: "Jadwal Shift" }
      ],
    },
  ],
  supervisor: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/area", icon: "fa fa-warehouse", title: "Area" },
    { path: "/control_point", icon: "fa fa-sliders-h", title: "Control Point" },
    { path: "/form", icon: "fa fa-file", title: "Form" },
    {
      path: "/setting",
      icon: "fa fa-cog",
      title: "Setting",
      children: [
        { path: "/setting/parameter", title: "Parameter" },
        { path: "/setting/form-parameter", title: "Form Parameter" },
        { path: "/setting/shift", title: "Jadwal Shift" }
      ],
    },
  ],
  admin: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/form", icon: "fa fa-file", title: "Form" },
  ],
  leader: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/form", icon: "fa fa-file", title: "Form" },
  ],
  inspector: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/form", icon: "fa fa-file", title: "Form" },
  ],
  guest: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/report", icon: "fa fa-th", title: "Report" },
  ],
};

export default sidebarMenuByRole;
</script>
