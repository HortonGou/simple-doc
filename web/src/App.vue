<template>
    <div id="app">
        <el-container>
            <el-header>api-doc</el-header>
            <el-main>
                <SideMenu class="side-menu"></SideMenu>
                <router-view class="main"></router-view>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
</template>

<script>
    import SideMenu from "./components/SideMenu";
    import { mapActions} from "vuex"
    // 打开一个WebSocket:
    const ws = new WebSocket('ws://' + window.location.hostname + ':3001');

    export default {
        name: "app",
        components: {SideMenu},
        mounted:function () {
            // 响应onmessage事件:
            ws.onmessage = function (msg) {
                if (msg.data === "refresh") {
                    console.log("refresh")
                    this.refresh();
                }
            }.bind(this);
        },
        methods: {
            ...mapActions('folder', ["refresh"])
        }

    };
</script>

<style>

    body {
        margin: 0;
    }

    .el-header {
        line-height: 60px;
        color: white;
        background: #333333;
    }

    .el-main {
        height: 100%;
        min-height: 849px;
        max-height: 849px;
        position: relative;
        background: #333333;
    }

    .el-footer {
        color: white;
        background: #333333;
    }

    .el-aside {
        color: white;
        background: #333333;
    }

    .side-menu {
        min-width: 200px;
        position: fixed;
        left: 0;
        top: 60px;
        z-index: 100;
    }

    .main {
        margin-left: 200px;
    }

    #app {
        height: 100%;
    }
</style>
