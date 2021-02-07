import { ConfigOption } from './core/entry/index'
import Home from './pages/Home/Home';

const config:ConfigOption = {
    homepage:'home',
    pages:[{
        name:'home',
        title:'主页',
        render:Home,
        showMenu:true
    }]
}

export default config;