$(document).ready(function () {
    /* =========================================================
        Sticky Header
     =========================================================*/
    $(window).scroll(function () {
        let scrollTop = $(this).scrollTop();
        if (scrollTop > 200) {
            $('.header').addClass('sticky');
            $('.resp-none').addClass('scroll-none');
        } else {
            $('.header').removeClass('sticky');
            $('.resp-none').removeClass('scroll-none');
        }
    });


});


// Modal show when page loaded
$(window).on('load', function () {
    $('#goodLuckModal').modal('show');
});


        function startCountdown(duration) {
            var timer = duration * 60; // Convert minutes to seconds

            // Update the countdown timer every second
            var countdownInterval = setInterval(function () {
                var minutes = Math.floor(timer / 60);
                var seconds = timer % 60;

                // Display the remaining time in the specified format
                var formattedTime =
                    minutes + ':' +  seconds;
                $('#countdown').text(formattedTime);

                // Check if the countdown has reached zero
                if (--timer < 0) {
                    clearInterval(countdownInterval); // Stop the countdown when it reaches zero
                    $('#countdown').text('Countdown expired');
                }
            }, 1000); // Update every 1 second
        }

        // Start the 30-minute countdown when the page loads
        $(document).ready(function () {
            startCountdown(30); // Start a 30-minute countdown
        });


// Google Pie Chart

if($('#piechart').length > 0) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['PieName', 'PieValue'],
            ['Pending Quiz', 6],
            ['Spines Left', 2],
            ['Commute', 2],
        ]);

        var options = {
            colors: ['#54C57B', '#FFDD56', '#F46A37'],
            title: 'This month spines',
            titleTextStyle: {
                color: ('black', '#212121'),
                fontSize: 32,
                bold: true,
            },
            legend: {
                position: 'left',
                alignment: 'end',
                textStyle: {
                    color: '#212121',
                    fontSize: 14,
                },
            },
            pieSliceText: 'value',
        };

        var chart = new google.visualization.PieChart(
            document.getElementById('piechart')
        );

        chart.draw(data, options);
    }
}

// Google Bar Chart
if ($('#barchart').length > 0) {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Topics', 'percent', { role: 'style' }],
            ['Corporate', 95, '#0387AD'],
            ['ADSL', 90, '#54C57B'],
            ['Cash', 70, '#6C609C'],
        ]);
        var view = new google.visualization.DataView(data);
        view.setColumns([
            0,
            1,
            {
                calc: function (dataTable, rowNum) {
                    var density = dataTable.getValue(rowNum, 1);
                    return density + '%';
                },
                type: 'string',
                role: 'annotation',
                p: { html: true },
            },
            2,
        ]);
        var options = {
            title: 'Overall top three topics',
            vAxis: {
                    minValue: 0,     // Start the Y-axis from 0
                    ticks: [0, 20, 40, 60, 80, 100]  // Specify Y-axis tick values
                },
            titleTextStyle: {
                color: '#212121',
                fontSize: 32,
                bold: true,
            },
            legend: 'none',
        };
        var chart = new google.visualization.ColumnChart(
            document.getElementById('barchart')
        );
        chart.draw(view, options);

        var legendContainer = document.getElementById('bar-legend');
        for (var i = 0; i < data.getNumberOfRows(); i++) {
            var label = data.getValue(i, 0);
            var color = data.getValue(i, 2);
            var legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.setAttribute('data-column', i); // Store column index
            legendItem.innerHTML =
                '<div class="legend-box" style="background-color:' +
                color +
                '"></div>' +
                label;
            legendContainer.appendChild(legendItem);
            // Add event listeners for legend interactivity
            legendItem.addEventListener('mouseenter', function () {
                var column = this.getAttribute('data-column');
                chart.setSelection([{ row: parseInt(column), column: 1 }]);
            });
            legendItem.addEventListener('mouseleave', function () {
                chart.setSelection([]);
            });
        }
    }
}

    // Spin
