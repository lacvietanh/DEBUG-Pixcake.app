<template>
    <el-dialog
        append-to-body
        top="30vh"
        width="477px"
        align="center"
        :visible.sync="visible"
        :close-on-click-modal="false"
        class="receive-free-container"
        @close="$emit('close')"
    >

        <div class="receive-free-container-title">完善基础资料免费送{{ receiveCount }}张</div>
        <el-form
            label-position="left"
        >
            <el-form-item
                label="摄影机构:"
                class="receive-free-container-from-item1">
                <el-input
                    v-model="institutionName"
                    :maxlength="20"
                    placeholder="请输入您的摄影机构名称"
                ></el-input>
            </el-form-item>
            <el-form-item
                label="所在地区:"
                class="receive-free-container-from-item2"
            >
                <el-cascader
                    v-model.trim="placeInfo"
                    :options="placeOptions"
                    :props="placeProps"
                    placeholder="请选择您的所在地区信息"
                ></el-cascader>
                <span class="cascader-icon">
                    <i class="el-icon-arrow-up"></i>
                    <i class="el-icon-arrow-down"></i>
                </span>
            </el-form-item>
            <el-form-item
                label="月修图量:"
                class="receive-free-container-monthly-usage-field receive-free-container-from-item2">

                <el-select v-model="monthlyUsage"
                           placeholder="请选择您的月平均修图张数">
                    <el-option
                        v-for="item in monthlyUsageOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <span class="cascader-icon">
                    <i class="el-icon-arrow-up"></i>
                    <i class="el-icon-arrow-down"></i>
                </span>
            </el-form-item>
            <el-form-item
                label="业务类型:"
                class="receive-free-container-radio-field">

                <el-radio
                    v-model="businessType"
                    :label="type.id"
                    v-for="(type, index) in  businessTypes"
                    :key="index"
                >{{ type.name }}
                </el-radio>
            </el-form-item>
            <el-form-item class="receive-free-container-from-item4">
                <el-button
                    class="receive-free-container-submit-btn"
                    @click="btnSubmit"
                    :loading="btnLoading"
                >免费领取{{ receiveCount }}张
                </el-button>
            </el-form-item>

        </el-form>


    </el-dialog>
</template>

<script>

import toast from '@/mixins/toast'
import { Dialog, Option, Select } from 'element-ui'

import { fetchProvinceInfo, fetchCityInfo, fetchActivityInfo } from '@/api/commonApi'
import { preferOrgInfo, fetchOrgType } from '@/api/userApi'
import { feedbackType } from '@/api/commonApi'

