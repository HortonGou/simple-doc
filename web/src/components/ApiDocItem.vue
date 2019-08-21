<template>
    <el-card :id="title">
        <el-row>
            <el-col :offset="1" :span="10" :xs="22">
                <h1>{{title}}</h1>
                <div>{{description}}</div>
            </el-col>
            <el-col :offset="1" :span="6" :xs="22">
                <div class="api-path">
                    <el-tag class="api-method">{{method}}</el-tag>
                    {{path}}
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="1" :span="10" :xs="22">
                <h3>请求参数</h3>
                <el-table :data="request" stripe border>
                    <el-table-column prop="key" label="参数名称"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column label="必填项">
                        <template slot-scope="scope">
                            <div class="select-cnt-text">{{scope.row.required?"√":"×"}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="说明"></el-table-column>
                </el-table>
            </el-col>
            <el-col :offset="1" :span="6" :xs="22">
                <h3>请求示例</h3>
                <pre v-highlightjs="reqCode">
                    <code class="javascript"></code>
                </pre>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="1" :span="10" :xs="22">
                <h3>响应参数</h3>
                <el-table :data="response" stripe border>
                    <el-table-column prop="key" label="参数名称"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="description" label="说明"></el-table-column>
                </el-table>
            </el-col>
            <el-col :offset="1" :span="6" :xs="22">
                <h3>响应示例</h3>
                <pre v-highlightjs="resJson">
                    <code class="javascript"></code>
                </pre>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>

    export default {
        name: "ApiDocItem",
        computed: {
            reqCode: function () {
                let paramStr = "{\n";

                if (this.method.toUpperCase() === "GET"||this.method.toUpperCase() === "DELETE") {
                    this.request.forEach(value => {
                        paramStr = paramStr + "    " + "    " +value.key + ":{" + value.key + "},\n"
                    });
                    paramStr = "{\n    params:" + paramStr + "    }\n}"
                }else {
                    this.request.forEach(value => {
                        paramStr = paramStr + "    " + value.key + ":{" + value.key + "},\n"
                    });
                    paramStr += "}";
                }
                return 'axios.' + this.method.toLowerCase() + "('" + this.path + "'," + paramStr + ').then(res => {})'
            },
            resJson: function () {
                let paramStr = "{\n";
                this.response.forEach(value => {
                    paramStr = paramStr + "    " + value.key + ":{" + value.key + "},\n"
                });
                paramStr += "}";
                return paramStr
            }
        },
        props: {
            title: String,
            path: String,
            method: String,
            description: String,
            request: Array,
            response: Array
        }
    }

</script>

<style scoped>
    .el-card {
        margin: 20px;
        background: #eaeae0;
    }

    .api-path {
        background: black;
        color: white;
        border-radius: 5px;
        margin-top: 30px;
    }

    .api-method {
        margin: 5px 8px;
    }

    pre {
        margin: 0;
    }

    code {
        border-radius: 5px;
    }

</style>