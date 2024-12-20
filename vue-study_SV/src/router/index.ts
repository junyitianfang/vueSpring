import {createRouter,createWebHistory} from 'vue-router'
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/404',
            name:'404',
            component:()=>import('@/components/404.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/404'
        },
        {
            path:'/home',
            name:'home',
            component:()=>import('@/components/Home.vue'),
            children:[
                {
                    path:'employee',
                    component:()=>import('@/components/employee.vue')
                }
            ]
        },
    ]
})
export default router