import { ConfigOption } from './core/entry/index';
import { HomeOutlined } from '@ant-design/icons';
import Home from './pages/Home/Home';

const config:ConfigOption = {
    homepage:'home',
    pages:[{
        name:'home',
        title:'主页',
        render:Home,
        showMenu:true,
        icon:HomeOutlined,
    }]
}

export default config;