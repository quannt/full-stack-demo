<template>
  <el-dialog
    :title="`${get(reviewee, 'name')}'s Review Details`"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
  >
    <el-form>
      <el-form-item>
        <el-autocomplete
          v-model="employeeQuery"
          prefix-icon="el-icon-search"
          :fetch-suggestions="querySearch"
          placeholder="Please type employee's name to add"
          class="employee-autocomplete"
          @select="handleSelect"
        >
          <template slot-scope="{ item }">
            <div class="value">{{ item.name }}</div>
          </template></el-autocomplete
        >
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:visible', false)">Cancel</el-button>
      <el-button type="primary" @click="$emit('update:visible', false)"
        >Confirm</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import get from "lodash.get";
import UsersService from "@/services/UsersService";

export default {
  name: "EditReviewersModal",

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    reviewee: {
      type: Object,
      required: false,
      default() {
        return {};
      }
    },
    selectedReviewers: {
      type: Array,
      require: false,
      default() {
        return [];
      }
    }
  },

  data() {
    return {
      employeeQuery: null,
      form: {}
    };
  },

  methods: {
    get,
    async querySearch(queryString, cb) {
      const searchResponse = await UsersService.getUsers([
        {
          key: "name",
          value: queryString
        }
      ]);
      const result = searchResponse?.data ?? [];
      cb(result);
    },
    handleSelect(item) {
      console.log(item);
    }
  }
};
</script>

<style scoped>
.employee-autocomplete {
  width: 100%;
}
</style>
