<template>
<div class="rule-page">
    <div class="rulebox">
        <div class="rule1">
            <span>版本说明</span>
            <p>当审批中的加班申请通过后，会在次日核对加班情况、校验加班市场。若加班期间没有正常打卡，会被记录为加班异常。</p>
        </div>
        <div class="rule2">
            <span>当前版本号</span>
            <p>ver 2018.10.30.1.0</p>
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
    font-size 28px /*px*/
    color #666
.rulebox
    width 100%
    background #ffffff
    padding 72px 32px
    box-sizing border-box
    box-shadow 0px -1px 0px 0px rgba(226,225,230,1)
    margin-top 20px
    .rule1,.rule2
        span
            font-size 40px /*px*/
            color #333
            font-weight bold
        p
            margin-top 24px
            line-height 40px /*px*/
    .rule2
        margin-top 52px
        p
            line-height 36px /*px*/
        p+p
            margin-top 0
</style>