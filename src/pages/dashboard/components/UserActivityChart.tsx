import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useThemeStore } from '../../../store/useThemeStore';
import { themeChartColors } from '../../../theme/themeConfig';

const UserActivityChart = () => {
    const { colorPreset } = useThemeStore();
    const chartColors = themeChartColors[colorPreset];

    const options: Highcharts.Options = {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            height: 350,
            style: {
                fontFamily: 'Poppins, sans-serif'
            }
        },
        title: {
            text: undefined
        },
        xAxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            lineColor: 'transparent',
            lineWidth: 0,
            labels: {
                style: {
                    color: '#94a3b8',
                    fontWeight: '500'
                }
            }
        },
        yAxis: {
            title: {
                text: undefined
            },
            gridLineColor: '#f1f5f9',
            labels: {
                style: {
                    color: '#94a3b8'
                }
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#f1f5f9',
            borderRadius: 12,
            shadow: true,
            style: {
                color: '#1e293b'
            },
            headerFormat: '<span style="font-size:10px; font-weight:bold; color:#64748b">{point.key}</span><br>',
            pointFormat: '<b>{point.y}</b> active users',
            shared: true,
        },
        plotOptions: {
            column: {
                borderRadius: 8,
                pointWidth: 20,
                borderWidth: 0,
                colorByPoint: true, // Enable different colors per bar
                colors: chartColors.activity
            }
        },
        series: [{
            type: 'column',
            name: 'Active Users',
            data: [150, 230, 280, 210, 320, 180, 140]
        }]
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full hover:shadow-md transition-shadow">
            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-1">User Activity</h3>
                <p className="text-slate-400 text-xs font-medium">Weekly traffic statistics</p>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default UserActivityChart;
