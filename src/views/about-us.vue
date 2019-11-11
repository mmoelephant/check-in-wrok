<template>
<div class="rule-page">
    <div class="rulebox">
        <div class="rule1">
            <span>版本说明</span>
            <p>加班报备/调休系统是为了便于员工提交加班/调休，并便于管理员统计和管理。</p>
        </div>
        <div class="rule2">
            <span>当前版本号</span>
            <p>V1.0.1</p>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
.rule-page
    font-size 14px /*px*/
    color #666
.rulebox
    width 100%
    background #ffffff
    padding 36px 16px
    box-sizing border-box
    box-shadow 0px -1px 0px 0px rgba(226,225,230,1)
    margin-top 10px
    .rule1,.rule2
        span
            font-size 18px /*px*/
            color #333
            font-weight bold
        p
            margin-top 12px
            line-height 20px /*px*/
    .rule2
        margin-top 26px
        p
            line-height 18px /*px*/
        p+p
            margin-top 0
</style>