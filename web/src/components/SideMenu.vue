<template>
    <el-menu @select="handleSelect"
             @open="handleOpen"
             :default-openeds="[this.$route.params.folderName]"
             :default-active="defaultActive"
             background-color="#333333"
             text-color="#fff"
             active-text-color="#ffd04b">
        <el-submenu v-for="item in folderList" :index="item.name" :key="item.name">
            <template slot="title">
                {{item.name}}
            </template>
            <el-menu-item v-for="api in item.apis" :index="api.name" :key="api.name">{{api.name}}</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    import {mapState, mapGetters, mapActions} from "vuex"

    export default {
        name: "SideMenu",
        computed: {
            defaultActive: function () {
                return decodeURI(window.location.hash.substring(1));
            },
            ...mapState("folder", ['folderList']),
            ...mapGetters("folder", ['getApiList']),
        },
        mounted: function () {
            this.getFolderList();
            const folderName = this.$route.params.folderName;
            if (folderName != null) {
                this.getFolderApiList({folderName: folderName});
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                this.$router.replace({
                    name: 'doc',
                    params: {folderName: keyPath[0]}
                });
                window.location.href = '#' + key
            },
            handleOpen(index) {
                if (this.getApiList(index).length === 0) {
                    this.getFolderApiList({folderName: index});
                }
            },
            ...mapActions('folder', ["getFolderList", "getFolderApiList"])
        }
    }
</script>

<style scoped>

</style>