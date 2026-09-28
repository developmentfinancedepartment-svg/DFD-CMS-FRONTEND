import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "../Stores/authStore";
import LoggingPage from "../components/Login.vue";
import HomePage from "../components/Home.vue";
import ActionPlan from "../components/ActionPlan.vue";
import PerformanceReport from "../components/PerformanceReport.vue";
import HomeView from "../components/HomeView.vue";
import Events from "../components/Events.vue";
import News from "../components/News.vue";
import HardwareSpecification from "../components/HardwareSpecification.vue";
import PageNotFound from "../components/PageNotFound.vue";
import Staff from "@/components/Staff.vue";
import StaffCategory from "@/components/StaffCategory.vue";
import StaffMember from "@/components/StaffMember.vue";
import EditStaff from "@/components/EditStaff.vue";
import AdminManagement from "@/components/AdminManagement.vue"
import AuditLogs from "@/components/AuditLogs.vue"


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // ... existing routes ...
    {
      path: "/login",
      name: "login",
      component: LoggingPage,
      meta: {
        title: "Login|CMS",
        requiresAuth: false,
      },
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/home",
      name: "home",
      redirect: "/home/view",
    },
    {
      path: "/home/staff",
      redirect: "/home/staff/category",
    },
    {
      path: "/home",
      component: HomePage,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "staff",
          name: "staff-home",
          component: Staff,
          meta: {
            title: "Staff Details",
            requiresAuth: true,
          },
          children: [
            {
              path: "members",
              name: "members-staff",
              component: StaffMember,
              meta: {
                title: "Staff Member",
                requiresAuth: true,
              },
            },
            {
              path: "category",
              name: "category-staff",
              component: StaffCategory,
              meta: {
                title: "Manage Category",
                requiresAuth: true,
              },
            },
            {
              path: "view-edit-staff",
              name: "view-edit-staff",
              component: EditStaff,
              meta: {
                title: "View Edit Staff",
                requiresAuth: true,
              },
            },
          ],
        },
        {
          path: "hardware_spec",
          name: "hardware-specification",
          component: HardwareSpecification,
          meta: {
            title: "Hardware Specification",
            requiresAuth: true,
          },
        },
        {
          path: "view",
          name: "view-home",
          component: HomeView,
          meta: {
            title: "Home",
            requiresAuth: true,
          },
        },
        {
          path: "action",
          name: "action-home",
          component: ActionPlan,
          meta: {
            title: "Action Plan",
            requiresAuth: true,
          },
        },
        {
          path: "performance",
          name: "performance-home",
          component: PerformanceReport,
          meta: {
            title: "Performance Report",
            requiresAuth: true,
          },
        },
        {
          path: "event",
          name: "event-home",
          component: Events,
          meta: {
            title: "Events",
            requiresAuth: true,
          },
        },
        {
          path: "news",
          name: "news-home",
          component: News,
          meta: {
            title: "News",
            requiresAuth: true,
          },
        },
        {
          path: "admin-management",
          name: "admin-management",
          component: AdminManagement,
          meta: {
            title: "Admin Management",
            requiresAuth: true,
            requiresSuperAdmin: true,
          }
        },
        {
          path: "audit-logs",
          name: "audit-logs",
          component: AuditLogs,
          meta: {
            title: "Audit Logs",
            requiresAuth: true,
            requiresSuperAdmin: true,
          }
        }
      ],

    },
    {
      path: "/:catchAll(.*)",
      name: "notFound",
      component: PageNotFound,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();  
  
  // 1. Check authentication for protected routes
  if (to.meta.requiresAuth) {
    if (!authStore.accessToken) {
      next('/login');
      return;
    }
    
    // 2. Check Role requirements
    if (to.meta.requiresSuperAdmin && !authStore.isSuperAdmin) {
      alert("Access Denied: Super Admin privileges required.");
      next('/home/view'); // Redirect to home if not super admin
      return;
    }
    
    next();
  } else {
    next();
  }
});

export default router;
