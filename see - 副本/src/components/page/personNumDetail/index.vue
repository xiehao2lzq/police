<template>
    <div class="personNumDetial">
        <Header/>
        <PersonNum/>
        <OpenDoor/>
        <Table/>
    </div>
</template>

<script>
import Header from "../personInfoDetails/header"
import PersonNum from "./personNum"
import OpenDoor from "./openDoor"
import Table from "./table"
    export default {
        components: {
            Header,
            PersonNum,
            OpenDoor,
            Table
        }
    }
</script>

<style lang="scss" scoped>
.personNumDetial{
    width: 100%;
}
</style>