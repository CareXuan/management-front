<template>
  <div>
    <el-row>
      <el-col :span="20" :offset="1">
        <el-tree
          :data="permissionData"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </el-col>
    </el-row>
    <el-dialog
      title="添加权限"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="dialogParentNode.label" disabled>
        <template slot="prepend">父级节点</template>
      </el-input>
      <el-input placeholder="请输入节点名称" v-model="newChild.label">
        <template slot="prepend">节点名称</template>
      </el-input>
      <el-input placeholder="请输入path" v-model="newChild.path">
        <template slot="prepend">path</template>
      </el-input>
      <el-input placeholder="请输入图标" v-model="newChild.icon">
        <template slot="prepend">图标</template>
      </el-input>
      <el-input placeholder="请输入排序号" v-model="newChild.sort">
        <template slot="prepend">排序</template>
      </el-input>
      <el-input placeholder="请输入描述" v-model="newChild.desc">
        <template slot="prepend">描述</template>
      </el-input>
      <el-input placeholder="请输入组件" v-model="newChild.component">
        <template slot="prepend">组件</template>
      </el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="append">添加</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'

let id = 1000

export default {
  data() {
    return {
      permissionData: '',
      dialogVisible: false,
      dialogParentNode: {
        id: 0,
        label: '',
        children: []
      },
      newChild: {
        id: 0,
        label: '',
        path: '',
        icon: '',
        sort: 100,
        desc: '',
        component: ''
      }
    }
  },
  mounted() {
    this.searchPermissionList()
  },
  methods: {
    append() {
      this.newChild.parent_id = this.dialogParentNode.id
      api.rbac.permission_add(this.newChild).then(rsp => {
        this.dialogVisible = false
        this.searchPermissionList()
        this.resetNodeAdd()
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={() => this.openAddDialog(data)}>添加子节点</el-button>
              <el-button size="mini" type="text" on-click={() => this.remove(data)}>删除</el-button>
            </span>
          </span>)
    },
    openAddDialog(data) {
      this.dialogVisible = true
      this.dialogParentNode = data
    },
    remove(data) {
      this.$confirm('此操作将删除该节点及其子节点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.rbac.permission_delete({ id: data.id }).then(rsp => {
          this.searchPermissionList()
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
    searchPermissionList() {
      api.rbac.permission_list().then(rsp => {
        let data = [{
          id: 0,
          label: '根节点',
          children: rsp
        }]
        this.permissionData = JSON.parse(JSON.stringify(data))
      })
    },
    resetNodeAdd() {
      this.newChild = {
        id: 0,
        label: '',
        path: '',
        icon: '',
        sort: 0,
        desc: '',
        component: ''
      }
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-input {
  margin-bottom: 20px;
}
</style>