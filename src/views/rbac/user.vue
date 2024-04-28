<template>
  <div>
    <el-row>
      <el-col :span="2" :offset="2">
        <el-button type="primary" @click="dialogVisible = true">
          +添加
        </el-button>
      </el-col>
      <el-col :span="8" :offset="4">
        <el-input placeholder="请输入内容" v-model="userName">
          <template slot="prepend">用户名</template>
        </el-input>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="primary" @click="searchList">
          搜索
        </el-button>
      </el-col>
    </el-row>
    <el-row :span="24">
      <el-col :span="20" :offset="2">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="ID"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="昵称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="role.name"
            label="角色">
          </el-table-column>
          <el-table-column
            prop="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateUser(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-row>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input placeholder="请输入用户名" v-model="newUser.name">
        <template slot="prepend">用户名</template>
      </el-input>
      <el-input placeholder="请输入密码" v-model="newUser.password">
        <template slot="prepend">密码</template>
      </el-input>
      <el-input placeholder="请输入手机号" v-model="newUser.phone">
        <template slot="prepend">手机号</template>
      </el-input>
      角色:
      <el-select v-model="newUser.role_id" placeholder="请选择">
        <el-option
          v-for="item in roleData"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="addUser">提交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      dialogTitle: '添加用户',
      userName: '',
      page: 0,
      pageSize: 10,
      total: 0,
      tableData: [],
      roleData: [],
      dialogVisible: false,
      newUser: {
        id: 0,
        name: '',
        password: '',
        phone: '',
        role_id: 0
      }
    }
  },
  mounted() {
    this.searchList()
    this.searchRoleList()
  },
  methods: {
    searchList() {
      api.rbac.user_list({ user_name: this.userName, page: this.page, page_size: this.pageSize }).then(rsp => {
        this.tableData = rsp.data
        this.total = rsp.count
      })
    },
    searchRoleList() {
      api.rbac.role_list({ page: 0, page_size: 99999 }).then(rsp => {
        this.roleData = rsp.data
      })
    },
    resetUserData() {
      this.newUser = {
        id: 0,
        name: '',
        password: '',
        phone: '',
        role_id: 0
      }
    },
    addUser() {
      api.rbac.user_add(this.newUser).then(rsp => {
        this.dialogVisible = false
        this.searchList()
        this.resetUserData()
      })
    },
    updateUser(row) {
      this.newUser.id = row.id
      this.getUser(row.id)
      this.dialogTitle = '修改用户'
      this.dialogVisible = true
    },
    getUser(id) {
      api.rbac.user_info({ user_id: id }).then(rsp => {
        this.newUser.name = rsp.name
        this.newUser.password = rsp.password
        this.newUser.phone = rsp.phone
        this.newUser.role_id = rsp.role.id
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.dialogVisible = false
          done()
        })
        .catch(_ => {
        })
    }
  }
}

</script>

<style scoped>
.el-row {
  margin-top: 20px;
}

.el-pagination {
  text-align: center;
}

.el-input {
  margin-bottom: 20px;
}

.el-select {
  margin-left: 30px;
}

</style>