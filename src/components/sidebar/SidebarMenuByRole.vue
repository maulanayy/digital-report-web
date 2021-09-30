<script>
const sidebarMenuByRole = {
  guest: [{ path: "/home", icon: "fa fa-th", title: "Home" }],
  superadmin: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/lab", icon: "fa fa-flask", title: "Lab" },
    { path: "/area", icon: "fa fa-warehouse", title: "Area" },
    { path: "/control_point", icon: "fa fa-sliders-h", title: "Control Point" },
    { path: "/form", icon: "fa fa-file", title: "Form Analytic" },
    {
      path: "/setting",
      icon: "fa fa-cog",
      title: "Setting",
      children: [
        { path: "/setting/ewon", title: "TagName" },
        { path: "/setting/oracle", title: "Oracle" },
        { path: "/setting/parameter", title: "Parameter" },
        { path: "/setting/form", title: "Form QC" },
        { path: "/setting/master-form", title: "Master Form" },
        { path: "/setting/batch-type", title: "Batch Type Control Point" },
        { path: "/setting/shift", title: "Shift Code" },
      ],
    },
  ],
  supervisor: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/user", icon: "fa fa-users", title: "User" },
    { path: "/area", icon: "fa fa-warehouse", title: "Area" },
    { path: "/control_point", icon: "fa fa-sliders-h", title: "Control Point" },
    { path: "/form", icon: "fa fa-file", title: "Form Analytic" },
    {
      path: "/setting",
      icon: "fa fa-cog",
      title: "Setting",
      children: [
        { path: "/setting/parameter", title: "Parameter" },
        { path: "/setting/form", title: "Form QC" },
        { path: "/setting/master-form", title: "Master Form" },
        { path: "/setting/batch-type", title: "Batch Type Control Point" },
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
    { path: "/form", icon: "fa fa-file", title: "Form Analytic" },
    { path: "/master-form", icon: "fa fa-file", title: "Master Form" },
    {
      path: "/setting",
      icon: "fa fa-cog",
      title: "Setting",
      children: [
        { path: "/setting/form", title: "Form QC" },
        { path: "/setting/master-form", title: "Master Form" },
      ],
    },
  ],
  inspector: [
    { path: "/home", icon: "fa fa-th", title: "Home" },
    { path: "/form", icon: "fa fa-file", title: "Form" },
  ],
};

export default sidebarMenuByRole;
</script>
