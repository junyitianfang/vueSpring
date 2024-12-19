<template>
  <div>
    <div class="card" style="margin-bottom: 5px;">
      <el-input style="width: 240px;margin-right: 10px;"
       v-model="employee.test" placeholder="请输入名称查询"
       prefix-icon="Search">
      </el-input>
      <el-button type="primary" @click="load" >查询</el-button>
      <el-button type="primary" @click="upset" >重置</el-button>
    </div>
    <div class="card" style="margin-bottom: 5px;">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button type="warning" @click="delBatch">批量删除</el-button>
      <el-button type="sucess" >导出</el-button>
      <el-button type="info" >导入</el-button>
    </div >
    <div class="card" style="margin-bottom: 5px;">
      <el-table :data="employee.tableData" stripe 
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="sex" label="性别" width="180" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip/>
        <el-table-column prop="deptId" label="部门编号" />
        <el-table-column label="操作">
          <template #default="scope" >
            <el-button type="primary" size="mini" @click="hadnleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="dele(scope.row.id)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;">
        <el-pagination
          @current-change="load"
          @size-change="load"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="employee.total"
          :page-sizes="[5, 10, 20]"
          v-model:current-page="employee.page"
          v-model:page-size="employee.pageSize"
          />
      </div>
    </div>
      <el-dialog v-model="employee.FormVisible" title="员工信息" width="500">
        <el-form :model="employee.form" label-width="80px" style="padding-right: 40px;padding-top: 20px;">
          <el-form-item label="员工名称" >
            <el-input v-model="employee.form.name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="年龄" >
            <el-input v-model="employee.form.age" autocomplete="off" />
          </el-form-item>
          <el-form-item label="性别" >
            <el-radio-group v-model="employee.form.sex">
              <el-radio value="男" label="男"></el-radio>
              <el-radio value="女" label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="描述" >
            <el-input :rows="3" type="textarea" v-model="employee.form.description" autocomplete="off" />
          </el-form-item>
          <el-form-item label="部门编号" >
            <el-input  v-model="employee.form.deptId" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="employee.FormVisible = false">取消</el-button>
            <el-button type="primary" @click="save">
              保存
            </el-button>
          </div>
        </template>
    </el-dialog>
  </div>
    
</template>

<script lang="ts" setup>
  import request from '@/utils/request';
  import { Edit } from '@element-plus/icons-vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import {reactive} from "vue";
  const employee = reactive({
    page:1,
    pageSize:10,
    test:null,
    total:0,
    FormVisible:false,
    form:{
      id:null,
      name:null,
      sex:null,
      age:null,
      description:null,
      deptId:null
    },
    tableData: [],
    ids:[]
  })
  const load =() =>{
    request.get('/employee/selectPage',{
    params:{
        page:employee.page,
        size:employee.pageSize,
        name:employee.test
    }
  }).then(res=>{
        employee.tableData=res.data.list
        employee.total=res.data.total
    })
  }
  load()
  const upset =() =>{
    employee.test=null
    load()
  }
  const handleAdd =() =>{
    employee.FormVisible=true,
    employee.form={
      name:null,
      sex:null,
      age:null,
      description:null,
      deptId:null
    }
  }
  const hadnleUpdate =(row:any) =>{
    employee.form=JSON.parse(JSON.stringify(row))
    employee.FormVisible=true
  }
  //在一个保存方法中作两个操作一个是添加一个是修改
  const save =() =>{
    if(employee.form.id){
      edit()
    }else{
      add()
    }
  }
  const add =() =>{
    request.post('/employee/add',employee.form).then(res=>{
      if(res.code==200){
        employee.FormVisible=false
        ElMessage.success('添加成功')
        load()
      }else{
        ElMessage.error(res.msg)
      }
      console.log(res)
    
    })
  }
  const edit =() =>{
    request.put('/employee/update',employee.form).then(res=>{
      if(res.code==200){
        employee.FormVisible=false
        ElMessage.success('修改成功')
        load()
      }else{
        ElMessage.error(res.msg)
      }
      console.log(res)
    })
  }
  
  const dele =(id:any) =>{
    request.delete('/employee/deleteById/'+id).then(res=>{
      if(res.code==200){
        ElMessage.success('删除成功')
        load()
      }else{
        ElMessage.error(res.msg)
      }
      console.log(res)
    }
  )
  }
  const handleSelectionChange =(val:any) =>{
    console.log(val)
    employee.ids=val.map((item:any)=>{
      return item.id
    })
  }
  const delBatch =() =>{
    if(employee.ids.length==0){
      ElMessage.warning('请选择要删除的员工')
      return
    }
    ElMessageBox.confirm('确认删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      request.delete('/employee/deleteByIds',{
      data:employee.ids
    }).then(res=>{
      if(res.code==200){
        ElMessage.success('删除成功')
        load()
      }else{
        ElMessage.error(res.msg)
      }
      console.log(res)
    })}).catch(() => {
      ElMessage.info('已取消删除')
    });
    
  }
</script>

<style>
</style>