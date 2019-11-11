<template>
<div class="rule-page">
    <div class="rulebox">
        <div class="rule1">
            <span>加班原则</span>
            <p>
                加班指在规定工作时间之外，因工作需要必须工作称为加班。
                加班分两种：应急加班和计划加班。
                由于工作繁忙，需要在正常工作日工作时间外继续工作，称为应急加班。
                需要在周末或者国家法定节假日继续工作，称为计划加班。
            </p>
        </div>
        <div class="rule2">
            <span>加班/调休申请规则</span>
            <p>1.由部门负责人管理人员加班/调休的审批。</p>
            <p>2.加班时，加班人员以“企业微信”打卡记录作为加班凭证，在“加班报备系统”中添加加班申请，加班时间与企业微信打卡时间一致。</p>
            <p>3.调休时间计算，加班按1:1的比例折算调休时间。累计4小时为0.5个工作日，累计8小时为1个工作日。</p>
            <p>4.调休原则上提前一天提交申请，部门负责人批准后方可调休。</p>
        </div>
        <div class="rule2">
            <span>打卡规则</span>
            <p>1.工作日加班：加班完成后，打下班卡即可。</p>
            <p>2.非工作日加班：开始加班时需打上班卡，加班完成后需打下班卡。</p>
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