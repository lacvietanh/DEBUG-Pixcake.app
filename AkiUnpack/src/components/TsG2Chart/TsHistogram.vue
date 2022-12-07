<template>
    <div
        :class="className"
        :id="id"
        :type="type"
        :style="{
            height: height + 'px',
            width: width ? `${width}px` : '100%'
        }"
        :data="data">
    </div>
</template>

<script>
import { Chart } from '@antv/g2'
import { debounce } from 'lodash'

export default {
    props: {
        className: {
            type: String,
            default: 'histogram'
        },
        id: {
            type: String,
            default: 'histogram'
        },
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 300
        },
        type: {
            type: String,
            default: 'line'
        },
        data: {
            type: Object,
            required: true,
            default: () => {
            }
        }
    },
    data() {
        return {
            chart: null,
            colors: {
                red: 'rgba(220, 60, 60, 0.6666)',
                green: 'rgba(60, 220, 60, 0.5)',
                blue: 'rgba(60, 60, 220, 0.4)'
                // red: '#ff0000',
                // green: '#00ff00'
            }

            // lineColors: {
            //     red: 'rgba(220, 60, 60, 0.5)',
            //     // green: '#00ff00'
            //     green: 'rgba(60, 220, 60, 0.3333)',
            //     // red: '#ff0000',
            //     blue: 'rgba(60, 60, 220, 1)'
            // }
        }
    },
    watch: {
        data(val) {
            this.update(val)
        }
    },
    mounted() {
        this.chart = new Chart({
            container: this.id,
            // forceFit: true,
            autoFit: true,
            height: this.height,
            padding: [0, 15, 0, 15]
        })
        const newData = this.formatData(this.data || {})
        this.initChart(newData)

        // const ds = new DataSet({
        //         state: {
        //             start: new Date('2009/7/20 0:00').getTime(),
        //             end: new Date('2009/9/9 0:00').getTime(),
        //         },
        //     });
        //     const dv = ds.createView('origin').source(data);
        //     dv.transform({
        //         type: 'filter',
        //         callback: function callback(obj) {
        //             const time = new Date(obj.time).getTime(); // !注意：时间格式，建议转换为时间戳进行比较
        //             return time >= ds.state.start && time <= ds.state.end;
        //         },
        //     });
        //
        //     console.log(dv)
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.destroy()
        this.chart = null
    },
    methods: {
        update: debounce(function (val) {
            const newData = this.formatData(val)
            if (this.chart) {
                this.chart.changeData(newData)
            } else {
                this.initChart(newData)
            }
        }, 300, {
            maxWait: 1000,
            leading: true
        }),

        formatData(data = {}) {
            const nData = []
            const { blue, red, green } = data

            for (let i = 0; i < 255; i++) {
                nData.push({
                    x: i,
                    y: red && red[i] || 0,
                    color: 'red'
                })

                nData.push({
                    x: i,
                    y: green && green[i] || 0,
                    color: 'green'
                })

                nData.push({
                    x: i,
                    y: blue && blue[i] || 0,
                    color: 'blue'
                })
            }

            return [...nData]
        },

        initChart(data) {
            if (!this.chart) return
            const chart = this.chart

            chart.clear() // 清理所有图形
            chart.data(data)

            chart.axis(false)

            chart.tooltip(false)
            chart.legend(false)
            chart
                .line()
                .position('x*y')
                .size(1)
                .color('color', color => {
                    return this.colors[color]
                })
            // .animate({
            //     appear: {
            //         animation: 'delay-scale-in-y',
            //         easing: 'ease-elastic-out',
            //         delay(index) {
            //             return index * 10;
            //         }
            //     }
            // });

            chart
                .area()
                .position('x*y')
                .style({ fillOpacity: 0.33333 })
                .color('color', color => {
                    return this.colors[color]
                })
            // .animate({
            //     appear: {
            //         animation: 'delay-scale-in-y',
            //         easing: 'ease-elastic-out',
            //         delay(index) {
            //             return index * 10;
            //         }
            //     },
            //     update: {
            //         animation: 'fade-in'
            //     }
            // })


            chart.interaction('element-visible-filter')
            this.$nextTick(_ => {
                chart.render()
            })
        }
    }
}
</script>
