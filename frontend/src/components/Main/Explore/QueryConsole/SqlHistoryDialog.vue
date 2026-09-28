<template>
  <el-dialog
    v-if="visible"
    title="SQL历史"
    :visible.sync="iVisible"
    width="50%"
    :modal="false"
  >
    <span>
      <el-table :data="items" empty-text=" ">
        <el-table-column label="时间" width="170px">
          <template slot-scope="scope">
            {{ formatTime(scope.row.time) }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip property="sql" label="内容" />
        <el-table-column width="80px" label="">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onSelect(scope.row)">{{
              $tc('Insert')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </span>
  </el-dialog>
</template>

<script>
import { listSqlHistory } from '@/utils/sqlHistory'

export default {
  name: 'SqlHistoryDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dbType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      items: []
    }
  },
  computed: {
    iVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  mounted() {
    this.items = listSqlHistory(this.dbType)
  },
  methods: {
    formatTime(time) {
      const date = new Date(time)
      const pad = (n) => String(n).padStart(2, '0')
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    },
    onSelect(item) {
      this.$emit('select', item.sql)
    }
  }
}
</script>

<style scoped>
::v-deep .el-table tr {
  background-color: #383a3c;
}

::v-deep .el-table tr:hover {
  background-color: #7c7c7e !important;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: #7c7c7e !important;
}

::v-deep .el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  border-bottom: 1px solid #7c7c7e
}

::v-deep .el-table th.el-table__cell {
  background-color: #383a3c;
}

.el-table {
  color: #e9e9e9;
}
</style>
