<template>
<div class="rule-page">
    <div class="rulebox">
        <div class="rule1">
            <span>加班/调休申请规则</span>
            <p>当审批中的加班申请通过后，会在次日核对加班情况、校验加班市场。若加班期间没有正常打卡，会被记录为加班异常</p>
        </div>
        <div class="rule2">
            <span>打卡原则</span>
            <p>·工作日加班，需加班完成后打下班卡；</p>
            <p>·非工作日加班，需加班前打上班卡，加班后打下班卡。</p>
        </div>
        <div class="rule2">
            <span>详细说明</span>
            <p>暂无详细说明！</p>
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
    height calc(100% - 10px)
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
            margin-top 10px
            line-height 20px /*px*/
    .rule2
        margin-top 26px
        p
            line-height 18px /*px*/
        p+p
            margin-top 0
</style>