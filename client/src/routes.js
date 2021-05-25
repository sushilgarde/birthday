import MainPage from './components/MainPage.vue'
import GreetingWrapper from './components/GreetingWrapper.vue'


export const routes = [
    {path: '/', component: MainPage, params:{showTimer:true}},
    {path: '/add-greeting', component: GreetingWrapper, params:{showTimer:false}},
]