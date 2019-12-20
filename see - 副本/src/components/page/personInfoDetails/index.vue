<template>
    <div class="personInfoDetails">
        <Header/>
        <div class="left">
            <XqInfo/>
            <PersonInfo/>
        </div>
        <div class="right">
            <ManOrWoman/>
            <Face/>
        </div>
        
    </div>
</template>

<script>
import Header from "./header" 
import XqInfo from "./xqInfo"
import PersonInfo from "./personInfo"
import ManOrWoman from "./manOrwoman"
import Face from "./face"
    export default {
        data () {
            return {
                 
            }
        },
        components: {
            Header,
            XqInfo,
            PersonInfo,
            ManOrWoman,
            Face
        }
    }
</script>

<style lang="scss" scoped>
    .personInfoDetails{
        width: 100%;
    }
    .left{
        float: left;
        width: 60%;
    }
    .right{
        float: right;
        width: 39%;
    }
</style>