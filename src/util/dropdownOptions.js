const options = (param) => {
    const options = {
        'All Homes': 'ZHVI All Homes (SFR, Condo Co op), Time Series, Smoothed, Seasonally Adjusted.csv',
        'Condo Co-ops': 'ZHVI Condo Co op Time Series.csv',
        'Single Family Homes': 'ZHVI Single Family Homes Time Series.csv',
        '1-Bedroom': 'ZHVI 1-Bedroom Time Series.csv',
        '2-Bedroom': 'ZHVI 2-Bedroom Time Series.csv',
        '3-Bedroom': 'ZHVI 3-Bedroom Time Series.csv',
        '4-Bedroom': 'ZHVI 4-Bedroom Time Series.csv',
        '5-Bedroom': 'ZHVI 5-Bedroom Time Series.csv',
    };
    return options[param];
}

module.exports = {
    options: options
}