export default {
    name: 'ReceiveFreeDialog',
    mixins: [toast],
    components: {
        'el-dialog': Dialog,
        'el-option': Option,
        'el-select': Select
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            initCloudData: false,
            visible: this.value,
            institutionName: '',
            placeInfo: [],
            businessType: 1,
            placeProps: {
                lazy: true,
                lazyLoad: this.placeLazyLoad
            },
            placeOptions: [],
            businessTypes: [],
            receiveCount: 0,
            btnLoading: false,
            monthlyUsageOptions: [],
            monthlyUsage: null
        }
    },
    computed: {},
    watch: {
        value: {
            handler(val) {
                this.visible = val
                if (val && !this.initCloudData) {
                    this.init()
                }
            },
            immediate: true
        },
        visible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        async placeLazyLoad({ value }, resolve) {
            const res = await fetchCityInfo(value)
            const cityArr = []
            res.forEach((city) => {
                if (city.province_id === value) {
                    const cityItem = {
                        value: city.id,
                        label: city.name,
                        leaf: true
                    }
                    cityArr.push(cityItem)
                }
            })
            resolve(cityArr)
        },
        async getProvinceInfo() {
            try {
                const res = await fetchProvinceInfo()
                res.forEach(province => {
                    const option = {
                        value: province.id,
                        label: province.name
                    }
                    this.placeOptions.push(option)
                })
            } catch (e) {
                this.tsMessage(e.message)
            }
        },
        async btnSubmit() {
            try {
                const [valid, message] = this.validator()
                if (!valid) return this.tsMessage(message)
                // console.log(valid,message)
                const params = {
                    org_name: this.institutionName.trim(),
                    org_type_id: this.businessType,
                    city_id: this.placeInfo[1] ? this.placeInfo[1] : null,
                    month_ps_count_id: this.monthlyUsage
                }
                this.btnLoading = true
                await preferOrgInfo(params)
                this.btnLoading = false
                this.visible = false
                this.$emit('complete')
                this.tsMessage(`领取成功，${this.receiveCount}张免费张数已到账`)
            } catch (e) {
                this.btnLoading = false
                this.tsMessage(e.message)
            }
        },
        validator() {
            if (!this.institutionName.trim().length) {
                return [false, '请填写摄影机构名称']
            }
            if (!this.placeInfo.length) {
                return [false, '请选择所在地区']
            }
            if (!this.monthlyUsage) {
                return [false, '请选择月修图量级']
            }
            if (!this.businessType) {
                return [false, '请选择业务类型']
            }
            return [true]
        },
        async init() {
            try {
                await this.getProvinceInfo()
                const monthlyUsageData = await feedbackType(5) // 5是枚举张数选项的范围
                this.monthlyUsageOptions = monthlyUsageData.map(i =>  {
                    return {
                        value: i.id,
                        label: i.name
                    }
                })
                const { data } = await fetchActivityInfo()
                const { detail_info } = data
                const { count } = detail_info
                if (!count) return this.$emit('failure')
                this.receiveCount = count
                const res = await fetchOrgType()
                this.businessTypes = res.data
                this.initCloudData = true
            } catch (e) {
                this.tsMessage(e.message)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.receive-free-container {
    &-title {
        font-size: 16px;
        color: #D9D9D9;
        line-height: 24px;
        margin-bottom: 24px;
    }

    &-from-item1 {
        margin-bottom: 20px !important;
    }

    &-from-item2 {
        margin-bottom: 28px !important;
    }

    &-radio-field {
        width: 420px !important;
        margin-bottom: 64px !important;

        ::v-deep {
            .el-form-item__label {
                // margin-right: 40px !important;
            }

            .el-form-item__content {
                // display: flex;
                // flex-wrap: wrap;
                // justify-content: space-between;
                // align-content: flex-start;
                // flex: auto !important;
                // margin-left: 20px;
                // transform: translateX(40px);
                .el-radio__input.is-checked .el-radio__inner {
                    border-color: #3073FF;
                    background-color: #3073FF;
                }

                .el-radio__input.is-checked + .el-radio__label {
                    color: #FFFFFF;
                    font-family: PingFangSC-Regular;
                }

                .el-radio__input + .el-radio__label {
                    color: #FFFFFF;
                }

                .el-radio__inner {
                    &:hover {
                        border-color: #3073FF;
                    }
                }
            }

        }
    }

    &-from-item4 {
        margin-bottom: 40px !important;
    }

    &-submit-btn {
        margin-left: 112px !important;
        //margin-right: 162px!important;
        width: 153px !important;
        height: 30px !important;
        padding: 0 !important;
        background-image: linear-gradient(90deg, #FBEB51 0%, #F7DA35 68%, #F5D228 100%) !important;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        margin-bottom: 16px;

        ::v-deep {
            span {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #0C0C0C;
                font-weight: 400;
            }
        }
    }

    ::v-deep {
        .el-dialog__body {
            padding: 14px 55px 0 50px;
        }

        .el-cascader {
            width: 100%;
            line-height: 28px;
        }

        .el-form-item {
            display: flex;
            height: 28px;

            .el-form-item__label {
                line-height: 28px;
            }

            .el-form-item__content {
                flex: 1;
                text-align: left;
                line-height: 28px;

                input::-webkit-input-placeholder {
                    /* WebKit browsers */
                    color: #737373;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    letter-spacing: 0;
                }

                .el-input {
                    height: 28px;
                    line-height: 28px;

                    input {
                        height: 28px;
                    }
                }

                .el-input__inner {
                    padding: 0 8px;
                }

                .el-radio {
                    margin-right: 16px;
                    height: 16px;
                    line-height: 16px;

                    .el-radio__label {
                        display: inline-block;
                        width: 52px;
                        height: 16px;
                        line-height: 14px;
                        font-size: 12px;
                        padding-left: 4px;
                        text-align: left;
                        font-family: PingFangSC-Regular;
                    }

                    .el-radio__inner {
                        border: 1px solid transparent;
                        background-image: linear-gradient(171deg, #4D4E4E 0%, #5E5D5E 100%);
                        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
                    }

                    .is-checked {
                        .el-radio__inner {
                            background-image: none;
                            background-color: #3073FF;
                        }
                    }
                }

                .el-select {
                    position: relative;
                    width: 100%;
                }

                .cascader-icon {
                    position: absolute;
                    right: 4px;
                    top: 50%;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    transform: translateY(-50%);
                    border-radius: 4px;
                    flex-direction: column;
                    background-color: rgb(48, 115, 255);
                    text-align: center;
                    pointer-events: none;

                    > i {
                        font-size: 12px;

                        &:nth-child(n+2) {
                            margin-top: -2px;
                        }

                        &:nth-child(-n+1) {
                            margin-bottom: -2px;
                        }
                    }
                }
            }
        }

    }
}


</style>
