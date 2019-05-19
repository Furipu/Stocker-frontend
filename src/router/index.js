import Vue from "vue"
import Router from "vue-router"
import Home from "@/components/Home"
import NotFound from "@/components/error-pages/NotFound"
import Auth from "@okta/okta-vue"

import ProductIndexComponent from "@/components/Product/IndexComponent.vue"
import ProductAddEditComponent from "@/components/Product/AddEditComponent.vue"

import StatusIndexComponent from "@/components/status/IndexComponent.vue"
import StatusAddEditComponent from "@/components/Status/AddEditComponent.vue"

import PostcityIndexComponent from "@/components/Postcity/IndexComponent.vue"
import PostcityAddEditComponent from "@/components/Postcity/AddEditComponent.vue"

import BrandIndexComponent from "@/components/Brand/IndexComponent.vue"
import BrandAddEditComponent from "@/components/Brand/AddEditComponent.vue"

import SupplierIndexComponent from "@/components/Supplier/IndexComponent.vue"
import SupplierAddEditComponent from "@/components/Supplier/AddEditComponent.vue"

import CategoryIndexComponent from "@/components/Category/IndexComponent.vue"

import LocationIndexComponent from "@/components/Location/IndexComponent.vue"

import QualityIndexComponent from "@/components/Quality/IndexComponent.vue"
import QualityAddEditComponent from "@/components/Quality/AddEditComponent.vue"

import CountryIndexComponent from "@/components/Country/IndexComponent.vue"
import CountryAddEditComponent from "@/components/Country/AddEditComponent.vue"

import MetricIndexComponent from "@/components/Metric/IndexComponent.vue"
import MetricAddEditComponent from "@/components/Metric/AddEditComponent.vue"

import UserIndexComponent from "@/components/User/IndexComponent.vue"
import UserAddEditComponent from "@/components/User/AddEditComponent.vue"

Vue.use(Router)
Vue.use(Auth, {
  issuer: "https://dev-674202.okta.com/oauth2/default",
  client_id: "0oam0g76aDg8pNhIH356",
  redirect_uri: "http://localhost:8080/implicit/callback",
  scope: "openid profile email"
})

let router = new Router({
  mode: "history",
  routes: [
    { path: "/implicit/callback", component: Auth.handleCallback() },
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    },
    {
      name: "product/create",
      path: "/product/create",
      component: ProductAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "product/edit",
      path: "/product/edit/{id}",
      component: ProductAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "products",
      path: "/products",
      component: ProductIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "edit",
      path: "/edit/:id",
      component: ProductAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "status/create",
      path: "/status/create",
      component: StatusAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "statuses",
      path: "/statuses",
      component: StatusIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "status/update",
      path: "/status/update/{id}",
      component: StatusIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "status/edit",
      path: "/status/edit/{id}",
      component: StatusAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "postcities",
      path: "/postcities",
      component: PostcityIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "postcity/create",
      path: "/postcity/create",
      component: PostcityAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "postcity/update",
      path: "/postcity/update/{id}",
      component: PostcityAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "postcity/edit",
      path: "/postcity/edit/{id}",
      component: PostcityAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "brand/create",
      path: "/brand/create",
      component: BrandAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "brands",
      path: "/brands",
      component: BrandIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "brand/update",
      path: "/brand/update/{id}",
      component: BrandIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "brand/edit",
      path: "/brand/edit/{id}",
      component: BrandAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "supplier/create",
      path: "/supplier/create",
      component: SupplierAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "suppliers",
      path: "/suppliers",
      component: SupplierIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "supplier/update",
      path: "/supplier/update/{id}",
      component: SupplierIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "supplier/edit",
      path: "/supplier/edit/{id}",
      component: SupplierAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "categories",
      path: "/categories",
      component: CategoryIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "locations",
      path: "/locations",
      component: LocationIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "quality/create",
      path: "/quality/create",
      component: QualityAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "qualities",
      path: "/qualities",
      component: QualityIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "quality/update",
      path: "/quality/update/{id}",
      component: QualityIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "quality/edit",
      path: "/quality/edit/{id}",
      component: QualityAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "country/create",
      path: "/country/create",
      component: CountryAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "countries",
      path: "/countries",
      component: CountryIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "country/update",
      path: "/country/update/{id}",
      component: CountryIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "country/edit",
      path: "/country/edit/{id}",
      component: CountryAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "metric/create",
      path: "/metric/create",
      component: MetricAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "metrics",
      path: "/metrics",
      component: MetricIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "metric/update",
      path: "/metric/update/{id}",
      component: MetricIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "metric/edit",
      path: "/metric/edit/{id}",
      component: MetricAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "user/create",
      path: "/user/create",
      component: UserAddEditComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "users",
      path: "/users",
      component: UserIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "user/update",
      path: "/user/update/{id}",
      component: UserIndexComponent,
      meta: {
        requiresAuth: true
      }
    },
    {
      name: "user/edit",
      path: "/user/edit/{id}",
      component: UserAddEditComponent,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
