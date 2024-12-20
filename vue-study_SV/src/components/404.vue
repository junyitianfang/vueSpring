<template>
    <div style="text-align: center;">
        
        <div>
            <el-button type="primary" style="width: 150px;height: 60px;"
            @click="gohome">
                请返回首页
            </el-button>
        </div>
        <img src="@/assets/404bl.png" alt="">
    </div>
</template>


<script lang="ts" setup>
import router from '@/router';

    const gohome = () => {
        location.href='/'
    }
</script>