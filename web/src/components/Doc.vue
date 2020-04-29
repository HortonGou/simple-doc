<template>
  <div class="module-doc">
    <ApiDocItem
      v-for="item in getApiList(folderName)"
      :key="item.name"
      :title="item.name"
      :path="item.request.path"
      :method="item.request.method"
      :description="item.description"
      :request="item.request.method==='GET'?item.request.query:item.request.body"
      :response="item.response"
    ></ApiDocItem>
  </div>
</template>

<script>
import ApiDocItem from "./ApiDocItem";
import { mapGetters } from "vuex";

export default {
  name: "Doc",
  components: { ApiDocItem },
  props: {
    folderName: String
  },
  computed: {
    ...mapGetters("folder", ["getApiList"])
  }
};
</script>

<style scoped>
.module-doc {
}
</style>