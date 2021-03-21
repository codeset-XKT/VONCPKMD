import Vue from 'vue'
import Router from 'vue-router'
import PreLoading from '../components/PreLoading'
import Main from '../components/Main'
import Home from '../components/home'
import Tab1 from '../components/tab1'
import Tab2 from '../components/tab2'
import Tab3 from '../components/tab3'
import Tab4 from '../components/tab4'
import chinaCurrent from '../components/tab1_chinaCurrent'
import chinaTrend from '../components/tab1_chinaTrend'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/preloading'
    }, {
        path: '/preloading',
        name: 'preloading',
        component: PreLoading
    }, {
        path: '/main',
        redirect: '/main/home',
        name: 'main',
        component: Main,
        children: [{
            path: 'home',
            name: 'home',
            component: Home
        }, {
            path: 'tab1',
            redirect: 'tab1/chinaCurrent',
            name: 'tab1',
            children: [{
                path: 'chinaCurrent',
                name: 'chinaCurrent',
                component: chinaCurrent
            }, {
                path: 'chinaTrend',
                name: 'chinaTrend',
                component: chinaTrend
            }],
            component: Tab1
        }, {
            path: 'tab2',
            name: 'tab2',
            component: Tab2,
        }, {
            path: 'tab3',
            name: 'tab3',
            component: Tab3
        }, {
            path: 'tab4',
            name: 'tab4',
            component: Tab4
        }]
    }]
})