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
        :expand-on-click-node="false">
      </el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="dialogVisible = false">提交</el-button>
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
        name: '',
        permission: []
      }
    }
  },
  mounted() {
    this.searchList()
    this.searchPermissionList()
  },
  methods: {
    searchList() {
      api.rbac.role_list({ page: this.page, page_size: this.pageSize }).then(rsp => {
        this.tableData = rsp.data
        this.total = rsp.count
      })
    },
    searchPermissionList() {
      api.rbac.permission_list().then(rsp => {
        this.permissionData = JSON.parse(JSON.stringify(rsp))
      })
    },
    resetRoleData() {
      this.newUser = {
        name: '',
        permission: []
      }
    },
    addRole() {

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