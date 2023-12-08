import RegisterPage from "../pages/user/RegisterPage/RegisterPage";
import LoginPage from "../pages/user/LoginPage/LoginPage";
import HomePage from "../pages/user/HomePage/HomePage";
import SuccessPage from "../pages/user/HomePage/Success";
import PendingPage from "../pages/user/HomePage/Pending";
import ProfilePage from "../pages/user/HomePage/Profile";
import ActivityDetailPage from "../pages/user/HomePage/ActivityDetailPage";
import LeaderHomePage from "../pages/leader/LeaderHomePage/LeaderHomePage";
import ManageStudents from "../pages/leader/ManageStudents/ManageStudents";
import AdminHomePage from "../pages/admin/AdminHomePage/AdminHomePage";
import AdminManageProjects from "../pages/admin/AdminManageProjects/AdminManageProjects";
import ForgotPage from "../pages/user/ForgotPage/ForgotPage";

const routes = [
  {
    path: "/",
    component: LoginPage,
  },
  {
    path: "/user/register",
    component: RegisterPage,
  },
  {
    path: "/user/login",
    component: LoginPage,
  },
  {
    path: "/user/home",
    component: HomePage,
  },
  {
    path: "/user/home/detail",
    component: ActivityDetailPage,
  },
  {
    path: "/user/success",
    component: SuccessPage,
  },
  {
    path: "/user/pending",
    component: PendingPage,
  },
  {
    path: "/user/profile",
    component: ProfilePage,
  },
  {
    path: "/user/forgot",
    component: ForgotPage,
  },
  {
    path: "/leader/home",
    component: LeaderHomePage,
  },
  {
    path: "/leader/manage-student",
    component: ManageStudents,
  },
  {
    path: "/admin/home",
    component: AdminHomePage,
  },
  {
    path: "/admin/manage-project",
    component: AdminManageProjects,
  },
];

export default routes;
