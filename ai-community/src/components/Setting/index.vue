<template>
    <div>
       <Header/>
       <BankName/>
       <Bank/>
    </div>
</template>

<script>
import Header from "../nameSearch/header"
import BankName from "./bankName"
import Bank from "./bank"
    export default {
        components: {
            Header,
            BankName,
            Bank
        }
    }
</script>

<style lang="scss" scoped>

</style>