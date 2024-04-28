<template>
  <div>
    <el-row>
      <el-col :span="2" :offset="2">
        <el-button type="primary" @click="dialogVisible = true">
          +添加
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
            label="ID">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" size="small">编辑</el-button>
              <el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>
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
      title="添加角色"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input placeholder="请输入角色名称" v-model="newRole.name">
        <template slot="prepend">角色名</template>
      </el-input>
      <el-tree
        :data="permissionData"
        node-key="id"
        show-checkbox
        default-expand-all
        :expand-on-click-node="false"
        @check="handleCheckChange">
      </el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="addRole">提交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'

export default {
  data() {
    return {
      page: 0,
      pageSize: 10,
      total: 0,
      tableData: [],
      permissionData: '',
      dialogVisible: false,
      newRole: {
        id: 0,
        name: '',
        permission: []
      },
      childNodeMapping: {}
    }
  },
  mounted() {
    this.searchList()
    this.searchPermissionList()
  },
  methods: {
    handleCheckChange(data, obj) {
      this.newRole.permission = obj.checkedKeys
      for (let i = 0; i < obj.checkedKeys.length; i++) {
        if (!this.newRole.permission.includes(this.childNodeMapping[obj.checkedKeys[i]])) {
          this.newRole.permission.push(this.childNodeMapping[obj.checkedKeys[i]])
        }
      }
    },
    searchList() {
      api.rbac.role_list({ page: this.page, page_size: this.pageSize }).then(rsp => {
        this.tableData = rsp.data
        this.total = rsp.count
      })
    },
    searchPermissionList() {
      api.rbac.permission_list().then(rsp => {
        this.permissionData = JSON.parse(JSON.stringify(rsp))
        for (let i = 0; i < this.permissionData.length; i++) {
          for (let j = 0; j < this.permissionData[i].children.length; j++) {
            this.childNodeMapping[this.permissionData[i].children[j].id] = this.permissionData[i].id
          }
        }
      })
    },
    resetRoleData() {
      this.newRole = {
        id: 0,
        name: '',
        permission: []
      }
    },
    addRole() {
      api.rbac.role_add(this.newRole).then(rsp => {
        this.searchPermissionList()
        this.searchList()
        this.dialogVisible = false
        this.resetRoleData()
      })
    },
    deleteRole(row) {
      this.$confirm('此操作将删除该角色,删除后拥有该角色的用户将无法使用, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.rbac.role_delete({ id: row.id }).then(rsp => {
          this.searchPermissionList()
          this.searchList()
          this.dialogVisible = false
          this.resetRoleData()
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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

</style>