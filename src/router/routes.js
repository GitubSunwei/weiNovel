export const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('../views/Main.vue'),

        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('../views/mainViews/Home.vue')
            },
            {
                path: 'paihang',
                name: 'PaiHang',
                component: () => import('../views/mainViews/PaiHang.vue')
            },
            {
                path: 'bookcity',
                name: 'BookCity',
                component: () => import('../views/mainViews/BookCity.vue')
            },
            {
                path: 'search',
                name: 'Search',
                component: () => import('../views/mainViews/Search.vue')
            },
            {
                path: 'my',
                name: 'My',
                component: () => import('../views/mainViews/My.vue')
            }
        ]
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import('../views/Detail.vue')
    },
    {
        path: '/classchildren',
        name: 'ClassChildren',
        component: () => import('../views/ClassChildren.vue')
    },
    {
        path: '/cataloglist',
        name: 'CatalogList',
        component: () => import('../views/CatalogList.vue')
    },
    {
        path: '/Reader',
        name: 'Reader',
        component: () => import('../views/Reader.vue')
    },
    {
        path: '/relevant',
        name: 'Relevant',
        component: () => import('../views/Relevant.vue')
    },
    // 重定向
    {
        path: '*',
        redirect: {
            name: 'BookCity'
        }
    }

]