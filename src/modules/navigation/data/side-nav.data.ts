import { components } from '@common/components';
import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'INTERFACE',
        items: [
            'user',
            'category',
            'localtion_rk',
            'company',
            // 'layouts',
            // 'pages',
            'supplier',
            'tax',
            'product',
            'product_purchase',
            'order',
            'logout'
        ],
    },
    // {
    //     text: 'ADDONS',
    //     items: ['charts', 'tables'],
    // },

];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    user: {
        icon: 'columns',
        text: 'Users',
        link: '/users',

    },
    category: {
        icon: 'columns',
        text: 'Category',
        link: '/category',

    },
    localtion_rk: {
        icon: 'columns',
        text: 'Location Rack',
        link: '/location'
    },
    company: {
        icon: 'columns',
        text: 'Company',
        link: '/company',

    },
    supplier: {
        icon: 'columns',
        text: 'Supplier',
        link:'/supplier'


    },
    tax: {
        icon: 'columns',
        text: 'Tax',
        link:'/tax'

    },
    product: {
        icon: 'columns',
        text: 'Product',
        link:'/product'
    },
    product_purchase: {
        icon: 'columns',
        text: 'Product purchase',
        link:'/purchase-product'


    },
    order: {
        icon: 'columns',
        text: 'Order',
        link:'/orders'

    },

    logout: {
        icon: 'columns',
        text: 'Logout',

    },
    layouts: {
        icon: 'columns',
        text: 'Layouts',
        submenu: [
            {
                text: 'Static Navigation',
                link: '/dashboard/static',
            },
            {
                text: 'Light Sidenav',
                link: '/dashboard/light',
            },
        ],
    },
    pages: {
        icon: 'book-open',
        text: 'Pages',
        submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ],
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                    },
                ],
            },
        ],
    },
    // charts: {
    //     icon: 'chart-area',
    //     text: 'Charts',
    //     link: '/charts',
    // },
    // tables: {
    //     icon: 'table',
    //     text: 'Tables',
    //     link: '/tables',
    // },
};



