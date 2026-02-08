import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useThemeStore } from '../../../store/useThemeStore';
import { themeChartColors } from '../../../theme/themeConfig';

const RevenueChart = () => {
    const { colorPreset } = useThemeStore();
    const chartColors = themeChartColors[colorPreset];

    const options: Highcharts.Options = {
        chart: {
            type: 'areaspline',
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            lineColor: 'transparent',
            gridLineColor: 'transparent',
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
                },
                format: '${value}k'
            }
        },
        tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#f1f5f9',
            borderRadius: 16,
            shadow: true,
            style: {
                color: '#1e293b',
                fontSize: '13px'
            },
            pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>${point.y}k</b><br/>'
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.1,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 4,
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 3
                        }
                    }
                }
            }
        },
        series: [{
            type: 'areaspline',
            name: 'Revenue',
            data: [35, 42, 38, 55, 48, 65, 70, 75, 68, 85, 90, 105],
            // Vibrant Gradient Line
            color: {
                linearGradient: { x1: 0, x2: 1, y1: 0, y2: 0 },
                stops: chartColors.revenue.stops as any
            } as any,
            // Rich Gradient Fill
            fillColor: {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: chartColors.revenue.fillStops as any // Updated property name to match config
            } as any
        }]
    };

    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm h-full hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Revenue Overview</h3>
                    <p className="text-slate-400 text-xs font-medium">Monthly earnings performance</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-300 font-medium cursor-pointer">
                    <option>This Year</option>
                    <option>Last Year</option>
                </select>
            </div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default RevenueChart;
