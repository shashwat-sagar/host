import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useThemeStore } from '../../../store/useThemeStore';
import { themeChartColors } from '../../../theme/themeConfig';

const TrafficPieChart = () => {
    const { colorPreset } = useThemeStore();
    const chartColors = themeChartColors[colorPreset];

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            height: 350,
            style: {
                fontFamily: 'Poppins, sans-serif'
            }
        },
        title: {
            text: 'Source<br /> Breakdown',
            align: 'center',
            verticalAlign: 'middle',
            y: 0,
            style: {
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#475569'
            }
        },
        tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#f1f5f9',
            borderRadius: 12,
            shadow: true,
            style: {
                color: '#1e293b'
            },
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                innerSize: '75%', // Thinner donut
                borderWidth: 0,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            itemStyle: {
                color: '#64748b',
                fontWeight: '600',
                fontSize: '12px',
                padding: '4px'
            },
            itemMarginBottom: 8,
            symbolRadius: 4
        },
        series: [{
            type: 'pie',
            name: 'Share',
            data: [
                { name: 'Direct', y: 45, color: chartColors.pie[0] },
                { name: 'Social', y: 25, color: chartColors.pie[1] },
                { name: 'Referral', y: 20, color: chartColors.pie[2] },
                { name: 'Ads', y: 10, color: chartColors.pie[3] }
            ]
        }]
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full hover:shadow-md transition-shadow">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">Patient Sources</h3>
                <p className="text-slate-400 text-xs font-medium">Where your users are coming from</p>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default TrafficPieChart;
