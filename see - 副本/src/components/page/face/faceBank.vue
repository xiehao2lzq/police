<template>
    <div class="faceBank">
        <SearchBox :title="title"/>
    </div>
</template>
<script>
import SearchBox from "./searchBox"
export default {
    data(){
        return{
            title:"姓名"
        }
    },
    components: {
        SearchBox,
    }
}
</script>
<style lang="scss" scoped>

</style>
