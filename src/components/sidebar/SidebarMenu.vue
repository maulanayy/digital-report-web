<script>
const sidebarMenu = [
  { path: "/user", icon: "fa fa-users", title: "User" },
  { path: "/lab", icon: "fa fa-flask", title: "Lab" },
  { path: "/area", icon: "fa fa-warehouse", title: "Area" },
  { path: "/control_point", icon : "fa fa-sliders-h", title: "Control Point" },
  {
    path: "/setting",
    icon: "fa fa-cog",
    title: "Setting",
    children: [
      { path: "/setting/ewon", title: "Ewon" },
      { path: "/setting/oracle", title: "Oracle" },
      { path: "/setting/role", title: "Role" },
      { path: "/setting/permission", title: "Permission" },
    ],
  },
  {
    path: "/dashboard/v2",
    icon: "fa fa-th",
    title: "Dashboard",
    children: [
      { path: "/dashboard/v1", title: "Dashboard v1" },
      { path: "/dashboard/v2", title: "Dashboard v2" },
      { path: "/dashboard/v3", title: "Dashboard v3" },
    ],
  },
  
];

export default sidebarMenu;
</script>
