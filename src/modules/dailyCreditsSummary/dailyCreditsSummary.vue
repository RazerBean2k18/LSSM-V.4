<template>
    <div class="dcs-wrapper">
        <span
            class="glyphicon glyphicon-info-sign"
            @click="hidden = !hidden"
        ></span>
        <div class="row" :class="{ 'alert alert-info': !hidden }">
            <button
                v-if="!hidden"
                class="close"
                type="button"
                @click="hidden = !hidden"
            >
                ×
            </button>
            <h4 v-if="!hidden" style="margin-left: 1em">
                {{ $m('title').toString() }}
            </h4>
            <div
                :class="{ 'col-lg-6': !hidden, 'col-lg-12': hidden }"
                class="badges-charts"
            >
                <div class="badges">
                    <dsc-badge
                        v-for="type in sorted"
                        :key="type.desc"
                        :backgroundColor="type.backgroundColor"
                        :textColor="type.textColor"
                        :amount="type.amount"
                        :total="type.total"
                        :desc="type.desc"
                        :show-average="showAverage"
                    ></dsc-badge>
                </div>
                <div v-if="!hidden">
                    <div class="col-lg-6">
                        <highcharts :options="incomeChartOptions"></highcharts>
                    </div>
                    <div class="col-lg-6">
                        <highcharts
                            :options="expensesChartOptions"
                        ></highcharts>
                    </div>
                </div>
            </div>
            <div v-if="!hidden" class="col-lg-6">
                <enhanced-table
                    :head="{
                        desc: {
                            title: $m('category').toString(),
                        },
                        total: {
                            title: $m('total').toString(),
                        },
                        average: {
                            title: 'Ø',
                        },
                        amount: {
                            title: $m('amount').toString(),
                        },
                    }"
                    :table-attrs="{ class: 'table table-striped' }"
                    @sort="setSort"
                    :sort="sort"
                    :sort-dir="sortDir"
                    :search="search"
                    @search="s => (search = s)"
                >
                    <template v-slot:head>
                        <div class="btn-group pull-right">
                            <button
                                class="btn btn-default dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {{ $m('export.export') }}&nbsp;<span
                                    class="caret"
                                ></span>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a
                                        download="credits.json"
                                        :href="`data:application/json;charset=utf-8,${encodeURIComponent(
                                            JSON.stringify(creditsTypeSum)
                                        )}`"
                                    >
                                        {{ $m('export.json.raw') }}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        download="credits.json"
                                        :href="`data:application/json;charset=utf-8,${encodeURIComponent(
                                            JSON.stringify(
                                                creditsTypeSum,
                                                null,
                                                4
                                            )
                                        )}`"
                                    >
                                        {{ $m('export.json.prettified') }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </template>
                    <tr v-for="type in sorted" :key="type.desc">
                        <td>{{ type.desc }}</td>
                        <td
                            :class="`text-${
                                type.total > 0
                                    ? 'success'
                                    : type.total < 0
                                    ? 'danger'
                                    : ''
                            }`"
                        >
                            {{ type.total.toLocaleString() }}
                        </td>
                        <td
                            :class="`text-${
                                type.total > 0
                                    ? 'success'
                                    : type.total < 0
                                    ? 'danger'
                                    : ''
                            }`"
                        >
                            {{
                                Math.round(
                                    type.total / type.amount
                                ).toLocaleString()
                            }}
                        </td>
                        <td>{{ type.amount.toLocaleString() }}</td>
                    </tr>
                </enhanced-table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { Chart } from 'highcharts-vue';

import type { CreditsTypes } from 'typings/modules/dailyCreditsSummary/main';
import type {
    Category,
    DailyCreditsSummary,
    DailyCreditsSummaryComputed,
    DailyCreditsSummaryMethods,
    DailyCreditsSummaryProps,
} from 'typings/modules/dailyCreditsSummary/dailyCreditsSummary';

export default Vue.extend<
    DailyCreditsSummary,
    DailyCreditsSummaryMethods,
    DailyCreditsSummaryComputed,
    DailyCreditsSummaryProps
>({
    name: 'lssmv4-dcs',
    components: {
        EnhancedTable: () =>
            import(
                /* webpackChunkName: "components/enhanced-table" */ '../../components/enhanced-table.vue'
            ),
        dscBadge: () =>
            import(
                /* webpackChunkName: "modules/dailyCreditsSummary/components/dsc-badge" */ './components/dscBadge.vue'
            ),
        Highcharts: Chart,
    },
    data() {
        return {
            hidden: true,
            sort: 'desc',
            sortDir: 'asc',
            search: '',
            showAverage: true,
            basicChartOptions: {
                chart: {
                    type: 'pie',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    margin: 0,
                    spacing: [5, 10, 0, 10],
                    height: '100%',
                    borderRadius: '4px',
                },
                tooltip: {
                    pointFormat:
                        '{series.name}: <b>{point.value}</b> ({point.percentage:.1f}%)',
                },
                plotOptions: {
                    pie: {
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.value} ({point.percentage:.1f}%)',
                        },
                    },
                },
            },
        } as DailyCreditsSummary;
    },
    props: {
        entries: {
            type: Array,
            required: true,
        },
        creditsTypes: {
            type: Object,
            required: true,
        },
    },
    computed: {
        sorted() {
            const types = this.filtered;
            return types.sort((a, b) => {
                let modifier = 1;
                if (this.sortDir === 'desc') modifier = -1;
                if (a[this.sort] < b[this.sort]) return -1 * modifier;
                if (a[this.sort] > b[this.sort]) return modifier;
                return 0;
            });
        },
        filtered() {
            if (!this.search.trim().length || this.hidden)
                return this.creditsTypeSum;
            return this.creditsTypeSum.filter(({ desc }) =>
                desc.toLowerCase().match(this.search.trim().toLowerCase())
            );
        },
        creditsTypeSum() {
            const result: Record<string, Category> = Object.fromEntries(
                Object.entries(this.creditsTypes as CreditsTypes).map(
                    ([key, { regex, title, backgroundColor, textColor }]) => [
                        key,
                        {
                            desc:
                                title ??
                                regex
                                    ?.toString()
                                    .replace(/^\/|\/[ADJUgimux]*$/gu, '') ??
                                '',
                            total: 0,
                            amount: 0,
                            backgroundColor,
                            textColor,
                        },
                    ]
                )
            );

            this.entries.forEach(({ total, amount, types }) => {
                types.forEach(type => {
                    result[type].total += total;
                    result[type].amount += amount;
                });
            });
            return Object.values(result).filter(({ amount }) => amount > 0);
        },
        incomeChartOptions() {
            return {
                ...this.basicChartOptions,
                title: {
                    text: this.$m('charts.income').toString(),
                    align: 'left',
                },
                series: [
                    {
                        name: this.$m('charts.income').toString(),
                        data: this.creditsTypeSum
                            .filter(({ total }) => total > 0)
                            .map(
                                ({
                                    desc: name,
                                    total: y,
                                    backgroundColor,
                                }) => ({
                                    name,
                                    y,
                                    value: y.toLocaleString(),
                                    color: backgroundColor,
                                })
                            ),
                    },
                ],
            };
        },
        expensesChartOptions() {
            return {
                ...this.basicChartOptions,
                title: {
                    text: this.$m('charts.expenses').toString(),
                    align: 'left',
                },
                series: [
                    {
                        name: this.$m('charts.expenses').toString(),
                        data: this.creditsTypeSum
                            .filter(({ total }) => total < 0)
                            .map(
                                ({
                                    desc: name,
                                    total: y,
                                    backgroundColor,
                                }) => ({
                                    name,
                                    y: -y,
                                    value: y.toLocaleString(),
                                    color: backgroundColor,
                                })
                            ),
                    },
                ],
            };
        },
    },
    methods: {
        setSort(s) {
            this.sortDir =
                s === this.sort && this.sortDir === 'asc' ? 'desc' : 'asc';
            this.sort = s;
        },
        $m(key, args) {
            return this.$t(`modules.dailyCreditsSummary.${key}`, args);
        },
    },
    mounted() {
        this.$store
            .dispatch('settings/getSetting', {
                moduleId: 'dailyCreditsSummary',
                settingId: 'showAverage',
            })
            .then(showAverage => (this.showAverage = showAverage));
    },
});
</script>

<style scoped lang="sass">
.glyphicon
    cursor: pointer

.dcs-wrapper
    display: flex

    > .row
        margin-left: 0

        &.alert-info
            margin-left: -15px
            width: 100%

        .badges-charts
            display: flex
            flex-flow: column
            height: calc(100% - 30px)

            .badges
                display: flex
                flex-flow: row
                flex-wrap: wrap
</style>