const prizes = [
    {
        text: 'Postpaid',
        color: '#FFE194',
        reaction: 'dancing',
    },
    {
        text: 'Corporate',
        color: '#EC5252',
        reaction: 'shocked',
    },
    {
        text: 'Cash',
        color: '#C3D0DE',
        reaction: 'shocked',
    },
    {
        text: 'ADSL',
        color: '#54C57B',
        reaction: 'shocked',
    },
    {
        text: 'Services',
        color: '#FFE194',
        reaction: 'dancing',
    },
    {
        text: 'Cash',
        color: '#C3D0DE',
        reaction: 'laughing',
    },
    {
        text: 'Prepaid',
        color: '#EC5252',
        reaction: 'laughing',
    },
    {
        text: 'ADSL',
        color: '#54C57B',
        reaction: 'dancing',
    },
];

$(document).ready(function () {
    const wheel = $('.deal-wheel');
    const spinner = wheel.find('.spinner');
    const trigger = $('.btn-spin');
    const ticker = wheel.find('.ticker');
    const reaper = wheel.find('.grim-reaper');
    const prizeSlice = 360 / prizes.length;
    const prizeOffset = Math.floor(180 / prizes.length);
    const spinClass = 'is-spinning';
    const selectedClass = 'selected';
    const spinnerStyles = window.getComputedStyle(spinner[0]);
    let tickerAnim;
    let rotation = 0;
    let currentSlice = 0;
    let prizeNodes;

    const createPrizeNodes = () => {
        prizes.forEach(({ text, color, reaction }, i) => {
            const rotation = prizeSlice * i * -1 - prizeOffset;

            spinner.append(`
                <li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
                    <span class="text">${text}</span>
                </li>
            `);
        });
    };

    const createConicGradient = () => {
        spinner.attr(
            'style',
            `background: conic-gradient(
                from -90deg,
                ${prizes
                    .map(
                        ({ color }, i) =>
                            `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`
                    )
                    .reverse()}
            );`
        );
    };

    const setupWheel = () => {
        createConicGradient();
        createPrizeNodes();
        prizeNodes = wheel.find('.prize');
    };

    const spinertia = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const runTickerAnimation = () => {
        const values = spinnerStyles.transform
            .split('')[1]
            .split('')[0]
            .split('');
        const a = values[0];
        const b = values[1];
        let rad = Math.atan2(b, a);

        if (rad < 0) rad += 2 * Math.PI;

        const angle = Math.round(rad * (180 / Math.PI));
        const slice = Math.floor(angle / prizeSlice);

        if (currentSlice !== slice) {
            ticker.css('animation', 'none');
            setTimeout(() => ticker.css('animation', ''), 10);
            currentSlice = slice;
        }

        tickerAnim = requestAnimationFrame(runTickerAnimation);
    };

    const selectPrize = () => {
        const selected = Math.floor(rotation / prizeSlice);
        console.log(prizeSlice);
        prizeNodes.eq(selected).addClass(selectedClass);
        reaper.attr('data-reaction', prizeNodes.eq(selected).data('reaction'));
    };

    trigger.on('click', () => {
        if (reaper.attr('data-reaction') !== 'resting') {
            reaper.attr('data-reaction', 'resting');
        }

        trigger.prop('disabled', true);
        rotation = Math.floor(Math.random() * 360 + spinertia(2000, 5000));
        prizeNodes.removeClass(selectedClass);
        wheel.addClass(spinClass);
        spinner.css('--rotate', rotation);
        ticker.css('animation', 'none');
        runTickerAnimation();
    });

    spinner.on('transitionend', () => {
        cancelAnimationFrame(tickerAnim);
        trigger.prop('disabled', false);
        trigger.focus();
        rotation %= 360;
        selectPrize();
        wheel.removeClass(spinClass);
        spinner.css('--rotate', rotation);
    });

    setupWheel();
});
