<template>
    <div>
       <!--头部-->
       <div style="height: 60px;background-color: aqua">
           <div style="display: flex;justify-content: space-between;align-items: center;height: 100%;padding: 0 10px;">
               <div style="display: flex;align-items: center;">
                    <img src="@/assets/404bl.png" alt="" style="width: 50px;height: 50px;margin-right: 10px;">
                   <el-icon style="margin-right: 10px;">
                       <location/>
                   </el-icon>
                   <span>首页</span>
               </div>
           </div>
       </div>
       <!--下部-->
       <div style="display: flex;">
            <!--左边menu-->
           <div style="width: 200px;border-right: 1px solid #ddd;min-height: calc(100vh - 60px)">
            <el-menu router :default-active="router.currentRoute.value.path"  style="border: 0;">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <location/>
                        </el-icon>
                        系统管理
                    </template>
                    <el-menu-item >系统首页</el-menu-item>
                    <el-menu-item >数据统计</el-menu-item>
                    <el-menu-item  index="/home/employee">用户管理</el-menu-item>
                </el-sub-menu>
            </el-menu>
           </div>
            <!--右边内容-->
           <div style="flex:1;width: 0;background-color: beige;">
            <RouterView />
           </div>
       </div>

    </div>
</template>


<script lang="ts" setup>
import { Location } from '@element-plus/icons-vue';
import request from '@/utils/request.ts';
import {reactive} from "vue";
import router from '@/router';
    const click = () => {
        alert("hello")
    }
    const data=reactive({
        list:[]
    })
    
</script>