import Vue from "vue"
import Router from "vue-router"
import Home from "@/components/Home"
import NotFound from "@/components/error-pages/NotFound"

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

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "*",
      name: "NotFound",
      component: NotFound
    },
    {
      name: "product/create",
      path: "/product/create",
      component: ProductAddEditComponent
    },
    {
      name: "product/edit",
      path: "/product/edit/{id}",
      component: ProductAddEditComponent
    },
    {
      name: "products",
      path: "/products",
      component: ProductIndexComponent
    },
    {
      name: "edit",
      path: "/edit/:id",
      component: ProductAddEditComponent
    },
    {
      name: "status/create",
      path: "/status/create",
      component: StatusAddEditComponent
    },
    {
      name: "statuses",
      path: "/statuses",
      component: StatusIndexComponent
    },
    {
      name: "status/update",
      path: "/status/update/{id}",
      component: StatusIndexComponent
    },
    {
      name: "status/edit",
      path: "/status/edit/{id}",
      component: StatusAddEditComponent
    },
    {
      name: "postcities",
      path: "/postcities",
      component: PostcityIndexComponent
    },
    {
      name: "postcity/create",
      path: "/postcity/create",
      component: PostcityAddEditComponent
    },
    {
      name: "postcity/update",
      path: "/postcity/update/{id}",
      component: PostcityAddEditComponent
    },
    {
      name: "postcity/edit",
      path: "/postcity/edit/{id}",
      component: PostcityAddEditComponent
    },
    {
      name: "brand/create",
      path: "/brand/create",
      component: BrandAddEditComponent
    },
    {
      name: "brands",
      path: "/brands",
      component: BrandIndexComponent
    },
    {
      name: "brand/update",
      path: "/brand/update/{id}",
      component: BrandIndexComponent
    },
    {
      name: "brand/edit",
      path: "/brand/edit/{id}",
      component: BrandAddEditComponent
    },
    {
      name: "supplier/create",
      path: "/supplier/create",
      component: SupplierAddEditComponent
    },
    {
      name: "suppliers",
      path: "/suppliers",
      component: SupplierIndexComponent
    },
    {
      name: "supplier/update",
      path: "/supplier/update/{id}",
      component: SupplierIndexComponent
    },
    {
      name: "supplier/edit",
      path: "/supplier/edit/{id}",
      component: SupplierAddEditComponent
    },
    {
      name: "categories",
      path: "/categories",
      component: CategoryIndexComponent
    },
    {
      name: "locations",
      path: "/locations",
      component: LocationIndexComponent
    },
    {
      name: "quality/create",
      path: "/quality/create",
      component: QualityAddEditComponent
    },
    {
      name: "qualities",
      path: "/qualities",
      component: QualityIndexComponent
    },
    {
      name: "quality/update",
      path: "/quality/update/{id}",
      component: QualityIndexComponent
    },
    {
      name: "quality/edit",
      path: "/quality/edit/{id}",
      component: QualityAddEditComponent
    },
    {
      name: "country/create",
      path: "/country/create",
      component: CountryAddEditComponent
    },
    {
      name: "countries",
      path: "/countries",
      component: CountryIndexComponent
    },
    {
      name: "country/update",
      path: "/country/update/{id}",
      component: CountryIndexComponent
    },
    {
      name: "country/edit",
      path: "/country/edit/{id}",
      component: CountryAddEditComponent
    },
    {
      name: "metric/create",
      path: "/metric/create",
      component: MetricAddEditComponent
    },
    {
      name: "metrics",
      path: "/metrics",
      component: MetricIndexComponent
    },
    {
      name: "metric/update",
      path: "/metric/update/{id}",
      component: MetricIndexComponent
    },
    {
      name: "metric/edit",
      path: "/metric/edit/{id}",
      component: MetricAddEditComponent
    }
  ]
})
